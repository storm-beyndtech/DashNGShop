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

// Luxury Brand Products
const luxuryBrandProducts = [
  // Men's clothing
  {
    name: "Luxury Cashmere Overcoat",
    description: "Impeccably tailored cashmere overcoat with a sleek silhouette and satin lining. Perfect for formal occasions and cold-weather elegance.",
    price: 379900,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1611937663641-5cef5189d71b?q=80&w=1000",
      "https://images.unsplash.com/photo-1611937663158-491a349c4cd7?q=80&w=1000"
    ],
    colors: ["Charcoal", "Camel", "Navy"],
    sizes: ["48", "50", "52", "54", "56"],
    rating: 4.9,
    reviewCount: 78,
    material: "100% Cashmere",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Silk Jacquard Dress Shirt",
    description: "Exquisite silk jacquard dress shirt with mother-of-pearl buttons and French cuffs. The epitome of refined formal attire.",
    price: 45000,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1000"
    ],
    colors: ["White", "Ivory", "Sky Blue"],
    sizes: ["15", "15.5", "16", "16.5", "17", "17.5"],
    rating: 4.8,
    reviewCount: 65,
    material: "100% Silk",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 25,
    featured: false,
    isNewArrival: true
  },
  // Women's clothing
  {
    name: "Embellished Evening Gown",
    description: "Breathtaking floor-length evening gown with hand-sewn crystal embellishments and a draped back. Made for unforgettable entrances.",
    price: 895000,
    category: "clothing",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1000"
    ],
    colors: ["Midnight Blue", "Ruby", "Emerald"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    rating: 4.9,
    reviewCount: 42,
    material: "Silk, Swarovski Crystals",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Tailored Wool Pantsuit",
    description: "Sophisticated wool pantsuit with impeccable Italian tailoring. Features a fitted blazer and high-waisted trousers for a powerful silhouette.",
    price: 298000,
    category: "clothing",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=1000",
      "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?q=80&w=1000"
    ],
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["0", "2", "4", "6", "8", "10", "12", "14"],
    rating: 4.8,
    reviewCount: 57,
    material: "Virgin Wool, Silk Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 15,
    featured: false,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Crocodile Leather Briefcase",
    description: "Handcrafted crocodile leather briefcase with solid brass hardware and meticulously hand-stitched details. Lined with supple suede.",
    price: 1250000,
    category: "accessories",
    subcategory: "bags",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000"
    ],
    colors: ["Cognac", "Black", "Dark Brown"],
    sizes: ["One Size"],
    rating: 5.0,
    reviewCount: 24,
    material: "Genuine Crocodile Leather, Brass Hardware",
    careInstructions: "Keep dry, condition with leather cream",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Footwear
  {
    name: "Hand-Welted Oxford Shoes",
    description: "The pinnacle of shoemaking craftsmanship. These hand-welted oxford shoes are made from the finest calfskin and feature a painted patina finish.",
    price: 185000,
    category: "footwear",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?q=80&w=1000",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000"
    ],
    colors: ["Dark Burgundy", "Black", "Dark Brown"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.9,
    reviewCount: 86,
    material: "Full-grain Calfskin, Leather Sole",
    careInstructions: "Use shoe trees, polish regularly",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  // Watches
  {
    name: "Tourbillon Chronograph Watch",
    description: "Masterpiece of haute horlogerie featuring a flying tourbillon and chronograph complications. Limited edition with 18K rose gold case.",
    price: 8950000,
    category: "accessories",
    subcategory: "watches",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000",
      "https://images.unsplash.com/photo-1633115384130-49f50dd42ff0?q=80&w=1000"
    ],
    colors: ["Rose Gold/Black"],
    sizes: ["42mm"],
    rating: 5.0,
    reviewCount: 12,
    material: "18K Rose Gold, Sapphire Crystal",
    careInstructions: "Professional service every 3-5 years",
    inStock: true,
    quantity: 3,
    featured: true,
    isNewArrival: true
  }
];

