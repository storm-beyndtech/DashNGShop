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

// Remaining Luxury Brand Products
const finalLuxuryBrandProducts = [
  // Men's Outerwear
  {
    name: "Herringbone Wool Topcoat",
    description: "Classic topcoat crafted from English herringbone wool with a half-canvas construction. Features notch lapels and a center vent.",
    price: 249500,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1608454367599-c133fcab1242?q=80&w=1000",
      "https://images.unsplash.com/photo-1608454367599-c133fcab1242?q=80&w=1000"
    ],
    colors: ["Charcoal", "Navy", "Camel"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    rating: 4.9,
    reviewCount: 43,
    material: "English Wool, Silk Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: false
  },
  // Women's Outerwear
  {
    name: "Reversible Mink Fur Jacket",
    description: "Luxurious reversible jacket featuring mink fur on one side and water-resistant silk on the other. A versatile investment piece.",
    price: 495000,
    category: "clothing",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1000"
    ],
    colors: ["Brown/Black", "Cream/Navy"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviewCount: 18,
    material: "Mink Fur, Silk",
    careInstructions: "Professional fur specialist only",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  // Jewelry
  {
    name: "Diamond Tennis Necklace",
    description: "Breathtaking necklace featuring 18 carats of graduated round brilliant diamonds. Secured with a double safety clasp.",
    price: 3950000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["16 inches", "18 inches"],
    rating: 5.0,
    reviewCount: 12,
    material: "Platinum, VS Diamonds",
    careInstructions: "Professional cleaning recommended annually",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  // Swimwear
  {
    name: "Italian Swim Trunks",
    description: "Refined swim trunks crafted from quick-drying Italian fabric with a tailored fit. Feature a distinctive mother-of-pearl button closure.",
    price: 32500,
    category: "clothing",
    subcategory: "swimwear",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1565506737357-af89222625ad?q=80&w=1000",
      "https://images.unsplash.com/photo-1570534536441-4457d0ae9dcb?q=80&w=1000"
    ],
    colors: ["Navy", "Royal Blue", "Green"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.6,
    reviewCount: 38,
    material: "Quick-Dry Italian Technical Fabric",
    careInstructions: "Rinse after use in fresh water",
    inStock: true,
    quantity: 32,
    featured: false,
    isNewArrival: true
  },
  // Sunglasses
  {
    name: "Polarized Aviator Sunglasses",
    description: "Classic aviator sunglasses featuring 22K gold-plated frames and polarized lenses. Handcrafted in Italy with premium materials.",
    price: 68500,
    category: "accessories",
    subcategory: "eyewear",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000"
    ],
    colors: ["Gold/Green", "Gold/Brown", "Silver/Blue"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 56,
    material: "22K Gold-Plated Metal, Polarized Glass Lenses",
    careInstructions: "Store in provided case",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: false
  },
  // Candles
  {
    name: "Beeswax Pillar Candle Set",
    description: "Set of three hand-poured beeswax pillar candles with a subtle honey scent. Crafted from 100% pure beeswax for a clean, long-lasting burn.",
    price: 18500,
    category: "home",
    subcategory: "fragrance",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000",
      "https://images.unsplash.com/photo-1558731396-08d21dc4b41d?q=80&w=1000"
    ],
    colors: ["Natural Honey"],
    sizes: ["Set of 3"],
    rating: 4.7,
    reviewCount: 28,
    material: "100% Pure Beeswax",
    careInstructions: "Trim wick before each use",
    inStock: true,
    quantity: 35,
    featured: false,
    isNewArrival: false
  }
];

// Remaining Designer Collection Products
const finalDesignerCollectionProducts = [
  // Men's Clothing
  {
    name: "Transparent PVC Raincoat",
    description: "Avant-garde transparent raincoat crafted from PVC with contrast binding. Features an oversized silhouette and innovative closures.",
    price: 95000,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?q=80&w=1000",
      "https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1000"
    ],
    colors: ["Clear/Black", "Clear/Neon Yellow"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 18,
    material: "PVC, Technical Fabric Binding",
    careInstructions: "Wipe clean with damp cloth",
    inStock: true,
    quantity: 15,
    featured: true,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Platform Combat Boots",
    description: "Statement combat boots featuring an exaggerated platform sole and mixed-material construction. Includes distinctive hardware details.",
    price: 128500,
    category: "footwear",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1000",
      "https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?q=80&w=1000"
    ],
    colors: ["Black", "White"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    rating: 4.7,
    reviewCount: 32,
    material: "Leather, Rubber, Metal Hardware",
    careInstructions: "Treat with leather protector before wearing",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: false
  },
  // Bags
  {
    name: "Oversized Slouch Bag",
    description: "Statement bag featuring an unconventional oversized silhouette with gathered details. Crafted from soft leather with minimal hardware.",
    price: 185000,
    category: "accessories",
    subcategory: "bags",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?q=80&w=1000"
    ],
    colors: ["Black", "Burgundy", "Taupe"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 24,
    material: "Soft Leather",
    careInstructions: "Store stuffed when not in use",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  // Hats
  {
    name: "Sculptural Felt Hat",
    description: "Artistic wide-brim hat crafted from premium wool felt with a sculptural silhouette. Each piece is blocked and finished by hand.",
    price: 68500,
    category: "accessories",
    subcategory: "hats",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1581281863883-2469417a1255?q=80&w=1000",
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=1000"
    ],
    colors: ["Black", "Camel", "Red"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 16,
    material: "Premium Wool Felt",
    careInstructions: "Spot clean only, store in hatbox",
    inStock: true,
    quantity: 14,
    featured: true,
    isNewArrival: false
  },
  // Jewelry
  {
    name: "Liquid Metal Choker",
    description: "Innovative choker necklace featuring fluid metal forms created using advanced casting techniques. A truly unique statement piece.",
    price: 89500,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Silver", "Gold"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 18,
    material: "Silver-Plated or Gold-Plated Base Metal",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 16,
    featured: true,
    isNewArrival: true
  },
  // Home
  {
    name: "Geometric Side Table",
    description: "Sculptural side table featuring unconventional geometric forms. Crafted from a combination of polished metal and hand-painted wood.",
    price: 148500,
    category: "home",
    subcategory: "furniture",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1000",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000"
    ],
    colors: ["Mixed"],
    sizes: ["H: 50cm, W: 40cm, D: 40cm"],
    rating: 4.7,
    reviewCount: 14,
    material: "Polished Metal, Hand-Painted Wood",
    careInstructions: "Dust with soft cloth",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: true
  }
];

// Remaining Premium Menswear Products
const finalPremiumMenswearProducts = [
  // Suits
  {
    name: "Double-Breasted Flannel Suit",
    description: "Distinguished double-breasted suit crafted from English flannel wool. Features padded shoulders and a nipped waist for a classic silhouette.",
    price: 295000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1617627163270-fd5b9ad644ee?q=80&w=1000",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000"
    ],
    colors: ["Grey", "Navy", "Brown"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "40L", "42L", "44L"],
    rating: 4.9,
    reviewCount: 28,
    material: "English Flannel Wool, Bemberg Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: false
  },
  // Knitwear
  {
    name: "Shawl Collar Cardigan",
    description: "Elegant shawl collar cardigan crafted from lambswool and cashmere blend. Features leather buttons and ribbed cuffs.",
    price: 27500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1613213575812-24f4ecbb586d?q=80&w=1000",
      "https://images.unsplash.com/photo-1613213575812-24f4ecbb586d?q=80&w=1000"
    ],
    colors: ["Navy", "Charcoal", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 42,
    material: "Lambswool & Cashmere Blend",
    careInstructions: "Hand wash or dry clean",
    inStock: true,
    quantity: 36,
    featured: false,
    isNewArrival: false
  },
  // Outerwear
  {
    name: "Reversible Field Vest",
    description: "Versatile vest featuring quilted wool on one side and water-resistant technical fabric on the other. Perfect for variable conditions.",
    price: 18500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?q=80&w=1000"
    ],
    colors: ["Olive/Navy", "Brown/Tan"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 38,
    material: "Wool, Technical Fabric",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: true
  },
  // Casual Shirts
  {
    name: "Heavyweight Flannel Shirt",
    description: "Substantial flannel shirt crafted from brushed cotton with a classic pattern. Features a button-down collar and chest pocket.",
    price: 18500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1000"
    ],
    colors: ["Red/Black Check", "Green/Black Check", "Blue/Black Check"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 65,
    material: "Brushed Cotton Flannel",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: false
  },
  // Shoes
  {
    name: "Suede Desert Boots",
    description: "Classic desert boots crafted from premium suede with crepe rubber soles. Feature two-eyelet lacing and a comfortable unlined construction.",
    price: 19500,
    category: "footwear",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1000",
      "https://images.unsplash.com/photo-1642015995537-3bc391ea4500?q=80&w=1000"
    ],
    colors: ["Sand", "Brown", "Navy"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.6,
    reviewCount: 78,
    material: "Premium Suede, Crepe Rubber Soles",
    careInstructions: "Brush regularly, use suede protector",
    inStock: true,
    quantity: 42,
    featured: true,
    isNewArrival: true
  },
  // Travel
  {
    name: "Canvas and Leather Weekender",
    description: "Practical yet refined weekender bag crafted from water-resistant canvas with leather trim. Features brass hardware and multiple pockets.",
    price: 28500,
    category: "accessories",
    subcategory: "travel",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000"
    ],
    colors: ["Olive/Brown", "Navy/Brown", "Khaki/Brown"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 46,
    material: "Water-Resistant Canvas, Leather Trim",
    careInstructions: "Spot clean canvas, condition leather",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: false
  },
  // Grooming
  {
    name: "Shaving Kit with Stand",
    description: "Traditional wet shaving kit featuring a badger hair brush, safety razor, and stand. Crafted from chrome and wood for lasting quality.",
    price: 16500,
    category: "grooming",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1000",
      "https://images.unsplash.com/photo-1621607150045-cb748c123834?q=80&w=1000"
    ],
    colors: ["Chrome/Walnut"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 54,
    material: "Chrome, Walnut Wood, Badger Hair",
    careInstructions: "Rinse brush after use, dry thoroughly",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: false
  },
  // Socks
  {
    name: "Cashmere Blend Dress Socks",
    description: "Luxurious dress socks crafted from a cashmere and cotton blend. Feature hand-linked toe seams and reinforced heels for durability.",
    price: 8500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000",
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000"
    ],
    colors: ["Navy", "Charcoal", "Burgundy", "Dark Green"],
    sizes: ["M", "L"],
    rating: 4.8,
    reviewCount: 68,
    material: "Cotton, Nylon, Cashmere Blend",
    careInstructions: "Machine wash cold, lay flat to dry",
    inStock: true,
    quantity: 54,
    featured: false,
    isNewArrival: false
  },
  // Outerwear
  {
    name: "Harris Tweed Sport Coat",
    description: "Traditional sport coat crafted from authentic Harris Tweed wool. Features a half-canvas construction, patch pockets, and suede elbow patches.",
    price: 145000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1000",
      "https://images.unsplash.com/photo-1570071677470-c04398af73fc?q=80&w=1000"
    ],
    colors: ["Brown Herringbone", "Green Check", "Grey Herringbone"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "40L", "42L", "44L"],
    rating: 4.9,
    reviewCount: 37,
    material: "Harris Tweed Wool, Suede Elbow Patches",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 26,
    featured: true,
    isNewArrival: true
  },
  // Formal Wear
  {
    name: "Classic Black Tuxedo",
    description: "Timeless tuxedo crafted from super 120s wool with satin lapels. Includes matching flat-front trousers with satin side stripe.",
    price: 195000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1000",
      "https://images.unsplash.com/photo-1553484771-689277e6c388?q=80&w=1000"
    ],
    colors: ["Black"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "48R", "40L", "42L", "44L"],
    rating: 4.9,
    reviewCount: 28,
    material: "Super 120s Wool, Satin Trim",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: false
  }
];

