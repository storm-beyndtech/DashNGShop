import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Women's Clothing Products
const womensClothing = [
  {
    name: "Silk Ruffle Blouse",
    description: "Elegant silk blouse with intricate ruffle details, perfect for both professional and evening settings. Made from 100% mulberry silk for a luxurious feel and appearance.",
    price: 245.99,
    category: "women",
    subcategory: "clothing",
    brand: "Eleganza",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000",
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 58,
    material: "100% Silk",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 42,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Cashmere Turtleneck Sweater",
    description: "Luxuriously soft cashmere turtleneck sweater that provides exceptional warmth without bulk. Perfect for layering during cooler months.",
    price: 389.00,
    category: "women",
    subcategory: "clothing",
    brand: "Milano",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
      "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=1000"
    ],
    colors: ["Camel", "Charcoal", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 126,
    material: "100% Cashmere",
    careInstructions: "Hand wash cold or dry clean",
    inStock: true,
    quantity: 36,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Tailored Wool Trousers",
    description: "Impeccably tailored wool trousers with a contemporary straight leg cut. Features invisible side zip and elegant front pleats.",
    price: 320.00,
    category: "women",
    subcategory: "clothing",
    brand: "Savile Row",
    brandType: "Premium Womenswear",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000"
    ],
    colors: ["Black", "Navy", "Grey"],
    sizes: ["0", "2", "4", "6", "8", "10", "12", "14"],
    rating: 4.7,
    reviewCount: 84,
    material: "95% Wool, 5% Elastane",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Pleated Maxi Skirt",
    description: "Elegant pleated maxi skirt crafted from flowing satin for a beautiful drape and movement. Features a comfortable elastic waistband and falls to ankle length.",
    price: 275.00,
    discountPrice: 220.00,
    discountPercentage: 20,
    category: "women",
    subcategory: "clothing",
    brand: "Parisian Chic",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1573878415613-fe2a3f769de8?q=80&w=1000",
      "https://images.unsplash.com/photo-1551163943-3f7053a9fad8?q=80&w=1000"
    ],
    colors: ["Emerald", "Ruby", "Sapphire Blue"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.6,
    reviewCount: 42,
    material: "100% Satin Polyester",
    careInstructions: "Machine wash gentle cycle cold",
    inStock: true,
    quantity: 23,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Structured Blazer Dress",
    description: "Sophisticated blazer dress with structured shoulders and a nipped waist. Double-breasted with gold buttons for a touch of glamour.",
    price: 499.00,
    category: "women",
    subcategory: "clothing",
    brand: "Haute Couture",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1548778943-5bbeeb1ba6c1?q=80&w=1000",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1000"
    ],
    colors: ["Black", "White", "Red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 64,
    material: "96% Polyester, 4% Elastane",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  }
];

// Women's Bags Products
const womensBags = [
  {
    name: "Quilted Leather Crossbody",
    description: "Timeless quilted leather crossbody bag with adjustable chain strap and signature twist lock closure. Crafted from buttery soft lambskin.",
    price: 1950.00,
    category: "women",
    subcategory: "bags",
    brand: "Maison Luxe",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000"
    ],
    colors: ["Black", "Beige", "Red"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 189,
    material: "100% Lambskin Leather",
    careInstructions: "Wipe with soft cloth",
    inStock: true,
    quantity: 15,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Structured Top Handle Bag",
    description: "Elegant structured top handle bag with removable shoulder strap. Features gold-tone hardware and a spacious interior with multiple compartments.",
    price: 1750.00,
    category: "women",
    subcategory: "bags",
    brand: "Milano",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1591561954555-607968c989ab?q=80&w=1000",
      "https://images.unsplash.com/photo-1614179689702-66d0fef4da19?q=80&w=1000"
    ],
    colors: ["Cognac", "Black", "Navy"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 143,
    material: "Premium Calfskin",
    careInstructions: "Store in dust bag when not in use",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Woven Raffia Tote",
    description: "Artisanal woven raffia tote with leather handles and trim. Perfect blend of casual elegance for summer days.",
    price: 890.00,
    discountPrice: 712.00,
    discountPercentage: 20,
    category: "women",
    subcategory: "bags",
    brand: "Coastal Luxe",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000",
      "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?q=80&w=1000"
    ],
    colors: ["Natural", "Black/Natural"],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 87,
    material: "Raffia, Calfskin Leather",
    careInstructions: "Avoid exposure to water",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Suede Bucket Bag",
    description: "Luxurious suede bucket bag with drawstring closure and removable leather crossbody strap. Lined with soft microsuede.",
    price: 1290.00,
    category: "women",
    subcategory: "bags",
    brand: "Parisian Chic",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1596149615493-f0739de31c2d?q=80&w=1000",
      "https://images.unsplash.com/photo-1619627826693-8f0b1cf85b14?q=80&w=1000"
    ],
    colors: ["Taupe", "Black", "Burgundy"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 76,
    material: "100% Suede, Leather trim",
    careInstructions: "Professional leather cleaning only",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Embellished Evening Clutch",
    description: "Exquisite evening clutch featuring hand-applied crystal embellishments. Includes a delicate chain strap that can be tucked inside.",
    price: 2450.00,
    category: "women",
    subcategory: "bags",
    brand: "Haute Couture",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1566150902887-9679ecc155ba?q=80&w=1000",
      "https://images.unsplash.com/photo-1575821539030-043877ab6e68?q=80&w=1000"
    ],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 52,
    material: "Satin, Crystal embellishments",
    careInstructions: "Handle with care, store in box",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  }
];

