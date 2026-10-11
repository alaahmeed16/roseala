// ROSEALA — product catalogue (sample data).
// To add a product: copy one object in `products`, give it a unique `id`,
// and put its photo in public/images/products/. Prices are in US dollars.

export type CategoryId = "lilies" | "roses" | "peonies" | "seasonal" | "bridal" | "orchids";
export type OccasionId = "romance" | "birthday" | "wedding" | "new-baby" | "sympathy" | "just-because";
export type OptionGroupId = "size" | "wrap" | "ribbon" | "stems";

export type Category = { id: CategoryId; name: string; blurb: string; image: string };
export type Occasion = { id: OccasionId; name: string; blurb: string };
export type OptionChoice = { id: string; label: string; priceAdd: number };
export type OptionGroup = { label: string; choices: OptionChoice[] };
export type PhotoCredit = { author: string; license: string; licenseUrl: string; source: string };

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  occasions: OccasionId[];
  price: number;
  image: string;
  featured?: boolean;
  shortDescription: string;
  description: string;
  details: string[];
  options: OptionGroupId[];
  photo: PhotoCredit;
};

// The option chosen for each group, e.g. { size: "deluxe", wrap: "plum" }.
export type SelectedOptions = Partial<Record<OptionGroupId, string>>;

export const categories: Category[] = [
  { id: "lilies",   name: "Lilies",            blurb: "Our signature bloom: pure, fragrant and timeless.", image: "/images/products/madonna-lily-vase.jpg" },
  { id: "roses",    name: "Roses",             blurb: "Classic romance in velvet reds and antique tones.", image: "/images/products/antique-rose-dozen.jpg" },
  { id: "peonies",  name: "Peonies",           blurb: "Full, soft blooms for the most tender moments.",    image: "/images/products/garden-peony-vase.jpg" },
  { id: "seasonal", name: "Seasonal & Wild",   blurb: "Loose, natural flowers gathered by the season.",    image: "/images/products/ranunculus-eucalyptus.jpg" },
  { id: "bridal",   name: "Bridal",            blurb: "Bouquets for the bride and her celebration.",       image: "/images/products/ivory-rose-bridal.jpg" },
  { id: "orchids",  name: "Orchids & Plants",  blurb: "Living gifts that bloom for months.",               image: "/images/products/phalaenopsis-orchid.jpg" },
];

export const occasions: Occasion[] = [
  { id: "romance",      name: "Love & Romance", blurb: "For the one who makes your heart feel at home." },
  { id: "birthday",     name: "Birthdays",      blurb: "A little more love for their special day." },
  { id: "wedding",      name: "Weddings",       blurb: "For the beginning of your forever." },
  { id: "new-baby",     name: "New Arrivals",   blurb: "Welcoming a little love into the world." },
  { id: "sympathy",     name: "Sympathy",       blurb: "When words aren't enough, let flowers speak gently." },
  { id: "just-because", name: "Just Because",   blurb: "No occasion needed. Just because I love you." },
];

// Option groups a product can offer. `priceAdd` is added to the base price.
export const optionGroups: Record<OptionGroupId, OptionGroup> = {
  size: {
    label: "Size",
    choices: [
      { id: "classic", label: "Classic", priceAdd: 0 },
      { id: "deluxe",  label: "Deluxe",  priceAdd: 35 },
      { id: "grand",   label: "Grand",   priceAdd: 75 },
    ],
  },
  wrap: {
    label: "Wrapping",
    choices: [
      { id: "cream", label: "Cream silk paper", priceAdd: 0 },
      { id: "plum",  label: "Royal plum paper", priceAdd: 0 },
      { id: "vase",  label: "Glass vase",       priceAdd: 25 },
    ],
  },
  ribbon: {
    label: "Ribbon",
    choices: [
      { id: "ivory",  label: "Ivory silk",    priceAdd: 0 },
      { id: "forest", label: "Forest velvet", priceAdd: 0 },
      { id: "plum",   label: "Plum velvet",   priceAdd: 0 },
    ],
  },
  stems: {
    label: "Orchid size",
    choices: [
      { id: "single", label: "Single stem", priceAdd: 0 },
      { id: "double", label: "Double stem", priceAdd: 45 },
    ],
  },
};

