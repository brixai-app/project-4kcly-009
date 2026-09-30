import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CartItem, Product, ProductSize } from '@/types';
import mockData from '@/data/mockData';

export interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  itemCount: number;
  addToCart: (productId: string, size: ProductSize, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const getProductById = (id: string): Product | undefined => {
  const products = (mockData as any)?.products ?? [];
  return products.find((p: Product) => p?.id === id);
};

const getStockForVariant = (product: Product | undefined, size: ProductSize): number => {
  if (!product) return 0;
  return (
    product?.variants?.find((v) => v?.size === size)?.stock ??
    0
  );
};

export function CartProvider({ children }: { children?: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const subtotal = useMemo(
    () =>
      items?.reduce(
        (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
        0
      ) ?? 0,
    [items]
  );

  const itemCount = useMemo(
    () => items?.reduce((sum, item) => sum + (item?.quantity ?? 0), 0) ?? 0,
    [items]
  );

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const addToCart = useCallback(
    (productId: string, size: ProductSize, quantity: number = 1) => {
      if (!productId || !size || quantity <= 0) return;
      const product = getProductById(productId);
      if (!product) return;

      const maxStock = getStockForVariant(product, size);
      if (maxStock <= 0) return;

      setItems((prev) => {
        const existing = prev?.find(
          (item) => item?.productId === productId && item?.size === size
        );
        if (existing) {
          const nextQty = Math.min(existing.quantity + quantity, maxStock);
          return prev?.map((item) =>
            item?.id === existing.id ? { ...item, quantity: nextQty } : item
          );
        }
        const firstImage = product?.images?.[0];
        const newItem: CartItem = {
          id: crypto?.randomUUID?.() ?? `${productId}-${size}-${Date.now()}`,
          productId,
          name: product?.name ?? '',
          price: product?.price ?? 0,
          currency: product?.currency ?? 'INR',
          size,
          quantity: Math.min(quantity, maxStock),
          imageUrl: firstImage?.url ?? '',
        };
        return [...(prev ?? []), newItem];
      });
      setIsOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((itemId: string) => {
    if (!itemId) return;
    setItems((prev) => prev?.filter((item) => item?.id !== itemId) ?? []);
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (!itemId || quantity <= 0) return;
    setItems((prev) => {
      const current = prev?.find((item) => item?.id === itemId);
      if (!current) return prev ?? [];
      const product = getProductById(current.productId);
      const maxStock = getStockForVariant(product, current.size);
      if (maxStock <= 0) return prev?.filter((item) => item?.id !== itemId) ?? [];
      const nextQty = Math.min(quantity, maxStock);
      return prev?.map((item) =>
        item?.id === itemId ? { ...item, quantity: nextQty } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value: CartContextValue = useMemo(
    () => ({
      items,
      isOpen,
      subtotal,
      itemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      isOpen,
      subtotal,
      itemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children ?? null}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

export { CartContext };
export default CartContext;