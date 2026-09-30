export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type ProductCategory =
  | 'Outerwear'
  | 'Tops'
  | 'Bottoms'
  | 'Footwear'
  | 'Accessories';

export type ProductTag =
  | 'New'
  | 'Limited'
  | 'Essential'
  | 'Exclusive'
  | 'Editorial';

export interface SizeGuideRow {
  size: ProductSize;
  chestCm?: number | null;
  waistCm?: number | null;
  hipCm?: number | null;
  lengthCm?: number | null;
  note?: string | null;
}

export interface ProductVariant {
  id: string;
  size: ProductSize;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: 'INR' | 'USD';
  category: ProductCategory;
  tags?: ProductTag[] | null;
  images: ProductImage[];
  variants: ProductVariant[];
  featured?: boolean;
  sizeGuide?: SizeGuideRow[] | null;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  currency: 'INR' | 'USD';
  size: ProductSize;
  quantity: number;
  imageUrl: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ShippingInfo {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethod = 'card' | 'upi' | 'cod';

export interface PaymentInfo {
  method: PaymentMethod;
  cardLast4?: string | null;
  provider?: string | null;
  transactionId?: string | null;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: 'INR' | 'USD';
  createdAt: string;
  status: OrderStatus;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
}

export type { Product as TProduct };

export default {};