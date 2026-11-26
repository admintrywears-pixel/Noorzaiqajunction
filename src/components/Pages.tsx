import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  HeartPulse,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import {
  BENEFIT_GOALS,
  buildInquiryWhatsAppUrl,
  COMPARISON_ROWS,
  CONTACT_DESKS,
  getHealthFocus,
  HEALTH_BENEFITS,
  HEALTH_SPOTLIGHT_IDS,
  IMAGE_ASSETS,
  PANTRY_INGREDIENTS,
  PRIVACY_SECTIONS,
  RESERVE_RITUALS,
  RESERVE_ZONES,
  STORY_TIMELINE,
  URDU_BENEFIT_GOALS,
  URDU_DISHES,
  URDU_HEALTH,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from '../data/menuData';
import type { CartEntry, Category, MenuItem, PageId } from '../types';
import { useCatalog } from '../context/CatalogContext';
import { CustomOrderForm } from './CustomOrderForm';
import { HealthBenefitsSection } from './HealthBenefitsSection';
import { HomeStorySection } from './HomeStorySection';
import { MenuCatalogSection } from './MenuCatalogSection';
import { OrbitalMenuWheel } from './OrbitalMenuWheel';
import { OrdersCheckoutSection } from './OrdersCheckoutSection';
import { PackedProductsSection } from './PackedProductsSection';
import { ReserveSection } from './ReserveSection';

export function HomePage({
  activeStage,
  entries,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  cartQuantities,
  onNavigate,
  onSecretUnlock,
}: {
  activeStage: number;
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
  onSecretUnlock?: () => void;
}) {
  const { dishes } = useCatalog();
  return (
    <>
      <HomeStorySection
        activeStage={activeStage}
        onJumpToMenu={() => onNavigate('menu')}
        onCustomOrder={() => onNavigate('reserve')}
        onSecretUnlock={onSecretUnlock}
      />

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <button
            type="button"
            onClick={() => onNavigate('health')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#F5C451]">
              01 · Hygienic Homemade
            </p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF6E9]">
                Hygiene &amp; Purity ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  صفائی
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C7B198]">
              Pure ghar ka masala, clean single-use oil &amp; fresh daily prep.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#EAB344]">
              02 · {dishes.length} Dishes
            </p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF6E9]">
                Special Menu ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  مینیو
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C7B198]">
              Shami Kabab, Biryani, Qorma, Achaari, Zarda, Chowmien &amp; Rotis.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#F5C451]">03 · Direct WhatsApp</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF6E9]">
                Orders ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  آرڈر
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C7B198]">
              Auto-attached dish photos straight to {WHATSAPP_DISPLAY}.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#EAB344]">04 · Custom Orders</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF6E9]">
                Order Par Tayyar ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  فرمائش
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C7B198]">
              In dishes ke ilawa bhi jo aapko banwana ho, order par ban jata hai.
            </p>
          </button>
        </div>
      </section>

      <HealthBenefitsSection onNavigate={onNavigate} />

      <MenuCatalogSection
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D96B27]/45 to-transparent" />
      </div>

      <PackedProductsSection
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
      />

      <OrdersCheckoutSection
        entries={entries}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
      />

      <ReserveSection />
    </>
  );
}

