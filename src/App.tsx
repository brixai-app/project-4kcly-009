import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import { HomePage } from '@/pages/Home';
import ShopPage from '@/pages/ShopPage';

export function AppFooter() {
  return (
    <footer className="border-t border-[#E7E0D6] bg-[#FAF9F6]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-3 border border-[#E7E0D6] bg-white px-4 py-2">
            <img
              src="https://brixai-assets-1.s3.ap-south-1.amazonaws.com/users/4kcLyAtsuzNqFl0zyaJU7QSAMLO2/projects/009/assets/2fb6be1a-2c0b-4049-8c6b-2f698e1a4576.png"
              alt='Generate a logo for the brand "EastSide"\nuse the typography same as H&M and the text color should be black'
              crossOrigin="anonymous"
              className="h-7 w-auto object-contain"
            />
            <span className="font-[Playfair Display] text-xs tracking-[0.25em] text-[#6B645C] uppercase">
              East-Side · Since MMXXIV
            </span>
          </div>
          <p className="max-w-md font-[Lora] text-sm text-[#6B645C]">
            Curated high-fashion streetwear from the new East—considered silhouettes,
            restrained palettes, and pieces that move with the city.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-right md:items-end">
          <p className="font-[Playfair Display] text-sm uppercase tracking-[0.3em] text-[#6B645C]">
            Stay ahead of the drop
          </p>
          <form
            className="flex w-full max-w-sm items-center gap-2 md:justify-end"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              placeholder="Email for early access"
              className="h-9 w-full border border-[#E7E0D6] bg-white px-3 text-xs font-[Lora] tracking-wide text-[#222222] outline-none placeholder:text-[#B0A79F]"
            />
            <button
              type="submit"
              className="h-9 border border-[#D7C9B6] bg-[#D7C9B6] px-4 text-xs font-semibold tracking-[0.2em] text-black uppercase hover:bg-[#CBB9A3] transition-colors"
            >
              Join
            </button>
          </form>
          <p className="font-[Lora] text-[11px] text-[#A19990]">
            By subscribing you agree to curated updates from EAST-SIDE.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  const [search, setSearch] = React.useState('');

  return (
    <CartProvider>
      <HashRouter>
        <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-[#222222] antialiased">
          <Header
            className="border-b border-[#E7E0D6] bg-[#FAF9F6]/95 backdrop-blur-sm"
            onSearchChange={(value) => setSearch(value ?? '')}
          />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage className="" />} />
              <Route path="/shop" element={<ShopPage className="" />} />
              <Route path="*" element={<HomePage className="" />} />
            </Routes>
          </main>
          <AppFooter />
          <CartDrawer className="" />
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                borderRadius: 14,
                border: '1px solid #E7E0D6',
                background: '#FFFFFF',
                fontFamily: 'Lora, system-ui, sans-serif',
              },
            }}
          />
        </div>
      </HashRouter>
    </CartProvider>
  );
}

export default App;