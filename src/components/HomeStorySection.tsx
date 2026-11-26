import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useCatalog } from '../context/CatalogContext';
import {
  CULINARY_STAGES,
  IMAGE_ASSETS,
  URDU_STAGES,
} from '../data/menuData';
import { ZaiqaLogo } from './ZaiqaLogo';

interface HomeStorySectionProps {
  activeStage: number;
  onJumpToMenu: () => void;
  onCustomOrder: () => void;
  onSecretUnlock?: () => void;
}

const STAGE_IMAGES = [
  IMAGE_ASSETS.chickenQorma,
  IMAGE_ASSETS.chickenAchaari,
  IMAGE_ASSETS.chickenBiryani,
  IMAGE_ASSETS.mutanjanZarda,
];

const STAGE_SHAPES = [
  {
    wrapper:
      'rounded-[46%_54%_42%_58%/52%_42%_58%_48%] p-2.5 border border-[#EAB344]/45 bg-[#21120B]/75',
    img: 'rounded-[45%_55%_41%_59%/51%_41%_59%_49%]',
    card: 'rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-xl rounded-bl-xl',
  },
  {
    wrapper:
      'p-2 border border-[#F5C451]/45 bg-[#21120B]/75 rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-lg rounded-br-lg',
    img: 'rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-md rounded-br-md',
    card: 'rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl',
  },
  {
    wrapper:
      'rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#D4A64A]/45 bg-[#21120B]/75',
    img: 'rounded-t-[190px] rounded-b-2xl',
    card: 'rounded-tl-[3.25rem] rounded-br-[3.25rem] rounded-tr-xl rounded-bl-xl',
  },
  {
    wrapper:
      'p-2.5 border border-[#EAB344]/45 bg-[#21120B]/75 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl',
    img: 'rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl',
    card: 'rounded-tr-[3.25rem] rounded-bl-[3.25rem] rounded-tl-xl rounded-br-xl',
  },
];

