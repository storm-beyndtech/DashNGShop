import { db } from '../db';
import { products, orderItems, orders } from '@shared/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { format, subDays } from 'date-fns';

export interface ProductTrend {
  productId: number;
  name: string;
  brand: string;
  category: string;
  currentStock: number;
  salesVelocity: number; // Units sold per day
  daysUntilStockout: number;
  restockRecommendation: number;
  confidence: number; // 0-1 score of prediction confidence
  trend: 'rising' | 'stable' | 'declining';
  seasonalImpact: number; // -1 to 1 (negative means seasonal decline, positive means seasonal boost)
}

export interface TrendPredictionParams {
  categoryFilter?: string;
  daysToPredict?: number;
  minConfidence?: number;
  includeProducts?: number[];
  excludeProducts?: number[];
}

const DEFAULT_PARAMS: TrendPredictionParams = {
  daysToPredict: 30,
  minConfidence: 0.5
};

/**
 * Calculate inventory trends and predictions based on historical data
 */
export async function predictInventoryTrends(params: TrendPredictionParams = {}): Promise<ProductTrend[]> {
  // Merge default parameters with provided parameters
  const { 
    categoryFilter, 
    daysToPredict = DEFAULT_PARAMS.daysToPredict,
    minConfidence = DEFAULT_PARAMS.minConfidence,
    includeProducts,
    excludeProducts
  } = params;
  
  try {
    // Get all products
    let productsQuery = db.select().from(products);
    
    // Filter by category if provided
    if (categoryFilter) {
      productsQuery = productsQuery.where(eq(products.category, categoryFilter));
    }
    
    // Get all products
    const productsList = await productsQuery;
    
    // Get product sales data for the last 90 days
    const endDate = new Date();
    const startDate = subDays(endDate, 90);
    
    // Get all order items for the last 90 days
    const orderItemsList = await db.select({
      productId: orderItems.productId,
      quantity: orderItems.quantity,
      createdAt: orders.createdAt,
    })
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .where(
      and(
        gte(orders.createdAt, startDate),
        lte(orders.createdAt, endDate)
      )
    )
    .orderBy(desc(orders.createdAt));
    
    // Calculate sales velocity (units sold per day) for each product
    const salesVelocity: Record<number, number[]> = {};
    const trendDirection: Record<number, number[]> = {};
    
    // Group sales data by time periods (e.g., weeks)
    const periodDays = 7; // Use 7-day periods
    const numPeriods = Math.ceil(90 / periodDays);
    
    // Initialize data structures
    productsList.forEach(product => {
      salesVelocity[product.id] = Array(numPeriods).fill(0);
      trendDirection[product.id] = [];
    });
    
    // Populate sales data by period
    orderItemsList.forEach(item => {
      if (!item.createdAt) return;
      
      const daysSinceStart = Math.floor((endDate.getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      const periodIndex = Math.floor(daysSinceStart / periodDays);
      
      if (periodIndex >= 0 && periodIndex < numPeriods) {
        salesVelocity[item.productId][periodIndex] += item.quantity;
      }
    });
    
    // Calculate trend direction for each product
    productsList.forEach(product => {
      const velocities = salesVelocity[product.id];
      
      // Calculate average sales per day for each period
      const periodsWithSales = velocities.map(sales => sales / periodDays);
      
      // Calculate trend directions between consecutive periods
      for (let i = 0; i < periodsWithSales.length - 1; i++) {
        const currentPeriod = periodsWithSales[i];
        const nextPeriod = periodsWithSales[i + 1];
        
        if (currentPeriod === 0 && nextPeriod === 0) {
          trendDirection[product.id].push(0); // Stable (no sales)
        } else if (nextPeriod > currentPeriod) {
          trendDirection[product.id].push(1); // Rising
        } else if (nextPeriod < currentPeriod) {
          trendDirection[product.id].push(-1); // Declining
        } else {
          trendDirection[product.id].push(0); // Stable
        }
      }
    });
    
    // Calculate product trends and predictions
    const trends: ProductTrend[] = productsList.map(product => {
      // Skip products that are excluded
      if (excludeProducts?.includes(product.id)) {
        return null;
      }
      
      // Only include specific products if requested
      if (includeProducts && !includeProducts.includes(product.id)) {
        return null;
      }
      
      // Calculate overall sales velocity (units sold per day)
      const totalSales = salesVelocity[product.id].reduce((sum, sales) => sum + sales, 0);
      const avgDailySales = totalSales / 90; // Average over the 90-day period
      
      // Detect recent trends
      const recentTrends = trendDirection[product.id].slice(-3); // Look at the most recent 3 periods
      const trendSum = recentTrends.reduce((sum, trend) => sum + trend, 0);
      
      let trend: 'rising' | 'stable' | 'declining';
      if (trendSum > 0) {
        trend = 'rising';
      } else if (trendSum < 0) {
        trend = 'declining';
      } else {
        trend = 'stable';
      }
      
      // Calculate days until stockout based on current velocity
      const totalCurrentStock = (product.quantity || 0) + (product.storeQuantity || 0);
      const daysUntilStockout = avgDailySales > 0 
        ? Math.round(totalCurrentStock / avgDailySales)
        : 999; // If no sales, use a very large number
      
      // Calculate seasonal impact (if any)
      // In a real system, this would use historical data to identify seasonal patterns
      // For this demo, we'll use a simplified approach
      const month = new Date().getMonth();
      const seasonalImpact = calculateSeasonalImpact(product.category, month);
      
      // Adjust sales velocity for seasonal impact
      const adjustedSalesVelocity = avgDailySales * (1 + seasonalImpact);
      
      // Calculate restock recommendation
      const daysCoverage = daysToPredict || 30; // Default to 30 days if not specified
      const idealStock = Math.ceil(adjustedSalesVelocity * daysCoverage * 1.2); // 20% buffer
      const restockRecommendation = idealStock > totalCurrentStock 
        ? idealStock - totalCurrentStock 
        : 0;
      
      // Calculate confidence score
      const confidence = calculateConfidenceScore(
        totalSales,
        avgDailySales,
        recentTrends.length,
        Math.abs(seasonalImpact)
      );
      
      // Only include products with confidence above the minimum threshold
      if (confidence < minConfidence) {
        return null;
      }
      
      return {
        productId: product.id,
        name: product.name,
        brand: product.brand || 'Unknown',
        category: product.category,
        currentStock: totalCurrentStock,
        salesVelocity: parseFloat(avgDailySales.toFixed(2)),
        daysUntilStockout,
        restockRecommendation,
        confidence,
        trend,
        seasonalImpact
      };
    }).filter(Boolean) as ProductTrend[];
    
    // Sort trends by days until stockout (ascending) and confidence (descending)
    return trends.sort((a, b) => {
      // First prioritize low days until stockout
      if (a.daysUntilStockout !== b.daysUntilStockout) {
        return a.daysUntilStockout - b.daysUntilStockout;
      }
      // Then prioritize higher confidence
      return b.confidence - a.confidence;
    });
  } catch (error) {
    console.error('Error predicting inventory trends:', error);
    throw new Error(`Failed to predict inventory trends: ${(error as Error).message}`);
  }
}

/**
 * Get products that need attention based on trend analysis
 */
export async function getInventoryAlerts(): Promise<ProductTrend[]> {
  try {
    const allTrends = await predictInventoryTrends({
      minConfidence: 0.6, // Higher confidence threshold for alerts
    });
    
    // Filter for products that need attention:
    // 1. Low stock (< 14 days until stockout)
    // 2. High sales velocity but declining trend (potential issue)
    // 3. Rising trend but low stock (opportunity)
    const alerts = allTrends.filter(product => 
      product.daysUntilStockout < 14 || // Low stock
      (product.salesVelocity > 0.5 && product.trend === 'declining') || // Declining sales
      (product.trend === 'rising' && product.daysUntilStockout < 30) // Rising trend but low stock
    );
    
    // Sort alerts: first critical (low stock), then important (high velocity declining), then others
    return alerts.sort((a, b) => {
      // First, sort by days until stockout for critical items
      if (a.daysUntilStockout < 14 && b.daysUntilStockout < 14) {
        return a.daysUntilStockout - b.daysUntilStockout;
      }
      
      // If one is critical and the other isn't, prioritize critical
      if (a.daysUntilStockout < 14 && b.daysUntilStockout >= 14) return -1;
      if (b.daysUntilStockout < 14 && a.daysUntilStockout >= 14) return 1;
      
      // For non-critical items, prioritize by sales velocity and confidence
      return (b.salesVelocity * b.confidence) - (a.salesVelocity * a.confidence);
    });
  } catch (error) {
    console.error('Error getting inventory alerts:', error);
    throw new Error(`Failed to get inventory alerts: ${(error as Error).message}`);
  }
}

/**
 * Generate a restock plan based on trend predictions
 */
export async function generateRestockPlan(): Promise<{
  totalItems: number;
  totalEstimatedCost: number;
  recommendations: ProductTrend[];
}> {
  try {
    // Get trend predictions for next 30 days with higher confidence threshold
    const trends = await predictInventoryTrends({
      daysToPredict: 30,
      minConfidence: 0.7,
    });
    
    // Filter for products that need restocking
    const recommendations = trends
      .filter(product => product.restockRecommendation > 0)
      .sort((a, b) => b.restockRecommendation - a.restockRecommendation);
    
    // Calculate total items and estimated cost
    const totalItems = recommendations.reduce((sum, product) => sum + product.restockRecommendation, 0);
    
    // Estimate cost (in a real system, this would use cost prices, not retail prices)
    // Here we're assuming cost is 60% of retail price for demo purposes
    const getProductById = async (id: number) => {
      const [product] = await db.select().from(products).where(eq(products.id, id));
      return product;
    };
    
    let totalEstimatedCost = 0;
    for (const item of recommendations) {
      const product = await getProductById(item.productId);
      if (product) {
        // Estimate cost as 60% of retail price
        const estimatedCostPerUnit = product.price * 0.6;
        totalEstimatedCost += estimatedCostPerUnit * item.restockRecommendation;
      }
    }
    
    return {
      totalItems,
      totalEstimatedCost,
      recommendations
    };
  } catch (error) {
    console.error('Error generating restock plan:', error);
    throw new Error(`Failed to generate restock plan: ${(error as Error).message}`);
  }
}

/**
 * Calculate seasonal impact for a product category
 * Returns a value between -0.5 and 0.5 representing seasonal effect
 */
function calculateSeasonalImpact(category: string, month: number): number {
  // Simplified seasonal impact calculation
  // In a real system, this would use historical data analysis
  
  const seasons = {
    winter: [0, 1, 11], // Jan, Feb, Dec
    spring: [2, 3, 4],  // Mar, Apr, May
    summer: [5, 6, 7],  // Jun, Jul, Aug
    fall: [8, 9, 10]    // Sep, Oct, Nov
  };
  
  const currentSeason = Object.entries(seasons).find(([, months]) => 
    months.includes(month)
  )?.[0] || 'summer';
  
  // Different categories have different seasonal patterns
  const seasonalPatterns: Record<string, Record<string, number>> = {
    women: {
      winter: 0.3,  // Winter clothing boost
      spring: 0.2,  // Spring collection boost
      summer: 0.1,  // Summer sales
      fall: 0.4     // Fall collection boost
    },
    men: {
      winter: 0.3,
      spring: 0.1,
      summer: 0.1,
      fall: 0.3
    },
    bags: {
      winter: 0.2,
      spring: 0.3,
      summer: 0.2,
      fall: 0.4
    },
    jewelry: {
      winter: 0.4,  // Holiday gift boost
      spring: 0.1,
      summer: -0.1,
      fall: 0.2
    },
    accessories: {
      winter: 0.3,
      spring: 0.2,
      summer: 0.3,
      fall: 0.1
    }
  };
  
  // Default pattern if category isn't in our mapping
  const defaultPattern = {
    winter: 0.1,
    spring: 0.1,
    summer: 0.1,
    fall: 0.1
  };
  
  // Get the seasonal pattern for this category
  const pattern = seasonalPatterns[category.toLowerCase()] || defaultPattern;
  
  // Return the impact for the current season
  return pattern[currentSeason];
}

/**
 * Calculate confidence score for trend prediction (0-1)
 */
function calculateConfidenceScore(
  totalSales: number,
  avgDailySales: number,
  periodsWithData: number,
  seasonalImpactMagnitude: number
): number {
  // Factors affecting confidence:
  // 1. Total sales volume (more sales = more confidence)
  // 2. Consistency of sales (high variance = lower confidence)
  // 3. Amount of data available (more periods = more confidence)
  // 4. Seasonal impact (high impact = lower confidence in prediction)
  
  // Simplified for demo purposes:
  const salesVolumeFactor = Math.min(totalSales / 100, 1); // Cap at 1
  const periodsWithDataFactor = Math.min(periodsWithData / 10, 1); // Cap at 1
  const salesRateFactor = avgDailySales > 0.1 ? Math.min(avgDailySales / 2, 1) : 0.2; // Minimal sales rate gives some confidence
  const seasonalImpactFactor = 1 - (seasonalImpactMagnitude * 0.5); // Higher seasonal impact reduces confidence
  
  // Calculate weighted average
  const confidence = (
    salesVolumeFactor * 0.4 +
    periodsWithDataFactor * 0.3 +
    salesRateFactor * 0.2 +
    seasonalImpactFactor * 0.1
  );
  
  // Ensure confidence is between 0 and 1
  return Math.max(0, Math.min(1, parseFloat(confidence.toFixed(2))));
}