// Designer Collection Products
const designerCollectionProducts = [
  // Men's Apparel
  {
    name: "Geometric Print Silk Shirt",
    description: "Bold geometric print silk shirt with modern camp collar. Perfect for making a statement at summer events or upscale casual occasions.",
    price: 89500,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1000",
      "https://images.unsplash.com/photo-1615310748000-6baa6e32e438?q=80&w=1000"
    ],
    colors: ["Multi", "Blue/Orange", "Black/White"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 48,
    material: "100% Silk",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Deconstructed Cotton Blazer",
    description: "Contemporary deconstructed blazer crafted from premium Italian cotton. Features asymmetric details and a relaxed yet refined silhouette.",
    price: 167500,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1000",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000"
    ],
    colors: ["Ecru", "Navy", "Olive"],
    sizes: ["46", "48", "50", "52", "54"],
    rating: 4.6,
    reviewCount: 35,
    material: "98% Cotton, 2% Elastane",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  // Women's Apparel
  {
    name: "Draped Asymmetric Dress",
    description: "Stunning asymmetric dress featuring artistic draping and an adjustable silhouette. The perfect statement piece for gallery openings and creative events.",
    price: 129500,
    discountPrice: 97125,
    discountPercentage: 25,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000"
    ],
    colors: ["Black", "Ivory", "Burgundy"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviewCount: 63,
    material: "Viscose Blend",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Avant-Garde Printed Jumpsuit",
    description: "Bold, contemporary jumpsuit with custom-designed abstract print. Features a dramatic wide-leg silhouette and distinctive cutout details.",
    price: 157500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?q=80&w=1000",
      "https://images.unsplash.com/photo-1587242979142-a882facb95c1?q=80&w=1000"
    ],
    colors: ["Multi Print"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 42,
    material: "100% Silk",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 9,
    featured: true,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Architectural Statement Earrings",
    description: "Bold, sculptural earrings inspired by contemporary architecture. Handcrafted in sterling silver with 18K gold accents.",
    price: 68000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1630019925419-28a9c8927b8e?q=80&w=1000",
      "https://images.unsplash.com/photo-1633934542430-0a07bd51cb1e?q=80&w=1000"
    ],
    colors: ["Silver/Gold"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 28,
    material: "Sterling Silver, 18K Gold",
    careInstructions: "Store in jewelry box, avoid moisture",
    inStock: true,
    quantity: 15,
    featured: false,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Chunky Platform Sneakers",
    description: "Avant-garde platform sneakers featuring exaggerated proportions and mixed materials. A true statement piece for the fashion-forward.",
    price: 119500,
    category: "footwear",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000"
    ],
    colors: ["White/Multi", "Black/Silver"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.6,
    reviewCount: 54,
    material: "Leather, Technical Fabric, Rubber",
    careInstructions: "Wipe clean with damp cloth",
    inStock: true,
    quantity: 20,
    featured: true,
    isNewArrival: true
  },
  // Bags
  {
    name: "Geometric Leather Tote",
    description: "Architectural tote bag with innovative geometric construction. Features color-block panels and an origami-inspired expandable design.",
    price: 189500,
    category: "accessories",
    subcategory: "bags",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1628033346805-d7b958bd8029?q=80&w=1000",
      "https://images.unsplash.com/photo-1594223274512-ad4200e99e81?q=80&w=1000"
    ],
    colors: ["Black/White", "Navy/Tan", "Grey/Yellow"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 37,
    material: "Premium Calfskin",
    careInstructions: "Avoid rain, store with dust bag",
    inStock: true,
    quantity: 14,
    featured: true,
    isNewArrival: false
  }
];

