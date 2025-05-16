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
  // Men's Clothing
  {
    name: "Luxury Italian Wool Coat",
    description: "Exceptional coat crafted from the finest Italian wool. Features a classic silhouette with hand-stitched details and horn buttons.",
    price: 289500,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000"
    ],
    colors: ["Charcoal", "Navy", "Camel"],
    sizes: ["48", "50", "52", "54", "56"],
    rating: 4.9,
    reviewCount: 78,
    material: "100% Italian Wool",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 25,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Handmade Leather Briefcase",
    description: "Exquisite briefcase handcrafted from full-grain leather with solid brass hardware. Features multiple compartments and a suede lining.",
    price: 195000,
    category: "accessories",
    subcategory: "bags",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000"
    ],
    colors: ["Cognac", "Black", "Dark Brown"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 62,
    material: "Full-Grain Leather, Solid Brass Hardware",
    careInstructions: "Condition with leather cream as needed",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Diamond and Sapphire Cufflinks",
    description: "Elegant cufflinks featuring blue sapphires surrounded by pavé diamonds. Crafted in 18K white gold with secure swivel backings.",
    price: 125000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1000",
      "https://images.unsplash.com/photo-1573053009372-3dd4b5ab5470?q=80&w=1000"
    ],
    colors: ["White Gold/Blue"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 24,
    material: "18K White Gold, Sapphires, Diamonds",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Silk Pocket Square Collection",
    description: "Set of five handcrafted pocket squares made from the finest silk twill with hand-rolled edges. Features classic patterns and colors.",
    price: 42500,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1598833228985-dc3589aee219?q=80&w=1000",
      "https://images.unsplash.com/photo-1598967276840-bebd318ba0e3?q=80&w=1000"
    ],
    colors: ["Assorted Patterns"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 38,
    material: "100% Silk Twill",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 30,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Sterling Silver Money Clip",
    description: "Elegant money clip crafted from sterling silver with a subtle engine-turned pattern. A sophisticated accessory for the modern gentleman.",
    price: 28500,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1584542794786-e05afe195c77?q=80&w=1000",
      "https://images.unsplash.com/photo-1618029555069-e9d76e53dd3f?q=80&w=1000"
    ],
    colors: ["Sterling Silver"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 28,
    material: "Sterling Silver",
    careInstructions: "Polish with silver cloth as needed",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Silk Jacquard Smoking Jacket",
    description: "Luxurious smoking jacket crafted from silk jacquard with a shawl collar. Features covered buttons and a perfectly tailored fit.",
    price: 185000,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000"
    ],
    colors: ["Burgundy", "Navy", "Black"],
    sizes: ["48", "50", "52", "54", "56"],
    rating: 4.8,
    reviewCount: 32,
    material: "Silk Jacquard, Satin Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 15,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Cashmere Blend Scarf",
    description: "Sumptuous scarf crafted from a cashmere and silk blend with hand-finished edges. The perfect finishing touch for any outfit.",
    price: 45000,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000"
    ],
    colors: ["Charcoal", "Navy", "Camel", "Burgundy"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 48,
    material: "70% Cashmere, 30% Silk",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 35,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Crocodile Skin Belt",
    description: "Sophisticated belt crafted from genuine crocodile skin with a sterling silver buckle. A statement accessory for the discerning gentleman.",
    price: 85000,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=1000",
      "https://images.unsplash.com/photo-1611094607507-8c8177e5cfb2?q=80&w=1000"
    ],
    colors: ["Black", "Brown"],
    sizes: ["32", "34", "36", "38", "40", "42"],
    rating: 4.9,
    reviewCount: 22,
    material: "Genuine Crocodile Skin, Sterling Silver Buckle",
    careInstructions: "Wipe with soft cloth, condition as needed",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Diamond Pavé Evening Studs",
    description: "Elegant studs featuring pavé-set diamonds in a classic round design. Crafted in 18K white gold with secure backings.",
    price: 65000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000"
    ],
    colors: ["White Gold"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 32,
    material: "18K White Gold, Diamonds",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 15,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Silk Charmeuse Evening Gown",
    description: "Stunning evening gown crafted from silk charmeuse with a cowl neckline and open back. Features a fluid silhouette with a subtle train.",
    price: 185000,
    category: "clothing",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000"
    ],
    colors: ["Emerald", "Sapphire", "Ruby", "Black"],
    sizes: ["2", "4", "6", "8", "10", "12"],
    rating: 4.9,
    reviewCount: 28,
    material: "Silk Charmeuse",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 16,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Calfskin Leather Driving Gloves",
    description: "Classic driving gloves crafted from supple calfskin leather with perforated details and snap closures. A timeless accessory for the automobile enthusiast.",
    price: 25000,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1595079676722-ddb4b61993c4?q=80&w=1000",
      "https://images.unsplash.com/photo-1609797623185-9a8bca953d14?q=80&w=1000"
    ],
    colors: ["Black", "Tan", "Brown"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 42,
    material: "Calfskin Leather",
    careInstructions: "Specialist leather clean only",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Silk Chiffon Scarf",
    description: "Ethereal scarf crafted from silk chiffon with hand-rolled edges. Features a beautiful watercolor-inspired print exclusive to our collection.",
    price: 35000,
    category: "accessories",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000",
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000"
    ],
    colors: ["Watercolor Print"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 38,
    material: "Silk Chiffon",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 25,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Handcrafted Cedar Humidor",
    description: "Exquisite humidor crafted from Spanish cedar with an exterior of burled walnut. Features a hygrometer and precision humidity control.",
    price: 135000,
    category: "home",
    subcategory: "accessories",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1589782431667-a2081a0e7101?q=80&w=1000",
      "https://images.unsplash.com/photo-1589782431667-a2081a0e7101?q=80&w=1000"
    ],
    colors: ["Walnut"],
    sizes: ["Medium (50 Cigars)", "Large (100 Cigars)"],
    rating: 4.9,
    reviewCount: 22,
    material: "Spanish Cedar, Burled Walnut, Brass Hardware",
    careInstructions: "Maintain humidity levels between 65-72%",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Sterling Silver Cocktail Shaker",
    description: "Elegant cocktail shaker crafted from sterling silver with an Art Deco-inspired design. The perfect addition to any home bar collection.",
    price: 85000,
    category: "home",
    subcategory: "bar",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1629158007683-4983fa84b0d7?q=80&w=1000",
      "https://images.unsplash.com/photo-1629158007925-65333a55b265?q=80&w=1000"
    ],
    colors: ["Sterling Silver"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 26,
    material: "Sterling Silver",
    careInstructions: "Hand wash, dry thoroughly",
    inStock: true,
    quantity: 14,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Cashmere Cable-Knit Sweater",
    description: "Luxurious sweater crafted from the finest grade cashmere with a classic cable-knit pattern. Features ribbed trims and a relaxed fit.",
    price: 85000,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1614251055880-5ca18a2d7fae?q=80&w=1000",
      "https://images.unsplash.com/photo-1614251055880-5ca18a2d7fae?q=80&w=1000"
    ],
    colors: ["Oatmeal", "Navy", "Burgundy", "Forest Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 64,
    material: "100% Grade-A Cashmere",
    careInstructions: "Dry clean or hand wash cold",
    inStock: true,
    quantity: 32,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Opera Length Pearl Necklace",
    description: "Timeless opera-length necklace featuring perfectly matched cultured pearls with exceptional luster. Secured with an 18K gold clasp.",
    price: 125000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["Pearl White"],
    sizes: ["32 inches"],
    rating: 4.9,
    reviewCount: 28,
    material: "Cultured Pearls, 18K Gold Clasp",
    careInstructions: "Store flat, avoid perfumes and chemicals",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Exotic Skin Card Case",
    description: "Elegant card case crafted from exotic skin with hand-painted edges. Features multiple card slots and a central pocket for bills.",
    price: 45000,
    category: "accessories",
    subcategory: "small leather goods",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1585532445408-b975d175d404?q=80&w=1000",
      "https://images.unsplash.com/photo-1606422718046-bea43679d39d?q=80&w=1000"
    ],
    colors: ["Cognac", "Black", "Burgundy"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 32,
    material: "Exotic Skin, Calfskin Interior",
    careInstructions: "Keep dry, wipe with soft cloth",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Platinum and Diamond Tie Bar",
    description: "Refined tie bar crafted from platinum with a central channel of pavé-set diamonds. A sophisticated addition to any formal ensemble.",
    price: 28500,
    category: "accessories",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=1000",
      "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?q=80&w=1000"
    ],
    colors: ["Platinum"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 24,
    material: "Platinum, Diamonds",
    careInstructions: "Polish with jewelry cloth",
    inStock: true,
    quantity: 14,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Leather-Bound Travel Journal",
    description: "Exquisite travel journal bound in full-grain leather with gilt-edged pages and a ribbon bookmark. Includes a pencil loop and secure closure.",
    price: 18500,
    category: "accessories",
    subcategory: "stationery",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1544247341-5c7abe832adc?q=80&w=1000",
      "https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?q=80&w=1000"
    ],
    colors: ["Cognac", "Black", "Navy"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 36,
    material: "Full-Grain Leather, Acid-Free Paper",
    careInstructions: "Keep dry, condition leather as needed",
    inStock: true,
    quantity: 26,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Hand-Knotted Silk Rug",
    description: "Extraordinary rug hand-knotted from pure silk in a traditional Persian pattern. Each piece represents hundreds of hours of skilled craftsmanship.",
    price: 1250000,
    category: "home",
    subcategory: "rugs",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1564095267935-c4d47bcaf642?q=80&w=1000",
      "https://images.unsplash.com/photo-1564095267935-c4d47bcaf642?q=80&w=1000"
    ],
    colors: ["Ruby/Gold", "Sapphire/Ivory", "Emerald/Gold"],
    sizes: ["6' x 9'", "8' x 10'", "9' x 12'"],
    rating: 5.0,
    reviewCount: 18,
    material: "100% Silk, Hand-Knotted Construction",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Smoking Slippers in Velvet",
    description: "Refined smoking slippers crafted from plush velvet with leather soles. Feature subtle embroidered details and a comfortable lined interior.",
    price: 65000,
    category: "footwear",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1604686132193-9e88ed2d7f60?q=80&w=1000",
      "https://images.unsplash.com/photo-1604686132193-9e88ed2d7f60?q=80&w=1000"
    ],
    colors: ["Black", "Burgundy", "Navy", "Forest Green"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.7,
    reviewCount: 38,
    material: "Velvet Upper, Leather Soles, Leather Lining",
    careInstructions: "Brush regularly, use shoe trees",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Sterling Silver Place Setting",
    description: "Complete place setting crafted from sterling silver in a classic pattern. Includes dinner fork, salad fork, dinner knife, teaspoon, and soup spoon.",
    price: 125000,
    category: "home",
    subcategory: "dining",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Sterling Silver"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 24,
    material: "Sterling Silver",
    careInstructions: "Hand wash, dry thoroughly",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: false
  }
];

