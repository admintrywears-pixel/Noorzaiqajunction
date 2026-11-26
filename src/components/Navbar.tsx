import { Menu, ShoppingBag, X } from 'lucide-react';
import {
  ALL_NAV_ITEMS,
  PRIMARY_NAV_ITEMS,
  URDU_NAV,
} from '../data/menuData';
import type { PageId } from '../types';
import { ZaiqaLogo } from './ZaiqaLogo';

interface NavbarProps {
  activePage: PageId;
  totalItems: number;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (page: PageId) => void;
  onOpenCart: () => void;
}

export function Navbar({
  activePage,
  totalItems,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  onOpenCart,
}: NavbarProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 h-16 bg-[#1A0E09]/95 border-b border-[#EAB344]/25 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-10 flex items-center justify-between gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 sm:gap-2.5 shrink-0 cursor-pointer px-2 sm:px-2.5 py-1 rounded-xl border border-[#EAB344]/45 bg-[#21120B] hover:border-[#F5C451] transition-colors shadow-sm min-w-0"
          aria-label="Zaiqa Junction Home"
        >
          <ZaiqaLogo size={32} />
          <div className="text-left leading-none pr-0.5 sm:pr-1">
            <span className="block font-display text-[13px] sm:text-base font-bold tracking-tight text-[#F3C969] whitespace-nowrap">
              Zaiqa Junction
            </span>
            <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#FDF6E9]/80 mt-0.5 whitespace-nowrap">
              Ghar ka Zaiqa
            </span>
          </div>
        </button>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center lg:gap-3.5 xl:gap-5 text-[13px] xl:text-sm font-medium text-[#E6D7C3]"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                  isActive
                    ? 'text-[#F5C451] border-b border-[#EAB344]'
                    : 'hover:text-[#F5C451]'
                }`}
              >
                <span>
                  {item.id === 'orders' && totalItems > 0
                    ? `Orders (${totalItems})`
                    : item.label}
                </span>
                <span
                  lang="ur"
                  className="font-urdu-inline text-[13px] text-[#EAB344]"
                >
                  {URDU_NAV[item.id]}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="tabular-nums inline-flex items-center gap-1.5">
              {totalItems > 0 ? (
                <>
                  <span className="sm:hidden">Bag ({totalItems})</span>
                  <span className="hidden sm:inline">Order Bag ({totalItems})</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">Order Bag</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">
                    <span>Order Bag ·</span>
                    <span lang="ur" className="font-urdu-inline text-[13px]">
                      آرڈر بیگ
                    </span>
                  </span>
                </>
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#EAB344]/30 bg-[#2E1910] text-[#FDF6E9] hover:border-[#F5C451] transition-colors cursor-pointer shrink-0"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto bg-[#1A0E09]/98 border-b border-[#EAB344]/30 px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 shadow-2xl"
        >
          {ALL_NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between gap-2 text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EAB344]/15 text-[#F5C451]'
                    : 'text-[#E6D7C3] hover:bg-white/5 hover:text-[#FDF6E9]'
                }`}
              >
                <span>{item.label}</span>
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  {URDU_NAV[item.id]}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