// Premium Menswear Products
const premiumMenswearProducts = [
  // Suits
  {
    name: "English Wool Three-Piece Suit",
    description: "Impeccably tailored three-piece suit crafted from English wool with a subtle herringbone pattern. Features a classic notch lapel and a modern slim-fit silhouette.",
    price: 285000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1000",
      "https://images.unsplash.com/photo-1641318516896-acfa7f0699c8?q=80&w=1000"
    ],
    colors: ["Charcoal", "Navy", "Deep Blue"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "40L", "42L", "44L"],
    rating: 4.9,
    reviewCount: 87,
    material: "100% English Wool, Bemberg Lining",
    careInstructions: "Dry clean only, store on proper hanger",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Italian Linen Summer Blazer",
    description: "Lightweight Italian linen blazer with half-canvas construction and mother-of-pearl buttons. The perfect refined option for warm-weather events.",
    price: 135000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1000",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000"
    ],
    colors: ["Beige", "Light Blue", "Olive"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "48R"],
    rating: 4.7,
    reviewCount: 56,
    material: "100% Italian Linen",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: true
  },
  // Shirts
  {
    name: "Sea Island Cotton Dress Shirt",
    description: "Luxurious dress shirt made from rare Sea Island cotton, known for its exceptional softness and lustrous appearance. Features mother-of-pearl buttons and double cuffs.",
    price: 35000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000"
    ],
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["15", "15.5", "16", "16.5", "17", "17.5"],
    rating: 4.8,
    reviewCount: 64,
    material: "100% Sea Island Cotton",
    careInstructions: "Machine wash cold or dry clean",
    inStock: true,
    quantity: 45,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Japanese Selvedge Oxford Shirt",
    description: "Refined casual shirt crafted from premium Japanese selvedge oxford cloth. Features a button-down collar and a classic, comfortable fit.",
    price: 29500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1000",
      "https://images.unsplash.com/photo-1624378439575-d8705ad01dce?q=80&w=1000"
    ],
    colors: ["White", "Blue", "University Stripe"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 82,
    material: "Japanese Selvedge Cotton Oxford",
    careInstructions: "Machine wash cold, hang to dry",
    inStock: true,
    quantity: 38,
    featured: false,
    isNewArrival: true
  },
  // Outerwear
  {
    name: "British Waxed Cotton Field Jacket",
    description: "Classic field jacket crafted from British Millerain waxed cotton with leather trim accents. Features multiple utility pockets and a corduroy-lined collar.",
    price: 89500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000",
      "https://images.unsplash.com/photo-1586182987320-4f17e36840be?q=80&w=1000"
    ],
    colors: ["Olive", "Navy", "Brown"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewCount: 72,
    material: "British Millerain Waxed Cotton, Leather Trim",
    careInstructions: "Rewax annually, brush clean, do not wash",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: false
  },
  // Footwear
  {
    name: "Goodyear-Welted Chelsea Boots",
    description: "Handcrafted Chelsea boots featuring Goodyear-welted construction for durability and a sleek, timeless silhouette. Made from Italian calfskin with leather lining.",
    price: 137500,
    category: "footwear",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1638247025967-e401d577c6f9?q=80&w=1000",
      "https://images.unsplash.com/photo-1635189470046-f05ed8f0563f?q=80&w=1000"
    ],
    colors: ["Dark Brown", "Black", "Tan"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.8,
    reviewCount: 94,
    material: "Italian Calfskin, Leather Sole",
    careInstructions: "Polish regularly, use shoe trees",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Hand-Rolled Silk Pocket Square",
    description: "Elegant pocket square crafted from lightweight silk twill and finished with meticulously hand-rolled edges. Features a painterly abstract design.",
    price: 12500,
    category: "accessories",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1598833228985-dc3589aee219?q=80&w=1000",
      "https://images.unsplash.com/photo-1598967276840-bebd318ba0e3?q=80&w=1000"
    ],
    colors: ["Navy/Burgundy", "Green/Gold", "Blue/Grey"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 48,
    material: "100% Silk Twill",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 65,
    featured: false,
    isNewArrival: false
  }
];

