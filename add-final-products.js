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

// Final Luxury Brand Products
const finalLuxuryProducts = [
  // Men's Clothing
  {
    name: "Striped Silk Pajama Set",
    description: "Luxurious sleep set crafted from pure silk twill. Features a classic piped design and elastic drawstring waist for perfect comfort.",
    price: 85000,
    category: "clothing",
    subcategory: "men",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000"
    ],
    colors: ["Navy/White", "Burgundy/Navy", "Black/Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 36,
    material: "100% Mulberry Silk",
    careInstructions: "Dry clean recommended",
    inStock: true,
    quantity: 42,
    featured: false,
    isNewArrival: false
  },
  // Women's Clothing
  {
    name: "Fur-Trimmed Cashmere Cape",
    description: "Statement cape crafted from pure cashmere with detachable fox fur trim. The perfect elegant layer for evening events and formal occasions.",
    price: 195000,
    category: "clothing",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=1000",
      "https://images.unsplash.com/photo-1594232352687-b29137698961?q=80&w=1000"
    ],
    colors: ["Camel/Natural", "Black/Black", "Grey/Silver"],
    sizes: ["S/M", "L/XL"],
    rating: 4.9,
    reviewCount: 18,
    material: "Pure Cashmere, Fox Fur Trim",
    careInstructions: "Professional fur specialist cleaning only",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: true
  },
  // Watches
  {
    name: "Annual Calendar Platinum Watch",
    description: "Exceptional timepiece featuring an annual calendar complication and moon phase indicator. Crafted in platinum with an alligator strap.",
    price: 4950000,
    category: "accessories",
    subcategory: "watches",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000",
      "https://images.unsplash.com/photo-1614703185627-903d6502c33f?q=80&w=1000"
    ],
    colors: ["Platinum/Ivory"],
    sizes: ["40mm"],
    rating: 5.0,
    reviewCount: 8,
    material: "Platinum, Alligator Leather",
    careInstructions: "Professional service every 3-5 years",
    inStock: true,
    quantity: 4,
    featured: true,
    isNewArrival: true
  },
  // Home
  {
    name: "Crystal Champagne Flutes Set",
    description: "Exquisite hand-blown crystal champagne flutes with faceted stems. Set of six presented in a luxury gift box.",
    price: 95000,
    category: "home",
    subcategory: "dining",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=1000",
      "https://images.unsplash.com/photo-1554138272-4a821a5b3d21?q=80&w=1000"
    ],
    colors: ["Clear"],
    sizes: ["Set of 6"],
    rating: 4.8,
    reviewCount: 32,
    material: "Hand-Blown Crystal",
    careInstructions: "Hand wash only",
    inStock: true,
    quantity: 18,
    featured: false,
    isNewArrival: false
  },
  // Fine Writing Instruments
  {
    name: "Sterling Silver Fountain Pen",
    description: "Meticulously crafted fountain pen featuring a sterling silver barrel with guilloché engraving. Includes an 18K gold nib and converter.",
    price: 125000,
    category: "accessories",
    subcategory: "stationery",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000",
      "https://images.unsplash.com/photo-1598372614234-93d650c50d91?q=80&w=1000"
    ],
    colors: ["Sterling Silver"],
    sizes: ["Medium Nib", "Fine Nib", "Broad Nib"],
    rating: 4.9,
    reviewCount: 14,
    material: "Sterling Silver, 18K Gold Nib",
    careInstructions: "Polish with silver cloth as needed",
    inStock: true,
    quantity: 16,
    featured: false,
    isNewArrival: false
  },
  // Bespoke Services
  {
    name: "Bespoke Shirt Experience",
    description: "Complete bespoke shirt service including personal fitting, fabric selection from exclusive mills, and hand-finishing details. Includes two shirts.",
    price: 85000,
    category: "services",
    subcategory: "custom",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000"
    ],
    colors: ["Custom Selection"],
    sizes: ["Custom Fitted"],
    rating: 5.0,
    reviewCount: 28,
    material: "Selection from Premium Cotton, Linen, and Silk",
    careInstructions: "Care guide provided with finished garments",
    inStock: true,
    quantity: 999,
    featured: true,
    isNewArrival: true
  },
  // Gifts
  {
    name: "Sterling Silver Picture Frame",
    description: "Elegant sterling silver picture frame with wood back. Features a classic beaded border design and velvet easel back.",
    price: 58500,
    category: "home",
    subcategory: "decor",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1593254537524-ba116e3156b5?q=80&w=1000",
      "https://images.unsplash.com/photo-1593254537524-ba116e3156b5?q=80&w=1000"
    ],
    colors: ["Sterling Silver"],
    sizes: ["5\" x 7\"", "8\" x 10\""],
    rating: 4.7,
    reviewCount: 22,
    material: "Sterling Silver, Wood Back",
    careInstructions: "Polish with silver cloth",
    inStock: true,
    quantity: 25,
    featured: false,
    isNewArrival: false
  },
  // More Women's Shoes
  {
    name: "Satin Evening Sandals",
    description: "Elegant evening sandals crafted from luxurious satin with crystal embellishments. Feature a perfectly balanced 85mm heel and leather lining.",
    price: 86500,
    category: "footwear",
    subcategory: "women",
    brand: "Luxury Brand",
    brandType: "Luxury Brand",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000"
    ],
    colors: ["Black", "Champagne", "Royal Blue"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.8,
    reviewCount: 34,
    material: "Satin, Crystals, Leather Lining",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: true
  }
];

