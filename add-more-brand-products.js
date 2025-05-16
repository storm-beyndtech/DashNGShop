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

// Additional Luxury Brand Products
const moreLuxuryBrandProducts = [
  // Men's Shoes
  {
    name: "Double Monk Strap Leather Shoes",
    description: "Exquisite double monk strap shoes crafted from the finest Italian calfskin. Features a hand-burnished finish and Goodyear welted construction.",
    price: 145000,
    category: "footwear",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000",
      "https://images.unsplash.com/photo-1613688270362-8b26189c0782?q=80&w=1000"
    ],
    colors: ["Dark Brown", "Black", "Oxblood"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.8,
    reviewCount: 73,
    material: "Italian Calfskin, Leather Sole",
    careInstructions: "Use shoe trees, polish regularly",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: true
  },
  // Women's Shoes
  {
    name: "Classic Point-Toe Leather Pumps",
    description: "Timeless point-toe pumps crafted from Italian patent leather. Features a perfectly balanced 85mm heel and leather-lined interior for ultimate comfort.",
    price: 95000,
    category: "footwear",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000"
    ],
    colors: ["Black", "Nude", "Red"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.7,
    reviewCount: 68,
    material: "Italian Patent Leather, Leather Lining",
    careInstructions: "Wipe clean with soft cloth",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: false
  },
  // Men's Accessories
  {
    name: "Silk Jacquard Tie",
    description: "Handcrafted silk tie featuring a subtle jacquard pattern. Made with seven-fold construction from Italian silk for exceptional drape and texture.",
    price: 28500,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1598188306155-25e400eb5078?q=80&w=1000",
      "https://images.unsplash.com/photo-1624378439575-d8705ad01dce?q=80&w=1000"
    ],
    colors: ["Navy/Gold", "Burgundy/Silver", "Forest Green/Blue"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 49,
    material: "100% Italian Silk",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 40,
    featured: false,
    isNewArrival: false
  },
  // Women's Bags
  {
    name: "Structured Top Handle Handbag",
    description: "Elegant structured handbag crafted from pebbled calfskin with meticulous hand-stitching. Features gold-tone hardware and a convertible strap.",
    price: 295000,
    category: "accessories",
    subcategory: "bags",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=1000"
    ],
    colors: ["Black", "Camel", "Burgundy"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 32,
    material: "Pebbled Calfskin, Suede Lining",
    careInstructions: "Store in dust bag when not in use",
    inStock: true,
    quantity: 15,
    featured: true,
    isNewArrival: true
  },
  // Home Decor
  {
    name: "Hand-Blown Crystal Vase",
    description: "Exquisite crystal vase hand-blown by master artisans. Features a contemporary silhouette with subtle faceted details and exceptional clarity.",
    price: 125000,
    category: "home",
    subcategory: "decor",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c4?q=80&w=1000"
    ],
    colors: ["Clear"],
    sizes: ["H: 30cm, Diameter: 15cm"],
    rating: 4.8,
    reviewCount: 28,
    material: "Hand-Blown Crystal",
    careInstructions: "Hand wash only, dry thoroughly",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  // Fragrances
  {
    name: "Signature Eau de Parfum",
    description: "Sophisticated fragrance featuring notes of bergamot, jasmine, and sandalwood. Presented in a hand-cut crystal bottle with gold-plated details.",
    price: 45000,
    category: "beauty",
    subcategory: "fragrance",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000",
      "https://images.unsplash.com/photo-1608528577891-eb055944b2f7?q=80&w=1000"
    ],
    colors: ["50ml", "100ml"],
    sizes: ["50ml", "100ml"],
    rating: 4.9,
    reviewCount: 86,
    material: "Eau de Parfum, Crystal Bottle",
    careInstructions: "Store away from direct sunlight",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: true
  },
  // Fine Writing Instruments
  {
    name: "Handcrafted Fountain Pen",
    description: "Exceptional fountain pen featuring a hand-guilloched body in precious resin with platinum-plated fittings. Includes an 18K gold nib.",
    price: 89500,
    category: "accessories",
    subcategory: "stationery",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000",
      "https://images.unsplash.com/photo-1598372614234-93d650c50d91?q=80&w=1000"
    ],
    colors: ["Black/Platinum", "Blue/Platinum", "Burgundy/Platinum"],
    sizes: ["Medium Nib", "Fine Nib", "Broad Nib"],
    rating: 4.9,
    reviewCount: 42,
    material: "Precious Resin, 18K Gold Nib, Platinum-Plated Fittings",
    careInstructions: "Clean regularly, use quality ink",
    inStock: true,
    quantity: 20,
    featured: false,
    isNewArrival: true
  }
];

