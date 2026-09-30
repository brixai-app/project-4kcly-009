import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Product, ProductSize } from '@/types';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import mockData from '@/data/mockData';

export interface ProductCardProps {
  product?: Product;
  onOpenDetail?: (product: Product, initialSize?: ProductSize) => void;
  className?: string;
}

const FallbackProduct: Product = (mockData as any)?.products?.[0] ?? {
  id: 'fallback',
  name: 'EAST-SIDE Oversized Shell Jacket',
  slug: 'east-side-oversized-shell-jacket',
  description: 'Technical shell with exaggerated proportions and matte hardware.',
  price: 14999,
  currency: 'INR',
  category: 'Outerwear',
  tags: ['Editorial'],
  images: [
    {
      id: 'fallback-img',
      url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
      alt: 'Editorial streetwear jacket',
    },
  ],
  variants: [
    { id: 'fallback-s', size: 'S', stock: 5 },
    { id: 'fallback-m', size: 'M', stock: 5 },
    { id: 'fallback-l', size: 'L', stock: 5 },
  ],
};

export function ProductCard(props: ProductCardProps) {
  const { product = FallbackProduct, onOpenDetail, className = '' } = props;
  const [lastSize, setLastSize] = React.useState<ProductSize | null>(null);
  const { addToCart, openCart } = useCart();

  const primaryImage = product?.images?.[0] ?? FallbackProduct.images[0];

  const handleQuickView = () => {
    const firstAvailable =
      product?.variants?.find(v => (v?.stock ?? 0) > 0)?.size ?? 'M';
    onOpenDetail?.(product, lastSize ?? firstAvailable);
  };

  const handleQuickAdd = () => {
    const size =
      lastSize ??
      product?.variants?.find(v => (v?.stock ?? 0) > 0)?.size ??
      'M';
    try {
      addToCart(product?.id ?? '', size, 1);
      setLastSize(size);
      toast.success('Added to bag', {
        description: `${product?.name ?? 'Item'} • ${size}`,
      });
      openCart();
    } catch (error) {
      toast.error('Unable to add to bag', {
        description:
          (error as Error)?.message ??
          'Something went wrong. Please try again.',
      });
    }
  };

  const formattedPrice =
    product?.currency === 'USD'
      ? `$${(product?.price ?? 0).toLocaleString('en-US')}`
      : `₹${(product?.price ?? 0).toLocaleString('en-IN')}`;

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className={cn(
        'group cursor-pointer select-none',
        'flex flex-col gap-3',
        className,
      )}
      onClick={handleQuickView}
    >
      <div className="relative overflow-hidden rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF]">
        <div className="aspect-[3/4] overflow-hidden">
          <motion.img
            src={primaryImage?.url ?? ''}
            alt={primaryImage?.alt ?? product?.name ?? 'Product'}
            crossOrigin="anonymous"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            whileHover={{ scale: 1.02 }}
          />
        </div>
        <div
          className={cn(
            'pointer-events-none absolute inset-x-3 bottom-3',
            'flex justify-between items-center',
          )}
        >
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleQuickAdd();
            }}
            className={cn(
              'pointer-events-auto',
              'inline-flex items-center justify-center gap-2',
              'px-3 py-2 text-xs font-semibold tracking-[0.18em] uppercase',
              'bg-[#D7C9B6] text-[#000000]',
              'rounded-md',
              'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
              'transition-all duration-300',
            )}
          >
            <Plus className="h-3 w-3" />
            <span>Add to bag</span>
          </button>
          <span className="pointer-events-none text-[11px] font-medium tracking-[0.22em] text-[#FAF9F6] drop-shadow">
            {product?.category ?? 'Collection'}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-['Playfair_Display'] text-sm font-medium text-[#222222] line-clamp-1">
          {product?.name ?? 'Untitled Piece'}
        </h3>
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#6B645C]">
          <span>{product?.tags?.[0] ?? 'Editorial Drop'}</span>
          <span className="font-['Lora'] text-[13px] font-semibold text-[#222222]">
            {formattedPrice}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;