// Final Designer Collection Products
const finalDesignerProducts = [
  // Men's Clothing
  {
    name: "Metallic Thread Knit Sweater",
    description: "Statement sweater featuring metallic thread intarsia knit. Designed with a relaxed fit and ribbed trims for a contemporary silhouette.",
    price: 105000,
    category: "clothing",
    subcategory: "men",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1580331451062-99ff462db48a?q=80&w=1000",
      "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=1000"
    ],
    colors: ["Black/Silver", "Navy/Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 24,
    material: "Wool, Acrylic, Metallic Thread",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Reconstructed Denim Jacket",
    description: "Avant-garde jacket crafted from deconstructed and reassembled vintage denim. Features asymmetric details and artistic paneling.",
    price: 128500,
    category: "clothing",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1551794840-8ae3b9c2dea7?q=80&w=1000",
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000"
    ],
    colors: ["Mixed Denim"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 16,
    material: "Reconstructed Vintage Denim",
    careInstructions: "Cold wash separately, hang dry",
    inStock: true,
    quantity: 12,
    featured: true,
    isNewArrival: true
  },
  // Women's Clothing
  {
    name: "Balloon-Sleeve Knit Dress",
    description: "Sculptural knit dress featuring exaggerated balloon sleeves and a fitted body. An artful silhouette for contemporary elegance.",
    price: 148500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000",
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1000"
    ],
    colors: ["Black", "Ivory", "Red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 28,
    material: "Merino Wool Blend",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 16,
    featured: false,
    isNewArrival: false
  },
  {
    name: "Technical Fabric Parka",
    description: "Innovative parka crafted from waterproof technical fabric with heat-sealed seams. Features a detachable liner and adjustable elements.",
    price: 168500,
    category: "clothing",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000"
    ],
    colors: ["Black", "Olive", "Silver"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 32,
    material: "Waterproof Technical Fabric",
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: true
  },
  // Footwear
  {
    name: "Sculpted Heel Ankle Boots",
    description: "Statement boots featuring an architectural sculpted heel. Crafted from premium leather with a comfortable padded insole.",
    price: 148500,
    category: "footwear",
    subcategory: "women",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1548187847-51900f4eba08?q=80&w=1000",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000"
    ],
    colors: ["Black", "White", "Red"],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    rating: 4.6,
    reviewCount: 26,
    material: "Premium Leather, Resin Heel",
    careInstructions: "Treat with leather protector before wearing",
    inStock: true,
    quantity: 15,
    featured: false,
    isNewArrival: true
  },
  {
    name: "Mixed-Material Sneakers",
    description: "Contemporary sneakers featuring an innovative mix of technical fabrics, leather, and 3D-printed elements. Built on a chunky articulated sole.",
    price: 76500,
    category: "footwear",
    subcategory: "unisex",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000"
    ],
    colors: ["Mixed/Multi", "Black/White"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    rating: 4.7,
    reviewCount: 38,
    material: "Technical Fabric, Leather, 3D-Printed Elements",
    careInstructions: "Spot clean only",
    inStock: true,
    quantity: 24,
    featured: true,
    isNewArrival: true
  },
  // Bags
  {
    name: "Neoprene Tote Bag",
    description: "Innovative tote bag crafted from technical neoprene with leather trim. Features a spacious interior with dedicated tech compartments.",
    price: 86500,
    category: "accessories",
    subcategory: "bags",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4200e99e81?q=80&w=1000",
      "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?q=80&w=1000"
    ],
    colors: ["Black", "Grey", "Navy"],
    sizes: ["One Size"],
    rating: 4.5,
    reviewCount: 28,
    material: "Technical Neoprene, Leather Trim",
    careInstructions: "Spot clean with damp cloth",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: false
  },
  // Home
  {
    name: "Artist Collaboration Throw Blanket",
    description: "Limited edition throw blanket featuring an exclusive design by a contemporary artist. Crafted from a wool-cashmere blend for luxury comfort.",
    price: 38500,
    category: "home",
    subcategory: "textiles",
    brand: "Designer Collection",
    brandType: "Designer Collection",
    images: [
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1000",
      "https://images.unsplash.com/photo-1552779486-2c9a68c4c1eb?q=80&w=1000"
    ],
    colors: ["Artist Design"],
    sizes: ["130cm x 180cm"],
    rating: 4.7,
    reviewCount: 18,
    material: "Wool-Cashmere Blend",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 20,
    featured: true,
    isNewArrival: true
  }
];