// Remaining Fine Jewelry Products
const finalFineJewelryProducts = [
  // Diamond Jewelry
  {
    name: "Emerald-Cut Diamond Ring",
    description: "Stunning engagement ring featuring a 2-carat emerald-cut diamond in a platinum cathedral setting with pavé band.",
    price: 2685000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 5.0,
    reviewCount: 14,
    material: "Platinum, VS Clarity Diamond",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: false
  },
  // Men's Watches
  {
    name: "Chronograph Watch",
    description: "Sophisticated chronograph watch featuring a Swiss automatic movement and exhibition caseback. Presented on an alligator leather strap.",
    price: 985000,
    category: "accessories",
    subcategory: "watches",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1614703185627-903d6502c33f?q=80&w=1000",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1000"
    ],
    colors: ["Silver/White", "Silver/Black"],
    sizes: ["42mm"],
    rating: 4.8,
    reviewCount: 32,
    material: "Stainless Steel, Sapphire Crystal, Alligator Strap",
    careInstructions: "Professional service every 3-5 years",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: true
  },
  // Colored Gemstones
  {
    name: "Paraiba Tourmaline Pendant",
    description: "Extraordinary pendant featuring a rare Paraiba tourmaline surrounded by brilliant-cut diamonds. Suspended from a delicate platinum chain.",
    price: 1285000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Platinum/Blue"],
    sizes: ["18 inches"],
    rating: 4.9,
    reviewCount: 15,
    material: "Platinum, Paraiba Tourmaline, Diamonds",
    careInstructions: "Store separately, avoid chemicals",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  },
  // Bracelets
  {
    name: "Classic Diamond Bangle",
    description: "Timeless bangle bracelet featuring channel-set round brilliant diamonds. Crafted in 18K gold with a secure hinged closure.",
    price: 875000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1000"
    ],
    colors: ["Yellow Gold", "White Gold", "Rose Gold"],
    sizes: ["Small", "Medium"],
    rating: 4.8,
    reviewCount: 26,
    material: "18K Gold, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 14,
    featured: false,
    isNewArrival: false
  },
  // Men's Accessories
  {
    name: "Mother-of-Pearl Dress Set",
    description: "Elegant dress set featuring mother-of-pearl studs and cufflinks with diamond centers. Crafted in 18K white gold for timeless sophistication.",
    price: 495000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1000",
      "https://images.unsplash.com/photo-1573053009372-3dd4b5ab5470?q=80&w=1000"
    ],
    colors: ["White Gold/Pearl"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 18,
    material: "18K White Gold, Mother-of-Pearl, Diamonds",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 8,
    featured: false,
    isNewArrival: true
  },
  // Women's Watches
  {
    name: "Diamond Bezel Ladies' Watch",
    description: "Refined ladies' watch featuring a diamond-set bezel and mother-of-pearl dial. Presented on a satin strap with deployant buckle.",
    price: 875000,
    category: "accessories",
    subcategory: "watches",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1000",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1000"
    ],
    colors: ["White Gold/Pearl", "Rose Gold/Pearl"],
    sizes: ["28mm"],
    rating: 4.8,
    reviewCount: 22,
    material: "18K Gold, Diamonds, Mother-of-Pearl, Satin Strap",
    careInstructions: "Professional service every 3-5 years",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: true
  },
  // Earrings
  {
    name: "Diamond Inside-Out Hoops",
    description: "Classic hoop earrings featuring diamonds set on both the interior and exterior faces. Crafted in 18K gold with secure hinged closures.",
    price: 585000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1589207242685-ca6d929d0836?q=80&w=1000",
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000"
    ],
    colors: ["Yellow Gold", "White Gold", "Rose Gold"],
    sizes: ["Small (1 inch)", "Medium (1.5 inch)"],
    rating: 4.8,
    reviewCount: 36,
    material: "18K Gold, Diamonds",
    careInstructions: "Wipe with jewelry cloth after wearing",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: false
  },
  // Wedding Bands
  {
    name: "Men's Platinum Wedding Band",
    description: "Classic men's wedding band crafted from platinum with a comfort-fit interior. Features a subtly hammered finish for a contemporary look.",
    price: 295000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.7,
    reviewCount: 42,
    material: "Platinum",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: false
  }
];