// Women's Jewelry Products
const womensJewelry = [
  {
    name: "Diamond Tennis Bracelet",
    description: "Timeless diamond tennis bracelet featuring 5 carats of round brilliant diamonds set in 18K white gold. A true investment piece.",
    price: 12500.00,
    category: "women",
    subcategory: "jewelry",
    brand: "Diamond Maison",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["White Gold"],
    sizes: ["7 inches", "7.5 inches"],
    rating: 4.9,
    reviewCount: 34,
    material: "18K White Gold, Diamonds",
    careInstructions: "Professional jewelry cleaning recommended",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Pearl Drop Earrings",
    description: "Elegant pearl drop earrings featuring South Sea pearls suspended from diamond-encrusted 18K gold posts.",
    price: 4850.00,
    category: "women",
    subcategory: "jewelry",
    brand: "Oceanic Gems",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1000",
      "https://images.unsplash.com/photo-1630019852942-7a3660aa7fb2?q=80&w=1000"
    ],
    colors: ["Gold/White Pearl"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 46,
    material: "18K Gold, South Sea Pearls, Diamonds",
    careInstructions: "Store separately, avoid contact with perfumes",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Emerald Statement Ring",
    description: "Breathtaking statement ring featuring a 3-carat Colombian emerald surrounded by a halo of diamonds set in platinum.",
    price: 18900.00,
    category: "women",
    subcategory: "jewelry",
    brand: "Royal Gems",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=1000"
    ],
    colors: ["Platinum/Emerald"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 4.9,
    reviewCount: 21,
    material: "Platinum, Emerald, Diamonds",
    careInstructions: "Professional cleaning only, avoid impact",
    inStock: true,
    quantity: 3,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Gold Chain Necklace",
    description: "Versatile 18K gold chain necklace featuring an adjustable length and lobster clasp closure. A modern everyday essential.",
    price: 3250.00,
    discountPrice: 2762.50,
    discountPercentage: 15,
    category: "women",
    subcategory: "jewelry",
    brand: "Milano",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000"
    ],
    colors: ["Gold"],
    sizes: ["16-18 inches adjustable"],
    rating: 4.7,
    reviewCount: 82,
    material: "18K Gold",
    careInstructions: "Polish with soft jewelry cloth",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Diamond Stud Earrings",
    description: "Classic diamond stud earrings featuring a total of 2 carats of round brilliant diamonds set in platinum four-prong settings.",
    price: 8950.00,
    category: "women",
    subcategory: "jewelry",
    brand: "Diamond Maison",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1589207212797-cfd06489ad76?q=80&w=1000",
      "https://images.unsplash.com/photo-1626784215021-2e39ccf972ae?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 118,
    material: "Platinum, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: false
  }
];

