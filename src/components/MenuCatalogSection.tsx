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
import {
  buildSingleDishWhatsAppUrl,
  getHealthFocus,
  getSpiceCount,
  MENU_CATEGORIES,
  MENU_ITEMS,
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
}

export function MenuCatalogSection({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  selectedCategory,
  onSelectCategory,
}: MenuCatalogSectionProps) {
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
    return MENU_ITEMS.filter((item) => {
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
  }, [activeCategory, spiceFilter, searchQuery]);

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
    <div className="relative z-10 text-[#FDF9EE]">
      <section
        id="our-promise"
        className="py-16"
        aria-label="Our Homemade Kitchen Promise"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/92 border border-[#EAB344]/35 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
                  Noor Zaiqa Junction · Ghar ka Zaiqa, Har Plate Mein
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-tight text-[#FDF9EE]"
                  style={{ textWrap: 'balance' }}
                >
                  Homestyle Masala Classics &amp; Sweets,{' '}
                  <span className="italic font-medium text-[#F5C451]">Cooked Fresh</span>{' '}
                  On Order.
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
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

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  Rs. 20+
                </p>
                <p className="text-sm font-semibold text-[#FDF9EE]">
                  Honest Family Rates
                </p>
                <p className="text-xs text-[#B2C1B7]">
                  Roti Rs. 20, Parathas Rs. 120, Boxes Rs. 300 &amp; 1 KG trays
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  100%
                </p>
                <p className="text-sm font-semibold text-[#FDF9EE]">
                  Ghar Ka Masala &amp; Taste
                </p>
                <p className="text-xs text-[#B2C1B7]">
                  Traditional spices, clean cooking oil &amp; zero preservatives
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  Custom
                </p>
                <p className="text-sm font-semibold text-[#FDF9EE]">Anything on Order</p>
                <p className="text-xs text-[#B2C1B7]">
                  In dishes ke ilawa bhi har item order par tayyar
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-display italic font-semibold tabular-nums text-[#F5C451]">
                  {MENU_ITEMS.length}
                </p>
                <p className="text-sm font-semibold text-[#FDF9EE]">
                  Special Menu Dishes
                </p>
                <p className="text-xs text-[#B2C1B7]">
                  Kababs, Curries, Biryani, Zarda, Chowmien &amp; Breads
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-20 space-y-12">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#08261C]/92 border border-[#EAB344]/35 p-7 sm:p-11 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
                Noor Zaiqa Junction Special Menu · {filteredItems.length} Dishes
              </p>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FDF9EE]">
                Ghar ka Zaiqa, Har Plate Mein
              </h2>
              <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
                بیف و چکن شامی کباب، اچاری، بریانی، قورمہ، آلو قیمہ، زردہ، متنجن، چاؤمین و دال چاول
              </p>
              <p className="text-xs sm:text-sm text-[#D8D3C2]">
                In Dishes Ke Ilawa Bhi Jo Aapko Banwana Ho, Wo Order Par Ban Jata Hai · WhatsApp 0371-2442688
              </p>
            </div>

            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-[#B2C1B7] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shami, biryani, qorma, zarda..."
                aria-label="Search menu items"
                className="w-full pl-11 pr-4 py-3 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#0B3024] border border-[#EAB344]/25 text-sm text-[#FDF9EE] placeholder:text-[#8CA396] focus:outline-none focus:border-[#EAB344]"
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#061C14] rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md border border-[#EAB344]/20">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count =
                  cat === 'All'
                    ? MENU_ITEMS.length
                    : MENU_ITEMS.filter((i) => i.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#EAB344] text-[#072118]'
                        : 'text-[#D8D3C2] hover:text-[#FDF9EE]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>{cat} ·</span>
                      <span lang="ur" className="font-urdu-inline text-[13px]">
                        {URDU_CATEGORIES[cat]}
                      </span>
                      <span>({count})</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {SPICE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceFilter(level)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    spiceFilter === level
                      ? 'bg-[#D4A23E] text-[#072118] font-bold border-[#F5C451]'
                      : 'bg-[#0B3024] text-[#D8D3C2] border-[#EAB344]/20 hover:border-[#EAB344]'
                  }`}
                >
                  {level !== 'All Flavors' && <Flame className="w-3.5 h-3.5" />}
                  <span className="inline-flex items-center gap-1.5">
                    <span>{level} ·</span>
                    <span lang="ur" className="font-urdu-inline text-[13px]">
                      {URDU_SPICE[level]}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {spotlight && (
          <article className="rounded-tl-[3.75rem] rounded-br-[3.75rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/95 border border-[#EAB344]/45 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 relative min-h-[270px] sm:min-h-[340px] bg-[#0B3024]">
              <img
                src={spotlight.image}
                alt={spotlight.name}
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061D15]/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute bottom-4 left-5 text-xs font-mono uppercase tracking-[0.16em] text-[#F5C451]">
                Special Menu Spotlight · {spotlight.category}
              </span>
            </div>

            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#F5C451]">
                  <span className="font-medium">{spotlight.urduTag}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-mono tabular-nums text-[#D8D3C2]">
                    <Clock className="w-3.5 h-3.5 text-[#EAB344]" />
                    {spotlight.prepTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <Flame
                        key={idx}
                        className={`w-3.5 h-3.5 ${
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
                  className="text-2xl sm:text-4xl font-semibold leading-tight text-[#FDF9EE]"
                  style={{ textWrap: 'balance' }}
                >
                  {spotlight.name}
                </h3>

                {URDU_DISHES[spotlight.id] && (
                  <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB344]">
                    {URDU_DISHES[spotlight.id].name}
                  </p>
                )}

                <p className="text-xs sm:text-sm font-semibold text-[#F5C451]">
                  Kitchen Standard: {getHealthFocus(spotlight)}
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
                  {spotlight.description}
                </p>

                {URDU_DISHES[spotlight.id] && (
                  <p lang="ur" className="font-urdu-body text-sm text-[#C4BFB0]">
                    {URDU_DISHES[spotlight.id].tagline}
                  </p>
                )}
              </div>

              <div className="pt-5 border-t border-[#EAB344]/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#B2C1B7]">Special Menu Rate</p>
                  <p className="text-2xl sm:text-3xl font-mono font-semibold tabular-nums text-[#F5C451]">
                    Rs. {spotlight.pricePkr.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buildSingleDishWhatsAppUrl(spotlight)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#0B3024] text-xs font-semibold text-[#F5C451] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleAdd(spotlight)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-bold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
          <div className="py-16 text-center rounded-tl-[3rem] rounded-br-[3rem] border border-[#EAB344]/25 bg-[#08261C]/90 space-y-3">
            <p className="text-base font-semibold text-[#FDF9EE]">
              No dishes match your current filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setSpiceFilter('All Flavors');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#EAB344] text-[#072118] text-xs font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-9">
            {filteredItems.map((item) => {
              const qty = cartQuantities[item.id] ?? 0;
              const isJustAdded = recentlyAddedId === item.id;
              const imgFailed = failedImages[item.id];
              const spiceCount = getSpiceCount(item.spice);

              return (
                <article
                  key={item.id}
                  className="group flex flex-col rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#08261C]/95 border border-[#EAB344]/30 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C451]/75 shadow-2xl"
                >
                  <div className="relative aspect-[4/3] w-full bg-[#0C3527] overflow-hidden rounded-tl-[2.35rem] rounded-br-[2.35rem] rounded-tr-lg rounded-bl-lg">
                    {imgFailed ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0B2E22] to-[#134736] text-[#FDF9EE]">
                        <span className="text-sm font-display font-semibold">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#F5C451] mt-1">
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
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#061E16]/85 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-medium text-[#EFE8D5]">
                      <span>{item.category}</span>
                      <span className="font-mono tabular-nums text-[#F5C451]">
                        {item.prepTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between px-2 pt-4 pb-1 space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#B2C1B7]">
                        <span className="truncate">{item.urduTag}</span>
                        <span className="inline-flex items-center gap-1 shrink-0 text-[#F5C451] font-medium">
                          {Array.from({ length: 3 }).map((_, idx) => (
                            <Flame
                              key={idx}
                              className={`w-3 h-3 ${
                                idx < spiceCount ? 'text-[#EAB344]' : 'text-white/15'
                              }`}
                            />
                          ))}
                          <span className="ml-0.5">{item.spice}</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold leading-snug text-[#FDF9EE]">
                        {item.name}
                      </h3>

                      {URDU_DISHES[item.id] && (
                        <p lang="ur" className="font-urdu text-lg text-[#EAB344]">
                          {URDU_DISHES[item.id].name}
                        </p>
                      )}

                      <p className="text-xs font-medium text-[#F5C451]">
                        {getHealthFocus(item)}
                      </p>

                      <p className="text-sm leading-relaxed text-[#D8D3C2]">
                        {item.description}
                      </p>

                      {URDU_DISHES[item.id] && (
                        <p lang="ur" className="font-urdu-body text-xs text-[#C4BFB0]">
                          {URDU_DISHES[item.id].tagline}
                        </p>
                      )}
                    </div>

                    <div className="pt-3.5 border-t border-[#EAB344]/15 flex items-center justify-between gap-2.5">
                      <p className="text-lg font-mono font-semibold tabular-nums text-[#F5C451]">
                        Rs. {item.pricePkr.toLocaleString()}
                      </p>

                      {qty > 0 && onUpdateQty ? (
                        <div className="inline-flex items-center rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="px-2.5 py-2 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                            aria-label={`Remove one ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="px-2.5 py-2 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                            aria-label={`Add one more ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#D4A23E] text-[#072118]'
                              : 'bg-[#EAB344] text-[#072118] hover:bg-[#F5C451]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
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
