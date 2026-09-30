import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Info } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Product, ProductSize } from '@/types';
import { useCart } from '@/context/CartContext';

export interface ProductDetailModalProps {
  product?: Product;
  open?: boolean;
  initialSize?: ProductSize;
  onOpenChange?: (open: boolean) => void;
}

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sizeGuide: Product['sizeGuide'];
}

function SizeGuideModal({
  open,
  onOpenChange,
  sizeGuide,
}: SizeGuideModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-[#E7E0D6] bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="font-['Playfair_Display'] text-xl text-[#222222]">
              Size Guide
            </Dialog.Title>
            <Dialog.Close className="p-1">
              <X className="h-5 w-5 text-[#6B645C]" />
            </Dialog.Close>
          </div>
          <div className="max-h-[320px] overflow-auto border border-[#E7E0D6]">
            <table className="min-w-full text-left text-sm font-['Lora']">
              <thead className="bg-[#FAF9F6] text-xs uppercase tracking-[0.2em] text-[#6B645C]">
                <tr>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Chest (cm)</th>
                  <th className="px-4 py-3">Waist (cm)</th>
                  <th className="px-4 py-3">Hip (cm)</th>
                  <th className="px-4 py-3">Length (cm)</th>
                </tr>
              </thead>
              <tbody>
                {(sizeGuide ?? [])?.map((row) => (
                  <tr key={row?.size} className="border-t border-[#E7E0D6]">
                    <td className="px-4 py-3 text-[#222222]">{row?.size}</td>
                    <td className="px-4 py-3 text-[#6B645C]">
                      {row?.chestCm ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-[#6B645C]">
                      {row?.waistCm ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-[#6B645C]">
                      {row?.hipCm ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-[#6B645C]">
                      {row?.lengthCm ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#6B645C]">
            Measurements are approximate and may vary slightly by style.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ProductDetailModal({
  product,
  open = false,
  initialSize,
  onOpenChange,
}: ProductDetailModalProps) {
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = React.useState<ProductSize | null>(
    initialSize ?? null
  );
  const [quantity, setQuantity] = React.useState<number>(1);
  const [sizeGuideOpen, setSizeGuideOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setSelectedSize(initialSize ?? null);
    setQuantity(1);
  }, [product?.id, initialSize]);

  const handleAddToCart = () => {
    if (!product?.id) {
      toast.error('Product unavailable');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    const variant = product?.variants?.find((v) => v?.size === selectedSize);
    if (!variant || (variant?.stock ?? 0) <= 0) {
      toast.error('Selected size is out of stock');
      return;
    }
    addToCart(product.id, selectedSize, quantity);
    toast.success('Added to bag', {
      description: `${product?.name ?? 'Item'} · ${selectedSize} · Qty ${quantity}`,
    });
    openCart();
    onOpenChange?.(false);
  };

  const maxStock =
    product?.variants?.find((v) => v?.size === selectedSize)?.stock ?? 0;
  const inStock = maxStock > 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <AnimatePresence>
          {open ? (
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed left-1/2 top-1/2 flex h-[80vh] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] border border-[#E7E0D6] bg-white shadow-2xl"
              >
                <div className="relative hidden h-full flex-1 overflow-hidden border-r border-[#E7E0D6] bg-[#FAF9F6] md:block">
                  <img
                    src={
                      product?.images?.[0]?.url ??
                      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85'
                    }
                    alt={product?.images?.[0]?.alt ?? product?.name ?? 'Look'}
                    crossOrigin="anonymous"
                    className="h-full w-full scale-105 object-cover"
                  />
                </div>
                <div className="flex h-full w-full flex-col justify-between p-5 md:w-[380px]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="font-['Playfair_Display'] text-2xl text-[#222222]">
                        {product?.name ?? 'Untitled Piece'}
                      </Dialog.Title>
                      <Dialog.Description className="mt-1 text-xs uppercase tracking-[0.25em] text-[#6B645C]">
                        {product?.category ?? 'Collection'}
                      </Dialog.Description>
                    </div>
                    <Dialog.Close className="p-1">
                      <X className="h-5 w-5 text-[#6B645C]" />
                    </Dialog.Close>
                  </div>
                  <div className="mt-4 space-y-4 overflow-y-auto pr-2">
                    <p className="font-['Lora'] text-sm leading-relaxed text-[#6B645C]">
                      {product?.description ??
                        'Structured, quietly striking, and cut to move with the city.'}
                    </p>
                    <div className="flex items-baseline justify-between">
                      <span className="font-['Playfair_Display'] text-xl text-[#222222]">
                        {product?.currency === 'USD' ? '$' : '₹'}
                        {product?.price?.toLocaleString() ?? '—'}
                      </span>
                      <span
                        className={cn(
                          'text-xs uppercase tracking-[0.2em]',
                          inStock ? 'text-emerald-700' : 'text-[#6B645C]'
                        )}
                      >
                        {inStock ? `In stock · ${maxStock}+` : 'Waitlisted'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-[#6B645C]">
                          Select size
                        </span>
                        {product?.sizeGuide && product.sizeGuide.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => setSizeGuideOpen(true)}
                            className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-[#6B645C] underline-offset-4 hover:underline"
                          >
                            <Info className="h-3 w-3" />
                            Size guide
                          </button>
                        ) : null}
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(product?.variants ?? [])?.map((variant) => {
                          const disabled = (variant?.stock ?? 0) <= 0;
                          const isActive = selectedSize === variant?.size;
                          return (
                            <button
                              key={variant?.id}
                              type="button"
                              onClick={() =>
                                !disabled && setSelectedSize(variant?.size)
                              }
                              className={cn(
                                "h-9 border text-xs font-['Lora'] tracking-[0.18em]",
                                'transition-colors',
                                isActive
                                  ? 'border-[#222222] bg-[#222222] text-white'
                                  : 'border-[#E7E0D6] text-[#222222] hover:border-[#CBB9A3]',
                                disabled
                                  ? 'cursor-not-allowed bg-[#FAF9F6] text-[#C0B8AE]'
                                  : ''
                              )}
                            >
                              {variant?.size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border border-[#E7E0D6] px-3 py-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#6B645C]">
                        Quantity
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((q) => (q > 1 ? q - 1 : 1))
                          }
                          className="p-1 text-[#6B645C] disabled:text-[#C0B8AE]"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm text-[#222222]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((q) =>
                              maxStock ? Math.min(q + 1, maxStock) : q + 1
                            )
                          }
                          className="p-1 text-[#222222] disabled:text-[#C0B8AE]"
                          disabled={!!maxStock && quantity >= maxStock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={!inStock}
                      className={cn(
                        'h-11 w-full border border-[#D7C9B6] bg-[#D7C9B6] text-xs font-semibold tracking-[0.25em] text-black',
                        'transition-colors hover:bg-[#CBB9A3]',
                        !inStock && 'cursor-not-allowed opacity-60'
                      )}
                    >
                      Add to bag
                    </button>
                    <p className="text-[11px] leading-relaxed text-[#6B645C]">
                      Duties and taxes included. Standard delivery in 3–7
                      business days across major metros.
                    </p>
                  </div>
                </div>
                <SizeGuideModal
                  open={sizeGuideOpen}
                  onOpenChange={setSizeGuideOpen}
                  sizeGuide={product?.sizeGuide ?? null}
                />
              </motion.div>
            </Dialog.Content>
          ) : null}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ProductDetailModal;