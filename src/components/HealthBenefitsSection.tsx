import {
  ArrowRight,
  Flame,
  HeartPulse,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { HEALTH_BENEFITS, URDU_HEALTH } from '../data/menuData';
import type { PageId } from '../types';

interface HealthBenefitsSectionProps {
  onNavigate?: (page: PageId) => void;
  compact?: boolean;
}

const BENEFIT_ICONS = [
  ShieldCheck,
  HeartPulse,
  Flame,
  Leaf,
  HeartPulse,
  ShieldCheck,
];

export function HealthBenefitsSection({
  onNavigate,
  compact = false,
}: HealthBenefitsSectionProps) {
  return (
    <section
      id="health-benefits"
      aria-label="Noor Zaiqa Junction Purity & Hygiene Standards"
      className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-20"
    >
      <div className="rounded-tl-[3.75rem] rounded-br-[3.75rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/92 border border-[#EAB344]/35 p-7 sm:p-11 shadow-2xl space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451] flex flex-wrap items-center gap-2">
              <span>Hygienic Homemade Kitchen ·</span>
              <span
                lang="ur"
                className="font-urdu-inline normal-case text-sm text-[#EAB344]"
              >
                گھر کا صاف ستھرا اور صحت بخش ذائقہ
              </span>
            </p>
            <h2
              className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight text-[#FDF9EE]"
              style={{ textWrap: 'balance' }}
            >
              Why Classic{' '}
              <span className="italic font-medium text-[#F5C451]">Ghar Ka Masala</span>{' '}
              Cooking Beats Commercial Restaurants.
            </h2>
            <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
              صاف ستھرا تازہ آئل، خالص گھریلو مصالحے اور روزانہ کی تازہ تیاری آپ کی صحت کے لیے بہترین کیوں ہے؟
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#D8D3C2]">
              We cook real Pakistani masala dishes—Achaari, Biryani, Qorma, Aalu Qeema,
              Beef &amp; Chicken Shami Kabab, Daal Chawal, and Zarda—using clean fresh
              single-use oil, pure spices, and zero commercial preservatives.
            </p>
          </div>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('health')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-xs font-bold hover:bg-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-end shadow-md"
            >
              <span className="inline-flex items-center gap-1.5">
                <span>Kitchen Purity Standards ·</span>
                <span lang="ur" className="font-urdu-inline text-sm">
                  صفائی و معیار
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HEALTH_BENEFITS.map((benefit, idx) => {
            const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
            const urduItem = URDU_HEALTH[benefit.id];

            return (
              <article
                key={benefit.id}
                className="rounded-tl-[2.25rem] rounded-br-[2.25rem] rounded-tr-lg rounded-bl-lg bg-[#0B2E22]/92 border border-[#EAB344]/25 p-6 flex flex-col justify-between space-y-4 hover:border-[#F5C451]/65 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-[#F5C451]">
                      <Icon className="w-4 h-4 text-[#EAB344]" />
                      {benefit.goal}
                    </span>
                    <span className="font-mono text-lg font-semibold tabular-nums text-[#EAB344]">
                      {benefit.metric}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold leading-snug text-[#FDF9EE]">
                    {benefit.title}
                  </h3>
                  {urduItem && (
                    <p lang="ur" className="font-urdu text-base text-[#EAB344]">
                      {urduItem.title}
                    </p>
                  )}

                  <p className="text-sm leading-relaxed text-[#D8D3C2]">
                    {benefit.summary}
                  </p>
                  {urduItem && (
                    <p
                      lang="ur"
                      className="font-urdu-body text-xs sm:text-sm text-[#C4BFB0]"
                    >
                      {urduItem.summary}
                    </p>
                  )}
                </div>

                {!compact && (
                  <p className="pt-3 border-t border-[#EAB344]/15 text-xs text-[#B2C1B7]">
                    {benefit.scienceNote}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
