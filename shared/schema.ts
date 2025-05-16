import { pgTable, text, serial, integer, boolean, timestamp, json, doublePrecision, uniqueIndex, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  isAdmin: boolean("is_admin").default(false).notNull(),
  isMasterAdmin: boolean("is_master_admin").default(false).notNull(), // Master admin can manage other admins
  isSuperAdmin: boolean("is_super_admin").default(false).notNull(), // Super admin has highest privileges
  adminRole: text("admin_role").default("staff"), // 'super', 'master', 'manager', 'staff', etc.
  adminName: text("admin_name"), // For tracking admin performance
  adminSalesCount: integer("admin_sales_count").default(0), // Count of sales made by this admin
  salesTotal: doublePrecision("sales_total").default(0), // Total value of sales made by this admin
  orderProcessCount: integer("order_process_count").default(0), // Count of orders processed by this admin
  lastActive: timestamp("last_active"), // Last time the admin was active
  lastLogin: timestamp("last_login"), // Last time the admin logged in
  lastLogout: timestamp("last_logout"), // Last time the admin logged out
  createdBy: integer("created_by"), // ID of the admin who created this user (for admin accounts)
  createdAt: timestamp("created_at").defaultNow().notNull(), // When the admin account was created
  expiresAt: timestamp("expires_at"), // Optional expiration date for temporary admin accounts
  isActive: boolean("is_active").default(true).notNull(), // Whether the admin account is active
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  country: true,
  isAdmin: true,
  isMasterAdmin: true,
  isSuperAdmin: true,
  adminRole: true,
  adminName: true,
  adminSalesCount: true,
  salesTotal: true,
  orderProcessCount: true,
  lastActive: true,
  lastLogin: true,
  lastLogout: true,
  createdBy: true,
  createdAt: true,
  expiresAt: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  discountPrice: doublePrecision("discount_price"),
  discountPercentage: integer("discount_percentage"),
  discountEndDate: timestamp("discount_end_date"),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  brand: text("brand").notNull(),
  brandType: text("brand_type"), // "Luxury Brand", "Designer Collection", "Premium Menswear", "Fine Jewelry", "Haute Couture", "Modern Luxury"
  images: text("images").array().notNull(),
  colors: text("colors").array(),
  sizes: text("sizes").array(),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  specifications: json("specifications"),
  material: text("material"),
  careInstructions: text("care_instructions"),
  inStock: boolean("in_stock").default(true).notNull(),
  quantity: integer("quantity").default(0).notNull(),
  barcode: text("barcode").unique(), // Unique barcode for scanning
  sku: text("sku").unique(), // Stock Keeping Unit number
  inStoreAvailable: boolean("in_store_available").default(false), // Indicates if product is available in physical store
  storeQuantity: integer("store_quantity").default(0), // Quantity available in physical store
  featured: boolean("featured").default(false).notNull(),
  isNewArrival: boolean("is_new_arrival").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  discountPrice: true,
  discountPercentage: true,
  discountEndDate: true,
  category: true,
  subcategory: true,
  brand: true,
  brandType: true,
  images: true,
  colors: true,
  sizes: true,
  rating: true,
  reviewCount: true,
  specifications: true,
  material: true,
  careInstructions: true,
  inStock: true,
  quantity: true,
  featured: true,
  isNewArrival: true,
  barcode: true,
  sku: true,
  inStoreAvailable: true,
  storeQuantity: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart items schema
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").default(1).notNull(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  productId: true,
  quantity: true,
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Wishlist items schema
export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
});

export const insertWishlistItemSchema = createInsertSchema(wishlistItems).pick({
  userId: true,
  productId: true,
});

export type InsertWishlistItem = z.infer<typeof insertWishlistItemSchema>;
export type WishlistItem = typeof wishlistItems.$inferSelect;

