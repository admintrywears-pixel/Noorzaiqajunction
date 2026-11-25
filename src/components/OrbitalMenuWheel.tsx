import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  MessageCircle,
  Minus,
  Plus,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  buildSingleDishWhatsAppUrl,
  getHealthFocus,
  getSpiceCount,
  MENU_CATEGORIES,
  MENU_ITEMS,
  URDU_CATEGORIES,
  URDU_DISHES,
  URDU_SPICE,
} from '../data/menuData';
import type { Category, MenuItem } from '../types';

interface OrbitalMenuWheelProps {
  selectedCategory: 'All' | Category;
  onSelectCategory: (cat: 'All' | Category) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty?: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
}

export function OrbitalMenuWheel({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onUpdateQty,
  cartQuantities,
}: OrbitalMenuWheelProps) {
  const items = useMemo(
    () =>
      selectedCategory === 'All'
        ? MENU_ITEMS
        : MENU_ITEMS.filter((i) => i.category === selectedCategory),
    [selectedCategory]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const safeIndex = Math.min(activeIndex, Math.max(0, items.length - 1));
  const currentItem = items[safeIndex] ?? items[0];

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 900);
  };

  return (
    <section
      id="orbital-wheel"
      aria-label="3D Orbital Menu Wheel"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
            3D Orbital Dish Wheel · Spin &amp; Attach
          </p>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#FDF6E9]">
            Spin Every Plate to the Front
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0F0705] rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border border-[#EAB344]/20">
          {MENU_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#EAB344] text-[#140B07]'
                    : 'text-[#E6D7C3] hover:text-[#FDF6E9]'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <span>{cat} ·</span>
                  <span lang="ur" className="font-urdu-inline text-xs">
                    {URDU_CATEGORIES[cat]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative h-[440px] sm:h-[490px] w-full flex items-center justify-center overflow-hidden [perspective:1400px]">
        <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {items.map((item, idx) => {
            const offset = idx - safeIndex;
            if (Math.abs(offset) > 3) return null;

            const angle = offset * 0.5;
            const translateX = Math.sin(angle) * (isMobile ? 245 : 540);
            const translateZ = (Math.cos(angle) - 1) * 440;
            const translateY = Math.sin(angle * 1.35) * -32 + Math.abs(offset) * 16;
            const rotateY = -angle * (180 / Math.PI) * 0.84;
            const scale = Math.max(0.58, 1 - Math.abs(offset) * 0.14);
            const opacity = Math.max(0.14, 1 - Math.abs(offset) * 0.27);
            const isFront = Math.abs(offset) < 0.45;
            const zIndex = Math.round(50 - Math.abs(offset) * 10);
            const qty = cartQuantities[item.id] ?? 0;
            const isAdded = recentlyAddedId === item.id;
            const spiceCount = getSpiceCount(item.spice);

            return (
              <article
                key={item.id}
                onClick={() => {
                  if (!isFront) setActiveIndex(idx);
                }}
                style={{
                  transform: `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(
                    1
                  )}px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(
                    1
                  )}deg) scale(${scale.toFixed(3)})`,
                  opacity,
                  zIndex,
                  transition: 'transform 340ms cubic-bezier(0.16, 1, 0.3, 1), opacity 340ms ease',
                }}
                className={`absolute w-[305px] sm:w-[420px] lg:w-[485px] rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-2xl rounded-bl-2xl p-3.5 sm:p-4 border ${
                  isFront
                    ? 'bg-[#21120B]/96 border-[#F5C451] shadow-2xl'
                    : 'bg-[#180C07]/90 border-[#EAB344]/30 cursor-pointer hover:border-[#EAB344]/70'
                }`}
              >
                <div className="relative h-[165px] sm:h-[205px] lg:h-[225px] w-full overflow-hidden rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-xl rounded-bl-xl bg-[#2E1910]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#120906]/90 via-[#120906]/40 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-2 left-3.5 right-3.5 flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-[#F5C451] tabular-nums">
                      {String(idx + 1).padStart(2, '0')} /{' '}
                      {String(items.length).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-[#E6D7C3]">{item.category}</span>
                  </div>
                </div>

                <div className="px-2 pt-2.5 pb-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#C7B198]">
                    <div className="flex items-center gap-2">
                      <span>{item.urduTag}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                        <Clock className="w-3 h-3 text-[#EAB344]" />
                        {item.prepTime}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[#F5C451] font-medium">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < spiceCount ? 'text-[#EAB344]' : 'text-white/15'
                          }`}
                        />
                      ))}
                      <span className="ml-0.5 inline-flex items-center gap-1">
                        <span>{item.spice} ·</span>
                        <span lang="ur" className="font-urdu-inline text-[13px]">
                          {URDU_SPICE[item.spice]}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <h3 className="text-lg sm:text-xl font-semibold leading-snug text-[#FDF6E9] line-clamp-1">
                      {item.name}
                    </h3>
                    {URDU_DISHES[item.id] && (
                      <p
                        lang="ur"
                        className="font-urdu-inline text-base sm:text-lg text-[#EAB344] line-clamp-1"
                      >
                        {URDU_DISHES[item.id].name}
                      </p>
                    )}
                  </div>

                  <p className="text-[11px] sm:text-xs font-medium text-[#F5C451] line-clamp-1">
                    {getHealthFocus(item)}
                  </p>
                  <p className="text-xs leading-relaxed text-[#E6D7C3] line-clamp-1 sm:line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2.5 border-t border-[#EAB344]/15 flex flex-wrap items-center justify-between gap-2.5">
                    <p className="text-lg sm:text-xl font-mono font-semibold tabular-nums text-[#F5C451]">
                      Rs. {item.pricePkr.toLocaleString()}
                    </p>

                    {isFront ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={buildSingleDishWhatsAppUrl(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Instant WhatsApp order for this dish"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#2E1910] text-xs font-medium text-[#F5C451] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        {qty > 0 && onUpdateQty ? (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="px-2.5 py-2 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-bold tabular-nums">
                              {qty} in Bag
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="px-2.5 py-2 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdd(item);
                            }}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isAdded
                                ? 'bg-[#D4A23E] text-[#140B07]'
                                : 'bg-[#EAB344] text-[#140B07] hover:bg-[#F5C451]'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Attached to Order</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>{qty > 0 ? `Add (${qty})` : 'Add to Order'}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-[#F5C451]">
                        Click to spin front
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full mb-1 flex items-center justify-between gap-3 px-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#21120B]/92 border border-[#EAB344]/35 shadow-xl">
        <button
          type="button"
          onClick={() => setActiveIndex(Math.max(0, safeIndex - 1))}
          disabled={safeIndex <= 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E1910] text-xs font-medium text-[#FDF6E9] disabled:opacity-40 hover:border-[#EAB344] border border-[#EAB344]/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          aria-label="Previous dish"
        >
          <ChevronLeft className="w-4 h-4 text-[#F5C451]" />
          <span className="hidden sm:inline">Prev Dish</span>
        </button>

        <div className="flex-1 min-w-0 text-center space-y-1">
          <p className="text-xs sm:text-sm font-medium text-[#FDF6E9] truncate">
            <span className="font-mono text-[#F5C451] tabular-nums mr-2">
              {String(safeIndex + 1).padStart(2, '0')}/{items.length}
            </span>
            {currentItem?.name}
            <span className="hidden md:inline font-mono text-[#EAB344] tabular-nums ml-2">
              · Rs. {currentItem?.pricePkr.toLocaleString()}
            </span>
          </p>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#EAB344] transition-all duration-150"
              style={{
                width: `${
                  items.length > 1
                    ? ((safeIndex / (items.length - 1)) * 100).toFixed(1)
                    : 100
                }%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex(Math.min(items.length - 1, safeIndex + 1))}
          disabled={safeIndex >= items.length - 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E1910] text-xs font-medium text-[#FDF6E9] disabled:opacity-40 hover:border-[#EAB344] border border-[#EAB344]/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          aria-label="Next dish"
        >
          <span className="hidden sm:inline">Next Dish</span>
          <ChevronRight className="w-4 h-4 text-[#F5C451]" />
        </button>
      </div>
    </section>
  );
}