// Remaining Haute Couture Products
const finalHauteCoutureProducts = [
  // Evening Gowns
  {
    name: "Metallic Plissé Gown",
    description: "Dramatic evening gown crafted from metallic plissé fabric. Features an architectural neckline and sweeping train with meticulous draping.",
    price: 1895000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000"
    ],
    colors: ["Silver", "Gold", "Rose Gold"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.9,
    reviewCount: 10,
    material: "Metallic Plissé, Silk Lining",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  // Bridal
  {
    name: "Illusion Back Wedding Gown",
    description: "Breathtaking wedding gown featuring an illusion back entirely covered in hand-sewn crystal and pearl embellishments. Includes a detachable cathedral train.",
    price: 2250000,
    category: "clothing",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1513177126531-77f75a4d76b5?q=80&w=1000",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=1000"
    ],
    colors: ["Ivory", "White", "Blush"],
    sizes: ["2", "4", "6", "8", "10", "Custom"],
    rating: 5.0,
    reviewCount: 12,
    material: "Silk, Crystals, Pearls",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Separates
  {
    name: "Beaded Evening Jacket",
    description: "Extraordinary bolero jacket entirely covered in hand-applied bugle beads and crystals. Perfect layering piece for evening events.",
    price: 875000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1551163943-3f7235485ff8?q=80&w=1000"
    ],
    colors: ["Silver", "Black", "Gold"],
    sizes: ["XS", "S", "M", "L", "Custom"],
    rating: 4.8,
    reviewCount: 14,
    material: "Silk Base, Bugle Beads, Crystals",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 8,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Feather and Crystal Fascinator",
    description: "Stunning head piece featuring hand-curled ostrich feathers and Swarovski crystal embellishments. Attached to a comfortable headband base.",
    price: 125000,
    category: "accessories",
    subcategory: "formal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1596120236172-231999844bbe?q=80&w=1000",
      "https://images.unsplash.com/photo-1596120236172-231999844bbe?q=80&w=1000"
    ],
    colors: ["Black/Silver", "White/Crystal", "Navy/Silver"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 16,
    material: "Ostrich Feathers, Swarovski Crystals",
    careInstructions: "Store in box, avoid moisture",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: false
  },
  // Men's Formal
  {
    name: "Embroidered Velvet Dinner Jacket",
    description: "Exquisite dinner jacket crafted from plush velvet with metallic thread embroidery. Features silk satin lapels and covered buttons.",
    price: 1050000,
    category: "clothing",
    subcategory: "men",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1593032534613-11c9498429d8?q=80&w=1000",
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1000"
    ],
    colors: ["Burgundy", "Midnight Blue", "Black"],
    sizes: ["Custom"],
    rating: 4.9,
    reviewCount: 8,
    material: "Velvet, Metallic Thread Embroidery",
    careInstructions: "Dry clean only by specialist",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  // Special Occasion
  {
    name: "Duchess Satin Ball Skirt",
    description: "Dramatic full ball skirt crafted from structured duchess satin. Features internal petticoats and precise pleating at the waist.",
    price: 585000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1594226801341-a903a8003b71?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Royal Blue"],
    sizes: ["0", "2", "4", "6", "8", "Custom"],
    rating: 4.7,
    reviewCount: 18,
    material: "Duchess Satin, Silk Organza Petticoats",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  // Footwear
  {
    name: "Crystal-Encrusted Evening Heels",
    description: "Stunning evening shoes entirely covered in hand-applied crystals. Feature a perfectly balanced 90mm heel and padded leather insole.",
    price: 275000,
    category: "footwear",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000"
    ],
    colors: ["Crystal/Silver", "Crystal/Gold", "Crystal/Black"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.8,
    reviewCount: 14,
    material: "Satin Base, Crystals, Leather Lining",
    careInstructions: "Use shoe bags, avoid moisture",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: false
  },
  // Men's Evening
  {
    name: "White Tie Ensemble",
    description: "Complete formal white tie ensemble including tailcoat, trousers, waistcoat, and formal shirt. Each piece is meticulously hand-tailored.",
    price: 1850000,
    category: "clothing",
    subcategory: "men",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1000",
      "https://images.unsplash.com/photo-1593032534613-11c9498429d8?q=80&w=1000"
    ],
    colors: ["Black/White"],
    sizes: ["Custom"],
    rating: 5.0,
    reviewCount: 7,
    material: "Barathea Wool, Marcella Cotton",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  },
  // Evening Separates
  {
    name: "Draped One-Shoulder Top",
    description: "Sculptural evening top featuring dramatic one-shoulder draping. Crafted from silk crepe with internal structure for perfect form.",
    price: 395000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1525450824786-227cbef70703?q=80&w=1000",
      "https://images.unsplash.com/photo-1548389995-fbd3151a501f?q=80&w=1000"
    ],
    colors: ["White", "Black", "Red"],
    sizes: ["0", "2", "4", "6", "8", "Custom"],
    rating: 4.7,
    reviewCount: 15,
    material: "Silk Crepe, Internal Boning",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: true
  },
  // Custom Services
  {
    name: "Bespoke Evening Gown Experience",
    description: "Complete custom evening gown experience including consultations, sketches, fittings, and final creation. Includes all fabrics and embellishments.",
    price: 5000000,
    category: "services",
    subcategory: "custom",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000"
    ],
    colors: ["Custom Selection"],
    sizes: ["Custom Fitted"],
    rating: 5.0,
    reviewCount: 9,
    material: "Selection from Premium Fabrics",
    careInstructions: "Care guide provided with finished garment",
    inStock: true,
    quantity: 999,
    featured: true,
    isNewArrival: true
  },
  // Evening Separates
  {
    name: "Wide-Leg Silk Evening Trousers",
    description: "Dramatic palazzo-style evening trousers crafted from fluid silk charmeuse. Feature a high waist with hidden closure and floor-sweeping length.",
    price: 485000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000",
      "https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?q=80&w=1000"
    ],
    colors: ["Black", "Ivory", "Midnight Blue"],
    sizes: ["0", "2", "4", "6", "8", "Custom"],
    rating: 4.8,
    reviewCount: 14,
    material: "Silk Charmeuse",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  // Bridal Accessories
  {
    name: "Royal Length Embroidered Veil",
    description: "Magnificent royal-length veil featuring hand-embroidered borders of silk thread and tiny pearl accents. Extends 12 feet beyond the train.",
    price: 875000,
    category: "accessories",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000",
      "https://images.unsplash.com/photo-1550305933-4c2f0ea7ed5e?q=80&w=1000"
    ],
    colors: ["Ivory", "White"],
    sizes: ["Royal Length (12 feet)"],
    rating: 5.0,
    reviewCount: 8,
    material: "Finest Tulle, Silk Embroidery, Pearls",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  }
];