// Order schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"), // Making this nullable for scanned orders
  totalAmount: doublePrecision("total_amount").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, shipped, delivered, cancelled
  paymentMethod: text("payment_method").notNull(), // paystack, flutterwave, cash, card, bank_transfer
  paymentStatus: text("payment_status").notNull().default("pending"), // pending, partially_paid, paid, failed, refunded
  shippingAddress: text("shipping_address").notNull(), // Changed from json to text for simplicity
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  expiryDate: timestamp("expiry_date"), // For 3-month retention policy
  trackingNumber: text("tracking_number"),
  courierName: text("courier_name"), // Name of shipping company (DHL, FedEx, etc.)
  courierTrackingUrl: text("courier_tracking_url"), // Direct link to courier tracking page
  deliveryStatus: text("delivery_status").default("processing"), // processing, in_transit, out_for_delivery, delivered
  estimatedDeliveryDate: timestamp("estimated_delivery_date"), // When the order is expected to be delivered
  notes: text("notes"),
  isArchived: boolean("is_archived").default(false).notNull(), // Flag for soft delete
  scannedImages: text("scanned_images").array(), // Store URLs to scanned images
  imageScan: text("image_scan"), // Single image scan URL for the primary order document
  adminCreated: boolean("admin_created").default(false), // Flag to indicate if admin created the order
  isInStorePurchase: boolean("is_in_store_purchase").default(false).notNull(), // Flag to distinguish in-store vs online purchases
  scanData: json("scan_data"), // JSON data extracted from scanned images
  customerName: text("customer_name"), // For guest/scanned orders
  customerEmail: text("customer_email"), // For guest/scanned orders
  customerPhone: text("customer_phone"), // For guest/scanned orders
  archived: boolean("archived").default(false).notNull(), // Whether the order is archived
  processingAdminId: integer("processing_admin_id").references(() => users.id), // Admin who processed this order
  processingAdminName: text("processing_admin_name"), // Admin name who processed this order
  lastNotificationSent: timestamp("last_notification_sent"), // For delivery notifications
  notificationCount: integer("notification_count").default(0), // Count of notifications sent
  
  // Payment integration fields
  paymentTransactionId: text("payment_transaction_id"), // Transaction ID from payment gateway
  paymentGateway: text("payment_gateway"), // paystack, flutterwave, etc.
  paymentReference: text("payment_reference"), // Reference number from payment gateway
  paymentReceiptUrl: text("payment_receipt_url"), // Link to payment receipt if available
  amountPaid: doublePrecision("amount_paid").default(0), // Amount already paid (for partial payments)
  balanceAmount: doublePrecision("balance_amount"), // Remaining amount to be paid
  nextPaymentDue: timestamp("next_payment_due"), // Date when next payment is due (for installments)
  
  // Shipment tracking fields
  lastUpdated: timestamp("last_updated"), // Last time tracking was updated
  shipmentEvents: json("shipment_events"), // Array of shipment status events
  
  // Discount and shipping fees
  discountAmount: doublePrecision("discount_amount").default(0), // Amount of discount applied
  discountCode: text("discount_code"), // Coupon code used
  shippingFee: doublePrecision("shipping_fee").default(0), // Shipping cost
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  totalAmount: true,
  status: true,
  paymentMethod: true,
  paymentStatus: true,
  shippingAddress: true,
  trackingNumber: true,
  courierName: true,
  courierTrackingUrl: true,
  deliveryStatus: true,
  estimatedDeliveryDate: true,
  notes: true,
  scannedImages: true,
  imageScan: true,
  adminCreated: true,
  isInStorePurchase: true,
  scanData: true,
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  archived: true,
  createdAt: true,
  updatedAt: true,
  expiryDate: true,
  processingAdminId: true,
  processingAdminName: true,
  lastNotificationSent: true,
  notificationCount: true,
  
  // Payment integration fields
  paymentTransactionId: true,
  paymentGateway: true, 
  paymentReference: true,
  paymentReceiptUrl: true,
  amountPaid: true,
  balanceAmount: true,
  nextPaymentDue: true,
  
  // Shipment tracking fields
  lastUpdated: true,
  shipmentEvents: true,
  
  // Discount and shipping fees
  discountAmount: true,
  discountCode: true,
  shippingFee: true,
  // Auto-generated fields handled by the database
  // isArchived: default(false) in schema
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items schema
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: doublePrecision("price").notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  quantity: true,
  price: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Coupon schema
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  discount: doublePrecision("discount").notNull(),
  isPercentage: boolean("is_percentage").default(true).notNull(),
  expiryDate: timestamp("expiry_date"),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertCouponSchema = createInsertSchema(coupons).pick({
  code: true,
  discount: true,
  isPercentage: true,
  expiryDate: true,
  isActive: true,
});