// Fine Jewelry Products
const fineJewelryProducts = [
  // Diamond Jewelry
  {
    name: "Cushion-Cut Diamond Engagement Ring",
    description: "Exquisite cushion-cut diamond engagement ring featuring a 2-carat center stone of exceptional clarity. Set in platinum with a delicate pavé band.",
    price: 2495000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605087805524-a8c4270fe290?q=80&w=1000",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 5.0,
    reviewCount: 32,
    material: "Platinum, VVS1 Diamond",
    careInstructions: "Professional cleaning recommended every 6 months",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Diamond Eternity Band",
    description: "Timeless eternity band featuring 3 carats of perfectly matched round brilliant diamonds in a shared-prong setting. Available in platinum or gold.",
    price: 985000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1608672790994-bf6b332ff749?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Platinum", "Yellow Gold", "Rose Gold", "White Gold"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8"],
    rating: 4.9,
    reviewCount: 47,
    material: "Platinum or 18K Gold, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: false
  },
  // Colored Gemstones
  {
    name: "Burmese Ruby and Diamond Necklace",
    description: "Extraordinary necklace featuring a 5-carat Burmese ruby pendant surrounded by a halo of diamonds. Set in 18K white gold with a delicate chain.",
    price: 3895000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1000",
      "https://images.unsplash.com/photo-1608042314421-4c1b346d2f9d?q=80&w=1000"
    ],
    colors: ["White Gold/Ruby"],
    sizes: ["16 inches", "18 inches"],
    rating: 5.0,
    reviewCount: 21,
    material: "18K White Gold, Burmese Ruby, Diamonds",
    careInstructions: "Store separately, avoid chemicals",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Sapphire and Diamond Drop Earrings",
    description: "Elegant drop earrings featuring oval Ceylon sapphires framed by brilliant-cut diamonds. A sophisticated addition to both evening and formal daywear.",
    price: 1685000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1589207242685-ca6d929d0836?q=80&w=1000",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000"
    ],
    colors: ["White Gold/Sapphire"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 28,
    material: "18K White Gold, Ceylon Sapphires, Diamonds",
    careInstructions: "Avoid perfumes and water contact",
    inStock: true,
    quantity: 6,
    featured: false,
    isNewArrival: false
  },
  // Pearl Jewelry
  {
    name: "South Sea Pearl Strand",
    description: "Luxurious necklace featuring perfectly matched South Sea pearls of exceptional luster. Each pearl measures 13-15mm with a diamond and platinum clasp.",
    price: 2295000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1601121141418-7361ae9c9d43?q=80&w=1000",
      "https://images.unsplash.com/photo-1602173979469-d0c718e7de24?q=80&w=1000"
    ],
    colors: ["Pearl White"],
    sizes: ["18 inches"],
    rating: 4.9,
    reviewCount: 35,
    material: "South Sea Pearls, Platinum, Diamonds",
    careInstructions: "Wipe with soft cloth after wearing, store flat",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Men's Jewelry
  {
    name: "Diamond Pavé Cufflinks",
    description: "Sophisticated square cufflinks featuring black onyx centers surrounded by pavé-set diamonds. Crafted in 18K white gold with a secure swivel backing.",
    price: 145000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1610395219791-21b0353e4ba6?q=80&w=1000",
      "https://images.unsplash.com/photo-1585123334185-70ed957f1a15?q=80&w=1000"
    ],
    colors: ["White Gold/Black"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 22,
    material: "18K White Gold, Black Onyx, Diamonds",
    careInstructions: "Wipe with soft cloth after wearing",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: true
  },
  // Watches
  {
    name: "Moonphase Perpetual Calendar Watch",
    description: "Masterpiece of haute horlogerie featuring a moonphase display and perpetual calendar complications. Crafted in 18K rose gold with an alligator strap.",
    price: 6550000,
    category: "accessories",
    subcategory: "watches",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000",
      "https://images.unsplash.com/photo-1509941943102-10c232535736?q=80&w=1000"
    ],
    colors: ["Rose Gold/Brown"],
    sizes: ["40mm"],
    rating: 5.0,
    reviewCount: 18,
    material: "18K Rose Gold, Alligator Leather",
    careInstructions: "Professional service every 3-5 years",
    inStock: true,
    quantity: 3,
    featured: true,
    isNewArrival: true
  }
];