// Additional Designer Collection Products
const moreDesignerCollectionProducts = [
  // Men's Clothing
  {
    name: "Structured Canvas Field Jacket",
    description: "Avant-garde interpretation of the classic field jacket. Features asymmetric pockets, contrast stitching, and a unique collar treatment.",
    price: 128500,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000"
    ],
    colors: ["Olive", "Sand", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 37,
    material: "Heavy Canvas, Technical Lining",
    careInstructions: "Machine wash cold, hang to dry",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: true
  },
  // Women's Dresses
  {
    name: "Deconstructed Silk Wrap Dress",
    description: "Innovative wrap dress featuring asymmetric draping and raw-edge details. Hand-printed with an exclusive abstract pattern.",
    price: 189500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1000",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000"
    ],
    colors: ["Multi Print"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 29,
    material: "100% Silk",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Sculptural Sterling Silver Cuff",
    description: "Statement cuff bracelet featuring an organic, sculptural form. Handcrafted from sterling silver with a unique hammered finish.",
    price: 79500,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1602173979469-d0c718e7de24?q=80&w=1000"
    ],
    colors: ["Silver"],
    sizes: ["S/M", "M/L"],
    rating: 4.8,
    reviewCount: 25,
    material: "Sterling Silver",
    careInstructions: "Polish with silver cloth as needed",
    inStock: true,
    quantity: 15,
    featured: true,
    isNewArrival: false
  },
  // Eyewear
  {
    name: "Architectural Acetate Sunglasses",
    description: "Bold sunglasses featuring an avant-garde geometric shape. Hand-crafted from premium Italian acetate with UV400 protective lenses.",
    price: 48500,
    category: "accessories",
    subcategory: "eyewear",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1000"
    ],
    colors: ["Black", "Tortoise", "Clear/Black"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 31,
    material: "Italian Acetate, UV400 Lenses",
    careInstructions: "Clean with eyewear cloth and solution",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: true
  },
  // Unisex Items
  {
    name: "Oversized Cashmere Scarf",
    description: "Luxurious oversized scarf crafted from the finest Mongolian cashmere. Features an exclusive abstract pattern created by an emerging artist.",
    price: 59500,
    category: "accessories",
    subcategory: "scarves",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000",
      "https://images.unsplash.com/photo-1519238359922-989348752efb?q=80&w=1000"
    ],
    colors: ["Multi", "Grey/Black", "Burgundy/Navy"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 47,
    material: "100% Mongolian Cashmere",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 30,
    featured: true,
    isNewArrival: false
  },
  // Footwear
  {
    name: "Color-Block Leather Boots",
    description: "Statement boots featuring unexpected color-blocking and an architectural heel. Crafted from premium calfskin with a comfortable leather lining.",
    price: 138500,
    category: "footwear",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1000"
    ],
    colors: ["Black/White", "Red/Black", "Blue/Brown"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.6,
    reviewCount: 34,
    material: "Premium Calfskin, Leather Lining",
    careInstructions: "Treat with water-repellent spray before wearing",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  // Home Decor
  {
    name: "Limited Edition Art Throw Pillows",
    description: "Artistic throw pillows featuring exclusive designs from contemporary artists. Printed on premium linen and backed with velvet.",
    price: 32500,
    category: "home",
    subcategory: "decor",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000",
      "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?q=80&w=1000"
    ],
    colors: ["Design 1", "Design 2", "Design 3"],
    sizes: ["45cm x 45cm"],
    rating: 4.7,
    reviewCount: 28,
    material: "Linen Front, Velvet Back, Feather Insert",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 25,
    featured: false,
    isNewArrival: true
  }
];