export function HomeStorySection({
  activeStage,
  onJumpToMenu,
  onCustomOrder,
  onSecretUnlock,
}: HomeStorySectionProps) {
  const { dishes } = useCatalog();
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<number | null>(null);

  const handleBadgeTap = () => {
    if (!onSecretUnlock) return;
    tapCountRef.current += 1;
    if (tapTimerRef.current !== null) {
      window.clearTimeout(tapTimerRef.current);
    }
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      tapTimerRef.current = null;
      onSecretUnlock();
      return;
    }
    tapTimerRef.current = window.setTimeout(() => {
      tapCountRef.current = 0;
      tapTimerRef.current = null;
    }, 2500);
  };

  return (
    <div id="handi-walkthrough" className="relative z-10">
      <section className="relative min-h-[90svh] sm:min-h-screen flex items-center pt-20 pb-12 sm:pt-24 sm:pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[68%] bg-gradient-to-r from-[#120906]/92 via-[#140B07]/70 to-transparent"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div
                onClick={handleBadgeTap}
                className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#F5C451] select-none"
              >
                <ZaiqaLogo size={28} />
                <span className="leading-snug">
                  Zaiqa Junction · Ghar ka Zaiqa, Har Plate Mein
                </span>
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-[4.15rem] font-semibold leading-[1.06] sm:leading-[1.03] tracking-tight text-[#FDF6E9] drop-shadow-[0_4px_24px_rgba(16,8,5,0.92)]"
                style={{ textWrap: 'balance' }}
              >
                Ghar ka Zaiqa,{' '}
                <span className="italic font-medium text-[#F5C451]">Har Plate</span>{' '}
                Mein. Cooked Fresh Daily.
              </h1>

              <p
                lang="ur"
                className="font-urdu text-xl sm:text-[1.7rem] font-semibold text-[#F3C969] drop-shadow-[0_3px_14px_rgba(16,8,5,0.98)] leading-[2.05] sm:leading-[2.2]"
              >
                ذائقہ جنکشن — گھر کا اصلی ذائقہ، ہر پلیٹ میں
              </p>

              <p className="text-sm sm:text-lg leading-relaxed text-[#E6D7C3] max-w-xl drop-shadow-[0_2px_12px_rgba(16,8,5,0.95)]">
                Authentic Pakistani homestyle masala dishes prepared hygienically in
                Karachi—Beef &amp; Chicken Shami Kabab, Chicken Achaari, Chicken Biryani,
                Chicken Qorma, Aalu Qeema, Zarda, Mutanjan, Chicken Chowmien, Daal Chawal +
                Kabab, Roti &amp; Aalu Ka Paratha. Anything else you crave is also cooked
                fresh on order!
              </p>

              <p
                lang="ur"
                className="font-urdu-body text-sm sm:text-base text-[#E6D7C3] max-w-xl drop-shadow-[0_2px_10px_rgba(16,8,5,0.95)]"
              >
                بیف و چکن شامی کباب، چکن اچاری، بریانی، قورمہ، آلو قیمہ، زردہ، متنجن، چکن
                چاؤمین، دال چاول، روٹی اور آلو کا پراٹھا — ان ڈشز کے علاوہ بھی جو آپ کو بنوانا
                ہو وہ آرڈر پر تیار ہو جاتا ہے۔
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCustomOrder}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer shadow-lg"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>Custom Order ·</span>
                    <span lang="ur" className="font-urdu-inline text-[15px]">
                      کسٹم آرڈر
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onJumpToMenu}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md border border-[#EAB344]/50 bg-[#21120B]/92 text-[#FDF6E9] text-sm font-medium hover:border-[#F5C451] transition-colors cursor-pointer"
                >
                  <span className="inline-flex flex-wrap items-center justify-center gap-1.5">
                    <span>Special Menu ({dishes.length} Dishes) ·</span>
                    <span
                      lang="ur"
                      className="font-urdu-inline text-[15px] text-[#F5C451]"
                    >
                      مکمل مینیو
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#F5C451] shrink-0" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="rounded-t-[150px] sm:rounded-t-[210px] rounded-b-[1.5rem] sm:rounded-b-[2rem] p-2.5 sm:p-3 border border-[#EAB344]/45 bg-[#21120B]/88 shadow-2xl">
                  <div className="rounded-t-[140px] sm:rounded-t-[198px] rounded-b-[1.2rem] sm:rounded-b-[1.5rem] overflow-hidden aspect-[4/4.2] sm:aspect-[4/4.3] bg-[#2E1910]">
                    <img
                      src={IMAGE_ASSETS.chickenBiryani}
                      alt="Zaiqa Junction Karachi Special Chicken Biryani 1 KG"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2 flex items-end justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#F5C451] truncate">
                        Special Menu · 1 KG Dum Tray
                      </p>
                      <p className="font-display text-base sm:text-lg font-semibold text-[#FDF6E9] truncate">
                        Chicken Biryani (1 KG)
                      </p>
                    </div>
                    <p className="text-sm font-mono font-semibold tabular-nums text-[#EAB344] shrink-0">
                      Rs. 1,250
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block absolute -left-8 bottom-14 w-40 rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg p-1.5 bg-[#140B07]/96 border border-[#EAB344]/55 shadow-2xl">
                  <img
                    src={IMAGE_ASSETS.beefShami}
                    alt="Beef Shami Kabab 12 Pieces"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] object-cover rounded-tl-[1.85rem] rounded-br-[1.85rem] rounded-tr-md rounded-bl-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-8 sm:py-20 space-y-12 sm:space-y-36"
        aria-label="4-Stage Homestyle Kitchen Process"
      >
        {CULINARY_STAGES.map((stage, idx) => {
          const reverse = idx % 2 === 1;
          const isCurrent = activeStage === stage.id;
          const shape = STAGE_SHAPES[idx] ?? STAGE_SHAPES[0];
          const urduStage = URDU_STAGES[stage.id];

          return (
            <div
              key={stage.id}
              id={`chapter-${stage.id}`}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
                <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                  <article
                    className={`relative p-5 sm:p-10 bg-[#21120B]/90 border transition-colors duration-300 space-y-3.5 sm:space-y-4 ${shape.card} ${
                      isCurrent ? 'border-[#EAB344]/65' : 'border-[#EAB344]/20'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display italic text-4xl sm:text-5xl font-semibold text-[#F5C451] leading-none tabular-nums">
                        {stage.stepNumber}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#E6D7C3]">
                        <span>{stage.heatTemp}</span>
                        <span aria-hidden="true">·</span>
                        <span>{stage.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <h2
                        className="text-2xl sm:text-4xl font-semibold leading-tight text-[#FDF6E9]"
                        style={{ textWrap: 'balance' }}
                      >
                        {stage.title}
                      </h2>
                      <p className="text-sm font-medium text-[#F5C451]">
                        {stage.subtitle}
                      </p>
                      {urduStage && (
                        <p
                          lang="ur"
                          className="font-urdu text-lg sm:text-xl text-[#EAB344] pt-1"
                        >
                          {urduStage.title}
                        </p>
                      )}
                    </div>

                    <p className="text-sm sm:text-base leading-relaxed text-[#E6D7C3]">
                      {stage.description}
                    </p>
                    {urduStage && (
                      <p lang="ur" className="font-urdu-body text-sm text-[#C7B198]">
                        {urduStage.summary}
                      </p>
                    )}

                    <div className="pt-4 border-t border-[#EAB344]/15 flex items-center justify-between gap-4">
                      <p className="text-xs font-medium text-[#C7B198]">
                        {stage.keyIngredients.join(' · ')}
                      </p>
                    </div>
                  </article>
                </div>

                <div className={`lg:col-span-6 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`${shape.wrapper} shadow-2xl`}>
                    <div
                      className={`aspect-[4/3] w-full overflow-hidden bg-[#2E1910] ${shape.img}`}
                    >
                      <img
                        src={STAGE_IMAGES[idx]}
                        alt={stage.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
