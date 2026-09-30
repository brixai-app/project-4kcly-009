import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface CartDrawerProps {
  className?: string;
}

export function CartDrawer({ className = '' }: CartDrawerProps) {
  const {
    items,
    isOpen,
    subtotal,
    itemCount,
    updateQuantity,
    removeFromCart,
    closeCart,
  } = useCart();

  const shippingThreshold = 5000;
  const shippingFee = subtotal >= shippingThreshold ? 0 : 299;
  const progress =
    shippingThreshold === 0
      ? 0
      : Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  const handleQuantityChange = (id: string, nextQty: number) => {
    if (nextQty < 1) {
      removeFromCart(id);
      toast('Item removed', {
        description: 'The item was removed from your EAST-SIDE cart.',
      });
      return;
    }
    updateQuantity(id, nextQty);
  };

  const handleCheckout = () => {
    if ((items ?? []).length === 0) {
      toast.error('Your cart is empty', {
        description: 'Add at least one piece before checking out.',
      });
      return;
    }
    toast.success('Checkout preview', {
      description: `Subtotal ₹${subtotal.toLocaleString('en-IN')} • Shipping ₹${shippingFee.toLocaleString(
        'en-IN'
      )} • Total ₹${(subtotal + shippingFee).toLocaleString('en-IN')}. This is a demo flow.`,
    });
    closeCart();
  };

  const shippingMessage =
    shippingFee === 0
      ? 'Complimentary shipping unlocked for this order.'
      : `Spend ₹${(shippingThreshold - subtotal).toLocaleString(
          'en-IN'
        )} more for complimentary shipping.`;

  return (
    <Dialog.Root open={isOpen ?? false} onOpenChange={(open) => (!open ? closeCart() : undefined)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1.5px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#E7E0D6] bg-[#FFFFFF] shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
            className
          )}
        >
          <header className="flex items-center justify-between border-b border-[#E7E0D6] px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#222222]" />
              <Dialog.Title className="font-['Playfair_Display'] text-lg tracking-tight text-[#222222]">
                EAST-SIDE Cart
              </Dialog.Title>
              <span className="text-xs uppercase tracking-[0.2em] text-[#6B645C]">
                {itemCount ?? 0} {((itemCount ?? 0) === 1 && 'item') || 'items'}
              </span>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E7E0D6] bg-[#FAF9F6] text-[#222222] transition hover:bg-[#E7E0D6]"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </header>

          <div className="border-b border-[#E7E0D6] px-6 py-3">
            <div className="mb-2 flex items-center justify-between text-xs text-[#6B645C]">
              <span className="font-['Lora']">Shipping progress</span>
              <span className="font-['Lora']">
                {progress}% · {shippingFee === 0 ? 'Free' : '₹299'}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#FAF9F6]">
              <div
                className={cn(
                  'h-full rounded-full bg-[#D7C9B6] transition-all',
                  progress >= 100 ? 'shadow-[0_0_0_1px_rgba(0,0,0,0.03)]' : ''
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-[#6B645C]">
              <Info className="h-3 w-3" />
              <p className="font-['Lora']">{shippingMessage}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {(items ?? []).length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-['Playfair_Display'] text-xl text-[#222222]">
                  Your edit is still empty.
                </p>
                <p className="mt-2 max-w-xs font-['Lora'] text-sm text-[#6B645C]">
                  Curate your EAST-SIDE silhouette. Pieces added here will live in your cart
                  until you check out.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {(items ?? []).map((item) => (
                  <li
                    key={item?.id}
                    className="flex gap-3 border-b border-[#E7E0D6]/70 pb-4 last:border-0"
                  >
                    <div className="relative h-24 w-20 overflow-hidden rounded-[14px] bg-[#FAF9F6]">
                      <img
                        src={item?.imageUrl ?? ''}
                        alt={item?.name ?? 'Cart item'}
                        crossOrigin="anonymous"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-['Playfair_Display'] text-sm text-[#222222]">
                            {item?.name ?? ''}
                          </p>
                          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-[#6B645C]">
                            Size {item?.size ?? 'M'}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-[#222222]">
                          ₹{(item?.price ?? 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border border-[#E7E0D6] bg-[#FAF9F6]">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item?.id ?? '', (item?.quantity ?? 1) - 1)}
                            className="flex h-7 w-7 items-center justify-center text-[#222222] hover:bg-[#E7E0D6]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[2rem] text-center text-xs font-['Lora'] text-[#222222]">
                            {item?.quantity ?? 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item?.id ?? '', (item?.quantity ?? 1) + 1)}
                            className="flex h-7 w-7 items-center justify-center text-[#222222] hover:bg-[#E7E0D6]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item?.id ?? '');
                            toast('Item removed', {
                              description: `${item?.name ?? 'Item'} was removed from your cart.`,
                            });
                          }}
                          className="text-[11px] uppercase tracking-[0.22em] text-[#6B645C] hover:text-[#222222]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <footer className="border-t border-[#E7E0D6] bg-[#FAF9F6] px-6 py-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-['Lora'] text-[#6B645C]">Subtotal</span>
              <span className="font-['Playfair_Display'] text-base text-[#222222]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#D7C9B6] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-[#CBB9A3]"
            >
              Proceed to checkout
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-[11px] text-[#6B645C]">
              You&apos;ll confirm delivery &amp; payment in the next step. This is a demo preview,
              no real charge will occur.
            </p>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default CartDrawer;