// Designer Collection Products
const designerCollectionProducts = [
  // Menswear
  {
    name: "Oversized Utility Jacket",
    description: "Contemporary jacket featuring an oversized silhouette with functional utility pockets. Crafted from technical fabric with contrast stitching details.",
    price: 118500,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000"
    ],
    colors: ["Black", "Olive", "Khaki"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewCount: 42,
    material: "Technical Cotton Blend",
    careInstructions: "Machine wash cold, hang dry",
    inStock: true,
    quantity: 36,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Distressed Graphic Sweatshirt",
    description: "Statement sweatshirt featuring distressed details and graphic prints. Crafted from heavyweight cotton with a relaxed, dropped-shoulder fit.",
    price: 58500,
    category: "clothing",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1572495685933-bd884514da0b?q=80&w=1000",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000"
    ],
    colors: ["Washed Black", "Vintage White", "Faded Red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 58,
    material: "Heavyweight Cotton Fleece",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: true
  },
  // Womenswear
  {
    name: "Split-Hem Leather Pants",
    description: "Innovative leather pants featuring split hem detailing and a high-rise waist. Crafted from supple leather with a contemporary silhouette.",
    price: 195000,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1548389995-fbd3151a501f?q=80&w=1000",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000"
    ],
    colors: ["Black", "Cognac", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 32,
    material: "100% Lambskin Leather",
    careInstructions: "Professional leather cleaning only",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Abstract Print Midi Dress",
    description: "Artistic midi dress featuring an exclusive abstract print. Designed with an asymmetric neckline and fluid silhouette for modern elegance.",
    price: 145000,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=1000",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000"
    ],
    colors: ["Multi Print"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 28,
    material: "Silk Blend",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Geometric Leather Shoulder Bag",
    description: "Avant-garde shoulder bag featuring a geometric silhouette and adjustable strap. Crafted from premium leather with minimal hardware.",
    price: 158500,
    category: "accessories",
    subcategory: "bags",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1594228241847-6899d199e8e8?q=80&w=1000"
    ],
    colors: ["Black", "White", "Red"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 22,
    material: "Premium Leather",
    careInstructions: "Avoid direct sunlight and moisture",
    inStock: true,
    quantity: 16,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Sculptural Resin Earrings",
    description: "Bold statement earrings featuring hand-poured resin in unique sculptural forms. Lightweight design with sterling silver posts.",
    price: 42500,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1630019925419-28a9c8927b8e?q=80&w=1000",
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000"
    ],
    colors: ["Tortoise", "Amber", "Black/White"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 26,
    material: "Hand-Poured Resin, Sterling Silver Posts",
    careInstructions: "Store in provided pouch",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Transparent Heel Mules",
    description: "Innovative mules featuring transparent acrylic heels and minimalist leather uppers. A modern statement piece with unexpected materials.",
    price: 85000,
    category: "footwear",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000"
    ],
    colors: ["Black", "White", "Nude"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.5,
    reviewCount: 28,
    material: "Leather, Acrylic",
    careInstructions: "Wipe clean with damp cloth",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Exaggerated Sole Sneakers",
    description: "Bold sneakers featuring an exaggerated chunky sole and mixed material upper. Combines fashion-forward design with unexpected comfort.",
    price: 95000,
    category: "footwear",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000"
    ],
    colors: ["White/Multi", "Black/Neon", "Silver/White"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    rating: 4.7,
    reviewCount: 36,
    material: "Leather, Technical Fabric, Rubber",
    careInstructions: "Spot clean only",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: true
  },
  // Home Objects
  {
    name: "Artist Collaboration Ceramic Vase",
    description: "Limited edition ceramic vase created in collaboration with an emerging artist. Each piece features unique hand-painted details.",
    price: 48500,
    category: "home",
    subcategory: "decor",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000",
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c4?q=80&w=1000"
    ],
    colors: ["Multi"],
    sizes: ["H: 30cm, Diameter: 15cm"],
    rating: 4.8,
    reviewCount: 18,
    material: "Hand-Painted Ceramic",
    careInstructions: "Hand wash only, dry thoroughly",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Sculptural Marble Bookends",
    description: "Contemporary bookends crafted from solid marble with sculptural forms. Functional art objects that add elegance to any shelf.",
    price: 68500,
    category: "home",
    subcategory: "decor",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1532244619359-b8baeb2a249d?q=80&w=1000",
      "https://images.unsplash.com/photo-1617325710236-4a36d46427a5?q=80&w=1000"
    ],
    colors: ["White Marble", "Black Marble", "Green Marble"],
    sizes: ["Set of 2"],
    rating: 4.7,
    reviewCount: 14,
    material: "Solid Marble",
    careInstructions: "Dust with soft cloth, avoid direct sunlight",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Pleated Maxi Skirt",
    description: "Dramatic maxi skirt featuring precise knife pleats throughout. Crafted from lightweight technical fabric with an elastic waistband for comfort.",
    price: 98500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1551163943-3f7235485ff8?q=80&w=1000",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000"
    ],
    colors: ["Silver", "Black", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 24,
    material: "Technical Fabric",
    careInstructions: "Hand wash cold, line dry",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Printed Silk Pajama Set",
    description: "Luxurious pajama set featuring an exclusive artist-designed print on silk twill. Includes a relaxed button-up shirt and drawstring pants.",
    price: 85000,
    category: "clothing",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000"
    ],
    colors: ["Abstract Print"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 22,
    material: "100% Silk Twill",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 16,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Translucent Frame Sunglasses",
    description: "Statement sunglasses featuring translucent acetate frames and gradient lenses. A contemporary interpretation of a classic shape.",
    price: 32500,
    category: "accessories",
    subcategory: "eyewear",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000"
    ],
    colors: ["Clear/Blue", "Amber/Brown", "Rose/Pink"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 28,
    material: "Acetate Frames, Gradient Lenses",
    careInstructions: "Clean with provided cloth and solution",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Leather and Suede Backpack",
    description: "Contemporary backpack crafted from a combination of smooth leather and suede. Features an asymmetric front pocket and adjustable straps.",
    price: 125000,
    category: "accessories",
    subcategory: "bags",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
      "https://images.unsplash.com/photo-1622219809260-ce065fc5277f?q=80&w=1000"
    ],
    colors: ["Black/Grey", "Tan/Brown", "Navy/Black"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 32,
    material: "Leather, Suede",
    careInstructions: "Protect from moisture, condition leather regularly",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Hardware-Detail Ankle Boots",
    description: "Striking ankle boots featuring architectural metal hardware details and a sculpted heel. Crafted from smooth leather with a comfortable padded insole.",
    price: 115000,
    category: "footwear",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000"
    ],
    colors: ["Black", "White", "Burgundy"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.7,
    reviewCount: 26,
    material: "Leather, Metal Hardware",
    careInstructions: "Wipe clean with damp cloth, protect with leather spray",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Mixed-Media Bucket Hat",
    description: "Unconventional bucket hat crafted from a mix of technical and traditional materials. Features an adjustable chin strap and packable construction.",
    price: 28500,
    category: "accessories",
    subcategory: "hats",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=1000",
      "https://images.unsplash.com/photo-1618149103392-5eecf9cae2f7?q=80&w=1000"
    ],
    colors: ["Black/White", "Olive/Orange", "Navy/Red"],
    sizes: ["S/M", "L/XL"],
    rating: 4.5,
    reviewCount: 24,
    material: "Technical Fabric, Canvas, Mesh",
    careInstructions: "Hand wash cold, air dry",
    inStock: true,
    quantity: 28,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Convertible Layered Dress",
    description: "Innovative dress featuring convertible layers that can be styled multiple ways. Crafted from lightweight crepe with hidden snaps and ties.",
    price: 145000,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1596133108879-a657e8b571ca?q=80&w=1000",
      "https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=1000"
    ],
    colors: ["Black", "Ivory", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 22,
    material: "Lightweight Crepe",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 16,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Oversized Technical Parka",
    description: "Statement parka featuring an oversized silhouette and adjustable elements. Crafted from waterproof technical fabric with sealed seams.",
    price: 185000,
    category: "clothing",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
      "https://images.unsplash.com/photo-1553682644-f87cf902d1b6?q=80&w=1000"
    ],
    colors: ["Black", "Khaki", "Silver"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 28,
    material: "Waterproof Technical Fabric",
    careInstructions: "Machine wash cold, hang dry",
    inStock: true,
    quantity: 22,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Asymmetric Knit Dress",
    description: "Architectural knit dress featuring asymmetric details and a sculptural silhouette. Crafted from stretch viscose blend for comfort and drape.",
    price: 125000,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1000",
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1000"
    ],
    colors: ["Black", "Burgundy", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 26,
    material: "Viscose Blend",
    careInstructions: "Hand wash cold, dry flat",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: true
  }
];