export const products: Product[] = [
  {
    id: "madonna-lily-vase",
    name: "Madonna Lily",
    category: "lilies",
    occasions: ["sympathy", "just-because", "new-baby"],
    price: 95,
    image: "/images/products/madonna-lily-vase.jpg",
    featured: true,
    shortDescription: "Ivory lilies with soft greenery.",
    description: "Our signature bouquet. Fragrant ivory lilies arranged with fresh garden greenery. The buds open over several days, so the bouquet keeps changing and filling the room with scent.",
    details: ["Approx. 8 lily stems with greenery", "Buds open over 4–6 days", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "George E. Koronaios", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:A_bunch_of_white_lilies_on_a_black_table.jpg" },
  },
  {
    id: "calla-lily-duo",
    name: "Calla Lily & Tulip Duo",
    category: "lilies",
    occasions: ["just-because", "birthday"],
    price: 110,
    image: "/images/products/calla-lily-duo.jpg",
    shortDescription: "Two modern glass arrangements.",
    description: "A pair of sculptural arrangements: white calla lilies and deep red tulips set in moss-lined glass cubes. Elegant on a dining table or mantel.",
    details: ["Two glass cube arrangements", "Calla lilies, tulips and moss", "Vases included"],
    options: ["size"],
    photo: { author: "Vimukthi", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Cala_lilies_and_tulips.jpg" },
  },
  {
    id: "blush-peony-bouquet",
    name: "Blush Peony Bouquet",
    category: "peonies",
    occasions: ["romance", "birthday", "new-baby"],
    price: 120,
    image: "/images/products/blush-peony-bouquet.jpg",
    featured: true,
    shortDescription: "Lush, ruffled peonies in soft blush.",
    description: "Generous, ruffled peonies in soft blush tones. Peonies are only in season for a few weeks each year, which makes them one of the most treasured gifts.",
    details: ["Approx. 10 peony stems", "Seasonal: late spring to early summer", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Kor!An (Андрей Корзун)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Bouquet_of_peonies_12.JPG" },
  },
  {
    id: "garden-peony-vase",
    name: "Garden Peony Vase",
    category: "peonies",
    occasions: ["just-because", "birthday"],
    price: 105,
    image: "/images/products/garden-peony-vase.jpg",
    shortDescription: "Fresh-cut peonies in crystal glass.",
    description: "Garden peonies cut at their freshest and arranged in a cut-glass vase, ready to place on a table the moment they arrive.",
    details: ["Approx. 8 peony stems", "Arranged in a cut-glass vase", "Seasonal availability"],
    options: ["size"],
    photo: { author: "Kor!An (Андрей Корзун)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Bouquet_of_peonies_11.JPG" },
  },
  {
    id: "crimson-velvet-roses",
    name: "Crimson Velvet Roses",
    category: "roses",
    occasions: ["romance", "birthday"],
    price: 135,
    image: "/images/products/crimson-velvet-roses.jpg",
    featured: true,
    shortDescription: "A dozen deep red roses.",
    description: "The classic declaration of love: twelve long-stemmed roses in deep crimson, hand-tied and wrapped with a velvet ribbon.",
    details: ["12 long-stemmed roses", "Hand-tied with velvet ribbon", "Flower care card included"],
    options: ["size", "wrap", "ribbon"],
    photo: { author: "BlaineHoward", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:A_bouquet_of_red_roses.jpg" },
  },
  {
    id: "hand-tied-red-roses",
    name: "Three Red Roses",
    category: "roses",
    occasions: ["romance", "just-because"],
    price: 55,
    image: "/images/products/hand-tied-red-roses.jpg",
    shortDescription: "A small, heartfelt gesture.",
    description: "Three perfect red roses, hand-tied with greenery. A simple, meaningful gift that says more than words.",
    details: ["3 red roses with greenery", "Hand-tied", "Gift card included"],
    options: ["wrap", "ribbon"],
    photo: { author: "Karthika Manikandan", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Hand_holding_a_bouquet_of_red_roses.jpg" },
  },
  {
    id: "antique-rose-dozen",
    name: "Antique Rose Dome",
    category: "roses",
    occasions: ["romance", "birthday", "wedding"],
    price: 150,
    image: "/images/products/antique-rose-dozen.jpg",
    shortDescription: "Dusky antique roses, densely arranged.",
    description: "Antique-toned roses arranged close together in a full dome, a romantic, vintage-inspired look that feels both soft and opulent.",
    details: ["Approx. 24 roses", "Dome-shaped arrangement", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Jebulon", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Bouquet_de_roses_roses.jpg" },
  },
  {
    id: "ranunculus-eucalyptus",
    name: "Ranunculus & Eucalyptus",
    category: "seasonal",
    occasions: ["birthday", "just-because"],
    price: 90,
    image: "/images/products/ranunculus-eucalyptus.jpg",
    featured: true,
    shortDescription: "Warm ranunculus with silver eucalyptus.",
    description: "Layered ranunculus in warm sunset tones, loosely arranged with fragrant eucalyptus for a relaxed, garden-gathered feel.",
    details: ["Seasonal ranunculus and eucalyptus", "Loose, natural style", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Anbertin20", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Vase_of_Ranunculus_and_Eucalyptus.jpg" },
  },
  {
    id: "wild-meadow",
    name: "Wild Meadow",
    category: "seasonal",
    occasions: ["birthday", "just-because", "new-baby"],
    price: 85,
    image: "/images/products/wild-meadow.jpg",
    shortDescription: "A joyful mix of meadow flowers.",
    description: "A generous, colourful gathering of seasonal meadow flowers. Every bouquet is a little different, depending on what is blooming that week.",
    details: ["Florist's choice of seasonal stems", "Varies by season", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Gerda Arendt", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Bouquet_of_wildflowers,_Ehrenbach.jpg" },
  },
  {
    id: "scarlet-tulips",
    name: "Scarlet Tulips",
    category: "seasonal",
    occasions: ["birthday", "just-because"],
    price: 70,
    image: "/images/products/scarlet-tulips.jpg",
    shortDescription: "Bright red tulips, simply arranged.",
    description: "Elegant scarlet tulips with their own graceful leaves. Tulips keep growing in the vase and turn towards the light.",
    details: ["15 tulip stems", "Spring seasonal", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Razvan Socol", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Red_tulips_in_a_vase.JPG" },
  },
  {
    id: "white-lisianthus",
    name: "White Lisianthus",
    category: "seasonal",
    occasions: ["sympathy", "new-baby", "just-because"],
    price: 80,
    image: "/images/products/white-lisianthus.jpg",
    shortDescription: "Delicate white blooms, quietly elegant.",
    description: "Soft white lisianthus with ruffled petals. Graceful and calm, it suits both happy news and gentle condolences.",
    details: ["Approx. 10 stems", "Long vase life", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Downtowngal", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:White_Lisianthus_in_vase.jpg" },
  },
  {
    id: "antique-hydrangea",
    name: "Antique Hydrangea",
    category: "seasonal",
    occasions: ["sympathy", "just-because"],
    price: 95,
    image: "/images/products/antique-hydrangea.jpg",
    shortDescription: "Vintage-toned hydrangea heads.",
    description: "Full hydrangea heads in antique green and dusky mauve, a vintage colour palette that can also be dried and kept.",
    details: ["Approx. 5 hydrangea heads", "Can be dried afterwards", "Flower care card included"],
    options: ["size", "wrap"],
    photo: { author: "Ruth Hartnup", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Hydrangea_bouquet_(9580026536).jpg" },
  },
  {
    id: "ivory-rose-bridal",
    name: "Ivory Rose Bridal",
    category: "bridal",
    occasions: ["wedding"],
    price: 185,
    image: "/images/products/ivory-rose-bridal.jpg",
    shortDescription: "A cascading bridal bouquet of ivory roses.",
    description: "Ivory roses with fresh greenery in a softly cascading shape. Made to order for your wedding day.",
    details: ["Made to order", "Ivory roses with greenery", "Order at least 2 weeks ahead"],
    options: ["size", "ribbon"],
    photo: { author: "Rosendahl", license: "Public domain", licenseUrl: "", source: "https://commons.wikimedia.org/wiki/File:Wedding_bouquet_white_roses.jpg" },
  },
  {
    id: "peach-calla-bridal",
    name: "Peach Calla Bridal",
    category: "bridal",
    occasions: ["wedding"],
    price: 175,
    image: "/images/products/peach-calla-bridal.jpg",
    shortDescription: "Peach callas, roses and hydrangea.",
    description: "A round bridal bouquet of peach calla lilies, garden roses and green hydrangea. Warm, romantic and modern.",
    details: ["Made to order", "Callas, roses and hydrangea", "Order at least 2 weeks ahead"],
    options: ["size", "ribbon"],
    photo: { author: "Jina Lee", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Rose_hydrangea_calla_wedding_bouquet.jpg" },
  },
  {
    id: "phalaenopsis-orchid",
    name: "Phalaenopsis Orchid",
    category: "orchids",
    occasions: ["new-baby", "birthday", "just-because"],
    price: 120,
    image: "/images/products/phalaenopsis-orchid.jpg",
    shortDescription: "A living orchid in a black pot.",
    description: "A graceful moth orchid with speckled blooms, potted and ready to give. With a little care it flowers for months.",
    details: ["Potted orchid plant", "Blooms for 2–3 months", "Care guide included"],
    options: ["stems"],
    photo: { author: "George E. Koronaios", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Purple_and_white_orchid_in_a_black_pot.jpg" },
  },
];

// ---------- Helpers for reading the data ----------
export const findProduct = (id: string | null | undefined) => products.find((p) => p.id === id);
export const findCategory = (id: string | null | undefined) => categories.find((c) => c.id === id);
export const findOccasion = (id: string | null | undefined) => occasions.find((o) => o.id === id);

// The default choice for each option group is the first one.
export function defaultOptions(product: Product): SelectedOptions {
  const selected: SelectedOptions = {};
  product.options.forEach((group) => {
    selected[group] = optionGroups[group].choices[0].id;
  });
  return selected;
}

// Base price plus any extra cost from the chosen options.
export function unitPrice(product: Product, selected: SelectedOptions): number {
  return product.options.reduce((total, group) => {
    const choice = optionGroups[group].choices.find((c) => c.id === selected[group]);
    return total + (choice ? choice.priceAdd : 0);
  }, product.price);
}

// Readable text such as "Deluxe · Royal plum paper"
export function describeOptions(product: Product, selected: SelectedOptions): string {
  return product.options
    .map((group) => optionGroups[group].choices.find((c) => c.id === selected[group]))
    .filter((choice): choice is OptionChoice => Boolean(choice))
    .map((choice) => choice.label)
    .join(" · ");
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
