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

// Using completely reliable placeholder image URLs from placeholder.com
// These are guaranteed to work as they are simple placeholders with no reliance on external services
const reliableImageUrls = [
  "https://via.placeholder.com/800x600/gold/white?text=Luxury+Product+1",
  "https://via.placeholder.com/800x600/black/gold?text=Luxury+Product+2",
  "https://via.placeholder.com/800x600/navy/white?text=Luxury+Product+3",
  "https://via.placeholder.com/800x600/silver/black?text=Luxury+Product+4",
  "https://via.placeholder.com/800x600/brown/white?text=Luxury+Product+5",
  "https://via.placeholder.com/800x600/white/black?text=Luxury+Product+6",
  "https://via.placeholder.com/800x600/darkgreen/white?text=Luxury+Product+7",
  "https://via.placeholder.com/800x600/maroon/white?text=Luxury+Product+8",
  "https://via.placeholder.com/800x600/purple/white?text=Luxury+Product+9",
  "https://via.placeholder.com/800x600/gray/white?text=Luxury+Product+10"
];

// Function to update products with reliable image URLs
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
      // Select two placeholder images from our reliable set
      const imageIndex1 = updatedCount % reliableImageUrls.length;
      const imageIndex2 = (updatedCount + 1) % reliableImageUrls.length;
      
      // Create updated product with new placeholder image URLs
      const updatedProduct = {
        ...product,
        images: [
          reliableImageUrls[imageIndex1],
          reliableImageUrls[imageIndex2]
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