// Premium Menswear Products
const premiumMenswearProducts = [
  // Suits
  {
    name: "Birdseye Wool Suit",
    description: "Refined suit crafted from Italian birdseye wool with half-canvas construction. Features a classic notch lapel and flat-front trousers.",
    price: 189500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1553484771-689277e6c388?q=80&w=1000",
      "https://images.unsplash.com/photo-1553484771-8bbd85e7d8a1?q=80&w=1000"
    ],
    colors: ["Navy", "Charcoal", "Blue"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "48R", "40L", "42L", "44L", "46L"],
    rating: 4.8,
    reviewCount: 36,
    material: "Italian Wool, Bemberg Lining",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Lightweight Wool Blazer",
    description: "Versatile blazer crafted from lightweight wool hopsack. Features a half-canvas construction, patch pockets, and natural shoulder.",
    price: 125000,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1000",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1000"
    ],
    colors: ["Navy", "Light Grey", "Tan"],
    sizes: ["38R", "40R", "42R", "44R", "46R", "48R"],
    rating: 4.7,
    reviewCount: 42,
    material: "Wool Hopsack",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 32,
    featured: false,
    isNewArrival: false
  },
  // Shirts
  {
    name: "Oxford Button-Down Shirt",
    description: "Classic oxford cloth button-down shirt with a traditional roll collar. Crafted from premium cotton with a comfortable regular fit.",
    price: 16500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1000"
    ],
    colors: ["White", "Blue", "Pink", "University Stripe"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 86,
    material: "Premium Cotton Oxford",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 65,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Spread Collar Dress Shirt",
    description: "Refined dress shirt featuring a wide spread collar and double cuffs. Crafted from two-ply cotton with a smooth, lustrous finish.",
    price: 18500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1000"
    ],
    colors: ["White", "Light Blue", "Pale Pink", "Sky Blue Stripe"],
    sizes: ["15", "15.5", "16", "16.5", "17", "17.5"],
    rating: 4.7,
    reviewCount: 58,
    material: "Two-Ply Cotton Broadcloth",
    careInstructions: "Machine wash cold or dry clean",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: false
  },
  // Outerwear
  {
    name: "Quilted Field Jacket",
    description: "Practical field jacket featuring diamond quilting and multiple utility pockets. Crafted from water-resistant waxed cotton with corduroy trim.",
    price: 32500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
      "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?q=80&w=1000"
    ],
    colors: ["Olive", "Navy", "Tan"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 64,
    material: "Waxed Cotton, Corduroy Trim",
    careInstructions: "Wipe clean, re-wax annually",
    inStock: true,
    quantity: 36,
    featured: true,
    isNewArrival: true
  },
  // Knitwear
  {
    name: "Merino Wool V-Neck Sweater",
    description: "Classic v-neck sweater crafted from fine gauge merino wool. Features ribbed trims and a versatile mid-weight knit.",
    price: 18500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1614251055880-5ca18a2d7fae?q=80&w=1000",
      "https://images.unsplash.com/photo-1614251055880-5ca18a2d7fae?q=80&w=1000"
    ],
    colors: ["Navy", "Charcoal", "Burgundy", "Forest Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 76,
    material: "100% Merino Wool",
    careInstructions: "Hand wash cold or dry clean",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: false
  },
  // Trousers
  {
    name: "Slim-Fit Chino Trousers",
    description: "Versatile chinos crafted from medium-weight twill with a touch of stretch. Feature a slim-fit silhouette and finished with a clean hem.",
    price: 12500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1552783858-129e6d5538ab?q=80&w=1000",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000"
    ],
    colors: ["Khaki", "Navy", "Olive", "Stone"],
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    rating: 4.7,
    reviewCount: 94,
    material: "97% Cotton, 3% Elastane",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 72,
    featured: false,
    isNewArrival: false
  },
  // Accessories
  {
    name: "Wool and Cashmere Scarf",
    description: "Refined scarf crafted from a wool and cashmere blend. Features a subtle herringbone pattern and fringed ends.",
    price: 12500,
    category: "accessories",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1520903920243-50355887dfc7?q=80&w=1000",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000"
    ],
    colors: ["Navy", "Charcoal", "Camel", "Burgundy"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 46,
    material: "90% Wool, 10% Cashmere",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 58,
    featured: false,
    isNewArrival: false
  },
  // Shoes
  {
    name: "Cap-Toe Oxford Shoes",
    description: "Classic cap-toe oxford shoes crafted from polished calfskin. Feature Goodyear-welted construction for durability and resolability.",
    price: 42500,
    category: "footwear",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000",
      "https://images.unsplash.com/photo-1531310197839-b8baeb2a249e?q=80&w=1000"
    ],
    colors: ["Black", "Dark Brown", "Oxblood"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    rating: 4.9,
    reviewCount: 68,
    material: "Calfskin, Leather Sole",
    careInstructions: "Polish regularly, use shoe trees",
    inStock: true,
    quantity: 42,
    featured: true,
    isNewArrival: false
  },
  // Denim
  {
    name: "Selvedge Denim Jeans",
    description: "Premium jeans crafted from Japanese selvedge denim. Feature a classic five-pocket design and a straight-leg fit.",
    price: 22500,
    category: "clothing",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1000"
    ],
    colors: ["Indigo", "Dark Wash", "Raw Denim"],
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    rating: 4.8,
    reviewCount: 86,
    material: "Japanese Selvedge Denim",
    careInstructions: "Wash sparingly, hang to dry",
    inStock: true,
    quantity: 56,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Wool Driving Cap",
    description: "Classic driving cap crafted from wool tweed with a satin lining. Features a structured crown and short brim.",
    price: 9500,
    category: "accessories",
    subcategory: "men",
    brand: "Premium Menswear",
    brandType: "Premium Menswear",
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000",
      "https://images.unsplash.com/photo-1551479492-473e5a1c8b6d?q=80&w=1000"
    ],
    colors: ["Brown Herringbone", "Grey Herringbone", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 54,
    material: "Wool Tweed, Satin Lining",
    careInstructions: "Spot clean only",
    inStock: true,
    quantity: 45,
    featured: false,
    isNewArrival: false
  }
];

