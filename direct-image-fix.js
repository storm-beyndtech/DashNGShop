// Direct product image fix script - updates product images directly in storage
// This script should be run once to ensure all product images are fixed

const { storage } = require('./server/storage');

// Define our set of reliable image URLs
const reliableImageUrls = [
  // Placeholder.co (highly reliable placeholder service)
  "https://placehold.co/800x600/gold/black?text=Luxury+Fashion",
  "https://placehold.co/800x600/black/gold?text=Premium+Collection",
  "https://placehold.co/800x600/silver/black?text=Elegant+Style",
  "https://placehold.co/800x600/navy/white?text=Designer+Piece",
  "https://placehold.co/800x600/maroon/white?text=Classic+Design",
  "https://placehold.co/800x600/darkgreen/gold?text=Timeless+Fashion",
  "https://placehold.co/800x600/brown/white?text=Signature+Line",
  "https://placehold.co/800x600/black/silver?text=High+End",
  "https://placehold.co/800x600/darkblue/white?text=Limited+Edition",
  "https://placehold.co/800x600/darkred/gold?text=Exclusive+Design",
  "https://placehold.co/800x600/black/white?text=Fashion+Forward",
  "https://placehold.co/800x600/gray/white?text=Modern+Classic",
  "https://placehold.co/800x600/purple/white?text=Bold+Statement",
  "https://placehold.co/800x600/teal/white?text=Urban+Luxury",
  "https://placehold.co/800x600/orange/black?text=Seasonal+Collection",
];

// Another set of reliable image URLs as backups
const backupImageUrls = [
  // Placeholder.jp (another reliable placeholder service)
  "https://placekitten.com/800/600",
  "https://placekitten.com/801/600",
  "https://placekitten.com/802/601",
  "https://placekitten.com/803/602",
  "https://placekitten.com/804/603",
  "https://placekitten.com/805/604",
  "https://placekitten.com/806/605",
  "https://placekitten.com/807/606",
  "https://placekitten.com/808/607",
  "https://placekitten.com/809/608",
  "https://placekitten.com/810/609",
  "https://placekitten.com/811/610",
  "https://placekitten.com/812/611",
  "https://placekitten.com/813/612",
  "https://placekitten.com/814/613",
];

// Function to fix product images
async function fixProductImages() {
  try {
    // Get all products
    const products = await storage.getProducts();
    console.log(`Found ${products.length} products that need image fixes`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      // Select two images for this product (one from each set for redundancy)
      const imageIndex1 = updatedCount % reliableImageUrls.length;
      const imageIndex2 = updatedCount % backupImageUrls.length;
      
      // Update product with new reliable image URLs
      const updatedProduct = await storage.updateProduct(product.id, {
        images: [
          reliableImageUrls[imageIndex1], 
          backupImageUrls[imageIndex2]
        ]
      });
      
      if (updatedProduct) {
        updatedCount++;
        if (updatedCount % 10 === 0) {
          console.log(`Updated ${updatedCount}/${products.length} products`);
        }
      } else {
        console.error(`Failed to update product ${product.id}`);
      }
    }
    
    console.log(`Successfully updated images for ${updatedCount}/${products.length} products`);
  } catch (error) {
    console.error("Error updating product images:", error);
  }
}

// Execute the function
fixProductImages()
  .then(() => console.log("Image update process complete"))
  .catch(error => console.error("Fatal error during image update:", error));