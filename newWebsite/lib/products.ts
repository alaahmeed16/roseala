// ROSEALA — product catalogue (sample data).
// To add a product: copy one object in `products`, give it a unique `id`,
// and put its photo in public/images/products/. Prices are in Bahraini dinars (BHD),
// written with 3 decimals (fils). They were converted once from the original US-dollar
// prices at the fixed peg of 0.376 BHD per USD, so do not convert them again.

export type CategoryId = "lilies" | "roses" | "peonies" | "seasonal" | "bridal" | "orchids";
export type OccasionId = "romance" | "birthday" | "wedding" | "new-baby" | "sympathy" | "just-because";
export type OptionGroupId = "size" | "wrap" | "ribbon" | "stems";

export type Category = { id: CategoryId; name: string; blurb: string; image: string };
export type Occasion = { id: OccasionId; name: string; blurb: string };
export type OptionChoice = { id: string; label: string; priceAdd: number };
export type OptionGroup = { label: string; choices: OptionChoice[] };
export type PhotoCredit = { author: string; license: string; licenseUrl: string; source: string };
export type CreditedPhoto = { name: string; image: string; photo: PhotoCredit };

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
};

// The option chosen for each group, e.g. { size: "deluxe", wrap: "plum" }.
export type SelectedOptions = Partial<Record<OptionGroupId, string>>;

export const categories: Category[] = [
  { id: "lilies",   name: "Lilies",            blurb: "Our signature bloom: pure, fragrant and timeless.", image: "/images/products/shop-lilies.png" },
  { id: "roses",    name: "Roses",             blurb: "Classic romance in velvet reds and antique tones.", image: "/images/products/shop-roses.png" },
  { id: "peonies",  name: "Peonies",           blurb: "Full, soft blooms for the most tender moments.",    image: "/images/products/shop-peonies.png" },
  { id: "seasonal", name: "Seasonal & Wild",   blurb: "Loose, natural flowers gathered by the season.",    image: "/images/products/shop-seasonal-wild.png" },
  { id: "bridal",   name: "Bridal",            blurb: "Bouquets for the bride and her celebration.",       image: "/images/products/bridal-bouquet.png" },
  { id: "orchids",  name: "Orchids & Plants",  blurb: "Living gifts that bloom for months.",               image: "/images/products/shop-orchids-plants.png" },
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
      { id: "deluxe",  label: "Deluxe",  priceAdd: 13.16 },
      { id: "grand",   label: "Grand",   priceAdd: 28.2 },
    ],
  },
  wrap: {
    label: "Wrapping",
    choices: [
      { id: "cream", label: "Cream silk paper", priceAdd: 0 },
      { id: "plum",  label: "Royal plum paper", priceAdd: 0 },
      { id: "vase",  label: "Glass vase",       priceAdd: 9.4 },
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
      { id: "double", label: "Double stem", priceAdd: 16.92 },
    ],
  },
};