export function MenuPage({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  onNavigate,
}: {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');

  const jumpToFullCatalog = () => {
    document.getElementById('full-menu-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 text-[#FDF6E9] pt-16 pb-16">
      <OrbitalMenuWheel
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
        onJumpToGrid={jumpToFullCatalog}
      />

      <div id="full-menu-grid">
        <MenuCatalogSection
          onAddToCart={onAddToCart}
          onUpdateQty={onUpdateQty}
          cartQuantities={cartQuantities}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          showPromiseBanner={false}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-4 flex justify-center">
        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#EAB344] text-[#140B07] text-sm sm:text-base font-bold hover:bg-[#F5C451] transition-colors cursor-pointer text-center"
        >
          <span>Proceed to WhatsApp Orders Checkout</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}

export function ProductsPage({
  onAddToCart,
  onUpdateQty,
  cartQuantities,
  onNavigate,
}: {
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
}) {
  const { dishes, products } = useCatalog();
  return (
    <div className="relative z-10 text-[#FDF6E9] pb-16">
      <section className="min-h-[60vh] sm:min-h-[72vh] pt-24 sm:pt-28 pb-8 sm:pb-10 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 p-5 sm:p-8 lg:p-10 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/88 border border-[#D96B27]/40 shadow-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451]">
              Zaiqa Junction Packed Pantry · {products.length} Sealed Products
            </p>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              Kitchen Staples Packed{' '}
              <span className="italic font-medium text-[#F5C451]">Hygienically</span>{' '}
              for Home.
            </h1>
            <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
              تلی ہوئی پیاز، لہسن ادرک پیسٹ، ہری مرچ پیسٹ، فروزن پراٹھے، ٹماٹر پیوری، چٹنیاں اور دیسی اچار
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3] max-w-2xl">
              Separate from our cooked dishes menu: clean, preservative-free sealed
              pouches, glass jars, and freezer packs made fresh in Karachi so everyday
              cooking takes half the time with real ghar ka taste.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('packed-products')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Browse All {products.length} Packed Items</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#2E1910]/90 text-xs font-semibold text-[#FDF6E9] hover:border-[#F5C451] transition-colors cursor-pointer"
              >
                <span>View Cooked Dishes Menu ({dishes.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5C451] shrink-0" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 items-center">
            <div className="rounded-tl-[1.5rem] rounded-br-[1.5rem] sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl p-1.5 sm:p-2 border border-[#EAB344]/35 bg-[#21120B]/88 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-tl-[1.2rem] rounded-br-[1.2rem] sm:rounded-tl-[2rem] sm:rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.packFriedOnion}
                  alt="Crispy Fried Onion 250g Pouch"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="pt-2 pb-1 text-center text-[11px] sm:text-xs font-medium text-[#F5C451] truncate">
                Crispy Fried Onion · Rs. 350
              </p>
            </div>

            <div className="rounded-tr-[1.5rem] rounded-bl-[1.5rem] sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl p-1.5 sm:p-2 border border-[#D96B27]/45 bg-[#21120B]/92 sm:translate-y-4 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-tr-[1.2rem] rounded-bl-[1.2rem] sm:rounded-tr-[2rem] sm:rounded-bl-[2rem] rounded-tl-lg rounded-bl-lg bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.packGingerGarlic}
                  alt="Lehsan Adrak Paste 500g Jar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="pt-2 pb-1 text-center text-[11px] sm:text-xs font-medium text-[#FDF6E9] truncate">
                Lehsan Adrak Paste · Rs. 450
              </p>
            </div>

            <div className="rounded-tr-[1.5rem] rounded-bl-[1.5rem] sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl p-1.5 sm:p-2 border border-[#EAB344]/35 bg-[#21120B]/88 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-tr-[1.2rem] rounded-bl-[1.2rem] sm:rounded-tr-[2rem] sm:rounded-bl-[2rem] rounded-tl-lg rounded-br-lg bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.packFrozenParathay}
                  alt="Frozen Parathay 12 Pieces Pack"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="pt-2 pb-1 text-center text-[11px] sm:text-xs font-medium text-[#E6D7C3] truncate">
                Frozen Parathay (12) · Rs. 600
              </p>
            </div>

            <div className="rounded-tl-[1.5rem] rounded-br-[1.5rem] sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl p-1.5 sm:p-2 border border-[#D96B27]/45 bg-[#21120B]/92 sm:translate-y-4 shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden rounded-tl-[1.2rem] rounded-br-[1.2rem] sm:rounded-tl-[2rem] sm:rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.packDesiAchar}
                  alt="Homemade Desi Mix Achar 500g Jar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="pt-2 pb-1 text-center text-[11px] sm:text-xs font-medium text-[#F5C451] truncate">
                Desi Mix Achar · Rs. 550
              </p>
            </div>
          </div>
        </div>
      </section>

      <PackedProductsSection
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-4 flex justify-center">
        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#EAB344] text-[#140B07] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer text-center"
        >
          <span>Proceed to WhatsApp Orders Checkout</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}

const HEALTH_ICONS = [
  ShieldCheck,
  HeartPulse,
  Flame,
  Leaf,
  HeartPulse,
  ShieldCheck,
];

export function HealthPage({
  onAddToCart,
  cartQuantities,
  onNavigate,
}: {
  onAddToCart: (item: MenuItem) => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
}) {
  const { dishes } = useCatalog();
  const [goalFilter, setGoalFilter] = useState('All Standards');

  const filteredBenefits = useMemo(
    () =>
      goalFilter === 'All Standards'
        ? HEALTH_BENEFITS
        : HEALTH_BENEFITS.filter((b) => b.goal === goalFilter),
    [goalFilter]
  );

  const platePicks = useMemo(
    () =>
      HEALTH_SPOTLIGHT_IDS.map((id) => dishes.find((m) => m.id === id)).filter(
        (m): m is MenuItem => Boolean(m)
      ),
    [dishes]
  );

  return (
    <div className="relative z-10 text-[#FDF6E9] pb-20">
      <section className="min-h-[70vh] sm:min-h-[82vh] pt-24 sm:pt-28 pb-10 sm:pb-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 p-5 sm:p-8 lg:p-10 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/88 border border-[#EAB344]/30 shadow-2xl">
            <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451]">
              Kitchen Hygiene &amp; Ingredient Charter · Ghar Ka Khana
            </p>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              Real Homestyle Masala.{' '}
              <span className="italic font-medium text-[#F5C451]">
                Clean Kitchen
              </span>{' '}
              Standards.
            </h1>
            <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
              خالص گھر کے مصالحے، صاف تیل اور ہائجینک ماحول — ہر پلیٹ میں گھر جیسا ذائقہ
            </p>
            <p className="text-sm sm:text-lg leading-relaxed text-[#E6D7C3] max-w-2xl">
              Restaurant food often hurts your stomach not because of traditional spices,
              but because of stale reheated oil, artificial gravy thickeners, and bulk
              adulterants. At Zaiqa Junction, every dish uses pure ghar ka masala,
              fresh meat, and single-use cooking oil.
            </p>
            <p lang="ur" className="font-urdu-body text-sm text-[#C7B198] max-w-2xl">
              چکن اچاری، بریانی، قورمہ، آلو قیمہ، شامی کباب اور زردہ سب روزانہ صاف ستھرے
              طریقے سے تازہ آئل اور گھر کے اصلی مصالحوں سے تیار کیے جاتے ہیں۔
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10">
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#C7B198]">
                  Pure Home Spices &amp; Fresh Meat
                </p>
              </div>
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#EAB344] tabular-nums">
                  0%
                </p>
                <p className="text-xs text-[#C7B198]">Preservatives &amp; Stale Oil</p>
              </div>
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451] tabular-nums">
                  On Order
                </p>
                <p className="text-xs text-[#C7B198]">
                  Custom Spice &amp; Oil Requests
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Order From Special Menu</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello Zaiqa Junction Desk, please guide me on fresh/frozen meals and custom spice prep for my family.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#21120B]/90 text-xs font-medium text-[#FDF6E9] hover:border-[#F5C451] transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#F5C451] shrink-0" />
                <span>Custom Meal Guidance on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-t-[150px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl p-2 sm:p-2.5 border border-[#EAB344]/35 bg-[#21120B]/85 shadow-2xl">
              <div className="rounded-t-[140px] sm:rounded-t-[190px] rounded-b-xl sm:rounded-b-2xl overflow-hidden aspect-[4/4.2] bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.daalChawalKabab}
                  alt="Homestyle Daal Chawal + Shami Kabab Plate"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 space-y-6 sm:space-y-8">
        <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl sm:rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#0F0705] border border-white/10 w-full sm:w-fit max-w-full overflow-x-auto no-scrollbar">
          {BENEFIT_GOALS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => setGoalFilter(goal)}
              className={`px-3 sm:px-3.5 py-2 rounded-lg sm:rounded-tl-xl sm:rounded-br-xl sm:rounded-tr-sm sm:rounded-bl-sm text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                goalFilter === goal
                  ? 'bg-[#EAB344] text-[#140B07]'
                  : 'text-[#E6D7C3] hover:text-[#FDF6E9]'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span>{goal} ·</span>
                <span lang="ur" className="font-urdu-inline text-xs">
                  {URDU_BENEFIT_GOALS[goal]}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredBenefits.map((benefit, idx) => {
            const Icon = HEALTH_ICONS[idx % HEALTH_ICONS.length];
            const urdu = URDU_HEALTH[benefit.id];
            return (
              <article
                key={benefit.id}
                className="rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/92 border border-[#EAB344]/25 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-[#F5C451]">
                      <Icon className="w-4 h-4 text-[#EAB344]" />
                      {benefit.num} · {benefit.goal}
                    </span>
                    <span className="font-mono text-lg font-semibold tabular-nums text-[#EAB344]">
                      {benefit.metric}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-[#FDF6E9]">
                    {benefit.title}
                  </h2>
                  {urdu && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB344]">
                      {urdu.title}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed text-[#E6D7C3]">
                    {benefit.summary}
                  </p>
                  {urdu && (
                    <p lang="ur" className="font-urdu-body text-xs text-[#C7B198]">
                      {urdu.summary}
                    </p>
                  )}
                </div>
                <p className="pt-3 border-t border-white/10 text-xs text-[#C7B198]">
                  {benefit.unit} · {benefit.scienceNote}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/94 border border-[#EAB344]/30 p-5 sm:p-8 lg:p-11 space-y-6 sm:space-y-8 shadow-2xl">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Kitchen Quality Benchmark
            </p>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#FDF6E9]">
              Zaiqa Junction vs. Ordinary Commercial Food
            </h2>
          </div>

          <div className="space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.pillar}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#0F0705] border border-white/10 items-start"
              >
                <div className="lg:col-span-3">
                  <p className="text-sm font-semibold text-[#EAB344]">
                    {row.pillar}
                  </p>
                </div>
                <div className="lg:col-span-5 flex items-start gap-2.5 text-sm text-[#FDF6E9]">
                  <CheckCircle2 className="w-4 h-4 text-[#EAB344] shrink-0 mt-0.5" />
                  <span>{row.zaiqaStandard}</span>
                </div>
                <div className="lg:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-[#C7B198]">
                  <XCircle className="w-4 h-4 text-[#9E8468] shrink-0 mt-0.5" />
                  <span>{row.ordinaryRestaurant}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Hygienic Homemade Favorites
            </p>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#FDF6E9]">
              Fresh Dishes Cooked Cleanly on Order
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451] transition-colors whitespace-normal sm:whitespace-nowrap text-center shrink-0 cursor-pointer"
          >
            <span>Open Orders &amp; WhatsApp ({WHATSAPP_DISPLAY})</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {platePicks.map((item) => {
            const qty = cartQuantities[item.id] ?? 0;
            return (
              <article
                key={item.id}
                className="rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/92 border border-[#EAB344]/25 p-4 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/10] rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg overflow-hidden bg-[#2E1910]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium text-[#F5C451]">
                    {getHealthFocus(item)}
                  </p>
                  <h3 className="text-lg font-semibold text-[#FDF6E9]">
                    {item.name}
                  </h3>
                  {URDU_DISHES[item.id] && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB344]">
                      {URDU_DISHES[item.id].name}
                    </p>
                  )}
                  <p className="text-xs leading-relaxed text-[#E6D7C3]">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="font-mono text-base font-semibold tabular-nums text-[#EAB344]">
                    Rs. {item.pricePkr.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
                  >
                    {qty > 0 ? `Attached (${qty})` : 'Add Dish'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function OrdersPage({
  entries,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNavigate,
}: {
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageId) => void;
}) {
  const { dishes } = useCatalog();
  const ORDER_STEPS = useMemo(
    () => [
      {
        num: '01',
        title: 'Auto-Attached Dishes & Photos',
        body: `Every item added from our ${dishes.length}-dish Special Menu attaches automatically below with its dish photo, pack size, and live PKR subtotal.`,
      },
      {
        num: '02',
        title: 'Plus Any Custom Dish on Request',
        body: 'In dishes ke ilawa bhi jo aapko banwana ho, wo order par ban jata hai—simply mention it in the Custom Dish Instructions box or choose Karachi delivery.',
      },
      {
        num: '03',
        title: `Direct WhatsApp to ${WHATSAPP_DISPLAY}`,
        body: 'One click formats your itemized dishes, image references, and Karachi address straight into WhatsApp so we prepare your order fresh.',
      },
    ],
    [dishes.length]
  );

  return (
    <div className="relative z-10 text-[#FDF6E9] pb-16">
      <section className="min-h-[60vh] sm:min-h-[68vh] pt-24 sm:pt-28 pb-8 sm:pb-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl p-5 sm:p-8 lg:p-10 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/85 border border-[#EAB344]/30 shadow-2xl space-y-4 sm:space-y-5">
            <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451]">
              Direct Kitchen Dispatch · {WHATSAPP_DISPLAY}
            </p>
            <h1
              className="text-3xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              Order Homemade Zaiqa Junction Dishes on WhatsApp.
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
              Your selected dishes from our {dishes.length}-item Special Menu attach
              automatically below—plus you can request custom dishes made fresh to order
              via Call/WhatsApp 0371-2442688.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Browse {dishes.length}-Dish Menu</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/40 bg-[#21120B]/88 text-xs font-medium text-[#FDF6E9] hover:border-[#F5C451] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#F5C451] shrink-0" />
                <span>WhatsApp Desk: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <OrdersCheckoutSection
        entries={entries}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ORDER_STEPS.map((step) => (
            <article
              key={step.num}
              className="p-5 sm:p-6 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[2.25rem] sm:rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/88 border border-[#EAB344]/20 space-y-2.5"
            >
              <span className="font-display italic text-3xl font-semibold text-[#F5C451] tabular-nums">
                {step.num}
              </span>
              <h2 className="text-xl font-semibold text-[#FDF6E9]">{step.title}</h2>
              <p className="text-sm leading-relaxed text-[#E6D7C3]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function StoryPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="relative z-10 text-[#FDF6E9] pb-20">
      <section className="min-h-[70vh] sm:min-h-[86vh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451]">
              Our Story · Ghar ka Zaiqa, Har Plate Mein
            </p>
            <h1
              className="text-3xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              True Homemade Taste in{' '}
              <span className="italic font-medium text-[#F5C451]">Karachi</span>{' '}
              With Real Spices.
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed text-[#E6D7C3] max-w-2xl">
              Zaiqa Junction was founded on one honest promise: give every family,
              student, and office in Karachi authentic homemade food cooked with balanced
              traditional masalas—just the way Pakistani homes cook Biryani, Qorma, Achaari,
              Aalu Qeema, Shami Kabab, Daal Chawal, and Zarda every day.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#EAB344] text-[#140B07] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Explore Special Menu</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('reserve')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md border border-[#EAB344]/40 bg-[#21120B]/88 text-[#FDF6E9] text-sm font-medium hover:border-[#F5C451] transition-colors cursor-pointer"
              >
                Request Custom Dish on Order
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-t-[150px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl p-2.5 sm:p-3 border border-[#EAB344]/35 bg-[#21120B]/85 shadow-2xl">
              <div className="rounded-t-[140px] sm:rounded-t-[190px] rounded-b-xl sm:rounded-b-2xl overflow-hidden aspect-[4/4.2] bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.chickenQorma}
                  alt="Homemade Pakistani Chicken Qorma 1 KG"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 space-y-10 sm:space-y-20">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
            Homestyle Kitchen Craft
          </p>
          <h2 className="text-2xl sm:text-5xl font-semibold text-[#FDF6E9]">
            How Every Zaiqa Junction Dish Is Prepared
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {STORY_TIMELINE.map((step) => (
            <div
              key={step.num}
              className={`max-w-3xl p-5 sm:p-8 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/88 border border-[#EAB344]/25 shadow-xl space-y-3 ${
                step.align === 'right' ? 'ml-auto' : ''
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-4">
                <span className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451] tabular-nums">
                  {step.num}
                </span>
                <span className="text-xs font-mono text-[#EAB344]">{step.time}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#FDF6E9]">{step.title}</h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 space-y-6 sm:space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
            Authentic Home Pantry
          </p>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#FDF6E9]">
            Six Core Ingredients Behind Our Real Ghar Ka Zaiqa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PANTRY_INGREDIENTS.map((ing) => (
            <article
              key={ing.index}
              className="p-5 sm:p-6 rounded-tr-[1.75rem] rounded-bl-[1.75rem] sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl bg-[#21120B]/90 border border-[#EAB344]/22 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-xs text-[#F5C451]">{ing.index}</span>
                <span className="text-xs text-[#EAB344]">{ing.origin}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FDF6E9]">{ing.name}</h3>
              <p className="text-xs font-medium text-[#F5C451]">{ing.role}</p>
              <p className="text-sm leading-relaxed text-[#E6D7C3]">{ing.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ReservePage() {
  return (
    <div className="relative z-10 text-[#FDF6E9] pb-16 sm:pb-20">
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 p-5 sm:p-8 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/88 border border-[#EAB344]/30 shadow-2xl space-y-4">
              <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451]">
                Custom Dishes &amp; Dawat Trays · 0371-2442688
              </p>
              <h1
                className="text-2xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-[1.08] tracking-tight text-[#FDF6E9]"
                style={{ textWrap: 'balance' }}
              >
                In Dishes Ke Ilawa Bhi Jo Banwana Ho, Wo Order Par Ban Jata Hai.
              </h1>
              <p
                lang="ur"
                className="font-urdu text-lg sm:text-xl text-[#F5C451] leading-relaxed"
              >
                اپنی پسند کی کوئی بھی ہوم میڈ ڈش فارم بھر کر آرڈر کریں
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
                Need homemade Nihari, Karahi, Pulao, Haleem, Palak Gosht, or custom mild
                tiffin meals for your parents and kids? Fill the form right here to send
                your dish list directly on WhatsApp.
              </p>

              <div className="pt-3 border-t border-[#EAB344]/20 space-y-2 text-xs text-[#C7B198]">
                <p className="font-semibold text-[#F5C451] uppercase tracking-wider">
                  How Custom Order Works · آرڈر کا طریقہ
                </p>
                <p>1. Enter your Name, Mobile Number, Delivery/Pickup &amp; Address.</p>
                <p>2. Pick Custom Date &amp; Time and Add or Remove as many dishes as needed.</p>
                <p>3. Confirm directly on WhatsApp ({WHATSAPP_DISPLAY}).</p>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3rem] sm:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/95 border border-[#EAB344]/40 p-5 sm:p-8 shadow-2xl">
              <CustomOrderForm variant="page" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-6 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {RESERVE_ZONES.map((zoneCard) => (
            <article
              key={zoneCard.index}
              className="p-5 sm:p-6 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/90 border border-[#EAB344]/25 space-y-3 shadow-xl"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451]">
                  {zoneCard.index}
                </span>
                <span className="text-xs font-mono text-[#EAB344]">
                  {zoneCard.capacity}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-[#FDF6E9]">{zoneCard.name}</h2>
              <p className="text-sm text-[#E6D7C3]">{zoneCard.note}</p>
              <p className="text-xs text-[#C7B198] pt-2 border-t border-white/10">
                {zoneCard.perks}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {RESERVE_RITUALS.map((ritual) => (
            <article
              key={ritual.time}
              className="p-5 sm:p-6 rounded-tr-[1.75rem] rounded-bl-[1.75rem] sm:rounded-tr-[2.25rem] sm:rounded-bl-[2.25rem] rounded-tl-lg rounded-br-lg bg-[#21120B]/88 border border-[#EAB344]/25 space-y-2"
            >
              <p className="text-xs font-mono text-[#EAB344]">{ritual.time}</p>
              <h3 className="text-lg font-semibold text-[#FDF6E9]">{ritual.title}</h3>
              <p className="text-xs sm:text-sm text-[#E6D7C3] leading-relaxed">
                {ritual.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ContactPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Menu Order & Delivery');
  const [branch, setBranch] = useState('Karachi Kitchen Dispatch');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState<{ id: string; url: string } | null>(
    null
  );

  const isReady =
    name.trim().length > 0 && phone.trim().length > 0 && message.trim().length > 0;

  const liveUrl = useMemo(
    () =>
      buildInquiryWhatsAppUrl({
        name: name.trim() || 'Guest',
        phone: phone.trim() || 'Not provided',
        topic,
        branch,
        message: message.trim() || 'Hello Zaiqa Junction team',
      }),
    [name, phone, topic, branch, message]
  );

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) {
      setErrorMsg('Please enter your name, phone number, and message.');
      return;
    }
    setErrorMsg('');
    setSubmitted({
      id: `INQ-${Math.floor(1000 + Math.random() * 8999)}`,
      url: liveUrl,
    });
  };

  return (
    <div className="relative z-10 text-[#FDF6E9] pb-20">
      <section className="min-h-[60vh] sm:min-h-[78vh] pt-24 sm:pt-28 pb-10 sm:pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl p-5 sm:p-8 lg:p-11 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/84 border border-[#EAB344]/30 shadow-2xl space-y-4 sm:space-y-5">
            <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451]">
              Contact Zaiqa Junction™ · Karachi
            </p>
            <h1
              className="text-3xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              Call or WhatsApp {WHATSAPP_DISPLAY} for Fresh &amp; Custom Orders.
            </h1>
            <p className="text-sm sm:text-lg leading-relaxed text-[#E6D7C3]">
              Order any dish from our Special Menu or ask for custom homemade meals at{' '}
              <span className="font-mono text-[#EAB344]">{WHATSAPP_DISPLAY}</span>,
              or review our{' '}
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="text-[#F5C451] underline cursor-pointer"
              >
                Privacy Policy
              </button>
              .
            </p>
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/35 bg-[#21120B]/90 text-xs font-medium text-[#FDF6E9] hover:border-[#F5C451] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F5C451] shrink-0" />
                <span>Call: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CONTACT_DESKS.map((desk) => (
            <article
              key={desk.city}
              className="p-5 sm:p-6 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem] rounded-tr-lg rounded-bl-lg bg-[#21120B]/90 border border-[#EAB344]/25 space-y-3 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-[#FDF6E9]">{desk.city}</h2>
              <div className="space-y-2 text-xs text-[#E6D7C3]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F5C451] shrink-0 mt-0.5" />
                  <span>{desk.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F5C451] shrink-0" />
                  <span>{desk.hours}</span>
                </p>
                <p className="flex items-center gap-2 font-mono text-[#EAB344]">
                  <Phone className="w-3.5 h-3.5 text-[#F5C451] shrink-0" />
                  <span>{desk.phone}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-14">
        <div className="rounded-tr-[1.75rem] rounded-bl-[1.75rem] sm:rounded-tr-[3.5rem] sm:rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl sm:rounded-br-2xl bg-[#21120B]/92 border border-[#EAB344]/28 p-5 sm:p-8 lg:p-11 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center shadow-2xl">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Direct Kitchen Support
            </p>
            <h2 className="text-3xl font-semibold text-[#FDF6E9]">
              Custom Dish Requests, Daily Tiffins &amp; Dawat Orders
            </h2>
            <p className="text-sm leading-relaxed text-[#E6D7C3]">
              In dishes ke ilawa bhi jo aapko banwana ho, message us straight on{' '}
              <span className="font-mono text-[#EAB344]">{WHATSAPP_DISPLAY}</span> so we
              can prepare it fresh for your family.
            </p>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#0F0705] border border-[#EAB344]/35 space-y-4">
                <div className="flex items-center gap-2.5 text-[#F5C451]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Inquiry Formatted</p>
                    <h3 className="text-xl font-semibold text-[#FDF6E9]">
                      {submitted.id}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#E6D7C3]">
                  Your message for {branch} ({topic}) is ready to send via WhatsApp.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={submitted.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setMessage('');
                    }}
                    className="px-4 py-3 rounded-lg border border-white/15 text-xs text-[#FDF6E9] hover:border-[#EAB344] cursor-pointer"
                  >
                    New Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C7B198] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C7B198] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C7B198] mb-1">
                      Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Menu Order &amp; Delivery</option>
                      <option>Custom Dish Request (Outside Menu)</option>
                      <option>Frozen Shami Kabab Trays</option>
                      <option>Family Dawat / Office Lunch</option>
                      <option>Privacy &amp; Data Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C7B198] mb-1">
                      Service Desk
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Karachi Kitchen Dispatch</option>
                      <option>Dawat &amp; Bulk Order Desk</option>
                      <option>Frozen Food Order Desk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C7B198] mb-1">
                    Message / Custom Dish Details
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write what dish you want cooked on order, spice level, or delivery question..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Inquiry on WhatsApp ({WHATSAPP_DISPLAY})</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export function PrivacyPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="relative z-10 text-[#FDF6E9] pb-20">
      <section className="min-h-[58vh] sm:min-h-[68vh] pt-24 sm:pt-28 pb-8 sm:pb-12 flex items-center">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="p-5 sm:p-8 lg:p-11 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/86 border border-[#EAB344]/30 shadow-2xl space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2.5 text-[#F5C451]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p className="text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase">
                Privacy Policy · Updated November 2026
              </p>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#FDF6E9]"
              style={{ textWrap: 'balance' }}
            >
              Your Order Details Stay Strictly Between Your Home &amp; Our Kitchen.
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3] max-w-3xl">
              Zaiqa Junction™ is committed to transparent, zero-spam guest
              privacy. Below is exactly how we handle order information, WhatsApp
              dispatch, browser storage, and your rights.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {PRIVACY_SECTIONS.map((sec) => (
          <article
            key={sec.num}
            className="p-5 sm:p-8 rounded-tr-[1.75rem] rounded-bl-[1.75rem] sm:rounded-tr-[3rem] sm:rounded-bl-[3rem] rounded-tl-xl rounded-br-xl bg-[#21120B]/88 border border-[#EAB344]/22 shadow-xl space-y-3"
          >
            <div className="flex items-baseline gap-3 sm:gap-4">
              <span className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451] tabular-nums">
                {sec.num}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#FDF6E9]">{sec.title}</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
              {sec.body}
            </p>
          </article>
        ))}

        <div className="p-5 sm:p-7 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#21120B]/90 border border-[#EAB344]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#FDF6E9]">
              Questions About Our Privacy Practices?
            </p>
            <p className="text-xs text-[#C7B198]">
              Reach our Guest Care &amp; Privacy Desk via Contact Us or WhatsApp{' '}
              {WHATSAPP_DISPLAY}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-xs font-semibold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open Contact Us Page
          </button>
        </div>
      </section>
    </div>
  );
}
