import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  HeartPulse,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import {
  BENEFIT_GOALS,
  BRANCHES,
  buildInquiryWhatsAppUrl,
  CATEGORY_SHOWCASE,
  COMPARISON_ROWS,
  CONTACT_DESKS,
  getHealthFocus,
  HEALTH_BENEFITS,
  HEALTH_SPOTLIGHT_IDS,
  IMAGE_ASSETS,
  MENU_ITEMS,
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
import { HealthBenefitsSection } from './HealthBenefitsSection';
import { HomeStorySection } from './HomeStorySection';
import { MenuCatalogSection } from './MenuCatalogSection';
import { OrbitalMenuWheel } from './OrbitalMenuWheel';
import { OrdersCheckoutSection } from './OrdersCheckoutSection';
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
}: {
  activeStage: number;
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  cartQuantities: Record<string, number>;
  onNavigate: (page: PageId) => void;
}) {
  return (
    <>
      <HomeStorySection
        activeStage={activeStage}
        onJumpToMenu={() => onNavigate('menu')}
      />

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <button
            type="button"
            onClick={() => onNavigate('health')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#08281D]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#F5C451]">
              01 · Hygienic Homemade
            </p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF9EE]">
                Hygiene &amp; Purity ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  صفائی
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C4BFB0]">
              Pure ghar ka masala, clean single-use oil &amp; fresh daily prep.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#08281D]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#EAB344]">
              02 · {MENU_ITEMS.length} Dishes
            </p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF9EE]">
                Special Menu ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  مینیو
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C4BFB0]">
              Shami Kabab, Biryani, Qorma, Achaari, Zarda, Chowmien &amp; Rotis.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#08281D]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#F5C451]">03 · Direct WhatsApp</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF9EE]">
                Orders ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  آرڈر
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C4BFB0]">
              Auto-attached dish photos straight to {WHATSAPP_DISPLAY}.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="group text-left p-5 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg bg-[#08281D]/88 border border-[#EAB344]/25 hover:border-[#F5C451] transition-colors cursor-pointer space-y-1.5"
          >
            <p className="text-xs font-mono text-[#EAB344]">04 · Custom Orders</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-[#FDF9EE]">
                Order Par Tayyar ·{' '}
                <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                  فرمائش
                </span>
              </h3>
              <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-[#C4BFB0]">
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

  const categorySummaries = useMemo(
    () =>
      CATEGORY_SHOWCASE.map((c) => {
        const list = MENU_ITEMS.filter((i) => i.category === c.category);
        const minPrice = list.reduce((min, i) => Math.min(min, i.pricePkr), Infinity);
        return {
          ...c,
          count: list.length,
          minPrice: Number.isFinite(minPrice) ? minPrice : 0,
        };
      }),
    []
  );

  const jumpToWheel = (cat?: Category) => {
    if (cat) setSelectedCategory(cat);
    document.getElementById('orbital-wheel')?.scrollIntoView({ behavior: 'smooth' });
  };

  const jumpToFullCatalog = () => {
    document.getElementById('full-menu-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 text-[#FDF9EE] pb-16">
      <section className="min-h-[78vh] pt-28 pb-12 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 p-7 sm:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/85 border border-[#EAB344]/30 shadow-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
                Noor Zaiqa Junction Special Menu · {MENU_ITEMS.length} Dishes
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#FDF9EE]"
                style={{ textWrap: 'balance' }}
              >
                Ghar ka{' '}
                <span className="italic font-medium text-[#F5C451]">
                  Zaiqa
                </span>
                , Har Plate Mein.
              </h1>
              <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB344]">
                بیف و چکن شامی کباب، چکن اچاری، بریانی، قورمہ، آلو قیمہ، زردہ، متنجن، چکن چاؤمین، دال چاول، روٹی اور آلو کا پراٹھا
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2] max-w-2xl">
                Every dish is cooked fresh in Karachi with balanced traditional Pakistani
                masalas, pure spices, and clean cooking oil—available in full 1 KG trays,
                12-piece kabab boxes, or single meal plates. In dishes ke ilawa bhi jo
                aapko banwana ho, wo order par ban jata hai!
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => jumpToWheel()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
                >
                  <span>Spin 3D Orbital Wheel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={jumpToFullCatalog}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#0B2E22]/90 text-xs font-semibold text-[#FDF9EE] hover:border-[#F5C451] transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>Browse All {MENU_ITEMS.length} Special Menu Rates ·</span>
                    <span lang="ur" className="font-urdu-inline text-sm text-[#EAB344]">
                      مکمل فہرست
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5C451]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3.5 items-end">
              <button
                type="button"
                onClick={() => jumpToWheel('Homemade Curries & Biryani')}
                className="group text-left rounded-t-[110px] rounded-b-2xl p-1.5 border border-[#EAB344]/35 bg-[#08281D]/85 hover:border-[#F5C451] transition-colors cursor-pointer"
              >
                <div className="aspect-[3/4.3] overflow-hidden rounded-t-[100px] rounded-b-xl bg-[#0B3024]">
                  <img
                    src={IMAGE_ASSETS.chickenAchaari}
                    alt="Chicken Achaari 1 KG"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="pt-2 pb-1 text-center text-[11px] font-medium text-[#D8D3C2] truncate">
                  Achaari &amp; Qorma
                </p>
              </button>

              <button
                type="button"
                onClick={() => jumpToWheel('Shami Kababs')}
                className="group text-left rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg p-1.5 border border-[#EAB344]/45 bg-[#08281D]/90 -translate-y-4 hover:border-[#EAB344] transition-colors cursor-pointer shadow-2xl"
              >
                <div className="aspect-[3/4.5] overflow-hidden rounded-tl-[1.85rem] rounded-br-[1.85rem] rounded-tr-md rounded-bl-md bg-[#0B3024]">
                  <img
                    src={IMAGE_ASSETS.beefShami}
                    alt="Beef & Chicken Shami Kabab 12 Pieces"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="pt-2 pb-1 text-center text-[11px] font-semibold text-[#EAB344] truncate">
                  Shami Kababs
                </p>
              </button>

              <button
                type="button"
                onClick={() => jumpToWheel('Desserts (Meetha)')}
                className="group text-left rounded-t-[110px] rounded-b-2xl p-1.5 border border-[#EAB344]/35 bg-[#08281D]/85 hover:border-[#F5C451] transition-colors cursor-pointer"
              >
                <div className="aspect-[3/4.3] overflow-hidden rounded-t-[100px] rounded-b-xl bg-[#0B3024]">
                  <img
                    src={IMAGE_ASSETS.mutanjanZarda}
                    alt="Mutanjan & Zarda 1 KG"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="pt-2 pb-1 text-center text-[11px] font-medium text-[#D8D3C2] truncate">
                  Zarda &amp; Mutanjan
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {categorySummaries.map((cat) => {
              const active = selectedCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => jumpToWheel(cat.category)}
                  className={`group text-left p-3 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg border transition-all cursor-pointer flex items-center gap-3 ${
                    active
                      ? 'bg-[#0B2E22]/95 border-[#F5C451] shadow-xl'
                      : 'bg-[#08261C]/88 border-[#EAB344]/25 hover:border-[#F5C451]/70'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.category}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm object-cover shrink-0 bg-[#0B3024]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#FDF9EE] truncate">
                      {cat.category}
                    </p>
                    <p className="text-[11px] text-[#F5C451] truncate">
                      {cat.count} items · Rs. {cat.minPrice}+
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <OrbitalMenuWheel
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={onAddToCart}
        onUpdateQty={onUpdateQty}
        cartQuantities={cartQuantities}
      />

      <div id="full-menu-grid">
        <MenuCatalogSection
          onAddToCart={onAddToCart}
          onUpdateQty={onUpdateQty}
          cartQuantities={cartQuantities}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-4 flex justify-center">
        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#EAB344] text-[#072118] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
        >
          <span>Proceed to WhatsApp Orders Checkout</span>
          <ArrowRight className="w-4 h-4" />
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
      HEALTH_SPOTLIGHT_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(
        (m): m is MenuItem => Boolean(m)
      ),
    []
  );

  return (
    <div className="relative z-10 text-[#FDF9EE] pb-20">
      <section className="min-h-[82vh] pt-28 pb-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 p-7 sm:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/88 border border-[#EAB344]/30 shadow-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Kitchen Hygiene &amp; Ingredient Charter · Ghar Ka Khana
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              Real Homestyle Masala.{' '}
              <span className="italic font-medium text-[#F5C451]">
                Clean Kitchen
              </span>{' '}
              Standards.
            </h1>
            <p lang="ur" className="font-urdu text-xl sm:text-2xl text-[#EAB344]">
              خالص گھر کے مصالحے، صاف تیل اور ہائجینک ماحول — ہر پلیٹ میں گھر جیسا ذائقہ
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#D8D3C2] max-w-2xl">
              Restaurant food often hurts your stomach not because of traditional spices,
              but because of stale reheated oil, artificial gravy thickeners, and bulk
              adulterants. At Noor Zaiqa Junction, every dish uses pure ghar ka masala,
              fresh meat, and single-use cooking oil.
            </p>
            <p lang="ur" className="font-urdu-body text-sm text-[#C4BFB0] max-w-2xl">
              چکن اچاری، بریانی، قورمہ، آلو قیمہ، شامی کباب اور زردہ سب روزانہ صاف ستھرے
              طریقے سے تازہ آئل اور گھر کے اصلی مصالحوں سے تیار کیے جاتے ہیں۔
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#A8A292]">
                  Pure Home Spices &amp; Fresh Meat
                </p>
              </div>
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#EAB344] tabular-nums">
                  0%
                </p>
                <p className="text-xs text-[#A8A292]">Preservatives &amp; Stale Oil</p>
              </div>
              <div>
                <p className="font-display italic text-2xl sm:text-3xl font-semibold text-[#F5C451] tabular-nums">
                  On Order
                </p>
                <p className="text-xs text-[#A8A292]">
                  Custom Spice &amp; Oil Requests
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Order From Special Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello Noor Zaiqa Junction Desk, please guide me on fresh/frozen meals and custom spice prep for my family.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/45 bg-[#08281D]/90 text-xs font-medium text-[#FDF9EE] hover:border-[#F5C451] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#F5C451]" />
                <span>Custom Meal Guidance on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#EAB344]/35 bg-[#08261C]/85 shadow-2xl">
              <div className="rounded-t-[190px] rounded-b-2xl overflow-hidden aspect-[4/4.2] bg-[#0B3024]">
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

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-8">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#051811] border border-white/10 w-fit">
          {BENEFIT_GOALS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => setGoalFilter(goal)}
              className={`px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-semibold transition-colors cursor-pointer ${
                goalFilter === goal
                  ? 'bg-[#EAB344] text-[#072118]'
                  : 'text-[#D8D3C2] hover:text-[#FDF9EE]'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBenefits.map((benefit, idx) => {
            const Icon = HEALTH_ICONS[idx % HEALTH_ICONS.length];
            const urdu = URDU_HEALTH[benefit.id];
            return (
              <article
                key={benefit.id}
                className="rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#08261C]/92 border border-[#EAB344]/25 p-6 flex flex-col justify-between space-y-4 shadow-xl"
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
                  <h2 className="text-xl font-semibold text-[#FDF9EE]">
                    {benefit.title}
                  </h2>
                  {urdu && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB344]">
                      {urdu.title}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed text-[#D8D3C2]">
                    {benefit.summary}
                  </p>
                  {urdu && (
                    <p lang="ur" className="font-urdu-body text-xs text-[#C4BFB0]">
                      {urdu.summary}
                    </p>
                  )}
                </div>
                <p className="pt-3 border-t border-white/10 text-xs text-[#A8A292]">
                  {benefit.unit} · {benefit.scienceNote}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/94 border border-[#EAB344]/30 p-7 sm:p-11 space-y-8 shadow-2xl">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Kitchen Quality Benchmark
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#FDF9EE]">
              Noor Zaiqa Junction vs. Ordinary Commercial Food
            </h2>
          </div>

          <div className="space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.pillar}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-5 rounded-2xl bg-[#061C14] border border-white/10 items-start"
              >
                <div className="lg:col-span-3">
                  <p className="text-sm font-semibold text-[#EAB344]">
                    {row.pillar}
                  </p>
                </div>
                <div className="lg:col-span-5 flex items-start gap-2.5 text-sm text-[#FDF9EE]">
                  <CheckCircle2 className="w-4 h-4 text-[#EAB344] shrink-0 mt-0.5" />
                  <span>{row.zaiqaStandard}</span>
                </div>
                <div className="lg:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-[#A8A292]">
                  <XCircle className="w-4 h-4 text-[#7E9689] shrink-0 mt-0.5" />
                  <span>{row.ordinaryRestaurant}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Hygienic Homemade Favorites
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#FDF9EE]">
              Fresh Dishes Cooked Cleanly on Order
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('orders')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Orders &amp; WhatsApp ({WHATSAPP_DISPLAY})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {platePicks.map((item) => {
            const qty = cartQuantities[item.id] ?? 0;
            return (
              <article
                key={item.id}
                className="rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#08261C]/92 border border-[#EAB344]/25 p-4 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/10] rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg overflow-hidden bg-[#0B3024]">
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
                  <h3 className="text-lg font-semibold text-[#FDF9EE]">
                    {item.name}
                  </h3>
                  {URDU_DISHES[item.id] && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB344]">
                      {URDU_DISHES[item.id].name}
                    </p>
                  )}
                  <p className="text-xs leading-relaxed text-[#D8D3C2]">
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
                    className="px-4 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
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

const ORDER_STEPS = [
  {
    num: '01',
    title: 'Auto-Attached Dishes & Photos',
    body: `Every item added from our ${MENU_ITEMS.length}-dish Special Menu attaches automatically below with its dish photo, pack size, and live PKR subtotal.`,
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
];

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
  return (
    <div className="relative z-10 text-[#FDF9EE] pb-16">
      <section className="min-h-[68vh] pt-28 pb-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-10 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/85 border border-[#EAB344]/30 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Direct Kitchen Dispatch · {WHATSAPP_DISPLAY}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              Order Homemade Noor Zaiqa Junction Dishes on WhatsApp.
            </h1>
            <p className="text-base leading-relaxed text-[#D8D3C2]">
              Your selected dishes from our {MENU_ITEMS.length}-item Special Menu attach
              automatically below—plus you can request custom dishes made fresh to order
              via Call/WhatsApp 0371-2442688.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Browse {MENU_ITEMS.length}-Dish Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/40 bg-[#08281D]/88 text-xs font-medium text-[#FDF9EE] hover:border-[#F5C451] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#F5C451]" />
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

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ORDER_STEPS.map((step) => (
            <article
              key={step.num}
              className="p-6 rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#08261C]/88 border border-[#EAB344]/20 space-y-2.5"
            >
              <span className="font-display italic text-3xl font-semibold text-[#F5C451] tabular-nums">
                {step.num}
              </span>
              <h2 className="text-xl font-semibold text-[#FDF9EE]">{step.title}</h2>
              <p className="text-sm leading-relaxed text-[#D8D3C2]">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function StoryPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="relative z-10 text-[#FDF9EE] pb-20">
      <section className="min-h-[86vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Our Story · Ghar ka Zaiqa, Har Plate Mein
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              True Homemade Taste in{' '}
              <span className="italic font-medium text-[#F5C451]">Karachi</span>{' '}
              With Real Spices.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#D8D3C2] max-w-2xl">
              Noor Zaiqa Junction was founded on one honest promise: give every family,
              student, and office in Karachi authentic homemade food cooked with balanced
              traditional masalas—just the way Pakistani homes cook Biryani, Qorma, Achaari,
              Aalu Qeema, Shami Kabab, Daal Chawal, and Zarda every day.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#EAB344] text-[#072118] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                <span>Explore Special Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('reserve')}
                className="inline-flex items-center px-6 py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md border border-[#EAB344]/40 bg-[#08281D]/88 text-[#FDF9EE] text-sm font-medium hover:border-[#F5C451] transition-colors cursor-pointer"
              >
                Request Custom Dish on Order
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-t-[200px] rounded-b-3xl p-3 border border-[#EAB344]/35 bg-[#08261C]/85 shadow-2xl">
              <div className="rounded-t-[190px] rounded-b-2xl overflow-hidden aspect-[4/4.2] bg-[#0B3024]">
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

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-20">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
            Homestyle Kitchen Craft
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#FDF9EE]">
            How Every Noor Zaiqa Junction Dish Is Prepared
          </h2>
        </div>

        <div className="space-y-10">
          {STORY_TIMELINE.map((step) => (
            <div
              key={step.num}
              className={`max-w-3xl p-7 sm:p-9 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-[#08261C]/88 border border-[#EAB344]/25 shadow-xl space-y-3 ${
                step.align === 'right' ? 'ml-auto' : ''
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display italic text-3xl font-semibold text-[#F5C451] tabular-nums">
                  {step.num}
                </span>
                <span className="text-xs font-mono text-[#EAB344]">{step.time}</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#FDF9EE]">{step.title}</h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
            Authentic Home Pantry
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#FDF9EE]">
            Six Core Ingredients Behind Our Real Ghar Ka Zaiqa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PANTRY_INGREDIENTS.map((ing) => (
            <article
              key={ing.index}
              className="p-6 rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl bg-[#08261C]/90 border border-[#EAB344]/22 space-y-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-xs text-[#F5C451]">{ing.index}</span>
                <span className="text-xs text-[#EAB344]">{ing.origin}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#FDF9EE]">{ing.name}</h3>
              <p className="text-xs font-medium text-[#F5C451]">{ing.role}</p>
              <p className="text-sm leading-relaxed text-[#D8D3C2]">{ing.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function BranchesPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [name, setName] = useState('');
  const [hub, setHub] = useState('Karachi Home Delivery');
  const [style, setStyle] = useState('Family Dawat Pots (1 KG+)');
  const [guests, setGuests] = useState('10 – 25 Guests');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [catRef, setCatRef] = useState<{ id: string; url: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErr('Please enter your name or company and contact number.');
      return;
    }
    setErr('');
    const id = `NZJ-${Math.floor(2000 + Math.random() * 7999)}`;
    const url = buildInquiryWhatsAppUrl({
      name: name.trim(),
      phone: phone.trim(),
      topic: `${style} (${guests})`,
      branch: hub,
      message: `Custom Catering / Dawat Request (${id}): ${style} for ${guests} in ${hub}.`,
    });
    setCatRef({ id, url });
  };

  return (
    <div className="relative z-10 text-[#FDF9EE] pb-20">
      <section className="min-h-[84vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/82 border border-[#EAB344]/25 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Karachi Kitchen Dispatch · Fresh &amp; Frozen
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              Karachi Home Delivery, Daily Boxes &amp; Custom Dawats.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#D8D3C2]">
              From 1 KG Biryani, Chicken Qorma, Aalu Qeema, and Zarda trays to 12-piece
              Shami Kabab packs and daily Rs. 300 meal plates—we cook hygienically on
              order across Karachi.
            </p>
            <div className="pt-2 flex flex-wrap gap-6 text-xs text-[#F5C451] font-mono">
              <span>01 · Karachi Central</span>
              <span>02 · Daily Boxes</span>
              <span>03 · Custom Orders</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-28">
        {BRANCHES.map((branch) => (
          <div key={branch.city} className="min-h-[64vh] flex items-center">
            <article className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div
                className={`lg:col-span-6 ${
                  branch.align === 'right' ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-xl rounded-bl-xl p-2.5 bg-[#08261C]/85 border border-[#EAB344]/30 shadow-2xl">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-tl-[2.75rem] rounded-br-[2.75rem] rounded-tr-lg rounded-bl-lg bg-[#0B3024]">
                    <img
                      src={branch.image}
                      alt={`${branch.city} — ${branch.area}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div
                className={`lg:col-span-6 ${
                  branch.align === 'right' ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl bg-[#08261C]/90 border border-[#EAB344]/25 p-7 sm:p-10 space-y-5 shadow-2xl">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display italic text-4xl font-semibold text-[#F5C451] tabular-nums">
                      {branch.index}
                    </span>
                    <span className="text-xs font-mono text-[#EAB344]">
                      {branch.hours}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-semibold text-[#FDF9EE]">
                      {branch.city}
                    </h2>
                    <p className="text-sm font-medium text-[#F5C451]">{branch.area}</p>
                    <p className="text-xs text-[#A8A292]">{branch.seats}</p>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
                    {branch.story}
                  </p>
                  <p className="text-xs text-[#EAB344] pt-2 border-t border-white/10">
                    Popular Orders: {branch.signature}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('orders')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
                  >
                    Order Now via WhatsApp
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-8">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#08281D]/92 border border-[#EAB344]/25 p-7 sm:p-11 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Custom Dawat &amp; Bulk Homestyle Pots
            </p>
            <h2 className="text-3xl font-semibold text-[#FDF9EE]">
              Book Noor Zaiqa Junction Dawat &amp; Bulk Trays
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
              Hosting a family dawat, office lunch, or milad in Karachi? Order 1 KG+
              trays of Chicken Biryani, Chicken Qorma, Chicken Achaari, Aalu Qeema,
              Mutanjan Zarda, and Shami Kabab boxes—plus any custom dish you request!
            </p>
            <div className="pt-2 text-xs text-[#A8A292] space-y-1">
              <p>Custom Spice Calibration · Fresh Hot Rotis &amp; Parathas</p>
              <p>In dishes ke ilawa har tarah ka ghar ka khana order par tayyar</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {catRef ? (
              <div className="p-6 rounded-2xl bg-[#061C14] border border-[#EAB344]/35 space-y-4">
                <div className="flex items-center gap-2.5 text-[#F5C451]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">
                      Catering Request Ready
                    </p>
                    <h3 className="text-xl font-semibold text-[#FDF9EE]">{catRef.id}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#D8D3C2]">
                  Shukriya, <span className="font-semibold text-[#FDF9EE]">{name}</span>.
                  Send your {style} inquiry for {guests} ({hub}) straight to WhatsApp{' '}
                  {WHATSAPP_DISPLAY}:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={catRef.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EAB344] text-[#072118] text-xs font-bold hover:bg-[#F5C451] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setCatRef(null);
                      setName('');
                      setPhone('');
                    }}
                    className="px-4 py-2.5 rounded-lg border border-white/15 text-xs font-semibold text-[#FDF9EE] hover:border-[#F5C451] transition-colors cursor-pointer"
                  >
                    New Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Name / Organization
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0371-2442688"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Karachi Zone
                    </label>
                    <select
                      value={hub}
                      onChange={(e) => setHub(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Karachi Home Delivery</option>
                      <option>Clifton / Defence / PECHS</option>
                      <option>Gulshan / Nazimabad / North</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Order Style
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Family Dawat Pots (1 KG+)</option>
                      <option>Office Daal Chawal &amp; Chowmien Boxes</option>
                      <option>Frozen Shami Kabab Bulk Packs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Guest Count
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>10 – 25 Guests</option>
                      <option>25 – 50 Guests</option>
                      <option>50 – 100 Guests</option>
                      <option>100+ Family Event</option>
                    </select>
                  </div>
                </div>

                {err && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{err}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
                >
                  Request Custom Quote on WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ReservePage() {
  const [guestName, setGuestName] = useState('');
  const [zone, setZone] = useState('Karachi Home Delivery');
  const [date, setDate] = useState('2026-11-26');
  const [slot, setSlot] = useState('Dinner (7:30 PM – 9:30 PM)');
  const [partySize, setPartySize] = useState('1–2 KG Family Tray');
  const [seating, setSeating] = useState('Custom Dish Outside Menu');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState<{ id: string; url: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Please enter your name to book a custom order.');
      return;
    }
    setErrorMsg('');
    const id = `ORD-${Math.floor(1000 + Math.random() * 8999)}`;
    const url = buildInquiryWhatsAppUrl({
      name: guestName.trim(),
      phone: WHATSAPP_DISPLAY,
      topic: `${seating} (${partySize})`,
      branch: zone,
      message: `Custom Order Ref ${id} for ${date} (${slot}): ${notes || seating}`,
    });
    setConfirmed({ id, url });
  };

  return (
    <div className="relative z-10 text-[#FDF9EE] pb-20">
      <section className="min-h-[84vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/82 border border-[#EAB344]/30 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Custom Dishes &amp; Dawat Trays · 0371-2442688
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              In Dishes Ke Ilawa Bhi Jo Banwana Ho, Wo Order Par Ban Jata Hai.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#D8D3C2]">
              Need homemade Nihari, Karahi, Pulao, Haleem, Palak Gosht, or custom mild
              tiffin meals for your parents and kids? Request any homemade dish fresh
              on order across Karachi.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESERVE_ZONES.map((zoneCard) => (
            <article
              key={zoneCard.index}
              className="p-6 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#08261C]/90 border border-[#EAB344]/25 space-y-3 shadow-xl"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display italic text-3xl font-semibold text-[#F5C451]">
                  {zoneCard.index}
                </span>
                <span className="text-xs font-mono text-[#EAB344]">
                  {zoneCard.capacity}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-[#FDF9EE]">{zoneCard.name}</h2>
              <p className="text-sm text-[#D8D3C2]">{zoneCard.note}</p>
              <p className="text-xs text-[#A8A292] pt-2 border-t border-white/10">
                {zoneCard.perks}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESERVE_RITUALS.map((ritual) => (
            <article
              key={ritual.time}
              className="p-6 rounded-tr-[2.25rem] rounded-bl-[2.25rem] rounded-tl-lg rounded-br-lg bg-[#08281D]/88 border border-[#EAB344]/25 space-y-2"
            >
              <p className="text-xs font-mono text-[#EAB344]">{ritual.time}</p>
              <h3 className="text-lg font-semibold text-[#FDF9EE]">{ritual.title}</h3>
              <p className="text-xs sm:text-sm text-[#D8D3C2] leading-relaxed">
                {ritual.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/94 border border-[#EAB344]/30 p-7 sm:p-11 max-w-4xl mx-auto shadow-2xl">
          {confirmed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#F5C451]">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
                <div>
                  <p className="text-xs font-mono uppercase">Custom Request Ready</p>
                  <h2 className="text-2xl font-semibold text-[#FDF9EE]">{confirmed.id}</h2>
                </div>
              </div>
              <p className="text-sm text-[#D8D3C2]">
                Prepared for <span className="font-semibold text-[#FDF9EE]">{guestName}</span>{' '}
                ({partySize}) in {zone} — {seating} on {date} ({slot}).
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={confirmed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EAB344] text-[#072118] text-xs font-bold hover:bg-[#F5C451]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send on WhatsApp ({WHATSAPP_DISPLAY})</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(null);
                    setGuestName('');
                  }}
                  className="px-5 py-2.5 rounded-lg border border-white/15 text-xs font-semibold text-[#FDF9EE] hover:border-[#F5C451] cursor-pointer"
                >
                  Make Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
                  Custom Homestyle Order
                </p>
                <h2 className="text-3xl font-semibold text-[#FDF9EE]">
                  Request Any Dish Fresh on Order
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Tariq Mahmood"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                    Karachi Delivery Area
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                  >
                    <option>Karachi Home Delivery</option>
                    <option>Clifton / Defence / PECHS</option>
                    <option>Gulshan / Nazimabad / North Karachi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                    Delivery Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                  >
                    <option>Lunch (1:00 PM – 3:00 PM)</option>
                    <option>Evening Snacks (5:00 PM – 7:00 PM)</option>
                    <option>Dinner (7:30 PM – 9:30 PM)</option>
                    <option>Late Dinner (10:00 PM – 11:30 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                    Quantity / Pack Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                  >
                    <option>1–2 KG Family Tray</option>
                    <option>24+ Shami Kabab Pack</option>
                    <option>5–10 Lunch Boxes</option>
                    <option>Dawat Catering (15+ Guests)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                  Order Type
                </label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                >
                  <option>Custom Dish Outside Menu</option>
                  <option>Family Dawat Pre-Order</option>
                  <option>Monthly Home / Office Tiffin Plan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                  Which Dish Should We Make &amp; Spice Level?
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. White Chicken Karahi 2 KG, mild spice, less oil"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#072118] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
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
                className="w-full py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
              >
                Prepare Custom Order for WhatsApp
              </button>
            </form>
          )}
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
        message: message.trim() || 'Hello Noor Zaiqa Junction team',
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
    <div className="relative z-10 text-[#FDF9EE] pb-20">
      <section className="min-h-[78vh] pt-28 pb-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
          <div className="max-w-3xl p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/84 border border-[#EAB344]/30 shadow-2xl space-y-5">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Contact Noor Zaiqa Junction™ · Karachi
            </p>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              Call or WhatsApp {WHATSAPP_DISPLAY} for Fresh &amp; Custom Orders.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#D8D3C2]">
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
            <div className="pt-2 flex flex-wrap gap-4 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
              <a
                href="mailto:orders@noorzaiqajunction.pk"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm border border-[#EAB344]/35 bg-[#08281D]/90 text-xs font-medium text-[#FDF9EE] hover:border-[#F5C451] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F5C451]" />
                <span>orders@noorzaiqajunction.pk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_DESKS.map((desk) => (
            <article
              key={desk.city}
              className="p-6 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-lg rounded-bl-lg bg-[#08261C]/90 border border-[#EAB344]/25 space-y-3 shadow-xl"
            >
              <h2 className="text-xl font-semibold text-[#FDF9EE]">{desk.city}</h2>
              <div className="space-y-2 text-xs text-[#D8D3C2]">
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

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-2xl rounded-br-2xl bg-[#08281D]/92 border border-[#EAB344]/28 p-7 sm:p-11 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
              Direct Kitchen Support
            </p>
            <h2 className="text-3xl font-semibold text-[#FDF9EE]">
              Custom Dish Requests, Daily Tiffins &amp; Dawat Orders
            </h2>
            <p className="text-sm leading-relaxed text-[#D8D3C2]">
              In dishes ke ilawa bhi jo aapko banwana ho, message us straight on{' '}
              <span className="font-mono text-[#EAB344]">{WHATSAPP_DISPLAY}</span> so we
              can prepare it fresh for your family.
            </p>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#061C14] border border-[#EAB344]/35 space-y-4">
                <div className="flex items-center gap-2.5 text-[#F5C451]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Inquiry Formatted</p>
                    <h3 className="text-xl font-semibold text-[#FDF9EE]">
                      {submitted.id}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#D8D3C2]">
                  Your message for {branch} ({topic}) is ready to send via WhatsApp.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={submitted.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451]"
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
                    className="px-4 py-3 rounded-lg border border-white/15 text-xs text-[#FDF9EE] hover:border-[#EAB344] cursor-pointer"
                  >
                    New Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Menu Order &amp; Delivery</option>
                      <option>Custom Dish Request (Outside Menu)</option>
                      <option>Frozen Shami Kabab Trays</option>
                      <option>Family Dawat / Office Lunch</option>
                      <option>Privacy &amp; Data Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                      Service Desk
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Karachi Kitchen Dispatch</option>
                      <option>Dawat &amp; Bulk Order Desk</option>
                      <option>Frozen Food Order Desk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#C4BFB0] mb-1">
                    Message / Custom Dish Details
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write what dish you want cooked on order, spice level, or delivery question..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-white/15 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-sm font-semibold hover:bg-[#F5C451] transition-colors cursor-pointer"
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
    <div className="relative z-10 text-[#FDF9EE] pb-20">
      <section className="min-h-[68vh] pt-28 pb-12 flex items-center">
        <div className="max-w-5xl mx-auto w-full px-6 lg:px-10">
          <div className="p-8 sm:p-11 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/86 border border-[#EAB344]/30 shadow-2xl space-y-5">
            <div className="flex items-center gap-2.5 text-[#F5C451]">
              <ShieldCheck className="w-5 h-5" />
              <p className="text-xs font-semibold tracking-[0.18em] uppercase">
                Privacy Policy · Updated November 2026
              </p>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-semibold leading-[1.06] tracking-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              Your Order Details Stay Strictly Between Your Home &amp; Our Kitchen.
            </h1>
            <p className="text-base leading-relaxed text-[#D8D3C2] max-w-3xl">
              Noor Zaiqa Junction™ is committed to transparent, zero-spam guest
              privacy. Below is exactly how we handle order information, WhatsApp
              dispatch, browser storage, and your rights.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-8 space-y-8">
        {PRIVACY_SECTIONS.map((sec) => (
          <article
            key={sec.num}
            className="p-7 sm:p-9 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl bg-[#08261C]/88 border border-[#EAB344]/22 shadow-xl space-y-3"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display italic text-3xl font-semibold text-[#F5C451] tabular-nums">
                {sec.num}
              </span>
              <h2 className="text-2xl font-semibold text-[#FDF9EE]">{sec.title}</h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
              {sec.body}
            </p>
          </article>
        ))}

        <div className="p-7 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#08281D]/90 border border-[#EAB344]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#FDF9EE]">
              Questions About Our Privacy Practices?
            </p>
            <p className="text-xs text-[#A8A292]">
              Reach our Guest Care &amp; Privacy Desk via Contact Us or WhatsApp{' '}
              {WHATSAPP_DISPLAY}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-semibold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open Contact Us Page
          </button>
        </div>
      </section>
    </div>
  );
}