export type InsertCoupon = z.infer<typeof insertCouponSchema>;
export type Coupon = typeof coupons.$inferSelect;

// Temporary access tokens for in-store items
export const tempAccessTokens = pgTable("temp_access_tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdBy: integer("created_by").references(() => users.id).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  adminName: text("admin_name"), // Store the admin name for tracking performance
});

export const insertTempAccessTokenSchema = createInsertSchema(tempAccessTokens).pick({
  token: true,
  email: true,
  expiresAt: true,
  createdBy: true,
  adminName: true,
});

export type InsertTempAccessToken = z.infer<typeof insertTempAccessTokenSchema>;
export type TempAccessToken = typeof tempAccessTokens.$inferSelect;

// Deposits schema for walk-in customers making payments for in-store items
export const deposits = pgTable("deposits", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  customerId: integer("customer_id").references(() => users.id), // Optional - if customer has an account
  customerName: text("customer_name").notNull(), // Walk-in customer name
  customerEmail: text("customer_email"), // Optional customer email
  customerPhone: text("customer_phone").notNull(), // Customer phone for contact
  productId: integer("product_id").notNull().references(() => products.id), // The in-store product
  productName: text("product_name").notNull(), // Product name for reference
  totalPrice: doublePrecision("total_price").notNull(), // Total price of the product
  depositAmount: doublePrecision("deposit_amount").notNull(), // Amount paid as deposit
  remainingAmount: doublePrecision("remaining_amount").notNull(), // Amount still to be paid
  paymentMethod: text("payment_method").notNull(), // Method used for deposit payment
  depositDate: timestamp("deposit_date").defaultNow().notNull(), // When the deposit was made
  expectedPickupDate: timestamp("expected_pickup_date"), // When customer expects to pick up
  adminId: integer("admin_id").notNull().references(() => users.id), // Admin who processed the deposit
  adminName: text("admin_name").notNull(), // Admin name for easy reference
  notes: text("notes"), // Any special notes
  status: text("status").default("pending").notNull(), // pending, completed, cancelled, refunded 
  completedAt: timestamp("completed_at"), // When the sale was completed (remaining amount paid)
  refundedAt: timestamp("refunded_at"), // In case the deposit was refunded
  refundAmount: doublePrecision("refund_amount"), // Amount refunded if any
  refundReason: text("refund_reason"), // Reason for refund if any
});

export const insertDepositSchema = createInsertSchema(deposits).pick({
  customerId: true,
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  productId: true,
  productName: true,
  totalPrice: true,
  depositAmount: true,
  remainingAmount: true,
  paymentMethod: true,
  depositDate: true,
  expectedPickupDate: true,
  adminId: true,
  adminName: true,
  notes: true,
  status: true,
  completedAt: true,
  refundedAt: true,
  refundAmount: true,
  refundReason: true,
  // Auto-handled fields
  // createdAt: defaultNow
  // updatedAt: defaultNow
});

export type InsertDeposit = z.infer<typeof insertDepositSchema>;
export type Deposit = typeof deposits.$inferSelect;

// User addresses schema
export const userAddresses = pgTable("user_addresses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  addressType: text("address_type").notNull().default("shipping"), // shipping, billing, home, work, etc.
  isDefault: boolean("is_default").default(false),
  addressLine1: text("address_line_1").notNull(),
  addressLine2: text("address_line_2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  phoneNumber: text("phone_number"),
  recipientName: text("recipient_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserAddressSchema = createInsertSchema(userAddresses).pick({
  userId: true,
  addressType: true,
  isDefault: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  state: true,
  postalCode: true,
  country: true,
  phoneNumber: true,
  recipientName: true,
});

export type InsertUserAddress = z.infer<typeof insertUserAddressSchema>;
export type UserAddress = typeof userAddresses.$inferSelect;

// User payment methods schema
export const userPaymentMethods = pgTable("user_payment_methods", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  methodType: text("method_type").notNull(), // card, bank_account, paypal, etc.
  isDefault: boolean("is_default").default(false),
  cardNumber: text("card_number"), // Last 4 digits only
  cardType: text("card_type"), // visa, mastercard, etc.
  cardExpiry: text("card_expiry"), // MM/YY format
  cardholderName: text("cardholder_name"),
  bankName: text("bank_name"),
  accountNumber: text("account_number"), // Last 4 digits only
  accountName: text("account_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  nickname: text("nickname"), // User-defined name for this payment method
});

export const insertUserPaymentMethodSchema = createInsertSchema(userPaymentMethods).pick({
  userId: true,
  methodType: true,
  isDefault: true,
  cardNumber: true,
  cardType: true,
  cardExpiry: true,
  cardholderName: true,
  bankName: true,
  accountNumber: true,
  accountName: true,
  nickname: true,
});

export type InsertUserPaymentMethod = z.infer<typeof insertUserPaymentMethodSchema>;
export type UserPaymentMethod = typeof userPaymentMethods.$inferSelect;

// User notifications schema
export const userNotifications = pgTable("user_notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // order_update, promotion, system, etc.
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  relatedId: integer("related_id"), // e.g., orderId if it's about an order
  relatedType: text("related_type"), // e.g., "order", "product", etc.
  actionUrl: text("action_url"), // URL for the notification action
});

