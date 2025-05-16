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

// Final batch of Luxury Brand Products
const finalLuxuryBrandProducts = [
  // Men's Clothing
  {
    name: "Japanese Denim Selvedge Jeans",
    description: "Premium jeans crafted from Japanese selvedge denim with a perfect slim-tapered fit. Features custom hardware and meticulous stitching details.",
    price: 45000,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
      "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000"
    ],
    colors: ["Indigo", "Black", "Raw Denim"],
    sizes: ["28", "29", "30", "31", "32", "33", "34", "36", "38"],
    rating: 4.8,
    reviewCount: 124,
    material: "Japanese Selvedge Denim",
    careInstructions: "Wash minimally, air dry",
    inStock: true,
    quantity: 56,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Merino Wool Dress Socks Set",
    description: "Luxurious dress socks crafted from fine merino wool with hand-linked toe seams for exceptional comfort. Set of five pairs in classic colors.",
    price: 18500,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000",
      "https://images.unsplash.com/photo-1613569973485-40a183acf10d?q=80&w=1000"
    ],
    colors: ["Classic Set (Navy, Black, Charcoal, Burgundy, Brown)"],
    sizes: ["S/M", "L/XL"],
    rating: 4.7,
    reviewCount: 86,
    material: "Fine Merino Wool",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 72,
    featured: false,
    isNewArrival: false
  },
  // Women's Clothing
  {
    name: "Lightweight Cashmere Wrap",
    description: "Sumptuous cashmere wrap knitted from ultra-fine grade-A cashmere fibers. Perfect for travel or evening events with its lightweight warmth.",
    price: 68500,
    category: "clothing",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000",
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000"
    ],
    colors: ["Ivory", "Soft Grey", "Camel", "Black", "Burgundy"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 68,
    material: "Grade-A Mongolian Cashmere",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 38,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Silk Evening Clutch",
    description: "Elegant evening clutch crafted from pure silk with hand-embroidered floral patterns. Features a vintage-inspired frame closure and detachable chain.",
    price: 89500,
    category: "accessories",
    subcategory: "bags",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1582152629442-4a864303fb96?q=80&w=1000",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000"
    ],
    colors: ["Black", "Champagne", "Emerald"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 42,
    material: "Pure Silk, Metal Frame",
    careInstructions: "Store in dust bag",
    inStock: true,
    quantity: 25,
    featured: true,
    isNewArrival: true
  },
  // Jewelry
  {
    name: "Gold and Diamond Cufflinks",
    description: "Sophisticated cufflinks crafted from 18K yellow gold with central pavé diamond details. Secured with swivel backings for easy wear.",
    price: 175000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1000",
      "https://images.unsplash.com/photo-1573053009372-3dd4b5ab5470?q=80&w=1000"
    ],
    colors: ["Yellow Gold"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 24,
    material: "18K Yellow Gold, Diamonds",
    careInstructions: "Polish with jewelry cloth",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  // Fragrances
  {
    name: "Luxury Oud Parfum",
    description: "Exclusive parfum featuring rare oud wood, bergamot, and amber notes. Presented in a hand-carved crystal bottle with gold accents.",
    price: 58500,
    category: "beauty",
    subcategory: "fragrance",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1000",
      "https://images.unsplash.com/photo-1592945403407-9146f9ab5f85?q=80&w=1000"
    ],
    colors: ["50ml", "100ml"],
    sizes: ["50ml", "100ml"],
    rating: 4.9,
    reviewCount: 56,
    material: "Parfum, Crystal Bottle",
    careInstructions: "Store away from direct sunlight",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: true
  },
  // Home
  {
    name: "Handwoven Cashmere Throw",
    description: "Sumptuous throw blanket handwoven from pure cashmere yarns. Features a subtle herringbone pattern and hand-knotted fringe.",
    price: 145000,
    category: "home",
    subcategory: "textiles",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000"
    ],
    colors: ["Ivory", "Grey", "Camel"],
    sizes: ["130cm x 180cm"],
    rating: 4.8,
    reviewCount: 38,
    material: "100% Pure Cashmere",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Calfskin Leather Card Holder",
    description: "Refined card holder crafted from pebbled calfskin with hand-painted edges. Features six card slots and central compartment for bills.",
    price: 32500,
    category: "accessories",
    subcategory: "small leather goods",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1585532445408-b975d175d404?q=80&w=1000",
      "https://images.unsplash.com/photo-1606422718046-bea43679d39d?q=80&w=1000"
    ],
    colors: ["Black", "Burgundy", "Navy"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 54,
    material: "Pebbled Calfskin",
    careInstructions: "Wipe clean with soft cloth",
    inStock: true,
    quantity: 32,
    featured: false,
    isNewArrival: false
  }
];