// Women's Accessories Products
const womensAccessories = [
  {
    name: "Silk Twill Scarf",
    description: "Luxurious silk twill scarf featuring a signature equestrian print in vibrant colors. Hand-rolled edges for a refined finish.",
    price: 450.00,
    category: "women",
    subcategory: "accessories",
    brand: "Parisian Chic",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1583534069808-ca13a28a6b25?q=80&w=1000",
      "https://images.unsplash.com/photo-1602522797324-5c9e5f7ff9c0?q=80&w=1000"
    ],
    colors: ["Multicolor Blue", "Multicolor Red", "Multicolor Green"],
    sizes: ["36\" x 36\""],
    rating: 4.8,
    reviewCount: 143,
    material: "100% Silk Twill",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 25,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Leather Gloves",
    description: "Exquisite leather gloves crafted from supple lambskin and lined with cashmere for exceptional warmth and comfort.",
    price: 325.00,
    category: "women",
    subcategory: "accessories",
    brand: "Milano",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1607611439230-fcbf50e42f4c?q=80&w=1000",
      "https://images.unsplash.com/photo-1594223274512-ad4200e99e81?q=80&w=1000"
    ],
    colors: ["Black", "Brown", "Burgundy"],
    sizes: ["6.5", "7", "7.5", "8"],
    rating: 4.7,
    reviewCount: 86,
    material: "Lambskin Leather, Cashmere Lining",
    careInstructions: "Professional leather cleaning only",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Oversized Sunglasses",
    description: "Statement oversized sunglasses with gradient lenses and acetate frames. Offers 100% UV protection.",
    price: 375.00,
    discountPrice: 300.00,
    discountPercentage: 20,
    category: "women",
    subcategory: "accessories",
    brand: "Eyewear Luxe",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000",
      "https://images.unsplash.com/photo-1602699985953-5d0ef0dfbdb7?q=80&w=1000"
    ],
    colors: ["Tortoise", "Black", "Havana"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 107,
    material: "Acetate, Gradient CR-39 Lenses",
    careInstructions: "Clean with microfiber cloth, store in case",
    inStock: true,
    quantity: 22,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Wide-Brim Straw Hat",
    description: "Elegantly crafted wide-brim straw hat with grosgrain ribbon trim. Perfect for sun protection with timeless style.",
    price: 395.00,
    category: "women",
    subcategory: "accessories",
    brand: "Riviera Style",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=1000",
      "https://images.unsplash.com/photo-1553591465-aa3a1ff902be?q=80&w=1000"
    ],
    colors: ["Natural", "Black/Natural"],
    sizes: ["S/M", "M/L"],
    rating: 4.5,
    reviewCount: 54,
    material: "Woven Straw, Grosgrain Ribbon",
    careInstructions: "Spot clean only, store in hat box",
    inStock: true,
    quantity: 15,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Leather Belt with Gold Buckle",
    description: "Luxurious leather belt featuring a signature gold-tone buckle. Handcrafted from the finest calfskin leather.",
    price: 495.00,
    category: "women",
    subcategory: "accessories",
    brand: "Maison Luxe",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1511453606184-2c29b238ffc3?q=80&w=1000",
      "https://images.unsplash.com/photo-1624378439575-d8705ad01dce?q=80&w=1000"
    ],
    colors: ["Black", "Tan", "White"],
    sizes: ["70cm", "75cm", "80cm", "85cm", "90cm"],
    rating: 4.7,
    reviewCount: 68,
    material: "Calfskin Leather, Metal Hardware",
    careInstructions: "Wipe with soft cloth",
    inStock: true,
    quantity: 20,
    featured: true,
    isNewArrival: false
  }
];

// Combine all women's products
const allWomensProducts = [
  ...womensClothing,
  ...womensBags,
  ...womensJewelry,
  ...womensAccessories
];

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

// Function to add products
async function addProducts() {
  // Login first to get cookie
  const cookie = await loginAdmin();
  
  for (const product of allWomensProducts) {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to add product ${product.name}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log(`Added product: ${result.name} (ID: ${result.id})`);
    } catch (error) {
      console.error(`Error adding product ${product.name}:`, error.message);
    }
  }
  
  console.log(`Attempted to add ${allWomensProducts.length} women's products.`);
}

// Execute the function
addProducts().catch(console.error);