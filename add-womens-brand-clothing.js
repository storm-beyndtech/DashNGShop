/**
 * Script to add additional women's clothing products for all brands
 * Run using: node add-womens-brand-clothing.js
 */

import { storage } from './server/storage.js';

// Function to simulate login as admin
async function loginAdmin() {
  const admin = await storage.getUserByUsername('owner');
  console.log('Logged in as admin:', admin.username);
  return admin;
}

// List of reliable clothing image placeholders
const reliableImageUrls = [
  // Women's clothing images - modern and sophisticated
  "https://placehold.co/800x1100/f8f0e3/3d3d3d?text=Elegant+Dress",
  "https://placehold.co/800x1100/f5f5f5/3d3d3d?text=Designer+Blouse",
  "https://placehold.co/800x1100/e8e8e8/3d3d3d?text=Luxury+Skirt",
  "https://placehold.co/800x1100/f0e6e6/3d3d3d?text=Premium+Coat",
  "https://placehold.co/800x1100/e0e8e8/3d3d3d?text=Silk+Shirt",
  "https://placehold.co/800x1100/f8e0e0/3d3d3d?text=Evening+Gown",
  "https://placehold.co/800x1100/e0f0e0/3d3d3d?text=Cashmere+Sweater",
  "https://placehold.co/800x1100/e6e0f0/3d3d3d?text=Tailored+Pants",
  "https://placehold.co/800x1100/fff0d8/3d3d3d?text=Designer+Jacket",
  "https://placehold.co/800x1100/f0f0ff/3d3d3d?text=Silk+Blouse",
  "https://placehold.co/800x1100/fff0f0/3d3d3d?text=Formal+Jumpsuit",
  "https://placehold.co/800x1100/f0fff0/3d3d3d?text=Luxury+Cardigan",
  "https://placehold.co/800x1100/f0f8ff/3d3d3d?text=Pencil+Skirt",
  "https://placehold.co/800x1100/fff8f0/3d3d3d?text=Cotton+Tshirt",
  "https://placehold.co/800x1100/f8f8f8/3d3d3d?text=Designer+Jeans",
  
  // Additional product angles (front, back, side views)
  "https://placehold.co/800x1100/f8f0e3/3d3d3d?text=Front+View",
  "https://placehold.co/800x1100/f5f5f5/3d3d3d?text=Back+View",
  "https://placehold.co/800x1100/e8e8e8/3d3d3d?text=Side+View",
  "https://placehold.co/800x1100/f0e6e6/3d3d3d?text=Detail+View",
  "https://placehold.co/800x1100/e0e8e8/3d3d3d?text=Fabric+Detail"
];

// All brands from our store
const brands = [
  "Luxury Brand",
  "Designer Collection",
  "Classic Luxury",
  "Modern Luxury",
  "Haute Couture",
  "Eleganza",
  "Milano",
  "Savile Row",
  "Parisian Chic",
  "Maison Luxe",
  "Urban Premium",
  "Fine Jewelry",
  "Precision Timepieces",
  "Royal Gems",
  "Diamond Maison",
  "Coastal Luxe",
  "Riviera Style",
  "Eyewear Luxe",
  "Oceanic Gems"
];