// Haute Couture Products
const hauteCoutureProducts = [
  // Gowns
  {
    name: "Hand-Beaded Couture Gown",
    description: "Extraordinary evening gown featuring over 5,000 hand-sewn crystal and pearl embellishments. Expertly crafted with an internal corset and dramatic train.",
    price: 2185000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1600275669439-14e40452d20b?q=80&w=1000",
      "https://images.unsplash.com/photo-1579656450812-5b1e93c60071?q=80&w=1000"
    ],
    colors: ["Champagne", "Black", "Silver"],
    sizes: ["2", "4", "6", "8", "10", "Custom"],
    rating: 5.0,
    reviewCount: 14,
    material: "Silk Organza, Swarovski Crystals, Pearls",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Sculptural Duchesse Satin Gown",
    description: "Architectural evening gown crafted from Italian duchesse satin. Features a dramatic sculptural silhouette with origami-inspired folds and a sweeping train.",
    price: 1895000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1000",
      "https://images.unsplash.com/photo-1608228088998-57828365d486?q=80&w=1000"
    ],
    colors: ["Ivory", "Crimson", "Midnight Blue"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.9,
    reviewCount: 12,
    material: "Italian Duchesse Satin, Silk Lining",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Bridal
  {
    name: "Handcrafted Lace Bridal Gown",
    description: "Exquisite bridal gown featuring rare Alençon lace appliqué hand-sewn by master artisans. Includes a cathedral-length veil with matching lace details.",
    price: 2495000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1582846149398-b8ef35c26bd5?q=80&w=1000",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000"
    ],
    colors: ["Ivory", "White", "Champagne"],
    sizes: ["2", "4", "6", "8", "10", "Custom"],
    rating: 5.0,
    reviewCount: 18,
    material: "Alençon Lace, Silk Organza, Tulle",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  // Cocktail Dresses
  {
    name: "Feathered Cocktail Dress",
    description: "Statement cocktail dress featuring individually hand-applied ostrich feathers. Includes a finely tailored silk underlayer and invisible internal structure.",
    price: 895000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000"
    ],
    colors: ["Black", "Blush", "Peacock Blue"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.8,
    reviewCount: 16,
    material: "Ostrich Feathers, Silk, Internal Boning",
    careInstructions: "Speciality dry cleaning only",
    inStock: true,
    quantity: 7,
    featured: false,
    isNewArrival: true
  },
  // Men's Haute Couture
  {
    name: "Hand-Tailored Tuxedo Ensemble",
    description: "Exceptional bespoke tuxedo featuring hand-padded canvassing, hand-sewn buttonholes, and custom silk peak lapels. Includes trousers and waistcoat.",
    price: 895000,
    category: "clothing",
    subcategory: "men",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1553484771-689277e6c388?q=80&w=1000",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1000"
    ],
    colors: ["Black", "Midnight Blue"],
    sizes: ["Custom"],
    rating: 5.0,
    reviewCount: 10,
    material: "Super 180s Wool, Silk Lining, Mother-of-Pearl Buttons",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Couture Evening Clutch",
    description: "Art piece evening clutch featuring hand-embroidered crystal and metallic thread work. Each piece requires over 300 hours of craftsmanship.",
    price: 189500,
    category: "accessories",
    subcategory: "bags",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?q=80&w=1000",
      "https://images.unsplash.com/photo-1579727027525-352607d8dc49?q=80&w=1000"
    ],
    colors: ["Gold/Crystal", "Silver/Pearl", "Black/Jet"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 22,
    material: "Silk Base, Crystals, Metallic Embroidery",
    careInstructions: "Handle with care, store in provided box",
    inStock: true,
    quantity: 9,
    featured: true,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Crystal Embellished Evening Shoes",
    description: "Extraordinary evening shoes featuring over 3,000 hand-applied crystals. Crafted from satin and leather with a perfectly balanced 100mm heel.",
    price: 259500,
    category: "footwear",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6b00b37?q=80&w=1000"
    ],
    colors: ["Crystal/Silver", "Crystal/Gold", "Crystal/Black"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.8,
    reviewCount: 15,
    material: "Satin, Leather, Swarovski Crystals",
    careInstructions: "Use shoe bags, avoid moisture",
    inStock: true,
    quantity: 7,
    featured: false,
    isNewArrival: true
  }
];

