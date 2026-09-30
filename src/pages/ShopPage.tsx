import React, { useMemo, useState } from 'react';
import { Product, ProductCategory, ProductSize } from '@/types';
import mockData from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { cn } from '@/lib/utils';
import { Filter, Sliders, Search, ChevronDown } from 'lucide-react';

export interface ShopPageProps {
  className?: string;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

function getProducts(): Product[] {
  const data: any = mockData ?? {};
  const products: Product[] = data?.products ?? [];
  return products;
}

export function ShopPage({ className = '' }: ShopPageProps) {
  const [category, setCategory] = useState<ProductCategory | 'All'>('All');
  const [size, setSize] = useState<ProductSize | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('featured');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | undefined>(undefined);
  const [detailOpen, setDetailOpen] = useState(false);

  const products = useMemo(() => getProducts(), []);

  const filtered = useMemo(() => {
    let items = [...products];
    if (category !== 'All') {
      items = items.filter(p => p?.category === category);
    }
    if (size !== 'All') {
      items = items.filter(p =>
        (p?.variants ?? []).some(v => v?.size === size && (v?.stock ?? 0) > 0),
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(p =>
        (p?.name ?? '').toLowerCase().includes(q) ||
        (p?.description ?? '').toLowerCase().includes(q),
      );
    }
    if (sort === 'price-asc') {
      items.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
    } else if (sort === 'price-desc') {
      items.sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    } else {
      items.sort((a, b) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0));
    }
    return items;
  }, [products, category, size, sort, query]);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Outerwear',
    'Tops',
    'Bottoms',
    'Footwear',
    'Accessories',
  ];

  const sizes: (ProductSize | 'All')[] = ['All', 'XS', 'S', 'M', 'L', 'XL'];

  const handleOpenDetail = (product: Product) => {
    setSelected(product);
    setDetailOpen(true);
  };

  return (
    <main
      className={cn(
        'min-h-screen bg-[#FAF9F6] px-4 pb-16 pt-24 md:px-8 lg:px-16',
        className,
      )}
    >
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-[#E7E0D6] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B645C]">
              East-Side / Shop
            </p>
            <h1 className="mt-2 font-['Playfair_Display'] text-3xl tracking-tight text-[#222222] md:text-4xl">
              Curated Street Editions
            </h1>
            <p className="mt-2 max-w-xl font-['Lora'] text-sm text-[#6B645C]">
              Filter the drop by cut, size, and mood. Every piece lands with a sharp silhouette and
              elevated construction.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 md:w-80">
            <div className="relative">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pieces, textures, tones..."
                className="w-full rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF] px-3 py-2 pl-9 font-['Lora'] text-sm text-[#222222] outline-none placeholder:text-[#B0A79F]"
              />
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-[#6B645C]" />
            </div>
            <div className="flex items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B645C]">
              <Sliders className="h-3 w-3" />
              <span>Refine selection</span>
            </div>
          </div>
        </header>

        <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start">
          <aside className="flex flex-wrap gap-4 border-b border-[#E7E0D6] pb-4 text-xs lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold uppercase tracking-[0.22em] text-[#6B645C]">
                  Category
                </span>
                <Filter className="h-3 w-3 text-[#6B645C]" />
              </div>
              <div className="flex flex-wrap gap-1.5 lg:flex-col">
                {categories.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      'rounded-md border px-2 py-1 text-[11px] uppercase tracking-[0.18em]',
                      category === c
                        ? 'border-[#222222] bg-[#FFFFFF] text-[#222222]'
                        : 'border-[#E7E0D6] text-[#6B645C] hover:border-[#CBB9A3]',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="mb-2 font-semibold uppercase tracking-[0.22em] text-[#6B645C]">
                Size
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      'min-w-[2.25rem] rounded-md border px-2 py-1 text-[11px] text-center tracking-[0.18em]',
                      size === s
                        ? 'border-[#222222] bg-[#FFFFFF] text-[#222222]'
                        : 'border-[#E7E0D6] text-[#6B645C] hover:border-[#CBB9A3]',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full">
              <p className="mb-2 font-semibold uppercase tracking-[0.22em] text-[#6B645C]">
                Sort
              </p>
              <div className="relative inline-flex w-full items-center justify-between rounded-md border border-[#E7E0D6] bg-[#FFFFFF] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#6B645C]">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortOption)}
                  className="w-full cursor-pointer bg-transparent pr-4 text-[11px] uppercase tracking-[0.18em] text-[#6B645C] outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price – Low</option>
                  <option value="price-desc">Price – High</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 h-3 w-3 text-[#6B645C]" />
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#6B645C]">
              <span>{filtered.length ?? 0} pieces curated</span>
              <span>Live filters</span>
            </div>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map(product => (
                <div key={product?.id} className="mb-4 break-inside-avoid">
                  <ProductCard
                    product={product}
                    onOpenDetail={p => handleOpenDetail(p)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <ProductDetailModal
        product={selected}
        open={detailOpen}
        onOpenChange={open => setDetailOpen(open)}
      />
    </main>
  );
}

export default ShopPage;