// Final batch of Designer Collection Products
const finalDesignerCollectionProducts = [
  // Men's Clothing
  {
    name: "Abstract Print Bomber Jacket",
    description: "Statement bomber jacket featuring an exclusive artist collaboration print. Crafted from technical fabric with a modern silhouette.",
    price: 158500,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=1000",
      "https://images.unsplash.com/photo-1551794840-8ae3b9c2dea7?q=80&w=1000"
    ],
    colors: ["Multi Print"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 38,
    material: "Technical Fabric, Silk Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Pleated Front Trousers",
    description: "Innovative pleated trousers with articulated construction for a dimensional silhouette. Features an elasticated waistband and cropped length.",
    price: 98500,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?q=80&w=1000",
      "https://images.unsplash.com/photo-1507526287430-12b3be5217e7?q=80&w=1000"
    ],
    colors: ["Black", "Navy", "Khaki"],
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.5,
    reviewCount: 28,
    material: "Wool Blend, Technical Fabric",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: false
  },
  // Women's Clothing
  {
    name: "Sculptural Statement Blouse",
    description: "Architectural blouse featuring an avant-garde collar treatment and voluminous sleeves. Crafted from crisp cotton poplin with subtle stretch.",
    price: 118500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1525450824786-227cbef70703?q=80&w=1000",
      "https://images.unsplash.com/photo-1499939667766-4afceb292d05?q=80&w=1000"
    ],
    colors: ["White", "Black", "Red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 32,
    material: "Cotton Poplin with Elastane",
    careInstructions: "Machine wash cold, line dry",
    inStock: true,
    quantity: 20,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Architectural Wide-Leg Pants",
    description: "Statement pants featuring an ultra-wide leg silhouette and high waist. Crafted from fluid technical fabric with elegant drape.",
    price: 122500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000"
    ],
    colors: ["Black", "Ivory", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 28,
    material: "Technical Fabric Blend",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Art-Inspired Silk Scarf",
    description: "Oversized silk scarf featuring a limited edition print collaboration with an emerging abstract artist. Finished with hand-rolled edges.",
    price: 58500,
    category: "accessories",
    subcategory: "scarves",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000"
    ],
    colors: ["Multi Print"],
    sizes: ["140cm x 140cm"],
    rating: 4.8,
    reviewCount: 26,
    material: "100% Silk Twill",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 22,
    featured: true,
    isNewArrival: true
  },
  // Jewelry
  {
    name: "Avant-Garde Statement Earrings",
    description: "Bold, sculptural earrings handcrafted from mixed metals with an artisanal finish. Feature innovative clip-on mechanism for comfortable wear.",
    price: 78500,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1630019925419-28a9c8927b8e?q=80&w=1000",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000"
    ],
    colors: ["Silver/Gold Mix"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 18,
    material: "Mixed Metals, Sterling Silver, Brass",
    careInstructions: "Store in jewelry box",
    inStock: true,
    quantity: 14,
    featured: true,
    isNewArrival: false
  },
  // Bags
  {
    name: "Transformable Canvas Tote",
    description: "Innovative tote bag that can be worn multiple ways via a system of straps and magnetic closures. Features abstract hand-painted details.",
    price: 148500,
    category: "accessories",
    subcategory: "bags",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?q=80&w=1000"
    ],
    colors: ["Canvas/Multi"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 22,
    material: "Canvas, Leather Trim, Metal Hardware",
    careInstructions: "Spot clean only",
    inStock: true,
    quantity: 16,
    featured: false,
    isNewArrival: true
  },
  // Tech Accessories
  {
    name: "Designer Wireless Earbuds Case",
    description: "Statement accessory for wireless earbuds featuring a sculptural silicone design in exclusive colorways. Compatible with most popular earbud models.",
    price: 22500,
    category: "accessories",
    subcategory: "tech",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000",
      "https://images.unsplash.com/photo-1610034695885-b274d0f85f32?q=80&w=1000"
    ],
    colors: ["Neon Yellow", "Black", "Transparent"],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 32,
    material: "Premium Silicone",
    careInstructions: "Wipe clean",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: true
  }
];