// Modern Luxury Products
const modernLuxuryProducts = [
  // Clothing
  {
    name: "Contemporary Cashmere Hoodie",
    description: "Redefined luxury casual hoodie crafted from grade-A Mongolian cashmere. Features clean lines, minimalist hardware, and impeccable finishing.",
    price: 125000,
    category: "clothing",
    subcategory: "unisex",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1572495685933-bd884514da0b?q=80&w=1000",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000"
    ],
    colors: ["Heather Grey", "Camel", "Black", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 84,
    material: "100% Grade-A Mongolian Cashmere",
    careInstructions: "Dry clean or gentle hand wash cold",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Architectural Wool Coat",
    description: "Minimalist wool coat featuring an architectural silhouette and asymmetric closure. Crafted with precision from premium double-faced wool.",
    price: 195000,
    category: "clothing",
    subcategory: "women",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000"
    ],
    colors: ["Camel", "Black", "Ivory"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 56,
    material: "Double-Faced Italian Wool",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: false
  },
  // Home Decor
  {
    name: "Marble and Brass Coffee Table",
    description: "Sculptural coffee table featuring a floating Carrara marble top and brushed brass legs. A perfect balance of natural materials and contemporary design.",
    price: 385000,
    category: "home",
    subcategory: "furniture",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1592789705501-f9ae4287c4cf?q=80&w=1000",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000"
    ],
    colors: ["Marble/Brass"],
    sizes: ["120cm x 70cm x 35cm"],
    rating: 4.8,
    reviewCount: 32,
    material: "Carrara Marble, Brushed Brass",
    careInstructions: "Wipe clean with damp cloth, use stone sealer annually",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Hand-Blown Glass Pendant Light",
    description: "Contemporary pendant light featuring hand-blown glass in organic forms. Each piece is unique with subtle variations in color and shape.",
    price: 189500,
    category: "home",
    subcategory: "lighting",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000"
    ],
    colors: ["Amber", "Smoke", "Clear"],
    sizes: ["35cm x 35cm"],
    rating: 4.7,
    reviewCount: 28,
    material: "Hand-Blown Glass, Brushed Brass Fittings",
    careInstructions: "Dust gently, clean with glass cleaner",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Minimalist Ceramic Watch",
    description: "Sophisticated timepiece featuring a ceramic case and bracelet with a sapphire crystal face. Combines modern materials with timeless design principles.",
    price: 178500,
    category: "accessories",
    subcategory: "watches",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000",
      "https://images.unsplash.com/photo-1633113215883-a43e36bc6178?q=80&w=1000"
    ],
    colors: ["White", "Black", "Grey"],
    sizes: ["38mm", "42mm"],
    rating: 4.8,
    reviewCount: 65,
    material: "High-Tech Ceramic, Sapphire Crystal",
    careInstructions: "Wipe with soft cloth, avoid impacts",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  // Technology
  {
    name: "Artisanal Leather Tech Accessories Set",
    description: "Premium tech accessories set including laptop sleeve, cable organizer, and wireless charger pad. Handcrafted from vegetable-tanned leather.",
    price: 89500,
    category: "accessories",
    subcategory: "tech",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1603899383878-501dc9ac3b95?q=80&w=1000",
      "https://images.unsplash.com/photo-1613203256348-58d63d6a19df?q=80&w=1000"
    ],
    colors: ["Tan", "Black", "Navy"],
    sizes: ["13\"", "15\"", "16\""],
    rating: 4.8,
    reviewCount: 47,
    material: "Vegetable-Tanned Full-Grain Leather",
    careInstructions: "Treat with leather conditioner as needed",
    inStock: true,
    quantity: 25,
    featured: true,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Handcrafted Minimal Sneakers",
    description: "Refined sneakers featuring clean lines and minimalist design. Handcrafted from full-grain Italian leather with artisanal construction methods.",
    price: 49500,
    category: "footwear",
    subcategory: "unisex",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1000"
    ],
    colors: ["White", "Black", "Grey", "Navy"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    rating: 4.7,
    reviewCount: 92,
    material: "Italian Full-Grain Leather, Margom Soles",
    careInstructions: "Wipe clean with damp cloth, use leather conditioner",
    inStock: true,
    quantity: 45,
    featured: false,
    isNewArrival: true
  }
];

// Combine all brand products
const allBrandProducts = [
  ...luxuryBrandProducts,
  ...designerCollectionProducts,
  ...premiumMenswearProducts,
  ...fineJewelryProducts,
  ...hauteCoutureProducts,
  ...modernLuxuryProducts
];

// Function to add products
async function addProducts() {
  // Login first to get cookie
  const cookie = await loginAdmin();
  
  for (const product of allBrandProducts) {
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
  
  console.log(`Attempted to add ${allBrandProducts.length} brand products.`);
}

// Execute the function
addProducts().catch(console.error);