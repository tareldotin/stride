// ─────────────────────────────────────────────────────────────
// STRIDE — catalog source of truth (seeds Postgres, also used
// as a resilience fallback if the database is unreachable).
// ─────────────────────────────────────────────────────────────

export type SeedProduct = {
  slug: string;
  name: string;
  category: "footwear" | "apparel" | "equipment";
  collectionSlug: string;
  priceCents: number;
  compareAtCents?: number | null;
  tag?: "NEW" | "BESTSELLER" | null;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  rating: number;
  reviews: number;
};

export type SeedCollection = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  cover: string;
};

const px = (id: number, w = 940, h = 1250) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const pxWide = (id: number, w = 1600, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const CATEGORIES = [
  { slug: "footwear", label: "Footwear" },
  { slug: "apparel", label: "Apparel" },
  { slug: "equipment", label: "Equipment" },
] as const;

export const COLLECTIONS: SeedCollection[] = [
  {
    slug: "run-division",
    index: "01",
    name: "Run Division",
    tagline: "Speed is a decision.",
    description:
      "Carbon-tuned footwear and featherweight layers built for the daily chase — tempo days, race days, and every dark 5AM in between.",
    cover: pxWide(3763873, 1800, 1100),
  },
  {
    slug: "court-culture",
    index: "02",
    name: "Court Culture",
    tagline: "Own the blacktop.",
    description:
      "Hoops heritage re-engineered. Ankle-locking traction, impact-hungry cushioning and silhouettes that look as fast as they play.",
    cover: pxWide(2834916, 1800, 1100),
  },
  {
    slug: "iron-club",
    index: "03",
    name: "Iron Club",
    tagline: "Strength, distilled.",
    description:
      "Cast iron, coarse knurling, zero gimmicks. Garage-gym essentials engineered to outlive every program you will ever run.",
    cover: pxWide(32610333, 1800, 1100),
  },
  {
    slug: "off-duty",
    index: "04",
    name: "Off Duty",
    tagline: "Recovery is training.",
    description:
      "Heavyweight fleece, sculpted knits and quiet palettes. Built for the 23 hours you spend not training — so you can go again.",
    cover: pxWide(6283367, 1800, 1100),
  },
];

const SHOE_SIZES = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"];
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const PRODUCTS: SeedProduct[] = [
  {
    slug: "velocity-racer-01",
    name: "Velocity Racer 01",
    category: "footwear",
    collectionSlug: "run-division",
    priceCents: 18900,
    tag: "NEW",
    description:
      "Our flagship racer. A full-length carbon plate wrapped in nitrogen-infused superfoam returns 89% of every footstrike — the fastest shoe we have ever built.",
    details: [
      "Full-length carbon fibre propulsion plate",
      "NitroCell™ superfoam — 89% energy return",
      "Single-piece engineered mesh, 184g (US 9)",
      "8mm heel-to-toe drop · race geometry",
    ],
    sizes: SHOE_SIZES,
    colors: [
      { name: "Onyx", hex: "#141518" },
      { name: "Volt", hex: "#D8FF3D" },
      { name: "Bone", hex: "#E7E3D9" },
    ],
    images: [px(5930091), px(18202637)],
    rating: 4.9,
    reviews: 214,
  },
  {
    slug: "apex-court-lux",
    name: "Apex Court Lux",
    category: "footwear",
    collectionSlug: "court-culture",
    priceCents: 16400,
    tag: "BESTSELLER",
    description:
      "A terrace classic rebuilt for 94 feet of war. Herringbone traction, lateral cage and a crash-pad heel that eats hard landings for breakfast.",
    details: [
      "Herringbone outsole — bite on any surface",
      "Lateral TPU cage for hard cuts",
      "Premium leather + ballistic nylon upper",
      "Impact crash-pad heel unit",
    ],
    sizes: SHOE_SIZES,
    colors: [
      { name: "White / Flame", hex: "#F2F0EA" },
      { name: "Triple Black", hex: "#0D0D0F" },
      { name: "Court Red", hex: "#C1272D" },
    ],
    images: [px(6540973), px(17918935)],
    rating: 4.8,
    reviews: 502,
  },
  {
    slug: "terratrail-gtx",
    name: "TerraTrail GTX",
    category: "footwear",
    collectionSlug: "run-division",
    priceCents: 20400,
    compareAtCents: 22900,
    description:
      "Storm-proof trail weapon. A waterproof membrane, 5mm multidirectional lugs and a rock plate let you point at any ridgeline and go.",
    details: [
      "Waterproof-breathable GTX membrane",
      "5mm multidirectional lugs, sticky rubber",
      "Flexible forefoot rock plate",
      "Gaiter attachment points",
    ],
    sizes: SHOE_SIZES,
    colors: [
      { name: "Basalt", hex: "#23262B" },
      { name: "Moss", hex: "#5C6B4F" },
    ],
    images: [px(18202673), px(8551786)],
    rating: 4.7,
    reviews: 189,
  },
  {
    slug: "cloudform-knit",
    name: "Cloudform Knit",
    category: "footwear",
    collectionSlug: "run-division",
    priceCents: 14900,
    tag: "NEW",
    description:
      "The everyday mile-eater. A sock-like recycled knit rides on our softest midsole ever — 30% plusher than the previous generation.",
    details: [
      "92% recycled engineered knit upper",
      "CloudFoam™ midsole — softest compound yet",
      "Machine washable",
      "232g (US 9) · 10mm drop",
    ],
    sizes: SHOE_SIZES,
    colors: [
      { name: "Fog", hex: "#C9C7C2" },
      { name: "Ink", hex: "#191B1F" },
    ],
    images: [px(26852035), px(28381500)],
    rating: 4.6,
    reviews: 98,
  },
  {
    slug: "sonic-blaze",
    name: "Sonic Blaze",
    category: "footwear",
    collectionSlug: "court-culture",
    priceCents: 17600,
    description:
      "Built for guards who live above the rim. A dual-density reactor midsole and wrap-around plate turn vertical force into horizontal fear.",
    details: [
      "Dual-density Reactor™ midsole",
      "Wrap-around propulsion plate",
      "Padded Achilles cradle",
      "Abrasion-proof toe drag guard",
    ],
    sizes: SHOE_SIZES,
    colors: [
      { name: "Flame", hex: "#E4572E" },
      { name: "Ghost", hex: "#EDEBE6" },
    ],
    images: [px(11324546), px(12628400)],
    rating: 4.7,
    reviews: 76,
  },
  {
    slug: "phantom-low",
    name: "Phantom Low",
    category: "footwear",
    collectionSlug: "off-duty",
    priceCents: 13200,
    tag: "BESTSELLER",
    description:
      "The recovery-day silhouette. Sculpted lines, marshmallow EVA and a collapsible heel — slides on after the session, disappears on foot.",
    details: [
      "Sculpted one-piece EVA midsole",
      "Collapsible easy-entry heel",
      "Suede + ripstop upper",
      "All-day cushioning geometry",
    ],
    sizes: SHOE_SIZES,
    colors: [
      { name: "Ghost", hex: "#EDEBE6" },
      { name: "Onyx", hex: "#141518" },
    ],
    images: [px(12628400), px(26852035)],
    rating: 4.8,
    reviews: 341,
  },
  {
    slug: "motion-hoodie",
    name: "Motion Hoodie",
    category: "apparel",
    collectionSlug: "off-duty",
    priceCents: 9800,
    tag: "BESTSELLER",
    description:
      "480GSM brushed-loop fleece cut in our signature athletic block. Dense enough to hold its shape forever, soft enough to sleep in.",
    details: [
      "480GSM heavyweight brushed fleece",
      "Athletic block — room through chest, taper at hem",
      "Double-lined hood, hidden phone pocket",
      "Garment-dyed, pre-shrunk",
    ],
    sizes: APPAREL_SIZES,
    colors: [
      { name: "Oat", hex: "#C9B49A" },
      { name: "Oxford", hex: "#2E3138" },
      { name: "Merlot", hex: "#6E2B33" },
    ],
    images: [px(16982847), px(9594667)],
    rating: 4.9,
    reviews: 618,
  },
  {
    slug: "aero-shell-jacket",
    name: "Aero Shell Jacket",
    category: "apparel",
    collectionSlug: "off-duty",
    priceCents: 22800,
    tag: "NEW",
    description:
      "A 3-layer storm shell that weighs nothing and stops everything. 20K/20K waterproof-breathable ratings with fully taped seams.",
    details: [
      "3L laminate — 20K waterproof / 20K breathable",
      "Fully taped seams, YKK AquaGuard® zips",
      "Helmet-compatible storm hood",
      "Packs into its own chest pocket",
    ],
    sizes: APPAREL_SIZES,
    colors: [
      { name: "Blackout", hex: "#101114" },
      { name: "Pine", hex: "#2E4438" },
    ],
    images: [px(32532709), px(9594673)],
    rating: 4.8,
    reviews: 87,
  },
  {
    slug: "flex-seamless-set",
    name: "Flex Seamless Set",
    category: "apparel",
    collectionSlug: "off-duty",
    priceCents: 8600,
    description:
      "A second-skin seamless knit engineered in one piece — zero chafe points, total four-way stretch, compression exactly where you want it.",
    details: [
      "One-piece circular seamless knit",
      "Zoned compression mapping",
      "Sweat-wicking, squat-proof opacity",
      "Bra + high-rise tight set",
    ],
    sizes: APPAREL_SIZES,
    colors: [
      { name: "Graphite", hex: "#3A3D42" },
      { name: "Rose Taupe", hex: "#B98F8A" },
    ],
    images: [px(6453528), px(33604186)],
    rating: 4.7,
    reviews: 233,
  },
  {
    slug: "altitude-bra",
    name: "Altitude High-Support Bra",
    category: "apparel",
    collectionSlug: "iron-club",
    priceCents: 5800,
    description:
      "Maximum lockdown for maximum output. Encapsulated support panels and a bonded underband keep everything exactly where physics put it.",
    details: [
      "Encapsulated high-support construction",
      "Bonded no-dig underband",
      "Racerback with duo-adjust straps",
      "Removable pads",
    ],
    sizes: APPAREL_SIZES,
    colors: [
      { name: "Ember", hex: "#B63A22" },
      { name: "Onyx", hex: "#141518" },
    ],
    images: [px(15326691), px(6453616)],
    rating: 4.6,
    reviews: 154,
  },
  {
    slug: "blackout-hoodie",
    name: "Blackout Oversized Hoodie",
    category: "apparel",
    collectionSlug: "off-duty",
    priceCents: 11200,
    description:
      "The blackout capsule staple. Slouchy drop-shoulder block, tonal embroidery, and fleece so dense it practically stands up on its own.",
    details: [
      "Oversized drop-shoulder block",
      "Tonal STRIDE chain-stitch embroidery",
      "500GSM loopback fleece",
      "Rib-knit side gussets",
    ],
    sizes: APPAREL_SIZES,
    colors: [
      { name: "Blackout", hex: "#101114" },
      { name: "Merlot", hex: "#6E2B33" },
    ],
    images: [px(15326697), px(14930822)],
    rating: 4.8,
    reviews: 290,
  },
  {
    slug: "forge-kettlebell-24",
    name: "Forge Kettlebell · 24KG",
    category: "equipment",
    collectionSlug: "iron-club",
    priceCents: 11900,
    tag: "BESTSELLER",
    description:
      "Single-cast iron with a gravity-blasted matte finish and a 35mm handle tuned for high-rep ballistics. The bell other bells copy.",
    details: [
      "Single-piece cast, zero welds",
      "35mm competition-spec handle",
      "Gravity-blasted matte texture — grip without chalk",
      "Color-coded weight band",
    ],
    sizes: ["16KG", "24KG", "32KG"],
    colors: [
      { name: "Cast Iron", hex: "#26262A" },
      { name: "Violet", hex: "#5B4B8A" },
    ],
    images: [px(6455928), px(7671461)],
    rating: 4.9,
    reviews: 430,
  },
  {
    slug: "hex-duo",
    name: "Hex Dumbbell Duo",
    category: "equipment",
    collectionSlug: "iron-club",
    priceCents: 18900,
    description:
      "Knurled steel handles pressed into odorless rubber hexagons. No rolling, no rattle, no excuses — sold as a matched pair.",
    details: [
      "Odorless virgin rubber hex heads",
      "Medium-depth knurl, 34mm handle",
      "Press-fit + welded — rattle-proof",
      "Sold as a matched pair",
    ],
    sizes: ["2 × 10KG", "2 × 15KG", "2 × 20KG"],
    colors: [{ name: "Black / Steel", hex: "#1C1D20" }],
    images: [px(14289784), px(13863727)],
    rating: 4.7,
    reviews: 201,
  },
  {
    slug: "torque-battle-rope",
    name: "Torque Battle Rope · 15M",
    category: "equipment",
    collectionSlug: "iron-club",
    priceCents: 8900,
    compareAtCents: 9900,
    tag: "NEW",
    description:
      "38mm of triple-braided poly-Dacron fury with heat-shrunk grips. Built for 10,000 waves a week and the athletes who throw them.",
    details: [
      "38mm × 15m triple-braided poly-Dacron",
      "Heat-shrunk anti-slip grips",
      "Water + shed resistant weave",
      "12.5KG total working weight",
    ],
    sizes: ["12M", "15M"],
    colors: [{ name: "Black", hex: "#151517" }],
    images: [px(4164519), px(8520345)],
    rating: 4.8,
    reviews: 168,
  },
];

// ── Editorial / marketing imagery ─────────────────────────────

export const MEDIA = {
  heroVideo:
    "https://videos.pexels.com/video-files/2910036/2910036-uhd_2560_1440_24fps.mp4",
  heroPoster: pxWide(27948294, 1920, 1080),
  categoryFootwear: px(5930091, 900, 1200),
  categoryApparel: px(33604175, 900, 1200),
  categoryEquipment: px(6455928, 900, 1200),
  techLab: pxWide(29917601, 1400, 900),
  lookbookTeaser: pxWide(6504819, 1800, 1000),
  aboutStory: pxWide(29917601, 1400, 900),
  aboutCommunity: pxWide(6455788, 1400, 900),
  aboutFacility: pxWide(32610333, 1800, 900),
  aboutStudio: px(9594673, 1000, 1250),
};

export const LOOKS = [
  {
    index: "01",
    title: "Heat Check",
    collection: "run-division",
    image: pxWide(5469912, 1400, 1700),
    caption: "Race-day kit, zero grams of doubt.",
  },
  {
    index: "02",
    title: "Elevation",
    collection: "court-culture",
    image: pxWide(2834916, 1400, 1700),
    caption: "Golden hour belongs to the high flyers.",
  },
  {
    index: "03",
    title: "Torque",
    collection: "iron-club",
    image: pxWide(4164519, 1600, 1100),
    caption: "Waves of intent. Ten thousand a week.",
  },
  {
    index: "04",
    title: "Hang Time",
    collection: "run-division",
    image: pxWide(6504819, 1400, 1700),
    caption: "Gravity is a suggestion.",
  },
  {
    index: "05",
    title: "Discipline",
    collection: "iron-club",
    image: pxWide(6455788, 1600, 1100),
    caption: "Coached. Counted. Repeated.",
  },
  {
    index: "06",
    title: "Clearance",
    collection: "run-division",
    image: pxWide(13876926, 1400, 1700),
    caption: "Every hurdle is a start line.",
  },
  {
    index: "07",
    title: "Studio State",
    collection: "off-duty",
    image: px(33604186, 1100, 1400),
    caption: "The hour after the work is the work.",
  },
];

export const FREE_SHIPPING_CENTS = 15000;