// Fine Jewelry Products
const fineJewelryProducts = [
  // Diamond Rings
  {
    name: "Oval Diamond Solitaire Ring",
    description: "Timeless solitaire ring featuring a 2-carat oval diamond of exceptional clarity. Set in a delicate platinum band with six prongs.",
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
    reviewCount: 24,
    material: "Platinum, VS Diamond",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Vintage-Inspired Halo Ring",
    description: "Romantic ring featuring a round brilliant diamond surrounded by a halo of smaller diamonds. Set in 18K rose gold with milgrain details.",
    price: 785000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Rose Gold"],
    sizes: ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 4.9,
    reviewCount: 32,
    material: "18K Rose Gold, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: false
  },
  // Necklaces
  {
    name: "Diamond Rivière Necklace",
    description: "Classic rivière necklace featuring 15 carats of graduated round brilliant diamonds. Set in 18K white gold with a secure box clasp.",
    price: 2850000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1613746203812-717e6e5da8b9?q=80&w=1000"
    ],
    colors: ["White Gold"],
    sizes: ["16 inches"],
    rating: 5.0,
    reviewCount: 18,
    material: "18K White Gold, VS Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Ruby and Diamond Pendant",
    description: "Elegant pendant featuring a pear-shaped Burmese ruby surrounded by a halo of diamonds. Suspended from a delicate white gold chain.",
    price: 695000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["White Gold/Ruby"],
    sizes: ["18 inches"],
    rating: 4.9,
    reviewCount: 22,
    material: "18K White Gold, Burmese Ruby, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 8,
    featured: false,
    isNewArrival: false
  },
  // Earrings
  {
    name: "Diamond Cluster Studs",
    description: "Sophisticated stud earrings featuring clusters of round brilliant diamonds. Set in 18K white gold with secure post backings.",
    price: 485000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000"
    ],
    colors: ["White Gold"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 34,
    material: "18K White Gold, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Emerald and Diamond Drops",
    description: "Striking drop earrings featuring Colombian emeralds suspended from a line of graduated diamonds. Set in 18K white gold.",
    price: 1285000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1589207242685-ca6d929d0836?q=80&w=1000",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000"
    ],
    colors: ["White Gold/Green"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 14,
    material: "18K White Gold, Colombian Emeralds, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  // Bracelets
  {
    name: "Tanzanite Line Bracelet",
    description: "Elegant bracelet featuring oval tanzanites alternating with round brilliant diamonds. Set in 18K white gold with a secure clasp.",
    price: 985000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1000"
    ],
    colors: ["White Gold/Blue"],
    sizes: ["7 inches", "7.5 inches"],
    rating: 4.8,
    reviewCount: 18,
    material: "18K White Gold, Tanzanites, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 7,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Gold and Diamond Bangle",
    description: "Modern bangle featuring a geometric design with channel-set diamonds. Crafted in 18K yellow gold with a hinged closure.",
    price: 585000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1000"
    ],
    colors: ["Yellow Gold"],
    sizes: ["Small", "Medium"],
    rating: 4.7,
    reviewCount: 26,
    material: "18K Yellow Gold, Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 14,
    featured: false,
    isNewArrival: false
  },
  // Men's Collection
  {
    name: "Black Diamond Cufflinks",
    description: "Sophisticated cufflinks featuring black diamonds set in 18K white gold. Feature a modern square design with swivel backings.",
    price: 225000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1000",
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1000"
    ],
    colors: ["White Gold/Black"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 22,
    material: "18K White Gold, Black Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: true
  }
];