// Additional Premium Menswear Products
const morePremiumMenswearProducts = [
  // Outerwear
  {
    name: "Cashmere-Blend Topcoat",
    description: "Refined topcoat crafted from a luxurious cashmere and wool blend. Features a classic silhouette with a modern fit and satin-lined sleeves.",
    price: 198500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
      "https://images.unsplash.com/photo-1644982647708-0b2cc3d910b7?q=80&w=1000"
    ],
    colors: ["Camel", "Charcoal", "Navy"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    rating: 4.8,
    reviewCount: 73,
    material: "80% Wool, 20% Cashmere",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 25,
    featured: true,
    isNewArrival: true
  },
  // Knitwear
  {
    name: "Cable-Knit Merino Sweater",
    description: "Luxurious cable-knit sweater crafted from extra-fine merino wool. Features classic Aran patterns and a contemporary fit.",
    price: 42500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad01dce?q=80&w=1000",
      "https://images.unsplash.com/photo-1614251055880-5ca18a2d7fae?q=80&w=1000"
    ],
    colors: ["Ivory", "Navy", "Forest Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 87,
    material: "100% Extra-Fine Merino Wool",
    careInstructions: "Hand wash cold or dry clean",
    inStock: true,
    quantity: 38,
    featured: false,
    isNewArrival: false
  },
  // Casual Shirts
  {
    name: "Brushed Twill Weekend Shirt",
    description: "Perfect weekend shirt crafted from brushed cotton twill for exceptional softness. Features a button-down collar and a relaxed fit.",
    price: 18500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000",
      "https://images.unsplash.com/photo-1612257999691-443b1d24d1ab?q=80&w=1000"
    ],
    colors: ["Olive", "Navy", "Burgundy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 95,
    material: "100% Brushed Cotton Twill",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 45,
    featured: false,
    isNewArrival: true
  },
  // Trousers
  {
    name: "Tailored Flannel Trousers",
    description: "Sophisticated flannel trousers featuring a tailored fit with a slight taper. Made from Italian wool with a soft hand and natural stretch.",
    price: 22500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
      "https://images.unsplash.com/photo-1624378439575-d8705ad01dce?q=80&w=1000"
    ],
    colors: ["Grey", "Navy", "Brown"],
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    rating: 4.7,
    reviewCount: 72,
    material: "Italian Wool Flannel",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: false
  },
  // Formal Accessories
  {
    name: "Silk Knot Cufflinks",
    description: "Classic silk knot cufflinks handcrafted from twisted silk cord. A versatile and elegant addition to any formal ensemble.",
    price: 12500,
    category: "accessories",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=1000",
      "https://images.unsplash.com/photo-1592878850630-d7888c2cdb00?q=80&w=1000"
    ],
    colors: ["Navy/Red", "Burgundy/Navy", "Silver/Blue"],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 48,
    material: "Twisted Silk Cord",
    careInstructions: "Spot clean only",
    inStock: true,
    quantity: 35,
    featured: false,
    isNewArrival: false
  },
  // Belts
  {
    name: "Full-Grain Leather Belt",
    description: "Refined belt crafted from full-grain calfskin with a subtle pebbled texture. Features a solid brass buckle with a brushed nickel finish.",
    price: 16500,
    category: "accessories",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=1000",
      "https://images.unsplash.com/photo-1624378439575-d8705ad01dce?q=80&w=1000"
    ],
    colors: ["Dark Brown", "Black", "Tan"],
    sizes: ["32", "34", "36", "38", "40", "42"],
    rating: 4.8,
    reviewCount: 65,
    material: "Full-Grain Calfskin, Solid Brass Buckle",
    careInstructions: "Condition with leather cream as needed",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: true
  },
  // Outerwear
  {
    name: "Quilted Wool Field Vest",
    description: "Versatile field vest featuring diamond quilting and a wool outer shell. Perfect for layering with both casual and dressed-up looks.",
    price: 24500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
      "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80&w=1000"
    ],
    colors: ["Olive", "Navy", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 54,
    material: "Wool Outer, Polyester Fill, Cotton Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: true
  }
];