export const insertUserNotificationSchema = createInsertSchema(userNotifications).pick({
  userId: true,
  title: true,
  message: true,
  type: true,
  isRead: true,
  relatedId: true,
  relatedType: true,
  actionUrl: true,
});

export type InsertUserNotification = z.infer<typeof insertUserNotificationSchema>;
export type UserNotification = typeof userNotifications.$inferSelect;

// User settings schema
export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  emailNotifications: boolean("email_notifications").default(true),
  smsNotifications: boolean("sms_notifications").default(false),
  appNotifications: boolean("app_notifications").default(true),
  marketingEmails: boolean("marketing_emails").default(true),
  orderUpdates: boolean("order_updates").default(true),
  promotionAlerts: boolean("promotion_alerts").default(true),
  theme: text("theme").default("system"), // light, dark, system
  language: text("language").default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSettingSchema = createInsertSchema(userSettings).pick({
  userId: true,
  emailNotifications: true,
  smsNotifications: true,
  appNotifications: true,
  marketingEmails: true,
  orderUpdates: true,
  promotionAlerts: true,
  theme: true,
  language: true,
});

export type InsertUserSetting = z.infer<typeof insertUserSettingSchema>;
export type UserSetting = typeof userSettings.$inferSelect;

// Admin activity logs for super admin monitoring
export const adminActivityLogs = pgTable("admin_activity_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").notNull().references(() => users.id),
  adminName: text("admin_name").notNull(),
  activityType: text("activity_type").notNull(), // login, logout, order_processed, customer_created, product_added, etc.
  activityDetails: json("activity_details"), // Details of the activity
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  ipAddress: text("ip_address"), // IP address of the admin
  success: boolean("success").default(true).notNull(), // Whether the activity was successful
});

export const insertAdminActivityLogSchema = createInsertSchema(adminActivityLogs).pick({
  adminId: true,
  adminName: true,
  activityType: true,
  activityDetails: true,
  timestamp: true,
  ipAddress: true,
  success: true,
});

export type InsertAdminActivityLog = z.infer<typeof insertAdminActivityLogSchema>;
export type AdminActivityLog = typeof adminActivityLogs.$inferSelect;

// Admin sales performance tracking
export const adminSalesPerformance = pgTable("admin_sales_performance", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").notNull().references(() => users.id),
  adminName: text("admin_name").notNull(),
  date: timestamp("date").notNull(),
  salesCount: integer("sales_count").default(0).notNull(),
  salesTotal: doublePrecision("sales_total").default(0).notNull(),
  ordersProcessed: integer("orders_processed").default(0).notNull(),
  averageOrderValue: doublePrecision("average_order_value").default(0).notNull(),
  customersServed: integer("customers_served").default(0).notNull(),
});

export const insertAdminSalesPerformanceSchema = createInsertSchema(adminSalesPerformance).pick({
  adminId: true,
  adminName: true,
  date: true,
  salesCount: true,
  salesTotal: true,
  ordersProcessed: true,
  averageOrderValue: true,
  customersServed: true,
});

export type InsertAdminSalesPerformance = z.infer<typeof insertAdminSalesPerformanceSchema>;
export type AdminSalesPerformance = typeof adminSalesPerformance.$inferSelect;

