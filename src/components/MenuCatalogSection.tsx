import {
  Check,
  Clock,
  Flame,
  MessageCircle,
  Minus,
  Plus,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import {
  buildSingleDishWhatsAppUrl,
  getHealthFocus,
  getSpiceCount,
  MENU_CATEGORIES,
  SPICE_LEVELS,
  URDU_CATEGORIES,
  URDU_DISHES,
  URDU_SPICE,
} from '../data/menuData';
import type { Category, MenuItem, SpiceLevel } from '../types';

interface MenuCatalogSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty?: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  selectedCategory?: 'All' | Category;
  onSelectCategory?: (category: 'All' | Category) => void;
  showPromiseBanner?: boolean;
}

export function MenuCatalogSection({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  selectedCategory,
  onSelectCategory,
  showPromiseBanner = true,
}: MenuCatalogSectionProps) {
  const { dishes } = useCatalog();
  const [internalCat, setInternalCat] = useState<'All' | Category>('All');
  const [spiceFilter, setSpiceFilter] = useState<'All Flavors' | SpiceLevel>('All Flavors');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeCategory = selectedCategory ?? internalCat;
  const setCategory = (cat: 'All' | Category) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      setInternalCat(cat);
    }
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return dishes.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (spiceFilter !== 'All Flavors' && item.spice !== spiceFilter) return false;
      if (
        q &&
        !item.name.toLowerCase().includes(q) &&
        !item.urduTag.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [dishes, activeCategory, spiceFilter, searchQuery]);

  const spotlight = useMemo(
    () => filteredItems.find((item) => item.featured) ?? filteredItems[0] ?? null,
    [filteredItems]
  );

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 900);
  };

  return (
    <div className="relative z-10 text-[#FDF6E9]">
      {showPromiseBanner && (
      <section
        id="our-promise"
        className="py-16"
        aria-label="Our Homemade Kitchen Promise"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-tl-[2rem] rounded-br-[2rem] sm:rounded-tl-[4rem] sm:rounded-br-[4rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/92 border border-[#EAB344]/35 p-5 sm:p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
                  Zaiqa Junction · Ghar ka Zaiqa, Har Plate Mein
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-tight text-[#FDF6E9]"
                  style={{ textWrap: 'balance' }}
                >
                  Homestyle Masala Classics &amp; Sweets,{' '}
                  <span className="italic font-medium text-[#F5C451]">Cooked Fresh</span>{' '}
                  On Order.
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
                Beef &amp; Chicken Shami Kabab, Chicken Achaari, Chicken Biryani, Chicken
                Qorma, Aalu Qeema, Zarda, Mutanjan, Chicken Chowmien, Daal Chawal + Kabab,
                Roti &amp; Aalu Paratha. In dishes ke ilawa bhi jo aapko banwana ho, wo
                order par ban jata hai!
              </p>
            </div>

            <div className="flex items-center gap-4 pb-8" aria-hidden="true">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#EAB344]/45 to-transparent" />
              <svg
                width="26"
                height="16"
                viewBox="0 0 26 16"
                fill="none"
                className="text-[#EAB344]"
              >
                <path
                  d="M1 8C6 2 11 2 13 8C15 14 20 14 25 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="13" cy="8" r="2.2" fill="#F5C451" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#EAB344]/45 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  Rs. 20+
                </p>
                <p className="text-sm font-semibold text-[#FDF6E9]">
                  Honest Family Rates
                </p>
                <p className="text-xs text-[#C7B198]">
                  Roti Rs. 20, Parathas Rs. 120, Boxes Rs. 300 &amp; 1 KG trays
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  100%
                </p>
                <p className="text-sm font-semibold text-[#FDF6E9]">
                  Ghar Ka Masala &amp; Taste
                </p>
                <p className="text-xs text-[#C7B198]">
                  Traditional spices, clean cooking oil &amp; zero preservatives
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  Custom
                </p>
                <p className="text-sm font-semibold text-[#FDF6E9]">Anything on Order</p>
                <p className="text-xs text-[#C7B198]">
                  In dishes ke ilawa bhi har item order par tayyar
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  {dishes.length}
                </p>
                <p className="text-sm font-semibold text-[#FDF6E9]">
                  Special Menu Dishes
                </p>
                <p className="text-xs text-[#C7B198]">
                  Kababs, Curries, Biryani, Zarda, Chowmien &amp; Breads
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 space-y-8 sm:space-y-12">
        <div className="rounded-tr-[1.75rem] rounded-bl-[1.75rem] sm:rounded-tr-[3.5rem] sm:rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl sm:rounded-br-2xl bg-[#21120B]/94 border border-[#EAB344]/40 p-4 sm:p-7 lg:p-11 shadow-2xl space-y-6 sm:space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
            <div className="space-y-2 sm:space-y-2.5 max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F5C451]">
                Zaiqa Junction Special Menu · All {filteredItems.length} Dishes
              </p>
              <h2 className="text-2xl sm:text-5xl font-bold tracking-tight text-[#FDF6E9]">
                Ghar ka Zaiqa, Har Plate Mein
              </h2>
              <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
                بیف و چکن شامی کباب، اچاری، بریانی، قورمہ، آلو قیمہ، زردہ، متنجن، چاؤمین و دال چاول
              </p>
              <p className="text-xs sm:text-base text-[#E6D7C3]">
                In Dishes Ke Ilawa Bhi Jo Aapko Banwana Ho, Wo Order Par Ban Jata Hai · WhatsApp 0371-2442688
              </p>
            </div>

            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-[#C7B198] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shami, biryani, qorma, zarda..."
                aria-label="Search menu items"
                className="w-full pl-11 pr-4 py-3 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#2E1910] border border-[#EAB344]/30 text-sm sm:text-base text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 p-1.5 bg-[#0F0705] rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md border border-[#EAB344]/20 overflow-x-auto no-scrollbar max-w-full">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count =
                  cat === 'All'
                    ? dishes.length
                    : dishes.filter((i) => i.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-tl-xl sm:rounded-br-xl sm:rounded-tr-sm sm:rounded-bl-sm text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#EAB344] text-[#140B07]'
                        : 'text-[#E6D7C3] hover:text-[#FDF6E9]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>{cat} ·</span>
                      <span lang="ur" className="font-urdu-inline text-xs sm:text-sm">
                        {URDU_CATEGORIES[cat]}
                      </span>
                      <span>({count})</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-0.5 sm:pb-0">
              {SPICE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceFilter(level)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-tl-xl sm:rounded-br-xl sm:rounded-tr-sm sm:rounded-bl-sm text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    spiceFilter === level
                      ? 'bg-[#D4A23E] text-[#140B07] font-bold border-[#F5C451]'
                      : 'bg-[#2E1910] text-[#E6D7C3] border-[#EAB344]/20 hover:border-[#EAB344]'
                  }`}
                >
                  {level !== 'All Flavors' && <Flame className="w-3.5 h-3.5" />}
                  <span className="inline-flex items-center gap-1.5">
                    <span>{level} ·</span>
                    <span lang="ur" className="font-urdu-inline text-xs sm:text-sm">
                      {URDU_SPICE[level]}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-5 sm:pt-6 border-t border-[#EAB344]/20 space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg sm:text-2xl font-display font-bold text-[#F5C451]">
                Quick-Read Special Menu &amp; Rate List
              </h3>
              <p lang="ur" className="font-urdu-inline text-sm sm:text-lg text-[#E6D7C3]">
                تمام ڈشز اور ان کے ریٹس — کلک کر کے آرڈر میں شامل کریں
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 sm:gap-y-3">
              {dishes.map((item) => {
                const qty = cartQuantities[item.id] ?? 0;
                return (
                  <div
                    key={`rate-${item.id}`}
                    className="flex items-center justify-between gap-2 sm:gap-3 py-2 px-2.5 sm:py-2.5 sm:px-3.5 rounded-xl bg-[#140B07]/85 border border-[#EAB344]/20 hover:border-[#F5C451]/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0 border border-[#EAB344]/30"
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-base font-bold text-[#FDF6E9] truncate">
                          {item.name}
                        </p>
                        {URDU_DISHES[item.id] && (
                          <p lang="ur" className="font-urdu-inline text-xs sm:text-sm text-[#EAB344] truncate">
                            {URDU_DISHES[item.id].name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="text-xs sm:text-lg font-mono font-bold tabular-nums text-[#F5C451]">
                        Rs. {item.pricePkr.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#EAB344] text-[#140B07] text-[11px] sm:text-xs font-bold hover:bg-[#F5C451] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {qty > 0 ? `Added (${qty})` : '+ Add'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {spotlight && (
          <article className="rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.75rem] sm:rounded-br-[3.75rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/95 border border-[#EAB344]/45 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 relative min-h-[220px] sm:min-h-[360px] bg-[#2E1910]">
              <img
                src={spotlight.image}
                alt={spotlight.name}
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120906]/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute bottom-4 left-5 text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-[#F5C451]">
                Special Menu Spotlight · {spotlight.category}
              </span>
            </div>

            <div className="lg:col-span-6 p-5 sm:p-10 flex flex-col justify-between gap-5 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#F5C451]">
                  <span className="font-semibold">{spotlight.urduTag}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-mono tabular-nums text-[#E6D7C3]">
                    <Clock className="w-4 h-4 text-[#EAB344]" />
                    {spotlight.prepTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <Flame
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < getSpiceCount(spotlight.spice)
                            ? 'text-[#EAB344]'
                            : 'text-white/15'
                        }`}
                      />
                    ))}
                    <span className="ml-0.5 font-medium">{spotlight.spice}</span>
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-bold leading-tight text-[#FDF6E9]"
                  style={{ textWrap: 'balance' }}
                >
                  {spotlight.name}
                </h3>

                {URDU_DISHES[spotlight.id] && (
                  <p lang="ur" className="font-urdu text-xl sm:text-3xl text-[#EAB344]">
                    {URDU_DISHES[spotlight.id].name}
                  </p>
                )}

                <p className="text-xs sm:text-sm font-semibold text-[#F5C451]">
                  Kitchen Standard: {getHealthFocus(spotlight)}
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
                  {spotlight.description}
                </p>

                {URDU_DISHES[spotlight.id] && (
                  <p lang="ur" className="font-urdu-body text-sm sm:text-base text-[#C7B198]">
                    {URDU_DISHES[spotlight.id].tagline}
                  </p>
                )}
              </div>

              <div className="pt-4 sm:pt-5 border-t border-[#EAB344]/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-[#C7B198]">Special Menu Rate</p>
                  <p className="text-2xl sm:text-4xl font-mono font-bold tabular-nums text-[#F5C451]">
                    Rs. {spotlight.pricePkr.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <a
                    href={buildSingleDishWhatsAppUrl(spotlight)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#2E1910] text-sm font-semibold text-[#F5C451] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleAdd(spotlight)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {(cartQuantities[spotlight.id] ?? 0) > 0
                        ? `In Bag (${cartQuantities[spotlight.id]}) — Add More`
                        : 'Add Spotlight to Order'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {filteredItems.length === 0 ? (
          <div className="py-16 text-center rounded-tl-[2rem] rounded-br-[2rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] border border-[#EAB344]/25 bg-[#21120B]/90 space-y-3 px-4">
            <p className="text-lg font-semibold text-[#FDF6E9]">
              No dishes match your current filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setSpiceFilter('All Flavors');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {filteredItems.map((item) => {
              const qty = cartQuantities[item.id] ?? 0;
              const isJustAdded = recentlyAddedId === item.id;
              const imgFailed = failedImages[item.id];
              const spiceCount = getSpiceCount(item.spice);

              return (
                <article
                  key={item.id}
                  className="group flex flex-col rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/95 border border-[#EAB344]/35 p-4 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C451]/75 shadow-2xl"
                >
                  <div className="relative aspect-[16/10] w-full bg-[#2E1910] overflow-hidden rounded-tl-[1.35rem] rounded-br-[1.35rem] sm:rounded-tl-[2.35rem] sm:rounded-br-[2.35rem] rounded-tr-lg rounded-bl-lg">
                    {imgFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#2E1910] to-[#452518] text-[#FDF6E9]">
                        <span className="text-base font-display font-semibold">
                          {item.name}
                        </span>
                        <span className="text-sm text-[#F5C451] mt-1">
                          {item.urduTag}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    )}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#120906]/85 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs sm:text-sm font-medium text-[#E6D7C3]">
                      <span>{item.category}</span>
                      <span className="font-mono tabular-nums text-[#F5C451]">
                        {item.prepTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between px-1 pt-5 pb-1 space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#C7B198]">
                        <span className="font-medium text-[#F5C451]">{item.urduTag}</span>
                        <span className="inline-flex items-center gap-1 shrink-0 text-[#F5C451] font-medium">
                          {Array.from({ length: 3 }).map((_, idx) => (
                            <Flame
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                idx < spiceCount ? 'text-[#EAB344]' : 'text-white/15'
                              }`}
                            />
                          ))}
                          <span className="ml-0.5">{item.spice}</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-2xl sm:text-[1.7rem] font-bold leading-snug text-[#FDF6E9]">
                          {item.name}
                        </h3>
                        {URDU_DISHES[item.id] && (
                          <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB344]">
                            {URDU_DISHES[item.id].name}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-[#F5C451]">
                        {getHealthFocus(item)}
                      </p>

                      <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
                        {item.description}
                      </p>

                      {URDU_DISHES[item.id] && (
                        <p lang="ur" className="font-urdu-body text-sm text-[#C7B198]">
                          {URDU_DISHES[item.id].tagline}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#EAB344]/20 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                      <p className="text-xl sm:text-3xl font-mono font-bold tabular-nums text-[#F5C451]">
                        Rs. {item.pricePkr.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2">
                        <a
                          href={buildSingleDishWhatsAppUrl(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/40 bg-[#140B07] text-xs sm:text-sm font-semibold text-[#F5C451] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>

                        {qty > 0 && onUpdateQty ? (
                          <div className="inline-flex items-center rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="px-2.5 sm:px-3 py-2 sm:py-2.5 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                              aria-label={`Remove one ${item.name}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-2.5 sm:px-3 text-xs sm:text-sm font-mono font-bold tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="px-2.5 sm:px-3 py-2 sm:py-2.5 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                              aria-label={`Add one more ${item.name}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAdd(item)}
                            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isJustAdded
                                ? 'bg-[#D4A23E] text-[#140B07]'
                                : 'bg-[#EAB344] text-[#140B07] hover:bg-[#F5C451]'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Added</span>
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
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