// Additional Fine Jewelry Products
const moreFineJewelryProducts = [
  // Rings
  {
    name: "Emerald-Cut Diamond Ring",
    description: "Stunning engagement ring featuring a 3-carat emerald-cut diamond in a platinum cathedral setting. Accented with pavé diamonds along the band.",
    price: 3850000,
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
    reviewCount: 18,
    material: "Platinum, VVS1 Diamond",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  },
  // Necklaces
  {
    name: "Diamond Station Necklace",
    description: "Elegant necklace featuring seven bezel-set round brilliant diamonds spaced along a delicate platinum chain. A refined everyday classic.",
    price: 785000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["16 inches", "18 inches", "20 inches"],
    rating: 4.8,
    reviewCount: 36,
    material: "Platinum, Diamonds",
    careInstructions: "Clean with jewelry cloth",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: false
  },
  // Bracelets
  {
    name: "Sapphire and Diamond Bangle",
    description: "Luxurious bangle featuring oval Ceylon sapphires alternating with brilliant-cut diamonds in an 18K white gold setting.",
    price: 1250000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000"
    ],
    colors: ["White Gold/Sapphire"],
    sizes: ["Small", "Medium"],
    rating: 4.9,
    reviewCount: 24,
    material: "18K White Gold, Ceylon Sapphires, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  // Watches
  {
    name: "Skeleton Automatic Watch",
    description: "Mechanical masterpiece featuring a fully skeletonized movement visible through front and back sapphire crystals. Crafted in 18K rose gold.",
    price: 2950000,
    category: "accessories",
    subcategory: "watches",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1000"
    ],
    colors: ["Rose Gold"],
    sizes: ["39mm"],
    rating: 4.9,
    reviewCount: 21,
    material: "18K Rose Gold, Alligator Strap",
    careInstructions: "Professional service every 3-5 years",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Men's Jewelry
  {
    name: "Onyx and Diamond Signet Ring",
    description: "Sophisticated signet ring featuring a black onyx surface with an inlaid diamond. Crafted in 18K yellow gold with a brushed finish.",
    price: 375000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Yellow Gold/Onyx"],
    sizes: ["8", "9", "10", "11", "12"],
    rating: 4.7,
    reviewCount: 28,
    material: "18K Yellow Gold, Black Onyx, Diamond",
    careInstructions: "Wipe with soft cloth after wearing",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: true
  },
  // Wedding Bands
  {
    name: "Diamond Eternity Wedding Band",
    description: "Timeless wedding band featuring channel-set baguette diamonds around the entire ring. Available in platinum or gold.",
    price: 695000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Platinum", "Yellow Gold", "White Gold"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    rating: 4.9,
    reviewCount: 45,
    material: "Platinum or 18K Gold, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 15,
    featured: true,
    isNewArrival: false
  },
  // Colored Gemstones
  {
    name: "Colombian Emerald Cocktail Ring",
    description: "Statement ring featuring a 5-carat Colombian emerald surrounded by a double halo of diamonds. Crafted in 18K white gold.",
    price: 1895000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["White Gold/Emerald"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 5.0,
    reviewCount: 16,
    material: "18K White Gold, Colombian Emerald, Diamonds",
    careInstructions: "Avoid exposure to harsh chemicals",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  }
];

// Additional Haute Couture Products
const moreHauteCoutureProducts = [
  // Bridal
  {
    name: "Hand-Embroidered Veil",
    description: "Ethereal cathedral-length veil featuring thousands of hand-embroidered seed pearls and crystal beads. Each piece requires over 200 hours of craftsmanship.",
    price: 1250000,
    category: "accessories",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000",
      "https://images.unsplash.com/photo-1608113239923-cc4824f0df23?q=80&w=1000"
    ],
    colors: ["Ivory", "White"],
    sizes: ["Cathedral Length"],
    rating: 5.0,
    reviewCount: 12,
    material: "Finest Tulle, Seed Pearls, Crystals",
    careInstructions: "Professional cleaning and preservation",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  // Evening Gowns
  {
    name: "Silk Organza Ballgown",
    description: "Dramatic ballgown crafted from 30 yards of silk organza with hand-painted floral details. Features a structured corseted bodice and sweeping train.",
    price: 1850000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000"
    ],
    colors: ["Blush", "Sky Blue", "Ivory"],
    sizes: ["0", "2", "4", "6", "8", "Custom"],
    rating: 4.9,
    reviewCount: 14,
    material: "Silk Organza, Hand-Painted Details",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: false
  },
  // Embellished Pieces
  {
    name: "Crystal-Embellished Cape",
    description: "Extraordinary evening cape completely covered in hand-applied Swarovski crystals and glass beading. A true work of wearable art requiring 500+ hours of craftsmanship.",
    price: 2495000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000"
    ],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["One Size"],
    rating: 5.0,
    reviewCount: 9,
    material: "Silk Base, Swarovski Crystals, Glass Beading",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 3,
    featured: true,
    isNewArrival: true
  },
  // Men's Formal
  {
    name: "Silk Jacquard Smoking Jacket",
    description: "Opulent smoking jacket crafted from custom-woven silk jacquard with shawl collar and covered buttons. Each piece is cut and sewn entirely by hand.",
    price: 1250000,
    category: "clothing",
    subcategory: "men",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000"
    ],
    colors: ["Burgundy", "Midnight Blue", "Emerald"],
    sizes: ["Custom"],
    rating: 4.9,
    reviewCount: 8,
    material: "Custom-Woven Silk Jacquard",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 5,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Hand-Embroidered Opera Gloves",
    description: "Exquisite elbow-length opera gloves featuring intricate hand embroidery with metallic threads and tiny seed pearls. A stunning accessory for formal occasions.",
    price: 185000,
    category: "accessories",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1595079676722-ddb4b61993c4?q=80&w=1000",
      "https://images.unsplash.com/photo-1595079676722-ddb4b61993c4?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Champagne"],
    sizes: ["6.5", "7", "7.5", "8"],
    rating: 4.8,
    reviewCount: 15,
    material: "Silk, Metallic Embroidery, Seed Pearls",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  // Corsetry
  {
    name: "Couture Corset",
    description: "Museum-quality corset featuring traditional hand construction techniques with 35 individual steel bones and silk satin outer layer with lace overlay.",
    price: 1250000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1580651315530-69c8e0903883?q=80&w=1000",
      "https://images.unsplash.com/photo-1580651315530-69c8e0903883?q=80&w=1000"
    ],
    colors: ["Ivory/Blush", "Black/Black", "Navy/Cream"],
    sizes: ["Custom"],
    rating: 4.9,
    reviewCount: 11,
    material: "Silk Satin, French Lace, Steel Boning",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  // Headpieces
  {
    name: "Crystal Tiara Headpiece",
    description: "Breathtaking headpiece hand-crafted with hundreds of crystals and freshwater pearls. Designed to catch the light from every angle.",
    price: 295000,
    category: "accessories",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1596120236172-231999844bbe?q=80&w=1000",
      "https://images.unsplash.com/photo-1596120236172-231999844bbe?q=80&w=1000"
    ],
    colors: ["Silver/Crystal", "Gold/Crystal"],
    sizes: ["One Size"],
    rating: 5.0,
    reviewCount: 16,
    material: "Sterling Silver or Gold Vermeil, Crystals, Freshwater Pearls",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: false
  }
];