// Final batch of Premium Menswear Products
const finalPremiumMenswearProducts = [
  // Suiting
  {
    name: "Herringbone Wool Waistcoat",
    description: "Tailored waistcoat crafted from English herringbone wool. Features a five-button front, adjustable back strap, and patterned lining.",
    price: 28500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1553484771-689277e6c388?q=80&w=1000",
      "https://images.unsplash.com/photo-1553484771-8bbd85e7d8a1?q=80&w=1000"
    ],
    colors: ["Grey", "Navy", "Brown"],
    sizes: ["38", "40", "42", "44", "46"],
    rating: 4.7,
    reviewCount: 46,
    material: "English Wool, Bemberg Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 34,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Cotton Seersucker Blazer",
    description: "Lightweight summer blazer crafted from premium cotton seersucker. Features a half-canvas construction, patch pockets, and horn buttons.",
    price: 12500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1000",
      "https://images.unsplash.com/photo-1552331040-a8e6209bbc82?q=80&w=1000"
    ],
    colors: ["Blue/White", "Tan/White"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    rating: 4.7,
    reviewCount: 38,
    material: "Cotton Seersucker",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Pebble Grain Derby Shoes",
    description: "Classic derby shoes featuring pebble grain calfskin and Dainite rubber soles for all-weather versatility. Crafted with Goodyear-welted construction.",
    price: 12500,
    category: "footwear",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1614252362958-91acbae3aa27?q=80&w=1000",
      "https://images.unsplash.com/photo-1613398773682-9d735771f421?q=80&w=1000"
    ],
    colors: ["Dark Brown", "Black", "Burgundy"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.8,
    reviewCount: 72,
    material: "Pebble Grain Calfskin, Dainite Soles",
    careInstructions: "Use shoe trees, polish regularly",
    inStock: true,
    quantity: 42,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Suede Penny Loafers",
    description: "Refined loafers crafted from premium Italian suede with leather soles. Feature a classic penny keeper detail and hand-stitched construction.",
    price: 11500,
    category: "footwear",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1604686132193-9e88ed2d7f60?q=80&w=1000",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000"
    ],
    colors: ["Tan", "Navy", "Brown", "Burgundy"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.8,
    reviewCount: 65,
    material: "Italian Suede, Leather Soles",
    careInstructions: "Brush regularly, use suede protector",
    inStock: true,
    quantity: 36,
    featured: true,
    isNewArrival: true
  },
  // Casual Wear
  {
    name: "Premium Pima Cotton T-Shirt",
    description: "Luxurious everyday t-shirt crafted from long-staple Pima cotton. Features a perfect medium weight and clean finishing details.",
    price: 8500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1000"
    ],
    colors: ["White", "Black", "Navy", "Grey", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 128,
    material: "100% Pima Cotton",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 85,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Garment-Dyed Chino Trousers",
    description: "Refined casual trousers crafted from premium twill with a garment dye process for rich, dimensional color. Features a tailored fit with slight taper.",
    price: 16500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1560294559-1774a164fb0a?q=80&w=1000",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000"
    ],
    colors: ["Dusty Olive", "Washed Navy", "Stone", "Khaki"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.8,
    reviewCount: 86,
    material: "Premium Cotton Twill",
    careInstructions: "Machine wash cold, hang to dry",
    inStock: true,
    quantity: 58,
    featured: true,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Cashmere-Lined Leather Gloves",
    description: "Elegant gloves crafted from fine nappa leather with a full cashmere lining. Feature a classic three-point stitch detail and button closure.",
    price: 19500,
    category: "accessories",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1595079676722-ddb4b61993c4?q=80&w=1000",
      "https://images.unsplash.com/photo-1609797623185-9a8bca953d14?q=80&w=1000"
    ],
    colors: ["Black", "Dark Brown", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 42,
    material: "Nappa Leather, Cashmere Lining",
    careInstructions: "Specialist leather clean only",
    inStock: true,
    quantity: 32,
    featured: false,
    isNewArrival: true
  },
  // Underwear
  {
    name: "Premium Cotton Boxer Briefs Set",
    description: "Luxurious everyday underwear crafted from long-staple Supima cotton with perfect stretch. Set of three in classic colors.",
    price: 9500,
    category: "clothing",
    subcategory: "underwear",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000"
    ],
    colors: ["Classic Set (Navy, Grey, Black)"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 134,
    material: "95% Supima Cotton, 5% Elastane",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 95,
    featured: false,
    isNewArrival: false
  }
];

