import type {
  Product,
  ProductImage,
  ProductVariant,
  SizeGuideRow,
  ProductSize,
} from '@/types';

const baseSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL'];

const defaultSizeGuide: SizeGuideRow[] = baseSizes.map((size) => {
  if (size === 'XS') {
    return {
      size,
      chestCm: 84,
      waistCm: 70,
      hipCm: 88,
      lengthCm: 66,
      note: 'Slim street cut',
    };
  }
  if (size === 'S') {
    return {
      size,
      chestCm: 90,
      waistCm: 76,
      hipCm: 94,
      lengthCm: 68,
      note: null,
    };
  }
  if (size === 'M') {
    return {
      size,
      chestCm: 96,
      waistCm: 82,
      hipCm: 100,
      lengthCm: 70,
      note: 'True to size',
    };
  }
  if (size === 'L') {
    return {
      size,
      chestCm: 104,
      waistCm: 90,
      hipCm: 108,
      lengthCm: 72,
      note: null,
    };
  }
  return {
    size,
    chestCm: 112,
    waistCm: 98,
    hipCm: 116,
    lengthCm: 74,
    note: 'Relaxed street fit',
  };
});

const makeImages = (slug: string, primaryUrl: string, alt: string): ProductImage[] => [
  {
    id: `${slug}-1`,
    url: primaryUrl,
    alt,
  },
  {
    id: `${slug}-2`,
    url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    alt: `${alt} detail view`,
  },
];

const makeVariants = (slug: string): ProductVariant[] =>
  baseSizes.map((size, index) => ({
    id: `${slug}-${size}`,
    size,
    stock: index % 2 === 0 ? 8 + index * 2 : 4 + index,
  }));

export const products: Product[] = [
  {
    id: 'es-outer-001',
    name: 'Noir Pavilion Overcoat',
    slug: 'noir-pavilion-overcoat',
    description:
      'Long-line wool overcoat with sharp shoulders and a hidden placket, cut for an elongated city silhouette. Finished with tonal stitching and a subtle back vent for movement.',
    price: 18999,
    currency: 'INR',
    category: 'Outerwear',
    tags: ['New', 'Editorial', 'Exclusive'],
    images: makeImages(
      'noir-pavilion-overcoat',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
      'Model wearing a long black tailored overcoat in an urban setting',
    ),
    variants: makeVariants('noir-pavilion-overcoat'),
    featured: true,
    sizeGuide: defaultSizeGuide,
  },
  {
    id: 'es-top-001',
    name: 'East-Side Column Hoodie',
    slug: 'east-side-column-hoodie',
    description:
      'Boxy heavyweight hoodie with dropped shoulders and architectural seams. Brushed interior and clean tonal logo hit at cuff for a quiet luxury take on streetwear.',
    price: 7499,
    currency: 'INR',
    category: 'Tops',
    tags: ['Essential', 'Editorial'],
    images: makeImages(
      'east-side-column-hoodie',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
      'Model in a minimalist hoodie standing against a concrete wall',
    ),
    variants: makeVariants('east-side-column-hoodie'),
    featured: true,
    sizeGuide: defaultSizeGuide,
  },
  {
    id: 'es-bottom-001',
    name: 'Gallery Pleat Trousers',
    slug: 'gallery-pleat-trousers',
    description:
      'Tailored straight-leg trousers with single front pleat and cropped ankle length. Designed to sit just above chunky sneakers or sharp derbies.',
    price: 8999,
    currency: 'INR',
    category: 'Bottoms',
    tags: ['New', 'Essential'],
    images: makeImages(
      'gallery-pleat-trousers',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
      'Close-up of tailored trousers with clean front pleats',
    ),
    variants: makeVariants('gallery-pleat-trousers'),
    featured: true,
    sizeGuide: defaultSizeGuide,
  },
  {
    id: 'es-foot-001',
    name: 'Crosswalk Volume Sneaker',
    slug: 'crosswalk-volume-sneaker',
    description:
      'Oversized low-top sneaker with sculpted sole unit and matte leather upper. Understated paneling keeps the profile clean from every angle.',
    price: 12999,
    currency: 'INR',
    category: 'Footwear',
    tags: ['Limited', 'Exclusive'],
    images: makeImages(
      'crosswalk-volume-sneaker',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'Minimalist white sneakers on a neutral backdrop',
    ),
    variants: makeVariants('crosswalk-volume-sneaker'),
    featured: true,
    sizeGuide: null,
  },
  {
    id: 'es-top-002',
    name: 'Studio Line Shirt',
    slug: 'studio-line-shirt',
    description:
      'Crisp cotton shirt with elongated cuffs and a refined spread collar. Cut slightly oversized for ease over tanks and long-sleeve bases.',
    price: 6399,
    currency: 'INR',
    category: 'Tops',
    tags: ['Essential'],
    images: makeImages(
      'studio-line-shirt',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'White shirt styled with minimal jewelry and neutral tones',
    ),
    variants: makeVariants('studio-line-shirt'),
    featured: false,
    sizeGuide: defaultSizeGuide,
  },
  {
    id: 'es-outer-002',
    name: 'Concrete Envelope Jacket',
    slug: 'concrete-envelope-jacket',
    description:
      'Short technical jacket with concealed zip and exaggerated collar. Lightweight but structured, ideal for layered city looks.',
    price: 11499,
    currency: 'INR',
    category: 'Outerwear',
    tags: ['Editorial', 'Limited'],
    images: makeImages(
      'concrete-envelope-jacket',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'Minimalist jacket hung in a sculptural interior space',
    ),
    variants: makeVariants('concrete-envelope-jacket'),
    featured: false,
    sizeGuide: defaultSizeGuide,
  },
  {
    id: 'es-bottom-002',
    name: 'Arc Panel Cargo',
    slug: 'arc-panel-cargo',
    description:
      'Tapered cargo pant with curved side seams and low-profile pockets. Finished with adjustable hem toggles to shift from straight to stacked.',
    price: 8299,
    currency: 'INR',
    category: 'Bottoms',
    tags: ['New'],
    images: makeImages(
      'arc-panel-cargo',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'Streetwear cargo pants styled with sneakers on city pavement',
    ),
    variants: makeVariants('arc-panel-cargo'),
    featured: false,
    sizeGuide: defaultSizeGuide,
  },
  {
    id: 'es-acc-001',
    name: 'Blockline Leather Tote',
    slug: 'blockline-leather-tote',
    description:
      'Boxy leather tote with structured base and elongated handles, sized to carry daily tech and small essentials with ease.',
    price: 9999,
    currency: 'INR',
    category: 'Accessories',
    tags: ['Essential', 'Exclusive'],
    images: makeImages(
      'blockline-leather-tote',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'Minimal leather tote bag on a sculptural chair',
    ),
    variants: makeVariants('blockline-leather-tote'),
    featured: false,
    sizeGuide: null,
  },
];

export const categories = [
  'Outerwear',
  'Tops',
  'Bottoms',
  'Footwear',
  'Accessories',
] as const;

export const sizeGuideDefault: SizeGuideRow[] = defaultSizeGuide;

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p?.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p?.slug === slug);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p?.featured ?? false);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p?.category === category);

const mockData = {
  products,
  categories,
  sizeGuideDefault,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
};

export default mockData;
export { mockData };