// Final Fine Jewelry Products
const finalFineJewelryProducts = [
  // Diamond Jewelry
  {
    name: "Diamond Tennis Bracelet",
    description: "Classic tennis bracelet featuring 5 carats of round brilliant diamonds set in a shared prong design. Secured with a safety clasp.",
    price: 1250000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["White Gold", "Yellow Gold", "Rose Gold"],
    sizes: ["7 inches", "7.5 inches"],
    rating: 4.9,
    reviewCount: 24,
    material: "18K Gold, VS Diamonds",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 8,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Halo Diamond Pendant",
    description: "Elegant pendant featuring a round brilliant diamond surrounded by a halo of smaller diamonds. Suspended from an adjustable 18K gold chain.",
    price: 475000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000"
    ],
    colors: ["White Gold", "Yellow Gold"],
    sizes: ["16-18 inches adjustable"],
    rating: 4.8,
    reviewCount: 32,
    material: "18K Gold, VS Diamonds",
    careInstructions: "Wipe with jewelry cloth after wearing",
    inStock: true,
    quantity: 12,
    featured: false,
    isNewArrival: false
  },
  // Gemstone Jewelry
  {
    name: "Ruby and Diamond Cluster Ring",
    description: "Striking cocktail ring featuring a 3-carat Burmese ruby surrounded by brilliant-cut diamonds. Set in 18K yellow gold for a classic look.",
    price: 1685000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000"
    ],
    colors: ["Yellow Gold/Ruby"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5"],
    rating: 4.9,
    reviewCount: 18,
    material: "18K Yellow Gold, Burmese Ruby, Diamonds",
    careInstructions: "Avoid exposure to harsh chemicals",
    inStock: true,
    quantity: 5,
    featured: true,
    isNewArrival: true
  },
  {
    name: "Aquamarine Drop Earrings",
    description: "Refreshing earrings featuring pear-shaped aquamarines suspended from a line of diamonds. Set in 18K white gold with secure lever backs.",
    price: 875000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1633934548711-f4dc0e873b69?q=80&w=1000"
    ],
    colors: ["White Gold/Aquamarine"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 21,
    material: "18K White Gold, Aquamarines, Diamonds",
    careInstructions: "Store separately in jewelry box",
    inStock: true,
    quantity: 7,
    featured: false,
    isNewArrival: true
  },
  // Pearl Jewelry
  {
    name: "Akoya Pearl Stud Earrings",
    description: "Timeless stud earrings featuring perfectly matched Akoya pearls with exceptional luster. Set in 18K gold with secure backings.",
    price: 225000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?q=80&w=1000",
      "https://images.unsplash.com/photo-1613746203812-717e6e5da8b9?q=80&w=1000"
    ],
    colors: ["White Gold/Pearl", "Yellow Gold/Pearl"],
    sizes: ["7-7.5mm Pearl"],
    rating: 4.7,
    reviewCount: 38,
    material: "18K Gold, Akoya Pearls",
    careInstructions: "Wipe with soft cloth after wearing",
    inStock: true,
    quantity: 22,
    featured: false,
    isNewArrival: false
  },
  // Men's Jewelry
  {
    name: "Sapphire and Diamond Cufflinks",
    description: "Sophisticated cufflinks featuring blue sapphire centers surrounded by pavé diamonds. Crafted in 18K white gold with secure swivel backings.",
    price: 195000,
    category: "accessories",
    subcategory: "jewelry",
    brand: "Fine Jewelry",
    brandType: "Fine Jewelry",
    images: [
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1000",
      "https://images.unsplash.com/photo-1573053009372-3dd4b5ab5470?q=80&w=1000"
    ],
    colors: ["White Gold/Blue"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 15,
    material: "18K White Gold, Blue Sapphires, Diamonds",
    careInstructions: "Store in provided box",
    inStock: true,
    quantity: 9,
    featured: true,
    isNewArrival: true
  }
];