// Final batch of Fine Jewelry Products
const finalFineJewelryProducts = [
  // Diamond Jewelry
  {
    name: "Princess-Cut Diamond Studs",
    description: "Timeless stud earrings featuring princess-cut diamonds of exceptional clarity. Set in minimalist four-prong platinum settings.",
    price: 895000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1633934548711-f4dc0e873b69?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["1 carat total", "2 carats total", "3 carats total"],
    rating: 4.9,
    reviewCount: 28,
    material: "Platinum, VS1 Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Three-Stone Diamond Ring",
    description: "Classic three-stone ring featuring a central oval diamond flanked by two round brilliants. Symbolizes your past, present, and future together.",
    price: 1685000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Platinum", "White Gold", "Yellow Gold"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8"],
    rating: 5.0,
    reviewCount: 19,
    material: "Platinum or 18K Gold, VS1 Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  // Pearl Jewelry
  {
    name: "Tahitian Pearl Earrings",
    description: "Sophisticated earrings featuring naturally dark Tahitian pearls. Set in minimalist 18K white gold settings with diamond accents.",
    price: 295000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1613746203812-717e6e5da8b9?q=80&w=1000"
    ],
    colors: ["White Gold/Tahitian Pearl"],
    sizes: ["10-11mm Pearl"],
    rating: 4.8,
    reviewCount: 22,
    material: "18K White Gold, Tahitian Pearls, Diamonds",
    careInstructions: "Wipe with soft cloth after wearing",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Golden South Sea Pearl Pendant",
    description: "Striking pendant featuring a rare golden South Sea pearl suspended from a diamond-set bail. Includes an 18K gold chain.",
    price: 385000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1613746203812-717e6e5da8b9?q=80&w=1000"
    ],
    colors: ["Yellow Gold/Golden Pearl"],
    sizes: ["13-14mm Pearl", "18\" Chain"],
    rating: 4.9,
    reviewCount: 16,
    material: "18K Yellow Gold, South Sea Pearl, Diamonds",
    careInstructions: "Avoid contact with chemicals",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  // Gemstone Jewelry
  {
    name: "Ceylon Sapphire Ring",
    description: "Spectacular ring featuring a 4-carat oval Ceylon sapphire surrounded by a double halo of diamonds. Set in platinum for a timeless look.",
    price: 1250000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Platinum/Blue"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 5.0,
    reviewCount: 14,
    material: "Platinum, Ceylon Sapphire, Diamonds",
    careInstructions: "Avoid ultrasonic cleaners",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Emerald and Diamond Drop Earrings",
    description: "Elegant drop earrings featuring pear-shaped Colombian emeralds suspended from a line of graduated diamonds. Set in 18K white gold.",
    price: 1350000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1633934548711-f4dc0e873b69?q=80&w=1000"
    ],
    colors: ["White Gold/Emerald"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 12,
    material: "18K White Gold, Colombian Emeralds, Diamonds",
    careInstructions: "Avoid contact with water and chemicals",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  // Men's Collection
  {
    name: "Platinum and Black Diamond Band",
    description: "Sophisticated men's band featuring channel-set black diamonds in a matte platinum setting. Features a comfort-fit interior.",
    price: 375000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Platinum/Black"],
    sizes: ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.8,
    reviewCount: 18,
    material: "Platinum, Black Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: true
  },
  // Bridal Sets
  {
    name: "Marquise Diamond Bridal Set",
    description: "Stunning bridal set featuring a marquise-cut center diamond engagement ring and matching diamond eternity band. Set in platinum.",
    price: 1850000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8"],
    rating: 5.0,
    reviewCount: 16,
    material: "Platinum, VVS1 Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  }
];

// Final batch of Haute Couture Products
const finalHauteCoutureProducts = [
  // Evening Gowns
  {
    name: "Velvet and Lace Evening Gown",
    description: "Dramatic evening gown combining plush velvet with French Chantilly lace. Features a corseted bodice and expertly constructed fishtail skirt.",
    price: 1695000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000"
    ],
    colors: ["Midnight Blue", "Burgundy", "Emerald"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.9,
    reviewCount: 12,
    material: "Italian Velvet, French Chantilly Lace",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Hand-Painted Silk Organza Gown",
    description: "Ethereal gown crafted from multiple layers of silk organza with hand-painted floral details. Features a dramatic open back and sweeping train.",
    price: 1895000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000"
    ],
    colors: ["Multi Floral"],
    sizes: ["0", "2", "4", "6", "8", "Custom"],
    rating: 5.0,
    reviewCount: 9,
    material: "Silk Organza, Hand-Painted Details",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Bridal
  {
    name: "3D Floral Appliqué Wedding Gown",
    description: "Breathtaking wedding gown featuring thousands of hand-cut and sewn 3D floral appliqués. Includes a detachable cathedral-length train.",
    price: 2850000,
    category: "clothing",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1513177126531-77f75a4d76b5?q=80&w=1000",
      "https://images.unsplash.com/photo-1550305933-4c2f0ea7ed5e?q=80&w=1000"
    ],
    colors: ["Ivory", "Blush", "White"],
    sizes: ["2", "4", "6", "8", "10", "Custom"],
    rating: 5.0,
    reviewCount: 14,
    material: "Silk Tulle, 3D Floral Appliqués",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Royal Lace Wedding Cape",
    description: "Stunning lace cape featuring a dramatically long train. An alternative to a traditional veil, designed to be worn over a simple gown.",
    price: 975000,
    category: "accessories",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000",
      "https://images.unsplash.com/photo-1550305933-4c2f0ea7ed5e?q=80&w=1000"
    ],
    colors: ["Ivory", "White"],
    sizes: ["Cathedral Length"],
    rating: 4.9,
    reviewCount: 11,
    material: "French Alençon Lace",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 6,
    featured: false,
    isNewArrival: true
  },
  // Special Occasion
  {
    name: "Sequined Cocktail Dress",
    description: "Show-stopping cocktail dress completely covered in hand-applied sequins. Features a dramatic neckline and meticulously sculpted silhouette.",
    price: 695000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1000",
      "https://images.unsplash.com/photo-1619532550216-9e640328d2e5?q=80&w=1000"
    ],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.9,
    reviewCount: 18,
    material: "Silk Base, Hand-Applied Sequins",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Pleated Silk Midi Dress",
    description: "Architectural midi dress featuring hundreds of hand-pleated silk panels. Each pleat is precisely measured and pressed for a perfect accordion effect.",
    price: 585000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1596133108879-a657e8b571ca?q=80&w=1000",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000"
    ],
    colors: ["Emerald", "Sapphire Blue", "Ruby"],
    sizes: ["0", "2", "4", "6", "8", "Custom"],
    rating: 4.8,
    reviewCount: 15,
    material: "Hand-Pleated Silk",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 7,
    featured: false,
    isNewArrival: true
  },
  // Men's Formal
  {
    name: "Custom Silk Jacquard Dinner Jacket",
    description: "Exceptional dinner jacket crafted from custom-woven silk jacquard. Features silk-covered buttons, hand-piped pockets, and custom lining.",
    price: 985000,
    category: "clothing",
    subcategory: "men",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1593032534613-11c9498429d8?q=80&w=1000",
      "https://images.unsplash.com/photo-1553484771-689277e6c388?q=80&w=1000"
    ],
    colors: ["Midnight Blue", "Black", "Burgundy"],
    sizes: ["Custom"],
    rating: 4.9,
    reviewCount: 9,
    material: "Custom-Woven Silk Jacquard",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Embellished Evening Bag",
    description: "Exquisite minaudière entirely covered in hand-applied Swarovski crystals arranged in an ombré pattern. Features a jeweled clasp closure.",
    price: 225000,
    category: "accessories",
    subcategory: "bags",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?q=80&w=1000",
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1000"
    ],
    colors: ["Silver/Crystal", "Gold/Crystal", "Black/Crystal"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 16,
    material: "Swarovski Crystals, Silk Lining",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  }
];