// Additional women's clothing item templates
const womenClothingItems = [
  {
    name: "Silk Evening Gown",
    description: "Exquisite silk evening gown with delicate detailing and a flowing silhouette. Perfect for formal occasions and red carpet events.",
    price: 189500,
    discountPrice: 170550,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "100% Silk",
    colors: ["Black", "Burgundy", "Navy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Dry clean only. Store on padded hanger.",
    inStoreAvailable: true,
    storeQuantity: 8,
    quantity: 15,
    featured: true
  },
  {
    name: "Designer Tailored Blazer",
    description: "Precision-cut blazer crafted from premium wool blend with satin lining. Versatile style for both professional and evening wear.",
    price: 145000,
    discountPrice: 123250,
    discountPercentage: 15,
    category: "women",
    subcategory: "clothing",
    material: "Wool Blend",
    colors: ["Black", "White", "Camel", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Dry clean only. Keep buttoned when hanging.",
    inStoreAvailable: true,
    storeQuantity: 12,
    quantity: 25,
    featured: false
  },
  {
    name: "Cashmere Sweater",
    description: "Luxuriously soft cashmere sweater with ribbed trim. Lightweight yet warm, perfect for transitional seasons and layering.",
    price: 89000,
    discountPrice: 80100,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "100% Cashmere",
    colors: ["Cream", "Gray", "Blush", "Navy", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Hand wash cold or dry clean. Lay flat to dry.",
    inStoreAvailable: true,
    storeQuantity: 15,
    quantity: 30,
    featured: true
  },
  {
    name: "Silk Wide-Leg Trousers",
    description: "Elegant wide-leg trousers in flowing silk. High-waisted design with pleated front and invisible side zipper.",
    price: 110000,
    discountPrice: 99000,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "Silk Blend",
    colors: ["Black", "Ivory", "Sage Green", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Dry clean only. Iron on low heat if needed.",
    inStoreAvailable: true,
    storeQuantity: 10,
    quantity: 20,
    featured: false
  },
  {
    name: "Cotton Poplin Shirt Dress",
    description: "Refined shirt dress in crisp cotton poplin. Features a belted waist, button front, and midi length for versatile styling.",
    price: 95000,
    discountPrice: 85500,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "100% Cotton",
    colors: ["White", "Light Blue", "Blush", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Machine wash cold. Tumble dry low. Iron if needed.",
    inStoreAvailable: true,
    storeQuantity: 14,
    quantity: 25,
    featured: true
  },
  {
    name: "Merino Wool Cardigan",
    description: "Lightweight merino wool cardigan with pearl buttons. Breathable, temperature-regulating, and perfect for year-round wear.",
    price: 78500,
    discountPrice: 70650,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "100% Merino Wool",
    colors: ["Navy", "Gray", "Burgundy", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Hand wash cold or dry clean. Lay flat to dry.",
    inStoreAvailable: true,
    storeQuantity: 12,
    quantity: 22,
    featured: false
  },
  {
    name: "Pencil Skirt",
    description: "Classic pencil skirt in a wool blend with stretch for comfort. Features a back vent and invisible zipper closure.",
    price: 68000,
    discountPrice: 61200,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "Wool Blend with Stretch",
    colors: ["Black", "Navy", "Gray", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Dry clean only. Iron on medium heat if needed.",
    inStoreAvailable: true,
    storeQuantity: 15,
    quantity: 25,
    featured: false
  },
  {
    name: "Silk Blouse",
    description: "Timeless silk blouse with a relaxed fit and hidden button front. Elegant drape and lustrous finish for effortless sophistication.",
    price: 75000,
    discountPrice: 67500,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "100% Silk",
    colors: ["Ivory", "Black", "Blush", "Navy", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Dry clean only. Cool iron if needed.",
    inStoreAvailable: true,
    storeQuantity: 18,
    quantity: 30,
    featured: true
  },
  {
    name: "Tailored Wool Trousers",
    description: "Impeccably tailored wool trousers with straight leg and front crease. Versatile piece for professional and formal occasions.",
    price: 92000,
    discountPrice: 82800,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "Italian Wool",
    colors: ["Black", "Navy", "Gray", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Dry clean only. Iron on medium heat if needed.",
    inStoreAvailable: true,
    storeQuantity: 10,
    quantity: 20,
    featured: false
  },
  {
    name: "Knit Wrap Dress",
    description: "Elegant wrap dress in a comfortable stretch knit. Flattering silhouette with adjustable tie and V-neckline.",
    price: 85000,
    discountPrice: 76500,
    discountPercentage: 10,
    category: "women",
    subcategory: "clothing",
    material: "Stretch Knit Blend",
    colors: ["Black", "Navy", "Burgundy", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    care_instructions: "Hand wash cold or dry clean. Lay flat to dry.",
    inStoreAvailable: true,
    storeQuantity: 12,
    quantity: 24,
    featured: true
  }
];

// Function to get a random subset of images
function getRandomImages() {
  // Get 2-5 random images from the reliableImageUrls array
  const numImages = Math.floor(Math.random() * 4) + 2; // 2 to 5 images
  const shuffled = [...reliableImageUrls].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numImages);
}

// Function to generate product SKU
function generateSKU(brand, name) {
  const brandPrefix = brand.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const namePrefix = name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${brandPrefix}-${namePrefix}-${randomNum}`;
}

// Function to generate product barcode
function generateBarcode() {
  return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}

// Function to add products
async function addProducts() {
  try {
    // Login as admin
    const admin = await loginAdmin();
    
    // Keep track of how many products added successfully
    let addedCount = 0;
    
    // For each brand, add some women's clothing items
    for (const brand of brands) {
      console.log(`Adding women's clothing for brand: ${brand}`);
      
      // For each brand, add 2-3 random clothing items
      const numItemsToAdd = Math.floor(Math.random() * 2) + 2; // 2-3 items per brand
      
      for (let i = 0; i < numItemsToAdd; i++) {
        // Randomly select a clothing item template
        const itemTemplate = womenClothingItems[Math.floor(Math.random() * womenClothingItems.length)];
        
        // Create a copy of the template to customize
        const newItem = { ...itemTemplate };
        
        // Set unique fields
        newItem.brand = brand;
        newItem.brandType = brand.toLowerCase().includes('luxury') ? 'luxury' : 'premium';
        newItem.sku = generateSKU(brand, newItem.name);
        newItem.barcode = generateBarcode();
        newItem.images = getRandomImages();
        
        // Slightly randomize price if needed
        if (Math.random() > 0.5) {
          const priceAdjustment = (Math.random() * 0.2) - 0.1; // -10% to +10%
          newItem.price = Math.round(newItem.price * (1 + priceAdjustment));
          newItem.discountPrice = Math.round(newItem.price * (1 - (newItem.discountPercentage / 100)));
        }
        
        // Set specifications
        newItem.specifications = {
          "Material": newItem.material,
          "Care": newItem.care_instructions,
          "Origin": ["Italy", "France", "UK", "USA"][Math.floor(Math.random() * 4)],
          "Season": ["Spring/Summer", "Fall/Winter", "All Season"][Math.floor(Math.random() * 3)]
        };
        
        // Set rating
        newItem.rating = 4 + Math.random(); // 4.0 to 5.0
        newItem.review_count = Math.floor(Math.random() * 50) + 10; // 10-60 reviews
        
        // Set discount end date
        newItem.discountEndDate = new Date(Date.now() + (Math.floor(Math.random() * 30) + 5) * 24 * 60 * 60 * 1000); // 5-35 days from now
        
        // Set new arrival flag
        newItem.is_new_arrival = Math.random() > 0.7; // 30% chance of being a new arrival
        
        // Add product
        const addedProduct = await storage.createProduct(newItem);
        console.log(`Added product: ${addedProduct.name} (${addedProduct.brand})`);
        addedCount++;
      }
    }
    
    console.log(`Successfully added ${addedCount} women's clothing products for all brands.`);
    
  } catch (error) {
    console.error('Error adding products:', error);
  }
}

// Run the function
addProducts().catch(error => {
  console.error('Error running script:', error);
});

// Add export for ES modules
export { addProducts };