// Final Modern Luxury Products
const finalModernLuxuryProducts = [
  // Clothing
  {
    name: "Washable Silk Shirt",
    description: "Refined yet practical shirt crafted from innovative washable silk. Features a relaxed fit and clean, minimal detailing.",
    price: 24500,
    category: "clothing",
    subcategory: "women",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1625204614387-9d0c403fa5f8?q=80&w=1000",
      "https://images.unsplash.com/photo-1516957222800-812ef8b5a6f2?q=80&w=1000"
    ],
    colors: ["Ivory", "Black", "Navy", "Blush"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 86,
    material: "Washable Silk",
    careInstructions: "Machine wash cold on gentle cycle, lay flat to dry",
    inStock: true,
    quantity: 48,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Merino Wool Bomber Jacket",
    description: "Contemporary bomber jacket crafted from fine merino wool with minimal hardware. Features raglan sleeves and ribbed trim.",
    price: 36500,
    category: "clothing",
    subcategory: "unisex",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
      "https://images.unsplash.com/photo-1591047139895-58394c5f6602?q=80&w=1000"
    ],
    colors: ["Navy", "Charcoal", "Olive"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 54,
    material: "100% Merino Wool",
    careInstructions: "Dry clean only",
    inStock: true,
    quantity: 36,
    featured: false,
    isNewArrival: true
  },
  // Home
  {
    name: "Modular Storage System",
    description: "Customizable storage system crafted from solid wood with a modular design. Can be arranged in multiple configurations to suit your space.",
    price: 185000,
    category: "home",
    subcategory: "furniture",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000",
      "https://images.unsplash.com/photo-1573883844855-f364441ac463?q=80&w=1000"
    ],
    colors: ["Oak", "Walnut", "Black"],
    sizes: ["Three-Module Set", "Five-Module Set"],
    rating: 4.7,
    reviewCount: 32,
    material: "Solid Wood, Brass Details",
    careInstructions: "Dust with soft cloth, treat wood annually",
    inStock: true,
    quantity: 18,
    featured: true,
    isNewArrival: false
  },
  {
    name: "Handcrafted Wool Area Rug",
    description: "Minimal geometric rug handwoven from New Zealand wool. Features subtle tonal variations and a plush, comfortable pile.",
    price: 128500,
    category: "home",
    subcategory: "textiles",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1564095267935-c4d47bcaf642?q=80&w=1000",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=1000"
    ],
    colors: ["Ivory/Grey", "Navy/Natural", "Earth Tones"],
    sizes: ["5' x 8'", "8' x 10'", "9' x 12'"],
    rating: 4.8,
    reviewCount: 24,
    material: "100% New Zealand Wool",
    careInstructions: "Professional cleaning recommended",
    inStock: true,
    quantity: 14,
    featured: false,
    isNewArrival: true
  },
  // Accessories
  {
    name: "Japanese Titanium Eyewear",
    description: "Ultralight optical frames crafted from premium Japanese titanium. Feature a minimal design with flexible beta-titanium temples.",
    price: 38500,
    category: "accessories",
    subcategory: "eyewear",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000"
    ],
    colors: ["Silver", "Gold", "Matte Black"],
    sizes: ["Medium", "Large"],
    rating: 4.6,
    reviewCount: 42,
    material: "Japanese Titanium, Beta-Titanium Temples",
    careInstructions: "Clean with eyewear cloth and solution",
    inStock: true,
    quantity: 32,
    featured: false,
    isNewArrival: false
  },
  // Skincare
  {
    name: "Botanical Essence Night Treatment",
    description: "Intensive night treatment formulated with plant-derived active ingredients. Features airless pump packaging to preserve botanical efficacy.",
    price: 18500,
    category: "beauty",
    subcategory: "skincare",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?q=80&w=1000",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000"
    ],
    colors: ["50ml"],
    sizes: ["50ml"],
    rating: 4.8,
    reviewCount: 68,
    material: "Plant-Based Active Ingredients",
    careInstructions: "Store in cool, dry place",
    inStock: true,
    quantity: 42,
    featured: true,
    isNewArrival: true
  },
  // Travel
  {
    name: "Foldable Travel Backpack",
    description: "Innovative travel backpack that folds flat for storage. Crafted from lightweight, water-resistant technical fabric with minimal hardware.",
    price: 22500,
    category: "accessories",
    subcategory: "travel",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1623894888165-054e2b9e9e54?q=80&w=1000",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000"
    ],
    colors: ["Black", "Navy", "Grey"],
    sizes: ["One Size"],
    rating: 4.7,
    reviewCount: 58,
    material: "Technical Nylon Fabric",
    careInstructions: "Machine washable, air dry",
    inStock: true,
    quantity: 48,
    featured: false,
    isNewArrival: true
  },
  // Tech
  {
    name: "Minimalist Wireless Charger",
    description: "Sophisticated wireless charging pad crafted from natural marble and aluminum. Compatible with all Qi-enabled devices.",
    price: 16500,
    category: "accessories",
    subcategory: "tech",
    brand: "Modern Luxury",
    brandType: "Modern Luxury",
    images: [
      "https://images.unsplash.com/photo-1633113089631-6456cccaadad?q=80&w=1000",
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000"
    ],
    colors: ["White Marble/Silver", "Black Marble/Black"],
    sizes: ["One Size"],
    rating: 4.6,
    reviewCount: 48,
    material: "Natural Marble, Aluminum",
    careInstructions: "Wipe clean with damp cloth",
    inStock: true,
    quantity: 35,
    featured: true,
    isNewArrival: true
  }
];

// Combine all additional brand products
const completeProducts = [
  ...finalLuxuryProducts,
  ...finalDesignerProducts,
  ...finalFineJewelryProducts,
  ...finalModernLuxuryProducts
];

// Function to add products
async function addProducts() {
  // Login first to get cookie
  const cookie = await loginAdmin();
  
  for (const product of completeProducts) {
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
  
  console.log(`Attempted to add ${completeProducts.length} more brand products.`);
}

// Execute the function
addProducts().catch(console.error);