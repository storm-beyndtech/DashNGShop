import fetch from 'node-fetch';

// Function to login and get cookie
async function loginAdmin() {
  try {
    const loginResponse = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "owner",
        password: "DashOwner#"
      }),
    });
    
    if (!loginResponse.ok) {
      throw new Error(`Failed to login: ${loginResponse.statusText}`);
    }
    
    // Get the cookie from the response
    const setCookieHeader = loginResponse.headers.get('set-cookie');
    console.log("Login successful, got authentication cookie");
    return setCookieHeader;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
}

// Define highly reliable image URLs - using Picsum's static/seed images
// These URLs use a static seed parameter which ensures the image is always the same
const luxuryProductImages = [
  "https://picsum.photos/seed/luxury1/800/600",
  "https://picsum.photos/seed/luxury2/800/600",
  "https://picsum.photos/seed/luxury3/800/600",
  "https://picsum.photos/seed/luxury4/800/600",
  "https://picsum.photos/seed/luxury5/800/600",
  "https://picsum.photos/seed/luxury6/800/600",
  "https://picsum.photos/seed/luxury7/800/600",
  "https://picsum.photos/seed/luxury8/800/600",
  "https://picsum.photos/seed/luxury9/800/600",
  "https://picsum.photos/seed/luxury10/800/600",
  "https://picsum.photos/seed/luxury11/800/600",
  "https://picsum.photos/seed/luxury12/800/600",
  "https://picsum.photos/seed/luxury13/800/600",
  "https://picsum.photos/seed/luxury14/800/600",
  "https://picsum.photos/seed/luxury15/800/600"
];

// Backup URLs in case the above ones fail
const backupImages = [
  "https://placehold.co/800x600/gold/white?text=Product+1",
  "https://placehold.co/800x600/black/gold?text=Product+2",
  "https://placehold.co/800x600/navy/white?text=Product+3",
  "https://placehold.co/800x600/silver/black?text=Product+4",
  "https://placehold.co/800x600/brown/white?text=Product+5",
  "https://placehold.co/800x600/white/black?text=Product+6",
  "https://placehold.co/800x600/darkgreen/white?text=Product+7",
  "https://placehold.co/800x600/maroon/white?text=Product+8",
  "https://placehold.co/800x600/purple/white?text=Product+9",
  "https://placehold.co/800x600/gray/white?text=Product+10",
  "https://placehold.co/800x600/darkblue/gold?text=Luxury",
  "https://placehold.co/800x600/black/silver?text=Fashion",
  "https://placehold.co/800x600/darkred/white?text=Elegant",
  "https://placehold.co/800x600/darkpurple/gold?text=Premium",
  "https://placehold.co/800x600/black/gold?text=High-End"
];

// Function to update all products with reliable image URLs
async function fixProductImages() {
  // Login first to get cookie
  const cookie = await loginAdmin();
  
  try {
    // Get all products
    const productsResponse = await fetch('http://localhost:5000/api/products', {
      headers: {
        'Cookie': cookie
      }
    });
    
    if (!productsResponse.ok) {
      throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
    }
    
    const products = await productsResponse.json();
    console.log(`Fetched ${products.length} products to update images`);
    
    // For each product, update the images with working URLs
    let updatedCount = 0;
    
    for (const product of products) {
      // Select two images for this product - one from each set for better reliability
      const imageIndex1 = updatedCount % luxuryProductImages.length;
      const imageIndex2 = updatedCount % backupImages.length;
      
      // Create updated product with new image URLs
      const updatedProduct = {
        ...product,
        images: [
          luxuryProductImages[imageIndex1],
          backupImages[imageIndex2]
        ]
      };
      
      // Update the product
      const updateResponse = await fetch(`http://localhost:5000/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie
        },
        body: JSON.stringify(updatedProduct)
      });
      
      if (!updateResponse.ok) {
        console.error(`Failed to update product ${product.id}: ${updateResponse.statusText}`);
        continue;
      }
      
      updatedCount++;
      if (updatedCount % 10 === 0) {
        console.log(`Updated ${updatedCount}/${products.length} products`);
      }
    }
    
    console.log(`Successfully updated images for ${updatedCount}/${products.length} products`);
  } catch (error) {
    console.error("Error updating product images:", error.message);
  }
}

// Execute the function
fixProductImages().catch(console.error);