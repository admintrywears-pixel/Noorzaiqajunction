import { ChevronUp, EyeOff, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import {
  BranchesPage,
  ContactPage,
  HealthPage,
  HomePage,
  MenuPage,
  OrdersPage,
  PrivacyPage,
  ReservePage,
  StoryPage,
} from './components/Pages';
import { SceneBackdrop } from './components/SceneBackdrop';
import { PAGE_STAGE_CONFIG } from './data/menuData';
import type { CartEntry, MenuItem, PageId } from './types';
import { KitchenSizzleAudio } from './utils/sizzleAudio';

function parseHashPage(): PageId {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (
    hash === 'menu' ||
    hash === 'health' ||
    hash === 'orders' ||
    hash === 'story' ||
    hash === 'branches' ||
    hash === 'reserve' ||
    hash === 'contact' ||
    hash === 'privacy'
  ) {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(parseHashPage);
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(1);
  const [hudHidden, setHudHidden] = useState(true);
  const [sizzleEnabled, setSizzleEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const audioRef = useRef<KitchenSizzleAudio | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    audioRef.current = new KitchenSizzleAudio();
    return () => {
      mq.removeEventListener('change', onChange);
      audioRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const onHash = () => setActivePage(parseHashPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setScrollProgress(progress);

      let stage = 1;
      if (activePage === 'home') {
        const chapterNodes = [1, 2, 3, 4]
          .map((id) => document.getElementById(`chapter-${id}`))
          .filter((el): el is HTMLElement => Boolean(el));
        const mid = window.innerHeight * 0.45;
        for (let i = 0; i < chapterNodes.length; i++) {
          const rect = chapterNodes[i].getBoundingClientRect();
          if (rect.top <= mid) stage = i + 1;
        }
      } else {
        stage = progress < 0.25 ? 1 : progress < 0.5 ? 2 : progress < 0.78 ? 3 : 4;
      }
      setActiveStage(stage);
      audioRef.current?.setStep(stage);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [activePage]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'h' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        setHudHidden((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigate = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const jumpToStage = (stageNum: number) => {
    if (activePage === 'home') {
      const target = document.getElementById(`chapter-${stageNum}`);
      if (target) {
        target.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'center',
        });
        return;
      }
    }
    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const ratios = [0.06, 0.3, 0.56, 0.85];
    const targetY = (ratios[stageNum - 1] ?? 0) * maxScroll;
    window.scrollTo({ top: targetY, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const toggleSizzle = () => {
    if (!audioRef.current) return;
    const next = audioRef.current.toggle();
    setSizzleEnabled(next);
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: { item, quantity: existing ? existing.quantity + 1 : 1 },
      };
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: { ...existing, quantity: nextQty } };
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const clearCart = () => setCart({});

  const entries = useMemo(() => Object.values(cart), [cart]);
  const totalItems = useMemo(
    () => entries.reduce((sum, e) => sum + e.quantity, 0),
    [entries]
  );
  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    entries.forEach((e) => {
      map[e.item.id] = e.quantity;
    });
    return map;
  }, [entries]);

  const stageNames = PAGE_STAGE_CONFIG[activePage].stageNames;

  return (
    <div className="relative min-h-screen bg-[#072118] text-[#FDF9EE]">
      <SceneBackdrop
        activePage={activePage}
        pageScrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      <Navbar
        activePage={activePage}
        totalItems={totalItems}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onNavigate={navigate}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="relative z-10">
        {activePage === 'home' && (
          <HomePage
            activeStage={activeStage}
            entries={entries}
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
            cartQuantities={cartQuantities}
            onNavigate={navigate}
          />
        )}
        {activePage === 'menu' && (
          <MenuPage
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            cartQuantities={cartQuantities}
            onNavigate={navigate}
          />
        )}
        {activePage === 'health' && (
          <HealthPage
            onAddToCart={addToCart}
            cartQuantities={cartQuantities}
            onNavigate={navigate}
          />
        )}
        {activePage === 'orders' && (
          <OrdersPage
            entries={entries}
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
            onNavigate={navigate}
          />
        )}
        {activePage === 'story' && <StoryPage onNavigate={navigate} />}
        {activePage === 'branches' && <BranchesPage onNavigate={navigate} />}
        {activePage === 'reserve' && <ReservePage />}
        {activePage === 'contact' && <ContactPage onNavigate={navigate} />}
        {activePage === 'privacy' && <PrivacyPage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />

      <div className="fixed bottom-4 right-4 z-20 flex flex-col items-end max-w-[92vw]">
        {!hudHidden && (
          <div className="mb-2 flex flex-wrap items-center justify-end gap-2 px-3 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#08261B]/95 border border-[#EAB344]/35 shadow-2xl">
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#051811] border border-[#EAB344]/15">
              {stageNames.map((label, idx) => {
                const stageNum = idx + 1;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => jumpToStage(stageNum)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeStage === stageNum
                        ? 'bg-[#EAB344] text-[#072118] font-semibold'
                        : 'text-[#D8D3C2] hover:text-[#FDF9EE] hover:bg-[#0D3528]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggleSizzle}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                sizzleEnabled
                  ? 'bg-[#EAB344] text-[#072118] border-[#EAB344] font-semibold'
                  : 'bg-[#0C3124] text-[#FDF9EE] border-[#EAB344]/20 hover:border-[#F5C451]/60'
              }`}
              aria-label="Toggle kitchen sizzle audio"
            >
              {sizzleEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span>{sizzleEnabled ? 'Sizzle On' : 'Sizzle Audio'}</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {hudHidden && (
            <button
              type="button"
              onClick={toggleSizzle}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xl ${
                sizzleEnabled
                  ? 'bg-[#EAB344] text-[#072118] border-[#EAB344] font-semibold'
                  : 'bg-[#08241A]/92 text-[#D8D3C2] border-[#EAB344]/30 hover:border-[#F5C451]'
              }`}
              aria-label="Toggle kitchen sizzle audio"
            >
              {sizzleEnabled ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#F5C451]" />
              )}
              <span className="hidden sm:inline">
                {sizzleEnabled ? 'Sizzle On' : 'Audio'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setHudHidden((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#08241A]/92 border border-[#EAB344]/30 text-xs font-medium text-[#D8D3C2] hover:text-[#FDF9EE] hover:border-[#F5C451] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xl"
            aria-expanded={!hudHidden}
          >
            {hudHidden ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#F5C451]" />
                <span>3D Stages</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#F5C451]" />
                <span>Hide</span>
              </>
            )}
          </button>
        </div>
      </div>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        entries={entries}
        onUpdateQty={updateQty}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onOpenOrdersPage={() => navigate('orders')}
      />
    </div>
  );
}
