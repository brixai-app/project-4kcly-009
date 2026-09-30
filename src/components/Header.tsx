import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  className?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ className = '', onSearchChange }: HeaderProps) {
  const navigate = useNavigate();
  const { itemCount, openCart } = useCart();
  const [search, setSearch] = React.useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const debouncedCallback = React.useRef<number | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (!onSearchChange) return;
    if (debouncedCallback.current !== null) {
      window.clearTimeout(debouncedCallback.current ?? 0);
    }
    debouncedCallback.current = window.setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const navLinkClass =
    'text-xs tracking-[0.2em] uppercase text-[#6B645C] hover:text-[#222222] transition-colors';

  const categories = [
    { to: '/shop?category=Outerwear', label: 'Outerwear' },
    { to: '/shop?category=Tops', label: 'Tops' },
    { to: '/shop?category=Bottoms', label: 'Bottoms' },
    { to: '/shop?category=Footwear', label: 'Footwear' },
    { to: '/shop?category=Accessories', label: 'Accessories' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-[#E7E0D6] bg-[#FAF9F6]/95 backdrop-blur-md',
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <button
          type="button"
          onClick={handleLogoClick}
          className="flex items-center gap-2"
        >
          <img
            src="https://brixai-assets-1.s3.ap-south-1.amazonaws.com/users/4kcLyAtsuzNqFl0zyaJU7QSAMLO2/projects/009/assets/2fb6be1a-2c0b-4049-8c6b-2f698e1a4576.png"
            alt='Generate a logo for the brand "EastSide" use the typography same as H&M and the text color should be black'
            crossOrigin="anonymous"
            className="h-7 w-auto md:h-8"
          />
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {categories.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  navLinkClass,
                  isActive ? 'text-[#222222]' : 'text-[#6B645C]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <div className="hidden items-center rounded-md border border-[#E7E0D6] bg-white px-2 py-1 md:flex md:w-64">
            <Search className="mr-2 h-4 w-4 text-[#6B645C]" />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search EAST-SIDE"
              className="h-7 w-full bg-transparent text-xs font-normal text-[#222222] outline-none placeholder:text-[#B0A79E]"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E7E0D6] bg-white text-[#222222] md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => openCart()}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[#E7E0D6] bg-white text-[#222222]"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#222222] px-0.5 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {isMobileNavOpen && (
        <div className="border-t border-[#E7E0D6] bg-[#FAF9F6] px-4 pb-3 pt-2 md:hidden">
          <div className="mb-3 flex items-center rounded-md border border-[#E7E0D6] bg-white px-2 py-1">
            <Search className="mr-2 h-4 w-4 text-[#6B645C]" />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search EAST-SIDE"
              className="h-8 w-full bg-transparent text-xs font-normal text-[#222222] outline-none placeholder:text-[#B0A79E]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'text-[11px] uppercase tracking-[0.18em]',
                    isActive ? 'text-[#222222]' : 'text-[#6B645C]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;