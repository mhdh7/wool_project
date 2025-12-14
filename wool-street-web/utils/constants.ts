// Alamat Package Smart Contract lo (Deploy tadi)
export const PACKAGE_ID = "0x179b88a9e9346334acb2da5e9bc233ba889322e0e458b081ce263c104a5877ae";
export const MARKET_ID = "0xc3ab4ee928df8552bd135a57153541db0ab12e93eb85e937a0f6808cf237e521"; 
export const GOAT_TYPE = `${PACKAGE_ID}::core::Goat`;
export const ACCESSORY_TYPE = `${PACKAGE_ID}::core::Accessory`;

// 🐐 GAMBAR KAMBING YANG LEBIH LUCU (Uncomment salah satu untuk ganti default)
// Pakai di GameStage.tsx kalau mau ganti kambing default
export const GOAT_IMAGES = {
  default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/673.png",
  cartoon: "https://cdn-icons-png.flaticon.com/512/2254/2254944.png", // Kambing kartun
  cute: "https://cdn-icons-png.flaticon.com/512/616/616430.png", // Kambing cute
  cool: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png", // Kambing cool
};

// 🛍️ SHOP ITEMS - UPGRADED VERSION
export const SHOP_ITEMS = [
  // === TIER 1: BASIC (1000-3000) ===
  {
    id: "item_hat",
    name: "Topi Jerami",
    price: 1000,
    image: "https://cdn-icons-png.flaticon.com/512/2784/2784432.png", // Topi jerami lebih jelas
    type: "Hat",
    tier: 1
  },
  {
    id: "item_glasses",
    name: "Kacamata Hitam",
    price: 2500,
    image: "https://cdn-icons-png.flaticon.com/512/2956/2956879.png", // Kacamata hitam keren
    type: "Glasses",
    tier: 1
  },
  {
    id: "item_bandana",
    name: "Bandana Merah",
    price: 1500,
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050067.png", // Bandana
    type: "Head",
    tier: 1
  },
  
  // === TIER 2: COOL (3000-8000) ===
  {
    id: "item_chain",
    name: "Kalung Emas",
    price: 5000,
    image: "https://cdn-icons-png.flaticon.com/512/2913/2913133.png", // Kalung emas bling
    type: "Necklace",
    tier: 2
  },
  {
    id: "item_fedora",
    name: "Topi Fedora",
    price: 4000,
    image: "https://cdn-icons-png.flaticon.com/512/2784/2784559.png", // Fedora classy
    type: "Hat",
    tier: 2
  },
  {
    id: "item_shades",
    name: "Kacamata Thug Life",
    price: 6000,
    image: "https://cdn-icons-png.flaticon.com/512/4201/4201973.png", // Deal with it sunglasses
    type: "Glasses",
    tier: 2
  },
  {
    id: "item_bowtie",
    name: "Dasi Kupu-Kupu",
    price: 3500,
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050322.png", // Bow tie
    type: "Neck",
    tier: 2
  },
  
  // === TIER 3: BOSS (8000-15000) ===
  {
    id: "item_crown",
    name: "Mahkota Raja",
    price: 10000,
    image: "https://cdn-icons-png.flaticon.com/512/3163/3163417.png", // Crown
    type: "Crown",
    tier: 3
  },
  {
    id: "item_diamond_chain",
    name: "Rantai Diamond",
    price: 12000,
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050413.png", // Diamond chain
    type: "DiamondChain",
    tier: 3
  },
  {
    id: "item_gold_watch",
    name: "Jam Tangan Emas",
    price: 8000,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Gold watch
    type: "Watch",
    tier: 3
  },
  {
    id: "item_monocle",
    name: "Monocle Fancy",
    price: 7000,
    image: "https://cdn-icons-png.flaticon.com/512/3014/3014737.png", // Monocle
    type: "Monocle",
    tier: 3
  },
  
  // === TIER 4: LEGENDARY (15000+) ===
  {
    id: "item_laser_eyes",
    name: "Laser Eyes",
    price: 20000,
    image: "https://cdn-icons-png.flaticon.com/512/4225/4225683.png", // Laser vision
    type: "Eyes",
    tier: 4
  },
  {
    id: "item_top_hat",
    name: "Top Hat Gentleman",
    price: 15000,
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050224.png", // Top hat
    type: "Hat",
    tier: 4
  },
  {
    id: "item_suit",
    name: "Jas Mafia",
    price: 18000,
    image: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png", // Suit
    type: "Suit",
    tier: 4
  },
  
  // === MEME ITEMS ===
  {
    id: "item_cigar",
    name: "Cerutu Boss",
    price: 5000,
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050155.png", // Cigar
    type: "Mouth",
    tier: 2
  },
  {
    id: "item_pizza",
    name: "Pizza Slice",
    price: 2000,
    image: "https://cdn-icons-png.flaticon.com/512/3480/3480645.png", // Pizza
    type: "Food",
    tier: 1
  },
];

// Helper: Get items by tier
export const getItemsByTier = (tier: number) => {
  return SHOP_ITEMS.filter(item => item.tier === tier);
};

// Helper: Get total items owned value
export const calculateTotalValue = (items: any[]) => {
  return items.reduce((total, item) => total + (item.price || 0), 0);
};