// Haute Couture Products
const hauteCoutureProducts = [
  // Evening Gowns
  {
    name: "Hand-Beaded Tulle Gown",
    description: "Extraordinary gown featuring over 10,000 hand-sewn crystals, pearls, and bugle beads on layers of silk tulle. Includes internal corsetry.",
    price: 2950000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1602173979469-d0c718e7de24?q=80&w=1000"
    ],
    colors: ["Silver", "Champagne", "Black"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 5.0,
    reviewCount: 12,
    material: "Silk Tulle, Crystals, Pearls, Beads",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Architectural Silk Faille Gown",
    description: "Dramatic gown crafted from structured silk faille with architectural pleats and folds. Features a sweeping train and precise internal construction.",
    price: 1850000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
      "https://images.unsplash.com/photo-1596133108879-a657e8b571ca?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Midnight Blue", "Ruby"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.9,
    reviewCount: 10,
    material: "Silk Faille",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: false
  },
  // Bridal
  {
    name: "Hand-Embroidered Lace Bridal Gown",
    description: "Breathtaking bridal gown featuring hand-embroidered French Alençon lace with pearl and crystal accents. Includes a cathedral-length train.",
    price: 3250000,
    category: "clothing",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1513177126531-77f75a4d76b5?q=80&w=1000",
      "https://images.unsplash.com/photo-1513177126531-77f75a4d76b5?q=80&w=1000"
    ],
    colors: ["Ivory", "White", "Blush"],
    sizes: ["2", "4", "6", "8", "10", "Custom"],
    rating: 5.0,
    reviewCount: 14,
    material: "French Alençon Lace, Silk, Crystals, Pearls",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 6,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Detachable Skirt Wedding Ensemble",
    description: "Innovative bridal ensemble featuring a fitted lace gown with a dramatic detachable overskirt. Two looks in one for ceremony and reception.",
    price: 2650000,
    category: "clothing",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1580651315530-69c8e0903883?q=80&w=1000",
      "https://images.unsplash.com/photo-1550305933-4c2f0ea7ed5e?q=80&w=1000"
    ],
    colors: ["Ivory", "White"],
    sizes: ["2", "4", "6", "8", "10", "Custom"],
    rating: 4.9,
    reviewCount: 9,
    material: "Lace, Silk Organza, Silk Mikado",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 5,
    featured: false,
    isNewArrival: true
  },
  // Cocktail Dresses
  {
    name: "Feather and Crystal Cocktail Dress",
    description: "Statement cocktail dress featuring hand-applied ostrich feathers and crystal embellishments. Includes an internal corset for perfect structure.",
    price: 985000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1000",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000"
    ],
    colors: ["Black", "Champagne", "Powder Blue"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.8,
    reviewCount: 12,
    material: "Silk, Ostrich Feathers, Crystals",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 7,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Sculptural Mini Dress",
    description: "Architectural mini dress crafted from duchesse satin with sculptural 3D elements. Features precise draping and internal structure.",
    price: 785000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000",
      "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1000"
    ],
    colors: ["White", "Black", "Ruby"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.7,
    reviewCount: 11,
    material: "Duchesse Satin",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 9,
    featured: false,
    isNewArrival: true
  },
  // Men's Formal
  {
    name: "Bespoke Velvet Dinner Jacket",
    description: "Luxurious dinner jacket crafted from Italian velvet with satin lapels. Hand-tailored with traditional techniques and fully canvassed construction.",
    price: 1250000,
    category: "clothing",
    subcategory: "men",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1593032534613-11c9498429d8?q=80&w=1000",
      "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1000"
    ],
    colors: ["Black", "Midnight Blue", "Burgundy", "Emerald"],
    sizes: ["Custom"],
    rating: 4.9,
    reviewCount: 8,
    material: "Italian Velvet, Silk Satin",
    careInstructions: "Dry clean only by specialist",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Crystal-Embellished Clutch",
    description: "Exquisite evening clutch entirely covered in hand-applied crystals. Features a jeweled clasp closure and silk lining.",
    price: 385000,
    category: "accessories",
    subcategory: "bags",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?q=80&w=1000",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000"
    ],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 14,
    material: "Crystals, Metal Frame, Silk Lining",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 10,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Feather and Pearl Headpiece",
    description: "Dramatic headpiece featuring hand-curled ostrich feathers and freshwater pearl embellishments. Attaches securely with hidden combs.",
    price: 185000,
    category: "accessories",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1596120236172-231999844bbe?q=80&w=1000",
      "https://images.unsplash.com/photo-1596120236172-231999844bbe?q=80&w=1000"
    ],
    colors: ["Ivory", "White", "Blush"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 9,
    material: "Ostrich Feathers, Freshwater Pearls",
    careInstructions: "Store in provided box, avoid moisture",
    inStock: true,
    quantity: 8,
    featured: false,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Bespoke Satin Evening Shoes",
    description: "Custom-made evening shoes crafted from duchess satin with hand-applied crystal embellishments. Feature a balanced 85mm heel and padded insole.",
    price: 195000,
    category: "footwear",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6b00b37?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Silver"],
    sizes: ["35", "36", "37", "38", "39", "40", "41", "Custom"],
    rating: 4.9,
    reviewCount: 10,
    material: "Duchess Satin, Crystals, Leather Lining",
    careInstructions: "Store in provided box, use shoe bags",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  // Veils
  {
    name: "Cathedral-Length Lace Veil",
    description: "Exquisite cathedral-length veil featuring hand-applied French Chantilly lace along the edges. Custom-made to complement any bridal gown.",
    price: 485000,
    category: "accessories",
    subcategory: "bridal",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000",
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000"
    ],
    colors: ["Ivory", "White", "Blush"],
    sizes: ["Cathedral Length"],
    rating: 4.9,
    reviewCount: 12,
    material: "Silk Tulle, French Chantilly Lace",
    careInstructions: "Professional preservation recommended",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: false
  },
  // Evening Separates
  {
    name: "Embellished Tulle Cape",
    description: "Ethereal cape crafted from silk tulle with hand-applied crystal and pearl embellishments. The perfect accessory for both bridal and evening wear.",
    price: 625000,
    category: "accessories",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1594387579748-ca2fb7de9dfb?q=80&w=1000"
    ],
    colors: ["Ivory", "White", "Black", "Champagne"],
    sizes: ["One Size"],
    rating: 4.9,
    reviewCount: 10,
    material: "Silk Tulle, Crystals, Pearls",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 7,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Draped Silk Evening Skirt",
    description: "Dramatic evening skirt crafted from fluid silk charmeuse with expert draping. Features a high waist and sweeping train for elegant movement.",
    price: 585000,
    category: "clothing",
    subcategory: "women",
    brand: "Haute Couture",
    brandType: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000"
    ],
    colors: ["Black", "Ivory", "Sapphire", "Ruby"],
    sizes: ["2", "4", "6", "8", "Custom"],
    rating: 4.8,
    reviewCount: 11,
    material: "Silk Charmeuse",
    careInstructions: "Professional cleaning only",
    inStock: true,
    quantity: 9,
    featured: false,
    isNewArrival: false
  }
];

