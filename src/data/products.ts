import honeyImg from "@/assets/product-honey.jpg";
import gheeImg from "@/assets/product-ghee.jpg";
import attaImg from "@/assets/product-atta.jpg";

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

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  tagline?: string;
  price: number;    // in INR
  compareAt?: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
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
    gallery: [honeyImg],
    shortDescription: "Pure, unpasteurised wild honey from Himalayan forests.",
    description:
      "Harvested by traditional beekeepers from wild hives in the Himalayan foothills, our raw honey is unheated, unfiltered and free from any additives. Every jar carries the aroma of wildflowers, sal and jamun blooms.\n\nOur bees forage in the dense sal and jamun forests of Uttarakhand, collecting nectar from wild flora that gives each batch its distinct, complex flavour. No two harvests taste exactly the same — that's how you know it's real.",
    benefits: [
      "100% raw & unprocessed",
      "Rich in natural enzymes & antioxidants",
      "Ethically harvested from wild hives",
      "No added sugar or preservatives",
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
    gallery: [gheeImg],
    shortDescription: "Hand-churned A2 desi cow ghee, golden and aromatic.",
    description:
      "Made the ancient bilona way — curd is churned to butter, then slow-cooked over wood fire until it turns into golden, granular ghee. Sourced only from grass-fed A2 Gir cows.\n\nThe bilona method is a labour-intensive process: one litre of ghee requires approximately 25-30 litres of A2 milk. Each batch is slow-cooked to preserve the natural nutrients and develop the signature nutty aroma that distinguishes traditional ghee from modern factory-produced alternatives.",
    benefits: [
      "A2 milk from grass-fed Gir cows",
      "Traditional bilona churning",
      "Slow wood-fire cooked",
      "Rich in Vitamin A, D, E & K",
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
    gallery: [attaImg],
    shortDescription: "Chakki-fresh atta from single-origin heritage wheat.",
    description:
      "Milled slowly on traditional stone chakkis to preserve the wheat germ and bran. Made from single-origin Sharbati wheat grown without chemical fertilisers.\n\nOur slow-stone milling process generates minimal heat, retaining the natural nutrients, fibre, and flavour of the whole wheat grain. Each batch of atta is milled fresh and packed the same day to ensure you get the softest, fluffiest rotis every time.",
    benefits: [
      "Slow stone-milled for freshness",
      "Chemical-free heritage Sharbati wheat",
      "High fibre & natural nutrients",
      "Soft, fluffy rotis every time",
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
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
