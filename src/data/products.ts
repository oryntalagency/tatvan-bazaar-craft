import honeyImg from "@/assets/product-honey.jpg";
import gheeImg from "@/assets/product-ghee.jpg";
import attaImg from "@/assets/product-atta.jpg";
import storyFarmer from "@/assets/story-farmer-family.jpg";
import storyBilona from "@/assets/story-bilona-ghee.jpg";
import storyWheat from "@/assets/story-wheat-hands.jpg";
import storyBeekeeper from "@/assets/story-beekeeper.jpg";
import storyWoman from "@/assets/story-woman-farmer.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export type ProductVariant = {
  weight: string;
  price: number;
  compareAt?: number;
  image?: string;
};

export type Review = {
  id: string;
  productId: string;
  userName: string;
  userInitial: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type ComparisonRow = {
  parameter: string;
  value: string;
  compareValue?: string;
};

export type Highlight = {
  icon: string;
  label: string;
};

export type VideoReview = {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  productId: string;
  title: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline?: string;
  price: number;
  compareAt?: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  ingredients?: string;
  usage?: string;
  storage?: string;
  benefits: string[];
  highlights?: Highlight[];
  videoReviews?: VideoReview[];
  weightOptions: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  badge?: string;
  reviews?: Review[];
  faqs?: FAQ[];
  comparisonTable?: ComparisonRow[];
  nutritionInfo?: ComparisonRow[];
};

export const categories: Category[] = [
  { slug: "honey", name: "Honey", tagline: "Raw, unheated & unfiltered" },
  { slug: "ghee", name: "Ghee", tagline: "A2 desi cow, bilona churned" },
  { slug: "atta", name: "Atta", tagline: "Stone-ground whole wheat" },
  { slug: "rice", name: "Rice", tagline: "Heritage rice varieties, stone-polished" },
  { slug: "oils", name: "Oils", tagline: "Cold-pressed, wood-pressed oils" },
];

export const products: Product[] = [
  {
    id: "p-honey-01",
    slug: "raw-forest-honey",
    name: "Raw Forest Honey",
    category: "honey",
    tagline: "Pure, unpasteurised wild honey from Himalayan forests.",
    price: 499,
    compareAt: 599,
    image: honeyImg,
    gallery: [honeyImg, storyBeekeeper],
    shortDescription: "Pure, unpasteurised wild honey from Himalayan forests.",
    description:
      "Harvested by traditional beekeepers from wild hives in the Himalayan foothills, our raw honey is unheated, unfiltered and free from any additives. Every jar carries the aroma of wildflowers, sal and jamun blooms.\n\nOur bees forage in the dense sal and jamun forests of Uttarakhand, collecting nectar from wild flora that gives each batch its distinct, complex flavour. No two harvests taste exactly the same — that's how you know it's real.",
    ingredients: "100% raw, unprocessed wild forest honey from the Himalayan foothills.",
    usage: "Drizzle over warm rotis, mix into lassi or warm water. Can also be used as a natural sweetener in teas, smoothies and desserts.",
    storage: "Store at room temperature away from direct sunlight. Honey may crystallise over time — this is a sign of purity. To liquefy, place the jar in warm water.",
    benefits: [
      "100% raw & unprocessed",
      "Rich in natural enzymes & antioxidants",
      "Ethically harvested from wild hives",
      "No added sugar or preservatives",
    ],
    highlights: [
      { icon: "Droplet", label: "Single Origin" },
      { icon: "Leaf", label: "Unprocessed" },
      { icon: "ShieldCheck", label: "Lab Tested" },
      { icon: "Award", label: "Raw & Pure" },
    ],
    videoReviews: [
      { id: "vr1", videoUrl: "", thumbnailUrl: honeyImg, productId: "p-honey-01", title: "See the golden pour — thick & aromatic" },
      { id: "vr2", videoUrl: "", thumbnailUrl: storyBeekeeper, productId: "p-honey-01", title: "Meet our beekeepers in Uttarakhand" },
      { id: "vr3", videoUrl: "", thumbnailUrl: storyFarmer, productId: "p-honey-01", title: "From forest hive to your jar" },
    ],
    weightOptions: ["250g", "500g", "1kg"],
    variants: [
      { weight: "250g", price: 499, compareAt: 599 },
      { weight: "500g", price: 899, compareAt: 1099 },
      { weight: "1kg", price: 1599, compareAt: 1999 },
    ],
    rating: 4.9,
    reviewCount: 214,
    badge: "Bestseller",
    reviews: [
      { id: "r1", productId: "p-honey-01", userName: "Priya S.", userInitial: "P", rating: 5, title: "Best honey I've ever had", body: "The flavour is incredible — you can taste the wildflowers. My family goes through a jar every two weeks now.", date: "2025-12-15", verified: true },
      { id: "r2", productId: "p-honey-01", userName: "Arjun M.", userInitial: "A", rating: 5, title: "Pure and authentic", body: "Finally found honey that tastes like what my grandmother used to buy. Thick, aromatic, and absolutely pure.", date: "2025-11-28", verified: true },
      { id: "r3", productId: "p-honey-01", userName: "Neha K.", userInitial: "N", rating: 4, title: "Great quality, wish it was bigger", body: "Amazing quality honey. The 250g jar was gone in a week! Will order the 1kg next time.", date: "2025-11-10", verified: true },
      { id: "r4", productId: "p-honey-01", userName: "Rahul D.", userInitial: "R", rating: 5, title: "Worth every rupee", body: "Compared to store-bought honey, this is in a completely different league. The texture and aroma are unmatched.", date: "2025-10-22", verified: false },
    ],
    faqs: [
      { id: "f1", question: "Is this honey raw and unprocessed?", answer: "Yes. Our honey is never heated above natural hive temperature. It is unfiltered and contains no additives, preservatives, or added sugar." },
      { id: "f2", question: "How should I store the honey?", answer: "Store at room temperature away from direct sunlight. Honey may crystallise over time — this is a sign of purity. To liquefy, place the jar in warm water." },
      { id: "f3", question: "Is it safe for children?", answer: "Raw honey is not recommended for children under 1 year of age. For older children and adults, it's perfectly safe and nutritious." },
    ],
    comparisonTable: [
      { parameter: "Processing", value: "Raw, unheated", compareValue: "Heated & ultra-filtered" },
      { parameter: "Additives", value: "None", compareValue: "Often contains syrups" },
      { parameter: "Source", value: "Wild forest hives", compareValue: "Commercial apiaries" },
      { parameter: "Enzyme content", value: "Preserved", compareValue: "Destroyed by heat" },
      { parameter: "Taste", value: "Complex, floral", compareValue: "Uniform, bland" },
    ],
  },
  {
    id: "p-ghee-01",
    slug: "a2-bilona-ghee",
    name: "A2 Bilona Ghee",
    category: "ghee",
    tagline: "Hand-churned A2 desi cow ghee, golden and aromatic.",
    price: 899,
    compareAt: 1099,
    image: gheeImg,
    gallery: [gheeImg, storyBilona],
    shortDescription: "Hand-churned A2 desi cow ghee, golden and aromatic.",
    description:
      "Made the ancient bilona way — curd is churned to butter, then slow-cooked over wood fire until it turns into golden, granular ghee. Sourced only from grass-fed A2 Gir cows.\n\nThe bilona method is a labour-intensive process: one litre of ghee requires approximately 25-30 litres of A2 milk. Each batch is slow-cooked to preserve the natural nutrients and develop the signature nutty aroma that distinguishes traditional ghee from modern factory-produced alternatives.",
    ingredients: "100% pure A2 bilona ghee from grass-fed Gir cow milk. No additives, preservatives, or artificial flavours.",
    usage: "Use for cooking, sautéing, tempering dals, making parathas, or stirring into chai. Can also be consumed directly — one tablespoon daily on an empty stomach.",
    storage: "Store in a cool, dry place. No refrigeration needed. Always use a dry spoon. Shelf life of 12 months from manufacturing date.",
    benefits: [
      "A2 milk from grass-fed Gir cows",
      "Traditional bilona churning",
      "Slow wood-fire cooked",
      "Rich in Vitamin A, D, E & K",
    ],
    highlights: [
      { icon: "Milk", label: "A2 Gir Cow" },
      { icon: "Leaf", label: "Bilona Churned" },
      { icon: "Flame", label: "Wood-Fire" },
      { icon: "ShieldCheck", label: "Lab Verified" },
    ],
    videoReviews: [
      { id: "vr4", videoUrl: "", thumbnailUrl: gheeImg, productId: "p-ghee-01", title: "The bilona process in action" },
      { id: "vr5", videoUrl: "", thumbnailUrl: storyBilona, productId: "p-ghee-01", title: "From curd to golden ghee" },
    ],
    weightOptions: ["250ml", "500ml", "1L"],
    variants: [
      { weight: "250ml", price: 899, compareAt: 1099 },
      { weight: "500ml", price: 1699, compareAt: 2099 },
      { weight: "1L", price: 2999, compareAt: 3999 },
    ],
    rating: 4.8,
    reviewCount: 168,
    badge: "New",
    reviews: [
      { id: "r5", productId: "p-ghee-01", userName: "Sanjay R.", userInitial: "S", rating: 5, title: "Tastes like home", body: "This ghee reminds me of my mother's kitchen. The granular texture and nutty aroma are exactly what real ghee should be.", date: "2025-12-20", verified: true },
      { id: "r6", productId: "p-ghee-01", userName: "Meera P.", userInitial: "M", rating: 5, title: "Best ghee for cooking", body: "I use this for everything — dal tadka, parathas, even in my chai. The flavour elevates every dish.", date: "2025-12-01", verified: true },
      { id: "r7", productId: "p-ghee-01", userName: "Kiran L.", userInitial: "K", rating: 4, title: "Premium quality", body: "Pricey but worth it. You can taste the difference from regular ghee. The A2 milk source gives me confidence about purity.", date: "2025-11-15", verified: true },
    ],
    faqs: [
      { id: "f4", question: "What makes A2 ghee different from regular ghee?", answer: "A2 ghee is made from milk containing only the A2 beta-casein protein, which is easier to digest. Our Gir cows are indigenous breeds that naturally produce A2 milk." },
      { id: "f5", question: "What is the bilona method?", answer: "Bilona is the traditional Indian method of making ghee: milk is curdled, the curd is hand-churned to extract butter, and the butter is slow-cooked until it transforms into golden ghee." },
      { id: "f6", question: "How long does the ghee last?", answer: "Our ghee has a shelf life of 12 months from the date of manufacturing. No refrigeration needed. Always use a dry spoon." },
    ],
    comparisonTable: [
      { parameter: "Milk source", value: "A2 Gir cow milk", compareValue: "Regular mixed-breed milk" },
      { parameter: "Method", value: "Traditional bilona", compareValue: "Machine-separated cream" },
      { parameter: "Cooking", value: "Slow wood-fire", compareValue: "High-heat industrial" },
      { parameter: "Fat profile", value: "Natural CLA & omega-3", compareValue: "Standard fat" },
      { parameter: "Granular texture", value: "Yes", compareValue: "Usually smooth/liquid" },
    ],
    nutritionInfo: [
      { parameter: "Calories", value: "120 kcal per tbsp" },
      { parameter: "Total Fat", value: "13.5g" },
      { parameter: "Saturated Fat", value: "8.5g" },
      { parameter: "Vitamin A", value: "11% DV" },
      { parameter: "Vitamin D", value: "3% DV" },
      { parameter: "Vitamin E", value: "2% DV" },
    ],
  },
  {
    id: "p-atta-01",
    slug: "stone-ground-atta",
    name: "Stone-Ground Whole Wheat Atta",
    category: "atta",
    tagline: "Chakki-fresh atta from single-origin heritage wheat.",
    price: 349,
    image: attaImg,
    gallery: [attaImg, storyWheat],
    shortDescription: "Chakki-fresh atta from single-origin heritage wheat.",
    description:
      "Milled slowly on traditional stone chakkis to preserve the wheat germ and bran. Made from single-origin Sharbati wheat grown without chemical fertilisers.\n\nOur slow-stone milling process generates minimal heat, retaining the natural nutrients, fibre, and flavour of the whole wheat grain. Each batch of atta is milled fresh and packed the same day to ensure you get the softest, fluffiest rotis every time.",
    ingredients: "100% whole grain Sharbati wheat. Stone-milled. No additives, preservatives, or bleaching agents.",
    usage: "Use to make rotis, chapatis, parathas, puris, and rotis. The soft dough rises well and produces soft, puffy rotis that stay pliable for hours.",
    storage: "Store in an airtight container in a cool, dry place. For extended freshness, keep in the refrigerator. Best consumed within 3 months of opening.",
    benefits: [
      "Slow stone-milled for freshness",
      "Chemical-free heritage Sharbati wheat",
      "High fibre & natural nutrients",
      "Soft, fluffy rotis every time",
    ],
    highlights: [
      { icon: "Wheat", label: "Heritage Wheat" },
      { icon: "Leaf", label: "Chemical-Free" },
      { icon: "Cog", label: "Stone Milled" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    videoReviews: [
      { id: "vr6", videoUrl: "", thumbnailUrl: storyWheat, productId: "p-atta-01", title: "Stone chakki milling in action" },
      { id: "vr7", videoUrl: "", thumbnailUrl: storyFarmer, productId: "p-atta-01", title: "Meet our Sharbati wheat farmers" },
    ],
    weightOptions: ["1kg", "5kg", "10kg"],
    variants: [
      { weight: "1kg", price: 349 },
      { weight: "5kg", price: 1599, compareAt: 1849 },
      { weight: "10kg", price: 2899, compareAt: 3499 },
    ],
    rating: 4.7,
    reviewCount: 92,
    reviews: [
      { id: "r8", productId: "p-atta-01", userName: "Deepa V.", userInitial: "D", rating: 5, title: "Softest rotis ever", body: "The rotis puff up beautifully and stay soft for hours. My family has completely switched to this atta.", date: "2025-12-10", verified: true },
      { id: "r9", productId: "p-atta-01", userName: "Vikram S.", userInitial: "V", rating: 4, title: "Good quality, reasonable price", body: "You can taste the difference from commercial atta. The 5kg pack is great value for a family.", date: "2025-11-22", verified: true },
    ],
    faqs: [
      { id: "f7", question: "What is stone-ground atta?", answer: "Stone-ground atta is milled between traditional stone chakkis that rotate slowly, generating minimal heat and preserving the wheat germ, bran, and natural nutrients." },
      { id: "f8", question: "Is the wheat organic?", answer: "Our Sharbati wheat is grown without chemical fertilisers or pesticides. While not formally certified organic, it follows traditional farming practices." },
      { id: "f9", question: "How does it differ from packaged flour?", answer: "Commercial flour is typically roller-milled at high speed, which generates heat and destroys nutrients. Our slow stone milling retains fibre, vitamins, and natural flavour." },
    ],
    comparisonTable: [
      { parameter: "Milling", value: "Slow stone chakki", compareValue: "High-speed roller mill" },
      { parameter: "Wheat", value: "Single-origin Sharbati", compareValue: "Mixed-source wheat" },
      { parameter: "Wheat germ", value: "Retained", compareValue: "Removed" },
      { parameter: "Freshness", value: "Milled & packed same day", compareValue: "Months-old stock" },
      { parameter: "Roti softness", value: "Stays soft for hours", compareValue: "Turns stiff quickly" },
    ],
  },
  {
    id: "p-honey-02",
    slug: "wild-forest-mustard-honey",
    name: "Wild Forest Mustard Honey",
    category: "honey",
    tagline: "Bold, pungent honey from wild mustard fields.",
    price: 599,
    compareAt: 699,
    image: honeyImg,
    gallery: [honeyImg, storyBeekeeper],
    shortDescription: "Bold, pungent honey with a distinctive mustard-blossom character.",
    description:
      "A uniquely Indian honey harvested from wild mustard fields in the Terai region. This raw, unprocessed honey carries the bold, slightly pungent character of mustard blossoms — unlike anything you'll find on a supermarket shelf.\n\nMustard honey is prized for its distinctive amber colour and complex, savoury-sweet flavour profile. Rich in naturally occurring minerals, it's a favourite among honey connoisseurs looking for something truly different.",
    ingredients: "100% raw wild forest mustard honey from the Terai region. No additives or processing.",
    usage: "Excellent drizzled over cheese, warm naan, or stirred into marinades. Its bold flavour pairs beautifully with Indian spices and savoury dishes.",
    storage: "Store at room temperature away from direct sunlight. Crystallisation is natural. Warm gently in a water bath if needed.",
    benefits: [
      "Wild-harvested from mustard fields",
      "Rich in natural minerals",
      "Bold, distinctive flavour profile",
      "Raw & unprocessed",
    ],
    highlights: [
      { icon: "Droplet", label: "Mustard Fields" },
      { icon: "Leaf", label: "Wild Harvested" },
      { icon: "ShieldCheck", label: "Lab Tested" },
      { icon: "Award", label: "Raw & Pure" },
    ],
    weightOptions: ["250g", "500g"],
    variants: [
      { weight: "250g", price: 599, compareAt: 699 },
      { weight: "500g", price: 1099, compareAt: 1299 },
    ],
    rating: 4.7,
    reviewCount: 76,
    badge: "Limited",
    reviews: [
      { id: "r10", productId: "p-honey-02", userName: "Rohit P.", userInitial: "R", rating: 5, title: "Unique and delicious", body: "Never tasted anything like this before. The mustard character is subtle but adds so much depth. Perfect with cheese.", date: "2025-12-05", verified: true },
      { id: "r11", productId: "p-honey-02", userName: "Anita K.", userInitial: "A", rating: 4, title: "Great for cooking", body: "I've been using this in marinades and salad dressings. It gives a wonderful warmth to savoury dishes.", date: "2025-11-18", verified: true },
    ],
    faqs: [
      { id: "f10", question: "What does mustard honey taste like?", answer: "Mustard honey has a bold, slightly pungent character with savoury-sweet notes. It's more complex than regular floral honey and has a distinctive amber colour." },
      { id: "f11", question: "Can I use it for cooking?", answer: "Absolutely. Its bold flavour makes it excellent for marinades, dressings, and savoury glazes. It pairs well with Indian spices." },
    ],
  },
  {
    id: "p-honey-03",
    slug: "wild-forest-sidr-honey",
    name: "Wild Forest Sidr Honey",
    category: "honey",
    tagline: "Rare, premium sidr honey from ancient forests.",
    price: 1299,
    compareAt: 1599,
    image: honeyImg,
    gallery: [honeyImg, storyBeekeeper],
    shortDescription: "Rare, premium sidr honey harvested from ancient wild sidr trees.",
    description:
      "Sidr honey is one of the most prized and expensive honeys in the world, and for good reason. Harvested from the blossoms of the ancient sidr (lote/bidara) tree, this monofloral honey carries a rich, resinous sweetness with a thick, velvety texture.\n\nOur sidr honey comes from wild sidr forests in Uttarakhand, where bees feast exclusively on sidr blossoms during the brief flowering season. Each jar is a rare treasure — limited batches only.",
    ingredients: "100% raw wild sidr (lote) honey. Monofloral, unprocessed, no additives.",
    usage: "Best enjoyed straight from the spoon or drizzled over warm bread. Use sparingly — its intensity goes a long way. Also excellent in warm milk.",
    storage: "Store in a cool, dark place. Due to its low moisture content, sidr honey has an exceptionally long shelf life.",
    benefits: [
      "Rare monofloral sidr honey",
      "Thick, velvety texture",
      "Resinous, complex sweetness",
      "Limited harvest batches",
    ],
    highlights: [
      { icon: "Crown", label: "Rare Sidr" },
      { icon: "Leaf", label: "Monofloral" },
      { icon: "ShieldCheck", label: "Lab Certified" },
      { icon: "Sparkles", label: "Limited Batch" },
    ],
    weightOptions: ["250g", "500g"],
    variants: [
      { weight: "250g", price: 1299, compareAt: 1599 },
      { weight: "500g", price: 2399, compareAt: 2999 },
    ],
    rating: 4.9,
    reviewCount: 42,
    badge: "Premium",
    reviews: [
      { id: "r12", productId: "p-honey-03", userName: "Arjun M.", userInitial: "A", rating: 5, title: "Worth every penny", body: "The texture and flavour are unlike anything I've tasted. You can feel the quality in every spoonful.", date: "2025-12-18", verified: true },
    ],
    faqs: [
      { id: "f12", question: "What makes sidr honey special?", answer: "Sidr honey is harvested from the blossoms of the ancient sidr tree. It's one of the most prized honeys worldwide due to its rare sourcing, thick texture, and complex flavour profile." },
    ],
  },
  {
    id: "p-ghee-02",
    slug: "cow-ghee-classic",
    name: "Classic Cow Ghee",
    category: "ghee",
    tagline: "Traditional cow ghee, slow-cooked the old-fashioned way.",
    price: 599,
    compareAt: 749,
    image: gheeImg,
    gallery: [gheeImg, storyBilona],
    shortDescription: "Traditional cow ghee slow-cooked over wood fire for rich, nutty flavour.",
    description:
      "Our Classic Cow Ghee is made using the traditional hand-churning method, slow-cooked over wood fire to develop its signature golden colour and nutty aroma. Sourced from desi cow milk from small farms in the Kumaon hills.\n\nEvery batch is cooked with care in small quantities, ensuring consistent quality and that unmistakable homemade taste that brings back memories of traditional Indian kitchens.",
    ingredients: "100% pure cow ghee from desi cow milk. Churned, strained, and slow-cooked. No additives or preservatives.",
    usage: "Perfect for daily cooking, dal tadka, tempering spices, and making traditional sweets. Also excellent spread on hot rotis or stirred into warm milk before bed.",
    storage: "Store in a cool, dry place. Use a clean, dry spoon each time. Shelf life of 12 months from manufacturing.",
    benefits: [
      "Desi cow milk from hill farms",
      "Traditional hand-churned method",
      "Slow wood-fire cooked",
      "Rich golden colour & nutty aroma",
    ],
    highlights: [
      { icon: "Milk", label: "Desi Cow" },
      { icon: "Leaf", label: "Hand Churned" },
      { icon: "Flame", label: "Wood-Fire" },
      { icon: "ShieldCheck", label: "Lab Verified" },
    ],
    weightOptions: ["250ml", "500ml", "1L"],
    variants: [
      { weight: "250ml", price: 599, compareAt: 749 },
      { weight: "500ml", price: 1099, compareAt: 1399 },
      { weight: "1L", price: 1999, compareAt: 2599 },
    ],
    rating: 4.6,
    reviewCount: 108,
    reviews: [
      { id: "r13", productId: "p-ghee-02", userName: "Priya S.", userInitial: "P", rating: 5, title: "Just like home ghee", body: "The aroma when you open the jar — it takes me back to my grandmother's kitchen. Excellent for dal tadka.", date: "2025-12-12", verified: true },
      { id: "r14", productId: "p-ghee-02", userName: "Vikram S.", userInitial: "V", rating: 4, title: "Great value for quality ghee", body: "Good quality traditional ghee at a reasonable price. The 1L jar lasts our family about 2 months.", date: "2025-11-25", verified: true },
    ],
    faqs: [
      { id: "f13", question: "How is this different from the A2 Bilona Ghee?", answer: "Our Classic Cow Ghee uses regular desi cow milk and follows the traditional churning method. The A2 Bilona Ghee uses only A2 milk from Gir cows, which is a specific protein variant." },
      { id: "f14", question: "Is it suitable for daily cooking?", answer: "Absolutely. Our ghee has a high smoke point, making it ideal for sautéing, tempering, and all forms of Indian cooking." },
    ],
    comparisonTable: [
      { parameter: "Milk source", value: "Desi cow milk", compareValue: "Mixed-breed milk" },
      { parameter: "Method", value: "Traditional hand-churned", compareValue: "Machine-separated" },
      { parameter: "Cooking", value: "Slow wood-fire", compareValue: "High-heat industrial" },
      { parameter: "Additives", value: "None", compareValue: "Sometimes" },
    ],
  },
  {
    id: "p-rice-01",
    slug: "red-onda-matta-rice",
    name: "Red Onda Matta Rice",
    category: "rice",
    tagline: "Kerala's treasured single-polished red rice.",
    price: 299,
    compareAt: 399,
    image: attaImg,
    gallery: [attaImg, storyFarmer],
    shortDescription: "Kerala's treasured single-polished red rice with rich nutty flavour.",
    description:
      "Red Onda Matta, also known as Kerala Matta rice, is a single-polished heirloom rice variety prized for its distinctive red colour, plump grains, and rich, nutty flavour. It's been a staple in Kerala households for centuries.\n\nOur Red Onda Matta is sourced directly from traditional farmers in Kerala's Palakkad region. Single-polished to retain the nutritious bran layer while ensuring clean, fluffy grains. Perfect for making the iconic Kerala Matta rice meal or a hearty pulao.",
    ingredients: "100% single-polished Red Onda Matta rice from Palakkad, Kerala. No additives, polishing agents, or preservatives.",
    usage: "Rinse well and soak for 30 minutes before cooking. Use 1:3 rice-to-water ratio for fluffy grains. Ideal for plain rice meals, biryanis, pulao, and kanji (rice porridge).",
    storage: "Store in an airtight container in a cool, dry place. Keeps well for 6-8 months. Refrigeration extends shelf life.",
    benefits: [
      "Single-polished to retain nutrients",
      "Rich in iron & fibre",
      "Heritage Palakkad variety",
      "Distinctive nutty, earthy flavour",
    ],
    highlights: [
      { icon: "Sprout", label: "Heirloom Rice" },
      { icon: "Leaf", label: "Single Polished" },
      { icon: "Heart", label: "Iron Rich" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    weightOptions: ["1kg", "5kg", "10kg"],
    variants: [
      { weight: "1kg", price: 299, compareAt: 399 },
      { weight: "5kg", price: 1349, compareAt: 1749 },
      { weight: "10kg", price: 2499, compareAt: 3299 },
    ],
    rating: 4.6,
    reviewCount: 64,
    badge: "Heritage",
    reviews: [
      { id: "r15", productId: "p-rice-01", userName: "Meera P.", userInitial: "M", rating: 5, title: "Authentic Kerala rice", body: "Finally found real Matta rice outside Kerala! The grains are plump and the flavour is exactly what I remember from home.", date: "2025-12-08", verified: true },
      { id: "r16", productId: "p-rice-01", userName: "Rahul D.", userInitial: "R", rating: 4, title: "Healthy and tasty", body: "We switched from white rice to this. The kids love it too — the red colour is fun and the taste is really nice.", date: "2025-11-20", verified: true },
    ],
    faqs: [
      { id: "f15", question: "What is single-polished rice?", answer: "Single-polished rice goes through one round of polishing, which removes some bran while retaining more nutrients and fibre compared to fully polished white rice." },
      { id: "f16", question: "How is it different from regular brown rice?", answer: "Red Onda Matta is a specific heirloom variety from Kerala with a distinctive red colour, plump grains, and richer flavour compared to generic brown rice." },
      { id: "f17", question: "Does it take longer to cook?", answer: "It benefits from 30 minutes of soaking before cooking. Cooking time is slightly longer than white rice (about 25-30 minutes), but the texture and flavour are worth the wait." },
    ],
    comparisonTable: [
      { parameter: "Variety", value: "Heirloom Red Onda Matta", compareValue: "Regular white rice" },
      { parameter: "Polishing", value: "Single-polished", compareValue: "Multi-polished" },
      { parameter: "Bran layer", value: "Partially retained", compareValue: "Completely removed" },
      { parameter: "Fibre", value: "High", compareValue: "Very low" },
      { parameter: "Flavour", value: "Nutty, earthy", compareValue: "Neutral, bland" },
    ],
  },
  {
    id: "p-rice-02",
    slug: "basmati-classic",
    name: "Classic Basmati Rice",
    category: "rice",
    tagline: "Aged aromatic basmati from the foothills.",
    price: 449,
    compareAt: 549,
    image: attaImg,
    gallery: [attaImg, storyFarmer],
    shortDescription: "Aged aromatic basmati rice with long, slender grains.",
    description:
      "Our Classic Basmati is aged for at least 12 months to develop its signature aroma and extra-long grains. Sourced from the foothills of the Himalayas, where the unique climate and soil produce the world's finest basmati.\n\nThe aging process reduces moisture content, allowing grains to expand to nearly twice their original length while remaining separate and fluffy. Each grain is slender, aromatic, and perfectly suited for biryanis, pulaos, and plain steamed rice.",
    ingredients: "100% aged basmati rice from the Himalayan foothills. No additives, talc, or polishing agents.",
    usage: "Rinse gently and soak for 20 minutes. Cook with 1.5x water for steamed rice, or use in your favourite biryani and pulao recipes.",
    storage: "Store in an airtight container in a cool, dry place. Aged basmati keeps well for 12-18 months.",
    benefits: [
      "Aged 12+ months for extra-long grains",
      "Signature basmati aroma",
      "Grains stay separate & fluffy",
      "Sourced from Himalayan foothills",
    ],
    highlights: [
      { icon: "Sparkles", label: "12-Month Aged" },
      { icon: "Leaf", label: "Chemical-Free" },
      { icon: "Award", label: "Extra Long" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    weightOptions: ["1kg", "5kg", "10kg"],
    variants: [
      { weight: "1kg", price: 449, compareAt: 549 },
      { weight: "5kg", price: 1999, compareAt: 2499 },
      { weight: "10kg", price: 3699, compareAt: 4699 },
    ],
    rating: 4.7,
    reviewCount: 88,
    reviews: [
      { id: "r17", productId: "p-rice-02", userName: "Neha K.", userInitial: "N", rating: 5, title: "Longest grains I've seen", body: "The grains literally double in length when cooked. Made the best biryani of my life with this rice.", date: "2025-12-14", verified: true },
      { id: "r18", productId: "p-rice-02", userName: "Sanjay R.", userInitial: "S", rating: 4, title: "Aromatic and premium", body: "You can smell the quality even before opening the pack. The 5kg pack is great for regular biryani lovers.", date: "2025-11-30", verified: true },
    ],
    faqs: [
      { id: "f18", question: "Why is aged basmati better?", answer: "Aging reduces moisture content, which allows grains to expand more during cooking, resulting in extra-long, separate, and fluffy grains. It also develops a deeper, more complex aroma." },
      { id: "f19", question: "How long should I soak it?", answer: "Soak for 15-20 minutes before cooking. This helps the grains cook evenly and reach their maximum length." },
    ],
    comparisonTable: [
      { parameter: "Aging", value: "12+ months", compareValue: "Fresh/unaged" },
      { parameter: "Grain length", value: "Extra-long (expanded)", compareValue: "Regular" },
      { parameter: "Aroma", value: "Deep, complex", compareValue: "Mild" },
      { parameter: "After cooking", value: "Separate, fluffy", compareValue: "Often sticky" },
    ],
  },
  {
    id: "p-oils-01",
    slug: "cold-pressed-mustard-oil",
    name: "Cold-Pressed Mustard Oil",
    category: "oils",
    tagline: "Wood-pressed mustard oil with bold, authentic flavour.",
    price: 349,
    compareAt: 449,
    image: gheeImg,
    gallery: [gheeImg, storyFarmer],
    shortDescription: "Wood-pressed mustard oil with bold, authentic Indian kitchen flavour.",
    description:
      "Our Cold-Pressed Mustard Oil is extracted using traditional wood-press (kacchi ghani) methods at low temperatures to preserve the oil's natural pungency, nutritional value, and deep golden colour.\n\nMustard oil is the backbone of North and East Indian cooking. Our oil's bold, sharp flavour elevates everything from fish fries to pickle-making. The cold-press process ensures the oil retains its natural omega-3 fatty acids and antioxidants.",
    ingredients: "100% cold-pressed (wood-pressed) mustard oil from single-origin mustard seeds. No refining, deodorising, or additives.",
    usage: "Use for tempering, deep frying, sautéing, and making pickles. Heat until the smoke point for cooking, or use raw in salad dressings for a bold kick.",
    storage: "Store in a cool, dark place. Keep the lid tightly closed. The oil may solidify in cold weather — this is normal and reverses at room temperature.",
    benefits: [
      "Wood-pressed (kacchi ghani) method",
      "Rich in omega-3 fatty acids",
      "Bold, authentic flavour",
      "No refining or additives",
    ],
    highlights: [
      { icon: "Droplet", label: "Wood Pressed" },
      { icon: "Leaf", label: "Cold Extracted" },
      { icon: "Heart", label: "Omega-3 Rich" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    weightOptions: ["500ml", "1L", "2L"],
    variants: [
      { weight: "500ml", price: 349, compareAt: 449 },
      { weight: "1L", price: 599, compareAt: 749 },
      { weight: "2L", price: 1099, compareAt: 1399 },
    ],
    rating: 4.6,
    reviewCount: 53,
    reviews: [
      { id: "r19", productId: "p-oils-01", userName: "Deepa V.", userInitial: "D", rating: 5, title: "Real mustard oil flavour", body: "The pungency and aroma are exactly what I grew up with. Nothing like the refined stuff in supermarkets.", date: "2025-12-06", verified: true },
      { id: "r20", productId: "p-oils-01", userName: "Arjun M.", userInitial: "A", rating: 4, title: "Great for pickles", body: "Made achaar with this oil — the flavour is outstanding. The 2L jar is perfect for the whole year's pickle supply.", date: "2025-11-14", verified: true },
    ],
    faqs: [
      { id: "f20", question: "What is cold-pressed oil?", answer: "Cold-pressed (wood-pressed/kacchi ghani) oil is extracted by crushing seeds at low temperatures using a traditional wooden press. This preserves nutrients, flavour, and natural colour." },
      { id: "f21", question: "Why does mustard oil solidify in winter?", answer: "Mustard oil naturally contains saturated fats that solidify at low temperatures. This is normal and doesn't indicate any quality issue. Simply warm the bottle to restore liquid form." },
      { id: "f22", question: "Can I use it for deep frying?", answer: "Yes. Mustard oil has a high smoke point and is traditionally used for deep frying in Indian cooking. Heat it past the smoking point once, then cool slightly before use." },
    ],
    comparisonTable: [
      { parameter: "Extraction", value: "Wood-pressed (cold)", compareValue: "Solvent/heat-extracted" },
      { parameter: "Processing", value: "Unrefined", compareValue: "Refined & deodorised" },
      { parameter: "Flavour", value: "Bold, authentic", compareValue: "Mild, bland" },
      { parameter: "Nutrients", value: "Preserved", compareValue: "Destroyed by heat" },
    ],
  },
  {
    id: "p-oils-02",
    slug: "cold-pressed-sesame-oil",
    name: "Cold-Pressed Sesame Oil",
    category: "oils",
    tagline: "Wood-pressed til oil for South Indian cooking.",
    price: 449,
    compareAt: 549,
    image: gheeImg,
    gallery: [gheeImg, storyFarmer],
    shortDescription: "Wood-pressed sesame oil with deep, nutty aroma for authentic South Indian dishes.",
    description:
      "Our Cold-Pressed Sesame Oil (gingelly oil / til ka tel) is extracted using traditional wood-press methods from carefully sourced white sesame seeds. This unrefined oil has a deep amber colour and intense, nutty aroma that's essential in South Indian, Bengali, and Ayurvedic cooking.\n\nSesame oil is prized not just for flavour but for its health benefits — rich in antioxidants, healthy fats, and sesamol, a natural preservative. Our wood-pressed version retains all these qualities.",
    ingredients: "100% cold-pressed (wood-pressed) sesame oil from premium white sesame seeds. No refining, blending, or additives.",
    usage: "Essential for South Indian tempering (tadka), stir-fries, and chutneys. Also used in pickles, Ayurvedic massage, and as a finishing oil for drizzling over cooked dishes.",
    storage: "Store in a cool, dark place. Use a clean spoon. Shelf life of 12 months from manufacturing. Refrigeration may cause slight cloudiness — this is normal.",
    benefits: [
      "Wood-pressed for maximum flavour",
      "Rich in antioxidants & sesamol",
      "Traditional South Indian essential",
      "Multi-purpose: cooking & wellness",
    ],
    highlights: [
      { icon: "Droplet", label: "Wood Pressed" },
      { icon: "Leaf", label: "Unrefined" },
      { icon: "Heart", label: "Antioxidant Rich" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    weightOptions: ["500ml", "1L"],
    variants: [
      { weight: "500ml", price: 449, compareAt: 549 },
      { weight: "1L", price: 799, compareAt: 999 },
    ],
    rating: 4.5,
    reviewCount: 37,
    reviews: [
      { id: "r21", productId: "p-oils-02", userName: "Kiran L.", userInitial: "K", rating: 5, title: "Authentic sesame oil", body: "The aroma is incredible — you can tell it's freshly pressed. Perfect for my rasam and sambar tempering.", date: "2025-12-11", verified: true },
    ],
    faqs: [
      { id: "f23", question: "Is this the same as toasted sesame oil?", answer: "No. This is cold-pressed white sesame oil, lighter in colour and suitable for cooking. Toasted sesame oil (common in Chinese cuisine) is made from roasted seeds and used as a finishing oil." },
      { id: "f24", question: "Can I use it for deep frying?", answer: "Sesame oil has a moderate smoke point and is best used for sautéing, tempering, and light frying. For deep frying, mustard or ghee would be better choices." },
    ],
    comparisonTable: [
      { parameter: "Extraction", value: "Wood-pressed (cold)", compareValue: "Refined/processed" },
      { parameter: "Flavour", value: "Deep, nutty, authentic", compareValue: "Mild, neutral" },
      { parameter: "Nutrients", value: "Fully preserved", compareValue: "Reduced by processing" },
      { parameter: "Uses", value: "Cooking, tempering, wellness", compareValue: "Cooking only" },
    ],
  },
  {
    id: "p-oils-03",
    slug: "cold-pressed-groundnut-oil",
    name: "Cold-Pressed Groundnut Oil",
    category: "oils",
    tagline: "Wood-pressed peanut oil for frying & everyday cooking.",
    price: 399,
    compareAt: 499,
    image: gheeImg,
    gallery: [gheeImg, storyFarmer],
    shortDescription: "Wood-pressed groundnut oil — the healthy, flavourful choice for Indian frying.",
    description:
      "Our Cold-Pressed Groundnut Oil is extracted from hand-selected groundnuts using traditional wood-press methods. This unrefined oil has a light golden colour, mild nutty taste, and a high smoke point that makes it ideal for deep frying.\n\nGroundnut oil has been the cooking oil of choice across South and West India for generations. Our wood-pressed version retains the natural nutrients and subtle nutty flavour that refined groundnut oil loses in processing.",
    ingredients: "100% cold-pressed (wood-pressed) groundnut oil from premium hand-selected peanuts. No refining, additives, or blending.",
    usage: "Excellent for deep frying (pakoras, vadas, puris), sautéing, and everyday cooking. Its neutral flavour doesn't overpower dishes, making it versatile for all cuisines.",
    storage: "Store in a cool, dark place. Keep tightly sealed. Shelf life of 9-12 months. Cloudiness in cold weather is normal.",
    benefits: [
      "Wood-pressed from hand-selected peanuts",
      "High smoke point for frying",
      "Light, nutty, versatile flavour",
      "Retains natural vitamin E",
    ],
    highlights: [
      { icon: "Droplet", label: "Wood Pressed" },
      { icon: "Leaf", label: "Unrefined" },
      { icon: "Flame", label: "High Smoke Point" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    weightOptions: ["500ml", "1L", "2L"],
    variants: [
      { weight: "500ml", price: 399, compareAt: 499 },
      { weight: "1L", price: 699, compareAt: 899 },
      { weight: "2L", price: 1299, compareAt: 1699 },
    ],
    rating: 4.5,
    reviewCount: 45,
    reviews: [
      { id: "r22", productId: "p-oils-03", userName: "Sanjay R.", userInitial: "S", rating: 5, title: "Best oil for frying", body: "Pakoras and vadas come out perfect with this oil. You can taste the difference from refined groundnut oil.", date: "2025-12-03", verified: true },
      { id: "r23", productId: "p-oils-03", userName: "Meera P.", userInitial: "M", rating: 4, title: "Everyday essential", body: "We use this for all our daily cooking now. The mild flavour works with everything and I feel good knowing it's unrefined.", date: "2025-11-17", verified: true },
    ],
    faqs: [
      { id: "f25", question: "Is groundnut oil good for deep frying?", answer: "Yes. Groundnut oil has one of the highest smoke points among cooking oils, making it excellent for deep frying. It also doesn't absorb into food as much as other oils." },
      { id: "f26", question: "Is this safe for people with peanut allergies?", answer: "This oil is made from peanuts. While highly refined peanut oils sometimes have lower allergen risk, our unrefined cold-pressed oil should be avoided by anyone with a peanut allergy." },
    ],
    comparisonTable: [
      { parameter: "Extraction", value: "Wood-pressed (cold)", compareValue: "Solvent-extracted" },
      { parameter: "Processing", value: "Unrefined", compareValue: "Refined & bleached" },
      { parameter: "Smoke point", value: "High (230°C)", compareValue: "Similar but less stable" },
      { parameter: "Flavour", value: "Mild, nutty", compareValue: "Neutral, flat" },
    ],
  },
  {
    id: "p-atta-02",
    slug: "multigrain-atta",
    name: "Multigrain Atta Blend",
    category: "atta",
    tagline: "Stone-ground blend of 7 ancient grains.",
    price: 449,
    compareAt: 549,
    image: attaImg,
    gallery: [attaImg, storyWheat],
    shortDescription: "Stone-ground blend of 7 ancient grains for nutritious, flavourful rotis.",
    description:
      "Our Multigrain Atta combines stone-ground whole wheat with six other ancient grains — ragi (finger millet), jowar (sorghum), bajra (pearl millet), soybean, oats, and flaxseed. The result is a nutrient-dense flour that makes soft, flavourful rotis with every meal.\n\nEach grain is individually sourced for quality and slow-stone milled to preserve nutrients. The blend is carefully balanced so that rotis roll easily and puff up beautifully — no dense, crumbly results.",
    ingredients: "Stone-ground whole wheat (60%), ragi, jowar, bajra, soybean, oats, flaxseed. No additives, preservatives, or maida.",
    usage: "Use exactly like regular atta — for rotis, chapatis, parathas, and puris. The slightly different colour and nuttier flavour make meals more interesting and nutritious.",
    storage: "Store in an airtight container. Best consumed within 2 months for maximum freshness. Refrigeration recommended after opening.",
    benefits: [
      "7 ancient grains in one flour",
      "Higher fibre & protein than plain atta",
      "Stone-ground for freshness",
      "Soft rotis with extra nutrition",
    ],
    highlights: [
      { icon: "Wheat", label: "7 Grains" },
      { icon: "Heart", label: "High Fiber" },
      { icon: "Cog", label: "Stone Milled" },
      { icon: "ShieldCheck", label: "Lab Tested" },
    ],
    weightOptions: ["1kg", "5kg"],
    variants: [
      { weight: "1kg", price: 449, compareAt: 549 },
      { weight: "5kg", price: 1999, compareAt: 2499 },
    ],
    rating: 4.5,
    reviewCount: 56,
    reviews: [
      { id: "r24", productId: "p-atta-02", userName: "Priya S.", userInitial: "P", rating: 5, title: "Healthy and delicious", body: "My family didn't even notice the switch from regular atta. The rotis are soft and the extra nutrition gives me peace of mind.", date: "2025-12-09", verified: true },
      { id: "r25", productId: "p-atta-02", userName: "Anita K.", userInitial: "A", rating: 4, title: "Great for health-conscious families", body: "Excellent product. The 5kg pack is good value. Rotis come out soft — was worried they'd be dense but they're perfect.", date: "2025-11-21", verified: true },
    ],
    faqs: [
      { id: "f27", question: "Will the rotis be dense or hard?", answer: "Not at all. Our blend is carefully balanced so rotis roll easily and puff up beautifully. The 60% wheat base ensures the familiar soft texture while the other grains add nutrition." },
      { id: "f28", question: "Can I use it for parathas?", answer: "Yes, absolutely. The atta works perfectly for parathas, theplas, and stuffed flatbreads. The multigrain blend actually adds a pleasant nutty flavour to parathas." },
    ],
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