// Remaining Modern Luxury Products
const finalModernLuxuryProducts = [
  // Clothing
  {
    name: "Oversized Wool Coat",
    description: "Contemporary coat featuring an oversized silhouette and dropped shoulders. Crafted from premium double-faced wool with minimal detailing.",
    price: 185000,
    category: "clothing",
    subcategory: "women",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000"
    ],
    colors: ["Camel", "Black", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 56,
    material: "Double-Faced Italian Wool",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Organic Cotton Utility Jumpsuit",
    description: "Refined utility jumpsuit crafted from organic cotton twill. Features a modern relaxed fit with adjustable elements and clean finishing.",
    price: 28500,
    category: "clothing",
    subcategory: "women",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1580651315530-69c8e0903883?q=80&w=1000",
      "https://images.unsplash.com/photo-1617551307578-7103f4549488?q=80&w=1000"
    ],
    colors: ["Sand", "Olive", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 48,
    material: "Organic Cotton Twill",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 36,
    featured: false,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Minimal Leather Sneakers",
    description: "Clean-lined sneakers crafted from full-grain leather with a cup sole construction. Feature a minimalist design without visible branding.",
    price: 25500,
    category: "footwear",
    subcategory: "unisex",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1000",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000"
    ],
    colors: ["White", "Black", "Navy"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    rating: 4.8,
    reviewCount: 78,
    material: "Full-Grain Leather, Rubber Sole",
    careInstructions: "Wipe clean with damp cloth",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Structured Leather Tote",
    description: "Architectural tote bag crafted from vegetable-tanned leather with a clean, minimal design. Features an unlined interior with a removable pouch.",
    price: 35000,
    category: "accessories",
    subcategory: "bags",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1548863227-3af567fc3b27?q=80&w=1000"
    ],
    colors: ["Tan", "Black", "Navy"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 42,
    material: "Vegetable-Tanned Leather",
    careInstructions: "Will develop patina with use",
    inStock: true,
    quantity: 26,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Brushed Brass Wall Clock",
    description: "Minimalist wall clock crafted from brushed brass with a clean face design. Features Japanese quartz movement for perfect accuracy.",
    price: 24500,
    category: "home",
    subcategory: "decor",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1532427717258-7496a3801945?q=80&w=1000",
      "https://images.unsplash.com/photo-1616954874242-97aea89d1186?q=80&w=1000"
    ],
    colors: ["Brass", "Black", "Copper"],
    sizes: ["30cm Diameter"],
    rating: 4.7,
    reviewCount: 35,
    material: "Brushed Brass, Japanese Quartz Movement",
    careInstructions: "Dust with soft cloth",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: true
  },
  // Kitchen
  {
    name: "Handcrafted Stoneware Dinnerware Set",
    description: "Modern dinnerware set crafted from matte stoneware with a reactive glaze. Each piece is individually made with subtle variations. Set for four people.",
    price: 48500,
    category: "home",
    subcategory: "dining",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1594125894897-8d545a406867?q=80&w=1000",
      "https://images.unsplash.com/photo-1594125894897-8d545a406867?q=80&w=1000"
    ],
    colors: ["Matte Black", "Matte White", "Matte Grey"],
    sizes: ["4-Person Set"],
    rating: 4.7,
    reviewCount: 58,
    material: "Hand-Thrown Stoneware, Reactive Glaze",
    careInstructions: "Dishwasher safe, microwave safe",
    inStock: true,
    quantity: 22,
    featured: true,
    isNewArrival: true
  }
];

// Combine all additional brand products
const finalProducts = [
  ...finalLuxuryBrandProducts,
  ...finalDesignerCollectionProducts,
  ...finalPremiumMenswearProducts,
  ...finalFineJewelryProducts,
  ...finalHauteCoutureProducts,
  ...finalModernLuxuryProducts
];

// Function to add products
async function addProducts() {
  // Login first to get cookie
  const cookie = await loginAdmin();
  
  for (const product of finalProducts) {
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
  
  console.log(`Attempted to add ${finalProducts.length} more brand products.`);
}

// Execute the function
addProducts().catch(console.error);