// Additional Modern Luxury Products
const moreModernLuxuryProducts = [
  // Loungewear
  {
    name: "Organic Cotton Lounge Set",
    description: "Refined loungewear set crafted from GOTS-certified organic cotton. Features a relaxed silhouette with clean lines and minimal details.",
    price: 32500,
    category: "clothing",
    subcategory: "loungewear",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1602810316693-3667c854239a?q=80&w=1000",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1000"
    ],
    colors: ["Ecru", "Sage", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 76,
    material: "100% Organic Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 35,
    featured: true,
    isNewArrival: true
  },
  // Home
  {
    name: "Minimalist Ceramic Dinnerware Set",
    description: "Handcrafted dinnerware set featuring organic shapes and matte glazes. Each piece is individually made by artisans with subtle variations.",
    price: 69500,
    category: "home",
    subcategory: "dining",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1594125894897-8d545a406867?q=80&w=1000",
      "https://images.unsplash.com/photo-1591203645698-d54c33a5bb00?q=80&w=1000"
    ],
    colors: ["White", "Sand", "Slate"],
    sizes: ["4-Person Set", "8-Person Set"],
    rating: 4.7,
    reviewCount: 62,
    material: "Handcrafted Stoneware Ceramic",
    careInstructions: "Dishwasher safe, avoid microwave",
    inStock: true,
    quantity: 20,
    featured: false,
    isNewArrival: false
  },
  // Travel Accessories
  {
    name: "Vegetable-Tanned Leather Weekender",
    description: "Refined travel bag crafted from vegetable-tanned full-grain leather that will develop a beautiful patina over time. Features solid brass hardware.",
    price: 89500,
    category: "accessories",
    subcategory: "travel",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
      "https://images.unsplash.com/photo-1581605405741-adf442e10b4c?q=80&w=1000"
    ],
    colors: ["Tan", "Black", "Dark Brown"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 48,
    material: "Vegetable-Tanned Full-Grain Leather, Solid Brass Hardware",
    careInstructions: "Treat with leather conditioner as needed",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  // Home Fragrance
  {
    name: "Hand-Poured Soy Wax Candle",
    description: "Luxury candle crafted from soy wax and premium essential oils in a handmade ceramic vessel. When the candle is finished, the vessel becomes a beautiful vase.",
    price: 18500,
    category: "home",
    subcategory: "fragrance",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000",
      "https://images.unsplash.com/photo-1558731396-08d21dc4b41d?q=80&w=1000"
    ],
    colors: ["Cedar & Bergamot", "Fig & Cassis", "Sea Salt & Sage"],
    sizes: ["Large (80hr burn)", "Small (40hr burn)"],
    rating: 4.8,
    reviewCount: 95,
    material: "Soy Wax, Essential Oils, Handmade Ceramic",
    careInstructions: "Trim wick before each use",
    inStock: true,
    quantity: 42,
    featured: false,
    isNewArrival: true
  },
  // Furniture
  {
    name: "Scandinavian Lounge Chair",
    description: "Contemporary lounge chair featuring clean lines and exceptional comfort. Crafted from solid oak with natural leather upholstery.",
    price: 295000,
    category: "home",
    subcategory: "furniture",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000"
    ],
    colors: ["Natural Oak/Tan", "Black Oak/Black", "Walnut/Brown"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 36,
    material: "Solid Oak, Vegetable-Tanned Leather",
    careInstructions: "Dust regularly, treat leather annually",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: false
  },
  // Skincare
  {
    name: "Advanced Recovery Face Oil",
    description: "Luxurious face oil formulated with 20 botanical oils and antioxidants. Packaged in a UV-protective glass bottle with dropper.",
    price: 28500,
    category: "beauty",
    subcategory: "skincare",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?q=80&w=1000",
      "https://images.unsplash.com/photo-1556229182-a1f4b92abe4f?q=80&w=1000"
    ],
    colors: ["30ml"],
    sizes: ["30ml"],
    rating: 4.7,
    reviewCount: 124,
    material: "20 Botanical Oils, Natural Ingredients",
    careInstructions: "Store away from direct sunlight",
    inStock: true,
    quantity: 38,
    featured: false,
    isNewArrival: true
  },
  // Tech Accessories
  {
    name: "Premium Leather AirPods Case",
    description: "Elegant AirPods case crafted from vegetable-tanned leather with a subtle patina effect. Features a solid brass snap closure and keyring.",
    price: 11500,
    category: "accessories",
    subcategory: "tech",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1589923188937-f54c185de9dd?q=80&w=1000",
      "https://images.unsplash.com/photo-1615651598263-b891500e01a7?q=80&w=1000"
    ],
    colors: ["Tan", "Black", "Navy"],
    sizes: ["AirPods 2/3", "AirPods Pro"],
    rating: 4.6,
    reviewCount: 87,
    material: "Vegetable-Tanned Leather, Brass Hardware",
    careInstructions: "Patina will develop naturally with use",
    inStock: true,
    quantity: 45,
    featured: false,
    isNewArrival: true
  }
];

// Combine all additional brand products
const moreAllBrandProducts = [
  ...moreLuxuryBrandProducts,
  ...moreDesignerCollectionProducts,
  ...morePremiumMenswearProducts,
  ...moreFineJewelryProducts,
  ...moreHauteCoutureProducts,
  ...moreModernLuxuryProducts
];

// Function to add products
async function addProducts() {
  // Login first to get cookie
  const cookie = await loginAdmin();
  
  for (const product of moreAllBrandProducts) {
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
  
  console.log(`Attempted to add ${moreAllBrandProducts.length} more brand products.`);
}

// Execute the function
addProducts().catch(console.error);