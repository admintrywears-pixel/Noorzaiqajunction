import {
  Check,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import {
  buildSinglePackedWhatsAppUrl,
  PACKED_CATEGORIES,
  packedToCartItem,
  URDU_PACKED_CATEGORIES,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from '../data/menuData';
import type { MenuItem, PackedCategory, PackedProduct } from '../types';

interface PackedProductsSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty?: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
}

export function PackedProductsSection({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
}: PackedProductsSectionProps) {
  const { products } = useCatalog();
  const [selectedCategory, setSelectedCategory] =
    useState<PackedCategory>('All Packs');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      if (
        selectedCategory !== 'All Packs' &&
        product.category !== selectedCategory
      ) {
        return false;
      }
      if (
        q &&
        !product.name.toLowerCase().includes(q) &&
        !product.urduTag.toLowerCase().includes(q) &&
        !product.description.toLowerCase().includes(q) &&
        !product.packSize.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleAdd = (product: PackedProduct) => {
    onAddToCart(packedToCartItem(product));
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 900);
  };

  return (
    <section
      id="packed-products"
      aria-label="Zaiqa Junction Packed Food Products"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 space-y-8 sm:space-y-10 text-[#FDF6E9]"
    >
      <div className="rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#1C0F0A]/95 border border-[#D96B27]/45 p-4 sm:p-7 lg:p-11 shadow-2xl space-y-6 sm:space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
          <div className="space-y-2 sm:space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F5C451]">
              <PackageCheck className="w-4 h-4 text-[#D96B27] shrink-0" />
              <span>
                Separate Packed Pantry List · {filteredProducts.length} Sealed Products
              </span>
            </div>
            <h2
              className="text-2xl sm:text-5xl font-semibold tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              Homemade Packed Food Essentials
            </h2>
            <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
              تلی ہوئی پیاز، لہسن ادرک پیسٹ، فروزن پراٹھے، چٹنیاں، اچار اور خالص مصالحے — ڈشز سے الگ پیکڈ فہرست
            </p>
            <p className="text-xs sm:text-sm text-[#E6D7C3] leading-relaxed">
              Listed separately from our cooked dishes menu: clean, preservative-free
              jars, zip pouches, and freezer-ready kitchen staples prepared in small
              homemade batches for everyday Pakistani cooking.
            </p>
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#C7B198] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search onion, paste, achar, paratha..."
              aria-label="Search packed products"
              className="w-full pl-11 pr-4 py-3 rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#2E1910] border border-[#D96B27]/35 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#F5C451]"
            />
          </div>
        </div>

        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 p-1.5 bg-[#0F0705] rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md border border-[#EAB344]/20 w-full sm:w-fit max-w-full overflow-x-auto no-scrollbar">
          {PACKED_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === 'All Packs'
                ? products.length
                : products.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-3.5 py-2 rounded-lg sm:rounded-tl-xl sm:rounded-br-xl sm:rounded-tr-sm sm:rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#D96B27] text-[#FDF6E9]'
                    : 'text-[#E6D7C3] hover:text-[#FDF6E9]'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>{cat} ·</span>
                  <span lang="ur" className="font-urdu-inline text-[13px]">
                    {URDU_PACKED_CATEGORIES[cat]}
                  </span>
                  <span>({count})</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-14 text-center rounded-tl-[2rem] rounded-br-[2rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] border border-[#EAB344]/25 bg-[#21120B]/90 space-y-3 px-4">
          <p className="text-base font-semibold text-[#FDF6E9]">
            No packed products match your filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Packs');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
          >
            Show All Packed Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {filteredProducts.map((product) => {
            const qty = cartQuantities[product.id] ?? 0;
            const isJustAdded = recentlyAddedId === product.id;
            const imgFailed = failedImages[product.id];

            return (
              <article
                key={product.id}
                className="group flex flex-col rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl bg-[#21120B]/95 border border-[#D96B27]/35 p-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C451]/75 shadow-2xl"
              >
                <div className="relative aspect-[4/3] w-full bg-[#2E1910] overflow-hidden rounded-tr-[2rem] rounded-bl-[2rem] rounded-tl-lg rounded-br-lg">
                  {imgFailed ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center bg-gradient-to-br from-[#2E1910] to-[#452518] text-[#FDF6E9]">
                      <PackageCheck className="w-7 h-7 text-[#F5C451] mb-2" />
                      <span className="text-sm font-display font-semibold">
                        {product.name}
                      </span>
                      <span className="text-xs text-[#F5C451] mt-1">
                        {product.packSize}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  )}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#120906]/90 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-[#E6D7C3]">
                    <span className="truncate">{product.category}</span>
                    <span className="font-mono tabular-nums text-[#F5C451] shrink-0">
                      {product.packSize}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between px-1.5 pt-3.5 pb-1 space-y-3.5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#C7B198]">
                      <span className="truncate">{product.shelfLife}</span>
                      <span className="inline-flex items-center gap-1 text-[#F5C451] shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Sealed</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold leading-snug text-[#FDF6E9]">
                      {product.name}
                    </h3>

                    <p lang="ur" className="font-urdu text-base text-[#EAB344]">
                      {product.urduName}
                    </p>

                    <p className="text-[11px] font-medium text-[#F5C451]">
                      {product.purityNote}
                    </p>

                    <p className="text-xs leading-relaxed text-[#E6D7C3]">
                      {product.description}
                    </p>

                    <p lang="ur" className="font-urdu-body text-xs text-[#C7B198]">
                      {product.urduSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EAB344]/15 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-lg font-mono font-semibold tabular-nums text-[#F5C451]">
                        Rs. {product.pricePkr.toLocaleString()}
                      </p>

                      {qty > 0 && onUpdateQty ? (
                        <div className="inline-flex items-center rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, -1)}
                            className="px-2 py-1.5 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                            aria-label={`Remove one ${product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, 1)}
                            className="px-2 py-1.5 hover:bg-[#D4A23E] transition-colors cursor-pointer"
                            aria-label={`Add one more ${product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#D4A23E] text-[#140B07]'
                              : 'bg-[#EAB344] text-[#140B07] hover:bg-[#F5C451]'
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
                              <span>Add Pack</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <a
                      href={buildSinglePackedWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#EAB344]/30 bg-[#140B07] text-[11px] font-medium text-[#E6D7C3] hover:border-[#F5C451] hover:text-[#F5C451] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#F5C451]" />
                      <span>Direct Pack Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="rounded-tl-[1.5rem] rounded-br-[1.5rem] sm:rounded-tl-[2.25rem] sm:rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/92 border border-[#EAB344]/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#FDF6E9]">
            Need Bulk Monthly Pantry Packs, Ramadan Prep, or Custom Weight Jars?
          </p>
          <p className="text-xs text-[#C7B198]">
            1 KG Fried Onion, Lehsan Adrak Paste, Hari Mirch Paste, Frozen Parathay &amp;
            custom masala packs sealed on order in Karachi.
          </p>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            'Hello Zaiqa Junction, I want to order bulk/custom Packed Pantry products (Fried Onion / Lehsan Adrak Paste / Frozen Parathay).'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#D96B27] text-[#FDF6E9] text-xs font-bold hover:bg-[#EAB344] hover:text-[#140B07] transition-colors whitespace-normal sm:whitespace-nowrap text-center shrink-0"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Bulk Pack Order ({WHATSAPP_DISPLAY})</span>
        </a>
      </div>
    </section>
  );
}
