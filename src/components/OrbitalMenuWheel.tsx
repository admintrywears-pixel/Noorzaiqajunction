import {
  ArrowDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  MessageCircle,
  Minus,
  Plus,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import {
  buildSingleDishWhatsAppUrl,
  getHealthFocus,
  getSpiceCount,
  MENU_CATEGORIES,
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
  onJumpToGrid?: () => void;
}

export function OrbitalMenuWheel({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  onJumpToGrid,
}: OrbitalMenuWheelProps) {
  const { dishes } = useCatalog();
  const items = useMemo(
    () =>
      selectedCategory === 'All'
        ? dishes
        : dishes.filter((i) => i.category === selectedCategory),
    [dishes, selectedCategory]
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [scrollFloat, setScrollFloat] = useState(0);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setScrollFloat(0);
  }, [selectedCategory]);

  useEffect(() => {
    let rafId = 0;

    const updateFromScroll = () => {
      rafId = 0;
      const el = trackRef.current;
      if (!el || items.length <= 1) {
        setScrollFloat(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const headerOffset = 64;
      const stickyHeight = Math.max(320, window.innerHeight - headerOffset);
      const scrollable = Math.max(1, el.offsetHeight - stickyHeight);
      const scrolled = Math.min(scrollable, Math.max(0, headerOffset - rect.top));
      const progress = scrolled / scrollable;
      setScrollFloat(progress * (items.length - 1));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateFromScroll);
      }
    };

    updateFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [items.length]);

  const scrollToDish = (targetIdx: number) => {
    const el = trackRef.current;
    if (!el || items.length <= 1) {
      setScrollFloat(0);
      return;
    }
    const clamped = Math.max(0, Math.min(items.length - 1, targetIdx));
    const headerOffset = 64;
    const stickyHeight = Math.max(320, window.innerHeight - headerOffset);
    const scrollable = Math.max(1, el.offsetHeight - stickyHeight);
    const trackTopDoc = window.scrollY + el.getBoundingClientRect().top - headerOffset;
    const targetY = trackTopDoc + (clamped / (items.length - 1)) * scrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const activeIndex = Math.min(
    Math.max(0, Math.round(scrollFloat)),
    Math.max(0, items.length - 1)
  );
  const currentItem = items[activeIndex] ?? items[0];

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 900);
  };

  const trackHeightVh = items.length > 1 ? Math.max(150, 100 + (items.length - 1) * 22) : 100;

  return (
    <section
      id="orbital-wheel"
      ref={trackRef}
      aria-label="Full-Screen Orbital Menu"
      style={items.length > 1 ? { minHeight: `${trackHeightVh}vh` } : undefined}
      className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-10"
    >
      <div className="sticky top-16 h-[calc(100dvh-4rem)] py-2 sm:py-3 flex flex-col justify-between gap-1.5 sm:gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 shrink-0">
          <div className="flex flex-nowrap sm:flex-wrap items-center gap-1 p-1 bg-[#0F0705] rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md border border-[#EAB344]/25 overflow-x-auto no-scrollbar max-w-full">
            {MENU_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    scrollToDish(0);
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-tl-xl sm:rounded-br-xl sm:rounded-tr-sm sm:rounded-bl-sm text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

          {onJumpToGrid && (
            <button
              type="button"
              onClick={onJumpToGrid}
              className="self-end sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-tl-xl sm:rounded-br-xl sm:rounded-tr-sm sm:rounded-bl-sm border border-[#EAB344]/45 bg-[#21120B] text-[11px] sm:text-xs font-semibold text-[#F5C451] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>All {items.length} Dishes List</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
            const deltaX = endX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(deltaX) > 45) {
              scrollToDish(activeIndex + (deltaX < 0 ? 1 : -1));
            }
          }}
          className="relative flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden touch-pan-y"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {items.map((item, idx) => {
              const offset = idx - scrollFloat;
              const absOffset = Math.abs(offset);
              if (absOffset > 2.2) return null;

              const isFront = absOffset < 0.5;
              const spacingX = isMobile ? 210 : 470;
              const translateX = Math.sin(offset * 0.55) * (spacingX * 1.85);
              const translateY = absOffset * (isMobile ? 10 : 18);
              const rotateY = Math.max(-28, Math.min(28, -offset * 18));
              const scale = Math.max(0.72, 1 - absOffset * 0.17);
              // Keep front and immediate neighbors 100% opaque so card backgrounds NEVER bleed through!
              const opacity = absOffset <= 1.25 ? 1 : Math.max(0, 1 - (absOffset - 1.25) * 1.05);
              const zIndex = Math.round(100 - absOffset * 20);
              const qty = cartQuantities[item.id] ?? 0;
              const isAdded = recentlyAddedId === item.id;
              const spiceCount = getSpiceCount(item.spice);

              return (
                <article
                  key={item.id}
                  onClick={() => {
                    if (!isFront) scrollToDish(idx);
                  }}
                  style={{
                    transform: `perspective(1400px) translate3d(${translateX.toFixed(
                      1
                    )}px, ${translateY.toFixed(1)}px, 0px) rotateY(${rotateY.toFixed(
                      1
                    )}deg) scale(${scale.toFixed(3)})`,
                    opacity,
                    zIndex,
                    willChange: 'transform, opacity',
                  }}
                  className={`absolute w-[91vw] max-w-[345px] sm:max-w-[540px] lg:max-w-[620px] rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl p-3 sm:p-5 border shadow-2xl overflow-hidden ${
                    isFront
                      ? 'bg-[#21120B] border-[#F5C451]'
                      : 'bg-[#160B06] border-[#EAB344]/30 cursor-pointer hover:border-[#EAB344]/70'
                  }`}
                >
                  {!isFront && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 bg-[#0E0704]/45"
                    />
                  )}

                  <div className="relative h-[20vh] min-h-[125px] max-h-[185px] sm:h-[28vh] sm:min-h-[165px] sm:max-h-[285px] w-full overflow-hidden rounded-tl-[1.35rem] rounded-br-[1.35rem] sm:rounded-tl-[2.25rem] sm:rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg sm:rounded-tr-xl sm:rounded-bl-xl bg-[#2E1910]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#120906]/90 via-[#120906]/45 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-mono font-bold text-[#F5C451] tabular-nums">
                        {String(idx + 1).padStart(2, '0')} /{' '}
                        {String(items.length).padStart(2, '0')}
                      </span>
                      <span className="font-semibold text-[#FDF6E9]">{item.category}</span>
                    </div>
                  </div>

                  <div className="px-0.5 sm:px-1 pt-2.5 sm:pt-3 pb-0.5 space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-sm text-[#C7B198]">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <span className="font-medium text-[#F5C451] truncate">{item.urduTag}</span>
                        <span aria-hidden="true" className="hidden sm:inline">·</span>
                        <span className="hidden sm:inline-flex items-center gap-1 font-mono tabular-nums shrink-0">
                          <Clock className="w-3.5 h-3.5 text-[#EAB344]" />
                          {item.prepTime}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-[#F5C451] font-medium shrink-0">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Flame
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                              i < spiceCount ? 'text-[#EAB344]' : 'text-white/15'
                            }`}
                          />
                        ))}
                        <span className="ml-0.5 inline-flex items-center gap-1">
                          <span>{item.spice}</span>
                          <span lang="ur" className="hidden sm:inline-block font-urdu-inline text-sm">
                            · {URDU_SPICE[item.spice]}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <h2 className="text-lg sm:text-2xl lg:text-[1.75rem] font-bold leading-snug text-[#FDF6E9]">
                        {item.name}
                      </h2>
                      {URDU_DISHES[item.id] && (
                        <p
                          lang="ur"
                          className="font-urdu-inline text-base sm:text-xl text-[#EAB344]"
                        >
                          {URDU_DISHES[item.id].name}
                        </p>
                      )}
                    </div>

                    <p className="hidden sm:block text-xs sm:text-sm font-medium text-[#F5C451] line-clamp-1">
                      {getHealthFocus(item)}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#E6D7C3] line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-2 sm:pt-2.5 border-t border-[#EAB344]/20 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xl sm:text-3xl font-mono font-bold tabular-nums text-[#F5C451]">
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#2E1910] text-xs sm:text-sm font-semibold text-[#F5C451] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0"
                          >
                            <MessageCircle className="w-4 h-4" />
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
                                className="px-3 py-2 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 text-xs sm:text-sm font-mono font-bold tabular-nums">
                                {qty} in Bag
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, 1)}
                                className="px-3 py-2 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdd(item);
                              }}
                              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                isAdded
                                  ? 'bg-[#D4A23E] text-[#140B07]'
                                  : 'bg-[#EAB344] text-[#140B07] hover:bg-[#F5C451]'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Attached</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4" />
                                  <span>{qty > 0 ? `Add (${qty})` : 'Add to Order'}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-medium text-[#F5C451]">
                          Scroll or click to front
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3 px-4 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#21120B] border border-[#EAB344]/35 shadow-xl shrink-0">
          <button
            type="button"
            onClick={() => scrollToDish(activeIndex - 1)}
            disabled={activeIndex <= 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E1910] text-xs sm:text-sm font-semibold text-[#FDF6E9] disabled:opacity-40 hover:border-[#EAB344] border border-[#EAB344]/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Previous dish"
          >
            <ChevronLeft className="w-4 h-4 text-[#F5C451]" />
            <span className="hidden sm:inline">Prev Dish</span>
          </button>

          <div className="flex-1 min-w-0 text-center space-y-1">
            <p className="text-xs sm:text-base font-semibold text-[#FDF6E9] truncate">
              <span className="font-mono text-[#F5C451] tabular-nums mr-2">
                {String(activeIndex + 1).padStart(2, '0')}/{items.length}
              </span>
              {currentItem?.name}
              <span className="hidden md:inline font-mono text-[#EAB344] tabular-nums ml-2">
                · Rs. {currentItem?.pricePkr.toLocaleString()}
              </span>
            </p>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#EAB344]"
                style={{
                  width: `${
                    items.length > 1
                      ? ((scrollFloat / (items.length - 1)) * 100).toFixed(1)
                      : 100
                  }%`,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToDish(activeIndex + 1)}
            disabled={activeIndex >= items.length - 1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E1910] text-xs sm:text-sm font-semibold text-[#FDF6E9] disabled:opacity-40 hover:border-[#EAB344] border border-[#EAB344]/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Next dish"
          >
            <span className="hidden sm:inline">Next Dish</span>
            <ChevronRight className="w-4 h-4 text-[#F5C451]" />
          </button>
        </div>
      </div>
    </section>
  );
}