// Modern Luxury Products
const modernLuxuryProducts = [
  // Clothing
  {
    name: "Cashmere Ribbed Turtleneck",
    description: "Refined turtleneck crafted from grade-A cashmere in a substantial ribbed knit. Features a relaxed fit and clean finishing details.",
    price: 32500,
    category: "clothing",
    subcategory: "unisex",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1614251055880-5ca18a2d7fae?q=80&w=1000",
      "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?q=80&w=1000"
    ],
    colors: ["Oatmeal", "Black", "Camel", "Grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 86,
    material: "100% Grade-A Cashmere",
    careInstructions: "Hand wash cold or dry clean",
    inStock: true,
    quantity: 48,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Relaxed Silk Shirt",
    description: "Contemporary silk shirt featuring a relaxed silhouette and hidden placket. Crafted from sandwashed silk for a subtle matte finish.",
    price: 26500,
    category: "clothing",
    subcategory: "women",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1596823383158-1450e793326b?q=80&w=1000",
      "https://images.unsplash.com/photo-1614251005451-dc607ee80628?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Olive", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 68,
    material: "100% Sandwashed Silk",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 38,
    featured: false,
    isNewArrival: false
  },
  // Home
  {
    name: "Marble and Brass Console Table",
    description: "Minimalist console table featuring a floating Carrara marble top on brushed brass legs. A perfect balance of materials and form.",
    price: 295000,
    category: "home",
    subcategory: "furniture",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1000",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1000"
    ],
    colors: ["Marble/Brass"],
    sizes: ["120cm x 35cm x 85cm"],
    rating: 4.8,
    reviewCount: 24,
    material: "Carrara Marble, Brushed Brass",
    careInstructions: "Wipe clean with damp cloth, seal marble annually",
    inStock: true,
    quantity: 10,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Hand-Thrown Ceramic Vases",
    description: "Set of three organically shaped vases hand-thrown by master ceramicists. Each piece features a reactive glaze for unique variations.",
    price: 48500,
    category: "home",
    subcategory: "decor",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000"
    ],
    colors: ["Matte White", "Matte Black", "Matte Grey"],
    sizes: ["Set of 3"],
    rating: 4.7,
    reviewCount: 32,
    material: "Hand-Thrown Ceramic, Reactive Glaze",
    careInstructions: "Hand wash only, dry thoroughly",
    inStock: true,
    quantity: 15,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Minimalist Leather Backpack",
    description: "Clean-lined backpack crafted from vegetable-tanned leather with minimal hardware. Features a deceptively spacious interior with laptop sleeve.",
    price: 38500,
    category: "accessories",
    subcategory: "bags",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1622219809260-ce065fc5277f?q=80&w=1000",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000"
    ],
    colors: ["Tan", "Black", "Navy"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 58,
    material: "Vegetable-Tanned Leather",
    careInstructions: "Will develop patina with use",
    inStock: true,
    quantity: 28,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Titanium Frame Sunglasses",
    description: "Ultralight sunglasses featuring a titanium frame and polarized lenses. Designed with a minimal profile and exceptional durability.",
    price: 29500,
    category: "accessories",
    subcategory: "eyewear",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000"
    ],
    colors: ["Silver", "Matte Black", "Gold"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 48,
    material: "Titanium Frame, Polarized Lenses",
    careInstructions: "Clean with provided cloth and solution",
    inStock: true,
    quantity: 35,
    featured: false,
    isNewArrival: true
  },
  // Textiles
  {
    name: "Alpaca Throw Blanket",
    description: "Sumptuous throw blanket crafted from baby alpaca fibers with a subtle herringbone pattern. The perfect blend of softness and sophistication.",
    price: 42500,
    category: "home",
    subcategory: "textiles",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1552779486-2c9a68c4c1eb?q=80&w=1000",
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1000"
    ],
    colors: ["Oatmeal", "Grey", "Camel"],
    sizes: ["130cm x 180cm"],
    rating: 4.9,
    reviewCount: 42,
    material: "100% Baby Alpaca",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 24,
    featured: false,
    isNewArrival: false
  }
];

// Combine all additional brand products
const allRemainingProducts = [
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
  
  for (const product of allRemainingProducts) {
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
  
  console.log(`Attempted to add ${allRemainingProducts.length} brand products.`);
}

// Execute the function
addProducts().catch(console.error);