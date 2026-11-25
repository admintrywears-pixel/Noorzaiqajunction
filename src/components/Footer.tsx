import {
  ALL_NAV_ITEMS,
  URDU_NAV,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from '../data/menuData';
import type { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-10 bg-[#051811]/95 text-[#B4C4BA] border-t border-[#EAB344]/20 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="shrink-0 cursor-pointer text-left px-4 py-2.5 rounded-xl border border-[#EAB344]/40 bg-[#08281D] hover:border-[#F5C451] transition-colors"
            aria-label="Go to Noor Zaiqa Junction Home"
          >
            <p className="font-display text-lg font-bold text-[#F3C969] leading-tight">
              Noor Zaiqa Junction
            </p>
            <p lang="ur" className="font-urdu-inline text-sm text-[#FDF9EE]">
              نور ذائقہ جنکشن
            </p>
          </button>

          <div className="space-y-1 text-xs">
            <p className="font-semibold text-[#FDF9EE]">
              Ghar ka Zaiqa, Har Plate Mein ·{' '}
              <span
                lang="ur"
                className="font-urdu-inline text-[13px] text-[#EAB344]"
              >
                ان ڈشز کے علاوہ بھی جو بنوانا ہو آرڈر پر تیار — کراچی
              </span>
            </p>
            <p>
              Freshly Prepared · Normal Homestyle Masala · Home Delivery Available · Order/WhatsApp:{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5C451] font-mono hover:underline"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </p>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
        >
          {ALL_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="inline-flex items-center gap-1.5 hover:text-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{item.label}</span>
              <span lang="ur" className="font-urdu-inline text-xs text-[#EAB344]">
                {URDU_NAV[item.id]}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
