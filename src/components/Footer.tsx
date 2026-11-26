import { useRef } from 'react';
import {
  ALL_NAV_ITEMS,
  URDU_NAV,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from '../data/menuData';
import type { PageId } from '../types';
import { ZaiqaLogo } from './ZaiqaLogo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onSecretUnlock?: () => void;
}

export function Footer({ onNavigate, onSecretUnlock }: FooterProps) {
  const tapCountRef = useRef(0);
  const tapResetTimerRef = useRef<number | null>(null);

  const handleCopyrightTap = () => {
    if (!onSecretUnlock) return;
    tapCountRef.current += 1;
    if (tapResetTimerRef.current !== null) {
      window.clearTimeout(tapResetTimerRef.current);
    }
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      tapResetTimerRef.current = null;
      onSecretUnlock();
      return;
    }
    tapResetTimerRef.current = window.setTimeout(() => {
      tapCountRef.current = 0;
      tapResetTimerRef.current = null;
    }, 2500);
  };

  return (
    <footer className="relative z-10 bg-[#100805]/95 text-[#C7B198] border-t border-[#EAB344]/20 pt-10 sm:pt-12 pb-12 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="shrink-0 cursor-pointer flex items-center gap-3 text-left px-4 py-2.5 rounded-xl border border-[#EAB344]/40 bg-[#21120B] hover:border-[#F5C451] transition-colors"
            aria-label="Go to Zaiqa Junction Home"
          >
            <ZaiqaLogo size={42} />
            <div>
              <p className="font-display text-lg font-bold text-[#F3C969] leading-tight">
                Zaiqa Junction
              </p>
              <p lang="ur" className="font-urdu-inline text-sm text-[#FDF6E9]">
                ذائقہ جنکشن
              </p>
            </div>
          </button>

          <div className="space-y-1 text-xs">
            <p className="font-semibold text-[#FDF6E9]">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 pt-5 border-t border-[#EAB344]/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#C7B198]">
        <p onClick={handleCopyrightTap} className="select-none">
          © {new Date().getFullYear()} Zaiqa Junction. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <span>
            Crafted by{' '}
            <a
              href="https://www.howweb.us"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#F5C451] hover:text-[#FDF6E9] underline decoration-[#EAB344]/50 underline-offset-4 transition-colors"
            >
              HowWeb Digital Experts
            </a>{' '}
            <span className="text-[#9E8468]">(</span>
            <a
              href="https://www.howweb.us"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[#E6D7C3] hover:text-[#F5C451] transition-colors"
            >
              www.howweb.us
            </a>
            <span className="text-[#9E8468]">)</span>
          </span>

          <a
            href="https://wa.me/923409587680"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp HowWeb Digital Experts"
            title="Chat on WhatsApp"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#21120B] border border-[#EAB344]/45 text-[#F5C451] hover:bg-[#EAB344] hover:text-[#140B07] hover:border-[#F5C451] transition-colors shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.79 14.12c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.91-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.37-5.16-4.57-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.66-.08.18-.21.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.58.35.08.13.08.73-.16 1.41z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