export const products: Product[] = [
  {
    id: "blush-lily-bouquet",
    name: "Pink Lily Bouquet",
    category: "lilies",
    occasions: ["sympathy", "just-because", "new-baby"],
    price: 35.72,
    image: "/images/products/Lilies.png",
    featured: true,
    shortDescription: "Pink lilies with soft green buds.",
    description: "Open pink lilies and pale green buds, gathered with baby's breath and fresh greenery. Wrapped in blush paper and finished with a cream ribbon and gift tag.",
    details: ["Pink lilies with unopened buds", "Baby's breath and green foliage", "Blush paper wrap with a cream ribbon"],
    options: ["size", "wrap"],
  },
  {
    id: "lily-gift-box",
    name: "Pink Lily Gift Box",
    category: "lilies",
    occasions: ["just-because", "birthday"],
    price: 41.36,
    image: "/images/products/Lilies_Box.png",
    shortDescription: "Pink and white lilies in a cream box.",
    description: "Pink and white lilies with unopened green buds, softened with baby's breath and greenery. Presented in a cream square box with a blush ribbon bow and long trailing ribbons.",
    details: ["Pink and white lilies with buds", "Baby's breath and green foliage", "Cream square gift box with blush ribbons"],
    options: ["size", "ribbon"],
  },
  {
    id: "blush-peony-bouquet",
    name: "Peonies in Blush",
    category: "peonies",
    occasions: ["romance", "birthday", "new-baby"],
    price: 45.12,
    image: "/images/products/Peonies.png",
    featured: true,
    shortDescription: "Soft pink peonies in blush paper.",
    description: "Full pink peonies with a pale cream bloom, set among baby's breath and eucalyptus. Wrapped in layers of blush paper with a satin ribbon and gift tag.",
    details: ["Pink peonies with eucalyptus", "Baby's breath accents", "Blush paper wrap with a satin ribbon"],
    options: ["size", "wrap"],
  },
  {
    id: "peony-hat-box",
    name: "Peony Hat Box",
    category: "peonies",
    occasions: ["birthday", "wedding", "just-because"],
    price: 39.48,
    image: "/images/products/Peonies_Box.png",
    shortDescription: "Pink and cream peonies in a round box.",
    description: "Pink and cream peonies with baby's breath and eucalyptus, arranged in a round blush hat box and finished with a satin ribbon.",
    details: ["Pink and cream peonies", "Baby's breath and eucalyptus", "Round blush box with a satin ribbon"],
    options: ["size", "ribbon"],
  },
  {
    id: "crimson-velvet-roses",
    name: "Crimson Rose Bouquet",
    category: "roses",
    occasions: ["romance", "birthday"],
    price: 50.76,
    image: "/images/products/Red_Roses.png",
    featured: true,
    shortDescription: "Deep red roses with a red ribbon.",
    description: "Deep red roses gathered with baby's breath and eucalyptus, wrapped in cream and blush paper and tied with a dark red ribbon and gift tag.",
    details: ["Deep red roses", "Baby's breath and eucalyptus", "Cream and blush wrap with a red ribbon"],
    options: ["size", "wrap", "ribbon"],
  },
  {
    id: "crimson-rose-box",
    name: "Crimson Rose Box",
    category: "roses",
    occasions: ["romance", "birthday"],
    price: 56.4,
    image: "/images/products/Red_Roses_Box.png",
    shortDescription: "Red roses in a round cream box.",
    description: "Deep red roses with baby's breath and eucalyptus, arranged in a round cream box with a long red ribbon.",
    details: ["Deep red roses", "Baby's breath and eucalyptus", "Round cream box with a red ribbon"],
    options: ["size", "ribbon"],
  },
  {
    id: "blush-rose-bouquet",
    name: "Blush Rose Bouquet",
    category: "roses",
    occasions: ["romance", "just-because", "wedding"],
    price: 20.68,
    image: "/images/products/Roses.png",
    shortDescription: "Pink and cream roses in soft pink paper.",
    description: "Roses in soft pink and cream with eucalyptus and baby's breath, wrapped in layered pink paper and tied with a blush ribbon and gift tag.",
    details: ["Pink and cream roses", "Eucalyptus and baby's breath", "Pink paper wrap with a blush ribbon"],
    options: ["size", "wrap"],
  },
  {
    id: "blush-rose-hat-box",
    name: "Blush Rose Hat Box",
    category: "roses",
    occasions: ["romance", "wedding", "birthday"],
    price: 69.56,
    image: "/images/products/Roses_Box.png",
    shortDescription: "Blush and cream roses in a round box.",
    description: "Blush and cream roses with baby's breath and eucalyptus, arranged in a round pink box with a soft pink ribbon bow.",
    details: ["Blush and cream roses", "Baby's breath and eucalyptus", "Round pink box with a ribbon bow"],
    options: ["size", "ribbon"],
  },
  {
    id: "ranunculus-eucalyptus",
    name: "Pastel Ranunculus Bouquet",
    category: "seasonal",
    occasions: ["birthday", "just-because"],
    price: 33.84,
    image: "/images/products/Pony.png",
    featured: true,
    shortDescription: "Pink and cream ranunculus with eucalyptus.",
    description: "Layered ranunculus in blush pink, peach and cream, with eucalyptus and baby's breath. Wrapped in cream paper and tied with a dusky pink ribbon and gift tag.",
    details: ["Ranunculus in pink, peach and cream", "Eucalyptus and baby's breath", "Cream paper wrap with a dusky pink ribbon"],
    options: ["size", "wrap"],
  },
  {
    id: "ranunculus-gift-box",
    name: "Pastel Ranunculus Gift Box",
    category: "seasonal",
    occasions: ["birthday", "just-because", "new-baby"],
    price: 31.96,
    image: "/images/products/Pony_Box.png",
    shortDescription: "Ranunculus in a cream gift box.",
    description: "Ranunculus in pink, peach and cream with eucalyptus and soft pink tissue, set in a cream gift box with ribbon handles.",
    details: ["Ranunculus in pink, peach and cream", "Eucalyptus and soft pink tissue", "Cream gift box with ribbon handles"],
    options: ["size", "ribbon"],
  },
];

// Photo credits (required by the photo licences) for the earlier Wikimedia Commons photos that are
// still shown on the site outside the shop: the home hero, the Bespoke section and the category cards.
export const photoCredits: CreditedPhoto[] = [
  { name: "Madonna Lily", image: "/images/products/madonna-lily-vase.jpg", photo: { author: "George E. Koronaios", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:A_bunch_of_white_lilies_on_a_black_table.jpg" } },
  { name: "Blush Peony Bouquet", image: "/images/products/blush-peony-bouquet.jpg", photo: { author: "Kor!An (Андрей Корзун)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Bouquet_of_peonies_12.JPG" } },
  { name: "Garden Peony Vase", image: "/images/products/garden-peony-vase.jpg", photo: { author: "Kor!An (Андрей Корзун)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Bouquet_of_peonies_11.JPG" } },
  { name: "Antique Rose Dome", image: "/images/products/antique-rose-dozen.jpg", photo: { author: "Jebulon", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Bouquet_de_roses_roses.jpg" } },
  { name: "Ranunculus & Eucalyptus", image: "/images/products/ranunculus-eucalyptus.jpg", photo: { author: "Anbertin20", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Vase_of_Ranunculus_and_Eucalyptus.jpg" } },
  { name: "Ivory Rose Bridal", image: "/images/products/ivory-rose-bridal.jpg", photo: { author: "Rosendahl", license: "Public domain", licenseUrl: "", source: "https://commons.wikimedia.org/wiki/File:Wedding_bouquet_white_roses.jpg" } },
  { name: "Phalaenopsis Orchid", image: "/images/products/phalaenopsis-orchid.jpg", photo: { author: "George E. Koronaios", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Purple_and_white_orchid_in_a_black_pot.jpg" } },
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
  new Intl.NumberFormat("en-US", { style: "currency", currency: "BHD" }).format(amount);