// Final batch of Modern Luxury Products
const finalModernLuxuryProducts = [
  // Clothing
  {
    name: "Merino Wool Lounge Pants",
    description: "Refined lounge pants crafted from ultra-fine merino wool. Feature a clean, minimal design with drawstring waist and perfect drape.",
    price: 22500,
    category: "clothing",
    subcategory: "loungewear",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
      "https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1000"
    ],
    colors: ["Grey", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 68,
    material: "100% Merino Wool",
    careInstructions: "Hand wash or dry clean",
    inStock: true,
    quantity: 42,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Japanese Cotton Oversized Shirt",
    description: "Relaxed shirt crafted from Japanese cotton with a beautifully textured surface. Features a modern oversized fit and clean detailing.",
    price: 18500,
    category: "clothing",
    subcategory: "unisex",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000"
    ],
    colors: ["White", "Black", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 85,
    material: "Japanese Cotton",
    careInstructions: "Machine wash cold, hang to dry",
    inStock: true,
    quantity: 58,
    featured: true,
    isNewArrival: true
  },
  // Home
  {
    name: "Minimal Leather Accent Chair",
    description: "Contemporary accent chair featuring clean lines and a floating leather seat. Crafted from solid walnut with vegetable-tanned leather.",
    price: 259500,
    category: "home",
    subcategory: "furniture",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
      "https://images.unsplash.com/photo-1494028698538-2cd52a400b17?q=80&w=1000"
    ],
    colors: ["Walnut/Tan", "Walnut/Black"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 32,
    material: "Solid Walnut, Vegetable-Tanned Leather",
    careInstructions: "Dust wood with soft cloth, condition leather annually",
    inStock: true,
    quantity: 14,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Handcrafted Ceramic Table Lamp",
    description: "Sculptural table lamp featuring a handcrafted ceramic base with a reactive glaze that creates unique variations in each piece.",
    price: 165000,
    category: "home",
    subcategory: "lighting",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000"
    ],
    colors: ["Cream", "Grey", "Blue"],
    sizes: ["H45cm x W30cm"],
    rating: 4.8,
    reviewCount: 28,
    material: "Handcrafted Ceramic, Linen Shade",
    careInstructions: "Dust with soft cloth",
    inStock: true,
    quantity: 16,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Vegetable-Tanned Leather Wallet",
    description: "Minimalist wallet crafted from vegetable-tanned leather that will develop a beautiful patina with use. Features precise edge painting and clean details.",
    price: 18500,
    category: "accessories",
    subcategory: "small leather goods",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1585532445408-b975d175d404?q=80&w=1000",
      "https://images.unsplash.com/photo-1606422718046-bea43679d39d?q=80&w=1000"
    ],
    colors: ["Tan", "Black", "Navy"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 96,
    material: "Vegetable-Tanned Leather",
    careInstructions: "Will naturally patina with use",
    inStock: true,
    quantity: 42,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Sapphire Crystal Watch",
    description: "Minimalist timepiece featuring a sapphire crystal face and Swiss automatic movement. Case and band crafted from hypoallergenic titanium.",
    price: 285000,
    category: "accessories",
    subcategory: "watches",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000",
      "https://images.unsplash.com/photo-1614703185627-903d6502c33f?q=80&w=1000"
    ],
    colors: ["Titanium/White Dial", "Titanium/Black Dial"],
    sizes: ["38mm", "41mm"],
    rating: 4.9,
    reviewCount: 48,
    material: "Titanium, Sapphire Crystal",
    careInstructions: "Professional service every 5 years",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  // Technology
  {
    name: "Premium Leather Tech Portfolio",
    description: "Sophisticated portfolio that organizes your tech essentials in minimalist luxury. Features dedicated spaces for tablet, accessories, and documents.",
    price: 38500,
    category: "accessories",
    subcategory: "tech",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1618029555069-e9d76e53dd3f?q=80&w=1000",
      "https://images.unsplash.com/photo-1596979246158-63794b081bac?q=80&w=1000"
    ],
    colors: ["Black", "Tan", "Navy"],
    sizes: ["13\"", "16\""],
    rating: 4.8,
    reviewCount: 38,
    material: "Full-Grain Leather, Microsuede Interior",
    careInstructions: "Wipe clean with damp cloth",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: true
  },
  // Bath & Body
  {
    name: "Botanical Hand Care Set",
    description: "Luxury hand care set featuring cold-pressed botanical oils and organic extracts. Includes hand wash, scrub, and cream in minimal glass containers.",
    price: 12500,
    category: "beauty",
    subcategory: "bath",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?q=80&w=1000",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000"
    ],
    colors: ["Set of 3"],
    sizes: ["Set of 3"],
    rating: 4.7,
    reviewCount: 68,
    material: "Organic Botanical Extracts, Glass Containers",
    careInstructions: "Store away from direct sunlight",
    inStock: true,
    quantity: 35,
    featured: false,
    isNewArrival: true
  }
];

// Combine all additional brand products
const finalAllBrandProducts = [
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
  
  for (const product of finalAllBrandProducts) {
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
  
  console.log(`Attempted to add ${finalAllBrandProducts.length} more brand products.`);
}

// Execute the function
addProducts().catch(console.error);