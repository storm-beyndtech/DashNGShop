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

// Placeholder image URLs that are guaranteed to work - using direct links to public Unsplash photos
const workingImageUrls = [
  "https://images.unsplash.com/photo-1560343090-f0409e92791a",
  "https://images.unsplash.com/photo-1479064555552-3ef4979f8908",
  "https://images.unsplash.com/photo-1513094735237-8f2714d57c13",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "https://images.unsplash.com/photo-1560343776-97e7d202ff0e",
  "https://images.unsplash.com/photo-1594223274512-ad4200e99e81",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  "https://images.unsplash.com/photo-1587467512961-120760940315",
  "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5",
  "https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1",
  "https://images.unsplash.com/photo-1543282687-1b1a61df3a13",
  "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
  "https://images.unsplash.com/photo-1547949003-9792a18a2601",
  "https://images.unsplash.com/photo-1611601322175-ef8ec8c85e01",
  "https://images.unsplash.com/photo-1580651315530-69c8e0903883",
  "https://images.unsplash.com/photo-1581044777550-4cfa60707c6c",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  "https://images.unsplash.com/photo-1554141220-83411835a60b",
  "https://images.unsplash.com/photo-1551489186-cf8726f514f8",
  "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
  "https://images.unsplash.com/photo-1509631179407-a6920e8d64f7"
];

// Add more working image URLs for jewelry and luxury items
const jewelryImages = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
  "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1",
  "https://images.unsplash.com/photo-1608672790994-bf6b332ff749",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
  "https://images.unsplash.com/photo-1561828995-aa79a2db86dd",
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e",
  "https://images.unsplash.com/photo-1602752250015-52645cc94456",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
];

// Add more working image URLs for fashion apparel
const fashionImages = [
  "https://images.unsplash.com/photo-1591369822096-ffd140ec948f",
  "https://images.unsplash.com/photo-1598554747436-c9293d6a588f",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
  "https://images.unsplash.com/photo-1525450824786-227cbef70703",
  "https://images.unsplash.com/photo-1576062059486-7ea3bcba5307",
  "https://images.unsplash.com/photo-1571513722275-4b41940f54b8",
  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
  "https://images.unsplash.com/photo-1594938328870-9623159c8c99",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68",
  "https://images.unsplash.com/photo-1578932750294-f5075e85f702"
];

// Add more working image URLs for luxury home goods
const homeImages = [
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab",
  "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
  "https://images.unsplash.com/photo-1540932239986-30128078f3c5",
  "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
  "https://images.unsplash.com/photo-1592789705501-f9ae4287c4cf",
  "https://images.unsplash.com/photo-1532247358838-8917db3e2557",
  "https://images.unsplash.com/photo-1526308182272-d2fe5e5947d8",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
];

// Combine all image URLs
const allImageUrls = [...workingImageUrls, ...jewelryImages, ...fashionImages, ...homeImages];

// Function to update products with working image URLs
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
      // Generate 2 random image URLs for this product
      const randomImageUrl1 = allImageUrls[Math.floor(Math.random() * allImageUrls.length)];
      const randomImageUrl2 = allImageUrls[Math.floor(Math.random() * allImageUrls.length)];
      
      // Create updated product with new image URLs
      const updatedProduct = {
        ...product,
        images: [randomImageUrl1, randomImageUrl2]
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