// Visitor tracking schema for analytics
export const visitorStats = pgTable("visitor_stats", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(), // Daily statistics date
  pageVisits: json("page_visits").default({}), // JSON object with page_path: visit_count pairs
  totalVisits: integer("total_visits").default(0).notNull(), // Total number of visits
  uniqueVisitors: integer("unique_visitors").default(0).notNull(), // Number of unique visitors
  newVisitors: integer("new_visitors").default(0).notNull(), // First time visitors
  returningVisitors: integer("returning_visitors").default(0).notNull(), // Returning visitors
  visitSources: json("visit_sources").default({}), // JSON object with source: count pairs
  browsers: json("browsers").default({}), // Browser usage statistics
  devices: json("devices").default({}), // Device type statistics (mobile, tablet, desktop)
  countries: json("countries").default({}), // Country statistics
  convertedVisitors: integer("converted_visitors").default(0), // Visitors who made a purchase
  conversionRate: doublePrecision("conversion_rate").default(0), // Conversion rate percentage
  averageTimeOnSite: integer("average_time_on_site").default(0), // Average time on site in seconds
  bounceRate: doublePrecision("bounce_rate").default(0), // Bounce rate percentage
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Session tracking for individual visits
export const visitorSessions = pgTable("visitor_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(), // Unique session identifier
  userId: integer("user_id"), // If user is logged in
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"), // When session ended
  duration: integer("duration"), // Session duration in seconds
  ipAddress: text("ip_address"), // IP address of visitor
  userAgent: text("user_agent"), // User agent string
  browser: text("browser"), // Parsed browser name
  device: text("device"), // Device type (mobile, tablet, desktop)
  os: text("os"), // Operating system
  country: text("country"), // Country based on IP
  referrer: text("referrer"), // Where the visitor came from
  landingPage: text("landing_page").notNull(), // First page visited
  exitPage: text("exit_page"), // Last page visited
  pagesViewed: integer("pages_viewed").default(1), // Number of pages viewed in session
  isConverted: boolean("is_converted").default(false), // Did visitor make a purchase
  conversionValue: doublePrecision("conversion_value"), // Value of conversion if any
  deviceId: text("device_id"), // Pseudo-anonymous device identifier
  visitCount: integer("visit_count").default(1), // How many times this visitor has visited
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Real-time visitor tracking
export const activeVisitors = pgTable("active_visitors", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(), // Session identifier
  userId: integer("user_id"), // If visitor is logged in
  currentPage: text("current_page").notNull(), // Current page being viewed
  lastActivityTime: timestamp("last_activity_time").defaultNow().notNull(), // Last activity timestamp
  deviceId: text("device_id"), // Pseudo-anonymous device identifier
  ipAddress: text("ip_address"), // IP address of visitor
  userAgent: text("user_agent"), // User agent string
});

// Export schemas and types
export const insertVisitorStatsSchema = createInsertSchema(visitorStats).pick({
  date: true,
  pageVisits: true,
  totalVisits: true,
  uniqueVisitors: true,
  newVisitors: true,
  returningVisitors: true,
  visitSources: true,
  browsers: true,
  devices: true,
  countries: true,
  convertedVisitors: true,
  conversionRate: true,
  averageTimeOnSite: true,
  bounceRate: true,
});

export const insertVisitorSessionSchema = createInsertSchema(visitorSessions).pick({
  sessionId: true,
  userId: true,
  startTime: true,
  endTime: true,
  duration: true,
  ipAddress: true,
  userAgent: true,
  browser: true,
  device: true,
  os: true,
  country: true,
  referrer: true,
  landingPage: true,
  exitPage: true,
  pagesViewed: true,
  isConverted: true,
  conversionValue: true,
  deviceId: true,
  visitCount: true,
});

export const insertActiveVisitorSchema = createInsertSchema(activeVisitors).pick({
  sessionId: true,
  userId: true,
  currentPage: true,
  lastActivityTime: true,
  deviceId: true,
  ipAddress: true,
  userAgent: true,
});

export type InsertVisitorStats = z.infer<typeof insertVisitorStatsSchema>;
export type VisitorStats = typeof visitorStats.$inferSelect;

export type InsertVisitorSession = z.infer<typeof insertVisitorSessionSchema>;
export type VisitorSession = typeof visitorSessions.$inferSelect;

export type InsertActiveVisitor = z.infer<typeof insertActiveVisitorSchema>;
export type ActiveVisitor = typeof activeVisitors.$inferSelect;
