import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import mockData from '@/data/mockData';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export interface HomeProps {
  className?: string;
}

const heroImage =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85';
const mosaicImageA =
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85';
const mosaicImageB =
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85';
const manifestoImage =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';

function Home({ className = '' }: HomeProps) {
  const products = (mockData as { products?: Product[] | null })?.products ?? [];
  const featured = products.filter((p) => p?.featured ?? false).slice(0, 4);
  const categories = Array.from(
    new Set(products.map((p) => p?.category ?? '').filter(Boolean))
  ).slice(0, 5);

  return (
    <div
      className={cn(
        'min-h-screen bg-[#FAF9F6] text-[#222222] font-[Lora] pb-24',
        className
      )}
    >
      <main className="mx-auto max-w-6xl px-4 lg:px-8 space-y-24 pt-10">
        <section className="relative grid gap-6 lg:grid-cols-[3fr,2fr] items-stretch">
          <motion.div
            className="relative overflow-hidden rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
              <img
                src={heroImage}
                alt="East-Side editorial streetwear lookbook"
                crossOrigin="anonymous"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-6 border border-[#E7E0D6]/70" />
            </div>
          </motion.div>
          <motion.aside
            className="relative flex flex-col justify-between rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF] px-6 py-7 lg:px-8 lg:py-9"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              <p className="text-xs tracking-[0.35em] uppercase text-[#6B645C]">
                East-Side / Vol. 01
              </p>
              <h1 className="font-[Playfair Display] text-4xl md:text-5xl lg:text-6xl leading-tight">
                Concrete
                <br />
                Reveries
              </h1>
              <p className="max-w-md text-sm md:text-base text-[#6B645C]">
                A study of silhouette, shadow, and city noise. Tailored streetwear
                with gallery-level attitude—cut for late nights and early flights.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center border border-[#222222] bg-[#222222] px-6 py-2.5 text-xs font-semibold tracking-[0.25em] uppercase text-[#FFFFFF] hover:bg-transparent hover:text-[#222222] transition-colors rounded-md"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button
                type="button"
                className="inline-flex items-center text-xs tracking-[0.25em] uppercase text-[#6B645C] hover:text-[#222222]"
              >
                View Lookbook Notes
              </button>
            </div>
          </motion.aside>
        </section>

        <section className="space-y-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#6B645C]">
                Trending Drop
              </p>
              <h2 className="mt-1 font-[Playfair Display] text-2xl md:text-3xl">
                Street Studies Issue
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs tracking-[0.25em] uppercase text-[#6B645C] hover:text-[#222222]"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {featured.slice(0, 3).map((product) => (
                <motion.div
                  key={product?.id ?? ''}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="relative flex flex-col justify-between rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF] overflow-hidden"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={mosaicImageA}
                  alt="High fashion streetwear editorial still life"
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="border-t border-[#E7E0D6] px-5 py-5">
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#6B645C]">
                  Capsule Highlight
                </p>
                <p className="mt-2 text-sm text-[#222222]">
                  Tonal layers, elongated lines, and deliberate volume for the
                  late-night city grid.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-[Playfair Display] text-2xl md:text-3xl">
              Edit by Category
            </h2>
            <p className="text-xs tracking-[0.25em] uppercase text-[#6B645C]">
              Curated street codes
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <motion.div
              className="relative overflow-hidden rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative h-48">
                <img
                  src={mosaicImageB}
                  alt="Outerwear silhouettes in motion"
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <div className="border-t border-[#E7E0D6] px-4 py-4">
                <p className="text-xs tracking-[0.3em] uppercase text-[#6B645C]">
                  Outerwear
                </p>
                <p className="mt-1 text-sm text-[#222222]">
                  Longline coats, cropped bombers, and architectural hoods.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col justify-between rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF] px-4 py-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#6B645C]">
                  Categories
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className="flex items-center justify-between border-b border-dotted border-[#E7E0D6] pb-1 last:border-0 last:pb-0"
                    >
                      <span>{cat}</span>
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[#6B645C]">
                        Edit
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/shop"
                className="mt-4 inline-flex items-center justify-between border border-[#E7E0D6] bg-[#FFFFFF] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-[#D7C9B6] hover:text-[#000000] rounded-md"
              >
                Shop the grid
                <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
            <motion.div
              className="relative overflow-hidden rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="relative h-48">
                <img
                  src={manifestoImage}
                  alt="Minimal interior with East-Side pieces"
                  crossOrigin="anonymous"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="border-t border-[#E7E0D6] px-4 py-4">
                <p className="text-xs tracking-[0.3em] uppercase text-[#6B645C]">
                  Studio Notes
                </p>
                <p className="mt-1 text-sm text-[#222222]">
                  Built for movement, styled for stillness. Each piece works
                  alone, sharper together.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="grid gap-8 rounded-[14px] border border-[#E7E0D6] bg-[#FFFFFF] px-6 py-8 md:grid-cols-[1.4fr,1fr] md:px-8 md:py-10">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#6B645C]">
              East-Side Manifesto
            </p>
            <h2 className="font-[Playfair Display] text-2xl md:text-3xl leading-snug">
              Clothes for the in-between—between gallery and sidewalk, midnight
              and first train.
            </h2>
            <p className="text-sm text-[#6B645C]">
              We design on the fault line of luxury and asphalt. Clean cuts,
              deliberate volume, and a palette that lets the city do the talking.
              Every garment passes the &quot;last piece you kept on&quot; test.
            </p>
          </motion.div>
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#6B645C]">
              Join the drop list
            </p>
            <p className="text-sm text-[#6B645C]">
              Early access to limited runs, studio scraps, and after-hours
              previews. No noise—just the next thing.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="email@east-side.studio"
                className="h-10 flex-1 border border-[#E7E0D6] bg-[#FAF9F6] px-3 text-xs outline-none placeholder:text-[#B0A79D] focus:border-[#D7C9B6] rounded-md"
              />
              <button
                type="submit"
                className="h-10 border border-[#D7C9B6] bg-[#D7C9B6] px-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#000000] hover:bg-[#CBB9A3] rounded-md"
              >
                Notify Me
              </button>
            </div>
          </motion.form>
        </section>
      </main>
    </div>
  );
}

export function HomePage(props: HomeProps) {
  return <Home {...props} />;
}

export default Home;
export { Home };
