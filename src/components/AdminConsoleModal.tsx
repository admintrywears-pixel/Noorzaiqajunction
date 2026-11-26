import {
  AlertCircle,
  Check,
  Edit3,
  KeyRound,
  Lock,
  LogOut,
  Package,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  Utensils,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useCatalog, type CatalogSnapshot } from '../context/CatalogContext';
import { CATALOG_IMAGE_OPTIONS, IMAGE_ASSETS } from '../data/menuData';
import type {
  Category,
  MenuItem,
  PackedCategory,
  PackedProduct,
  SpiceLevel,
} from '../types';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISH_CATEGORIES: Exclude<Category, 'Packed Pantry'>[] = [
  'Homemade Curries & Biryani',
  'Shami Kababs',
  'Desserts (Meetha)',
  'Combos, Noodles & Breads',
];

const SPICE_OPTIONS: SpiceLevel[] = [
  'Mild & Sweet',
  'Classic Masala',
  'Spicy Homestyle',
];

const PRODUCT_CATEGORIES: Exclude<PackedCategory, 'All Packs'>[] = [
  'Pastes & Purees',
  'Fried & Frozen',
  'Pickles & Chutneys',
  'Spices & Masalas',
];

export function AdminConsoleModal({ isOpen, onClose }: AdminConsoleModalProps) {
  const { dishes, products, adminToken, setAdminToken, applyCatalog } =
    useCatalog();

  const [checkingStatus, setCheckingStatus] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [usingEnvPasscode, setUsingEnvPasscode] = useState(false);

  const [passcodeInput, setPasscodeInput] = useState('');
  const [confirmPasscodeInput, setConfirmPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);

  const [tab, setTab] = useState<'dishes' | 'products'>('dishes');
  const [search, setSearch] = useState('');
  const [statusBanner, setStatusBanner] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Quick inline price drafts
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Dish Add/Edit Form state
  const [dishFormOpen, setDishFormOpen] = useState(false);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [dishName, setDishName] = useState('');
  const [dishUrduTag, setDishUrduTag] = useState('');
  const [dishCategory, setDishCategory] = useState<Category>(
    'Homemade Curries & Biryani'
  );
  const [dishPrice, setDishPrice] = useState('1000');
  const [dishSpice, setDishSpice] = useState<SpiceLevel>('Classic Masala');
  const [dishPrepTime, setDishPrepTime] = useState('1 KG Fresh Pot');
  const [dishDesc, setDishDesc] = useState('');
  const [dishImage, setDishImage] = useState(IMAGE_ASSETS.chickenBiryani);
  const [dishFeatured, setDishFeatured] = useState(false);

  // Product Add/Edit Form state
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodUrduName, setProdUrduName] = useState('');
  const [prodUrduTag, setProdUrduTag] = useState('');
  const [prodCategory, setProdCategory] =
    useState<Exclude<PackedCategory, 'All Packs'>>('Pastes & Purees');
  const [prodPrice, setProdPrice] = useState('350');
  const [prodPackSize, setProdPackSize] = useState('250g Sealed Pack');
  const [prodShelfLife, setProdShelfLife] = useState('30 Days Hygienic Store');
  const [prodPurity, setProdPurity] = useState('100% Pure Homemade · Zero Preservatives');
  const [prodDesc, setProdDesc] = useState('');
  const [prodUrduSummary, setProdUrduSummary] = useState('');
  const [prodImage, setProdImage] = useState(IMAGE_ASSETS.packFriedOnion);
  const [prodFeatured, setProdFeatured] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    const loadStatus = async () => {
      setCheckingStatus(true);
      try {
        const res = await fetch('/api/admin/status', {
          headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          configured: boolean;
          usingEnvPasscode: boolean;
          authenticated: boolean;
        };
        if (cancelled) return;
        setConfigured(Boolean(data.configured));
        setUsingEnvPasscode(Boolean(data.usingEnvPasscode));
        if (adminToken && !data.authenticated) {
          setAdminToken(null);
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setCheckingStatus(false);
      }
    };
    void loadStatus();
    return () => {
      cancelled = true;
    };
  }, [isOpen, adminToken, setAdminToken]);

  useEffect(() => {
    const nextDrafts: Record<string, string> = {};
    dishes.forEach((d) => {
      nextDrafts[d.id] = String(d.pricePkr);
    });
    products.forEach((p) => {
      nextDrafts[p.id] = String(p.pricePkr);
    });
    setPriceDrafts(nextDrafts);
  }, [dishes, products]);

  const filteredDishes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }, [dishes, search]);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  if (!isOpen) return null;

  const showToast = (kind: 'success' | 'error', text: string) => {
    setStatusBanner({ kind, text });
  };

  const authedFetch = async (
    url: string,
    options: RequestInit
  ): Promise<{ ok: boolean; data: CatalogSnapshot & { error?: string } }> => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
        ...(options.headers || {}),
      },
    });
    const data = (await res.json()) as CatalogSnapshot & { error?: string };
    if (res.status === 401) {
      setAdminToken(null);
    }
    return { ok: res.ok, data };
  };

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!configured) {
      if (passcodeInput.trim().length < 6) {
        setAuthError('Passcode kam az kam 6 characters ka hona chahiye.');
        return;
      }
      if (passcodeInput !== confirmPasscodeInput) {
        setAuthError('Dono passcodes match nahi kar rahe.');
        return;
      }
    } else if (!passcodeInput.trim()) {
      setAuthError('Developer passcode darj karein.');
      return;
    }

    setAuthBusy(true);
    try {
      const endpoint = configured ? '/api/admin/login' : '/api/admin/claim';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcodeInput.trim() }),
      });
      const data = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !data.token) {
        setAuthError(data.error || 'Authentication failed.');
        return;
      }
      setAdminToken(data.token);
      setConfigured(true);
      setPasscodeInput('');
      setConfirmPasscodeInput('');
    } catch {
      setAuthError('Server se rabta nahi ho saka.');
    } finally {
      setAuthBusy(false);
    }
  };

  const resetDishForm = () => {
    setEditingDishId(null);
    setDishName('');
    setDishUrduTag('');
    setDishCategory('Homemade Curries & Biryani');
    setDishPrice('1000');
    setDishSpice('Classic Masala');
    setDishPrepTime('1 KG Fresh Pot');
    setDishDesc('');
    setDishImage(IMAGE_ASSETS.chickenBiryani);
    setDishFeatured(false);
    setDishFormOpen(false);
  };

  const startEditDish = (dish: MenuItem) => {
    setEditingDishId(dish.id);
    setDishName(dish.name);
    setDishUrduTag(dish.urduTag);
    setDishCategory(dish.category);
    setDishPrice(String(dish.pricePkr));
    setDishSpice(dish.spice);
    setDishPrepTime(dish.prepTime);
    setDishDesc(dish.description);
    setDishImage(dish.image);
    setDishFeatured(Boolean(dish.featured));
    setDishFormOpen(true);
  };

  const handleSaveDishForm = async (e: FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(dishPrice);
    if (!dishName.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      showToast('error', 'Dish name aur sahi rate (Rs.) darj karein.');
      return;
    }
    setBusyId(editingDishId || 'new-dish');
    const payload = {
      name: dishName.trim(),
      urduTag: dishUrduTag.trim(),
      category: dishCategory,
      pricePkr: Math.round(numericPrice),
      spice: dishSpice,
      prepTime: dishPrepTime.trim(),
      description: dishDesc.trim(),
      image: dishImage.trim(),
      featured: dishFeatured,
    };

    const url = editingDishId
      ? `/api/admin/dishes/${encodeURIComponent(editingDishId)}`
      : '/api/admin/dishes';
    const method = editingDishId ? 'PUT' : 'POST';

    const { ok, data } = await authedFetch(url, {
      method,
      body: JSON.stringify(payload),
    });
    setBusyId(null);

    if (!ok) {
      showToast('error', data.error || 'Dish save nahi ho saki.');
      return;
    }
    applyCatalog(data);
    showToast(
      'success',
      editingDishId ? 'Dish update ho gayi!' : 'Nayi dish menu mein shamil ho gayi!'
    );
    resetDishForm();
  };

  const handleQuickSaveDishPrice = async (dish: MenuItem) => {
    const numericPrice = Number(priceDrafts[dish.id]);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      showToast('error', 'Rate 1 ya us se zyada hona chahiye.');
      return;
    }
    const rounded = Math.round(numericPrice);
    setBusyId(dish.id);
    const updatedTag = dish.urduTag.replace(/^\d+/, String(rounded));
    const { ok, data } = await authedFetch(
      `/api/admin/dishes/${encodeURIComponent(dish.id)}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...dish,
          pricePkr: rounded,
          urduTag: updatedTag,
        }),
      }
    );
    setBusyId(null);
    if (!ok) {
      showToast('error', data.error || 'Rate update nahi ho saka.');
      return;
    }
    applyCatalog(data);
    showToast('success', `${dish.name} ka naya rate Rs. ${rounded.toLocaleString()} save ho gaya.`);
  };

  const handleDeleteDish = async (dish: MenuItem) => {
    setBusyId(dish.id);
    const { ok, data } = await authedFetch(
      `/api/admin/dishes/${encodeURIComponent(dish.id)}`,
      { method: 'DELETE' }
    );
    setBusyId(null);
    setConfirmDeleteId(null);
    if (!ok) {
      showToast('error', data.error || 'Dish delete nahi ho saki.');
      return;
    }
    applyCatalog(data);
    showToast('success', `${dish.name} menu se delete kar di gayi.`);
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProdName('');
    setProdUrduName('');
    setProdUrduTag('');
    setProdCategory('Pastes & Purees');
    setProdPrice('350');
    setProdPackSize('250g Sealed Pack');
    setProdShelfLife('30 Days Hygienic Store');
    setProdPurity('100% Pure Homemade · Zero Preservatives');
    setProdDesc('');
    setProdUrduSummary('');
    setProdImage(IMAGE_ASSETS.packFriedOnion);
    setProdFeatured(false);
    setProductFormOpen(false);
  };

  const startEditProduct = (product: PackedProduct) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdUrduName(product.urduName);
    setProdUrduTag(product.urduTag);
    setProdCategory(product.category);
    setProdPrice(String(product.pricePkr));
    setProdPackSize(product.packSize);
    setProdShelfLife(product.shelfLife);
    setProdPurity(product.purityNote);
    setProdDesc(product.description);
    setProdUrduSummary(product.urduSummary);
    setProdImage(product.image);
    setProdFeatured(Boolean(product.featured));
    setProductFormOpen(true);
  };

  const handleSaveProductForm = async (e: FormEvent) => {
    e.preventDefault();
    const numericPrice = Number(prodPrice);
    if (!prodName.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      showToast('error', 'Product name aur sahi rate (Rs.) darj karein.');
      return;
    }
    setBusyId(editingProductId || 'new-product');
    const payload = {
      name: prodName.trim(),
      urduName: prodUrduName.trim(),
      urduTag: prodUrduTag.trim(),
      category: prodCategory,
      pricePkr: Math.round(numericPrice),
      packSize: prodPackSize.trim(),
      shelfLife: prodShelfLife.trim(),
      purityNote: prodPurity.trim(),
      description: prodDesc.trim(),
      urduSummary: prodUrduSummary.trim(),
      image: prodImage.trim(),
      featured: prodFeatured,
    };

    const url = editingProductId
      ? `/api/admin/products/${encodeURIComponent(editingProductId)}`
      : '/api/admin/products';
    const method = editingProductId ? 'PUT' : 'POST';

    const { ok, data } = await authedFetch(url, {
      method,
      body: JSON.stringify(payload),
    });
    setBusyId(null);

    if (!ok) {
      showToast('error', data.error || 'Product save nahi ho saka.');
      return;
    }
    applyCatalog(data);
    showToast(
      'success',
      editingProductId
        ? 'Packed product update ho gaya!'
        : 'Naya packed product shamil ho gaya!'
    );
    resetProductForm();
  };

  const handleQuickSaveProductPrice = async (product: PackedProduct) => {
    const numericPrice = Number(priceDrafts[product.id]);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      showToast('error', 'Rate 1 ya us se zyada hona chahiye.');
      return;
    }
    const rounded = Math.round(numericPrice);
    setBusyId(product.id);
    const updatedTag = product.urduTag.replace(/^\d+/, String(rounded));
    const { ok, data } = await authedFetch(
      `/api/admin/products/${encodeURIComponent(product.id)}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...product,
          pricePkr: rounded,
          urduTag: updatedTag,
        }),
      }
    );
    setBusyId(null);
    if (!ok) {
      showToast('error', data.error || 'Rate update nahi ho saka.');
      return;
    }
    applyCatalog(data);
    showToast(
      'success',
      `${product.name} ka naya rate Rs. ${rounded.toLocaleString()} save ho gaya.`
    );
  };

  const handleDeleteProduct = async (product: PackedProduct) => {
    setBusyId(product.id);
    const { ok, data } = await authedFetch(
      `/api/admin/products/${encodeURIComponent(product.id)}`,
      { method: 'DELETE' }
    );
    setBusyId(null);
    setConfirmDeleteId(null);
    if (!ok) {
      showToast('error', data.error || 'Product delete nahi ho saka.');
      return;
    }
    applyCatalog(data);
    showToast('success', `${product.name} delete kar diya gaya.`);
  };

  const handleResetCatalog = async () => {
    setBusyId('reset');
    const { ok, data } = await authedFetch('/api/admin/reset', {
      method: 'POST',
    });
    setBusyId(null);
    setConfirmReset(false);
    if (!ok) {
      showToast('error', data.error || 'Reset failed.');
      return;
    }
    applyCatalog(data);
    showToast('success', 'Default dishes aur products restore ho gaye.');
  };

  const handleLockAndClose = () => {
    setAdminToken(null);
    setConfirmDeleteId(null);
    setConfirmReset(false);
    setStatusBanner(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Developer Catalog Console"
    >
      <div className="w-full max-w-5xl max-h-[94dvh] flex flex-col rounded-2xl bg-[#180D08] border border-[#EAB344]/40 text-[#FDF6E9] shadow-2xl overflow-hidden">
        {/* Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#21120B] border-b border-[#EAB344]/25 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#EAB344]/15 border border-[#EAB344]/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#F5C451]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#F5C451]">
                Developer Only Mode
              </p>
              <h2 className="text-sm sm:text-base font-semibold truncate">
                Zaiqa Junction — Dishes &amp; Products Manager
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {adminToken && (
              <button
                type="button"
                onClick={handleLockAndClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAB344]/35 text-xs font-medium text-[#E6D7C3] hover:text-[#FDF6E9] hover:border-[#F5C451] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock &amp; Exit</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center text-[#E6D7C3] hover:text-[#FDF6E9] hover:border-[#F5C451] cursor-pointer"
              aria-label="Close developer panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auth Gate OR Authenticated Dashboard */}
        {!adminToken ? (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-[#21120B] border border-[#EAB344]/35 p-6 space-y-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAB344]/15 border border-[#EAB344]/40 flex items-center justify-center shrink-0">
                  {configured ? (
                    <Lock className="w-5 h-5 text-[#F5C451]" />
                  ) : (
                    <KeyRound className="w-5 h-5 text-[#F5C451]" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FDF6E9]">
                    {checkingStatus
                      ? 'Checking Developer Access...'
                      : configured
                        ? 'Developer Passcode Required'
                        : 'Set Secret Developer Passcode'}
                  </h3>
                  <p className="text-xs text-[#C7B198]">
                    {configured
                      ? usingEnvPasscode
                        ? 'Verified via server environment secret.'
                        : 'Sirf developer apna secret passcode daal kar rates aur items edit kar sakta hai.'
                      : 'First-time setup: Apna secret developer passcode set karein (min 6 characters).'}
                  </p>
                </div>
              </div>

              {!checkingStatus && (
                <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#C7B198] mb-1">
                      {configured ? 'Developer Passcode' : 'Create Developer Passcode'}
                    </label>
                    <input
                      type="password"
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      placeholder="••••••"
                      autoFocus
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>

                  {!configured && (
                    <div>
                      <label className="block text-xs font-medium text-[#C7B198] mb-1">
                        Confirm Passcode
                      </label>
                      <input
                        type="password"
                        value={confirmPasscodeInput}
                        onChange={(e) => setConfirmPasscodeInput(e.target.value)}
                        placeholder="••••••"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                      />
                    </div>
                  )}

                  {authError && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authBusy}
                    className="w-full py-2.5 rounded-lg bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {authBusy
                      ? 'Verifying...'
                      : configured
                        ? 'Unlock Developer Admin'
                        : 'Save Passcode & Open Admin'}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Sub-header controls */}
            <div className="px-4 sm:px-6 py-3 bg-[#1E100A] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTab('dishes');
                    setStatusBanner(null);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    tab === 'dishes'
                      ? 'bg-[#EAB344] text-[#140B07]'
                      : 'bg-[#21120B] text-[#E6D7C3] border border-white/10 hover:border-[#EAB344]/40'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dishes ({dishes.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab('products');
                    setStatusBanner(null);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    tab === 'products'
                      ? 'bg-[#EAB344] text-[#140B07]'
                      : 'bg-[#21120B] text-[#E6D7C3] border border-white/10 hover:border-[#EAB344]/40'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Packed Products ({products.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-52">
                  <Search className="w-3.5 h-3.5 text-[#9E8468] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#140B07] border border-white/15 text-xs text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>

                {confirmReset ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleResetCatalog}
                      disabled={busyId === 'reset'}
                      className="px-2.5 py-1.5 rounded-lg bg-[#991B1B] text-white text-xs font-semibold cursor-pointer"
                    >
                      Confirm Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="px-2.5 py-1.5 rounded-lg border border-white/15 text-xs text-[#C7B198] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/15 text-xs text-[#C7B198] hover:text-[#FDF6E9] hover:border-[#EAB344]/40 cursor-pointer shrink-0"
                    title="Reset catalog to default dishes & products"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Reset Defaults</span>
                  </button>
                )}
              </div>
            </div>

            {statusBanner && (
              <div
                className={`px-4 sm:px-6 py-2 text-xs font-medium flex items-center justify-between gap-2 ${
                  statusBanner.kind === 'success'
                    ? 'bg-[#14532D]/40 text-[#86EFAC] border-b border-[#22C55E]/25'
                    : 'bg-[#7F1D1D]/50 text-[#FCA5A5] border-b border-[#EF4444]/30'
                }`}
              >
                <span>{statusBanner.text}</span>
                <button
                  type="button"
                  onClick={() => setStatusBanner(null)}
                  className="text-current opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Main Scroll Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {tab === 'dishes' ? (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-[#FDF6E9]">
                        Cooked Dishes Menu
                      </h3>
                      <p className="text-xs text-[#C7B198]">
                        Kisi bhi dish ka rate directly badlein, edit karein, delete karein ya nayi dish add karein.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (dishFormOpen && !editingDishId) {
                          resetDishForm();
                        } else {
                          resetDishForm();
                          setDishFormOpen(true);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{dishFormOpen && !editingDishId ? 'Close Form' : 'Add New Dish'}</span>
                    </button>
                  </div>

                  {dishFormOpen && (
                    <form
                      onSubmit={handleSaveDishForm}
                      className="p-4 sm:p-5 rounded-xl bg-[#21120B] border border-[#EAB344]/40 space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[#F5C451]">
                          {editingDishId ? 'Edit Dish Details' : 'Add New Dish to Special Menu'}
                        </h4>
                        <button
                          type="button"
                          onClick={resetDishForm}
                          className="text-xs text-[#C7B198] hover:text-[#FDF6E9] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Dish Name *
                          </label>
                          <input
                            type="text"
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                            placeholder="e.g. Chicken Karahi (1 KG)"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Rate (PKR Rs.) *
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={dishPrice}
                            onChange={(e) => setDishPrice(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Category
                          </label>
                          <select
                            value={dishCategory}
                            onChange={(e) => setDishCategory(e.target.value as Category)}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs sm:text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          >
                            {DISH_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Spice Level
                          </label>
                          <select
                            value={dishSpice}
                            onChange={(e) => setDishSpice(e.target.value as SpiceLevel)}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs sm:text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          >
                            {SPICE_OPTIONS.map((sp) => (
                              <option key={sp} value={sp}>
                                {sp}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Portion / Unit
                          </label>
                          <input
                            type="text"
                            value={dishPrepTime}
                            onChange={(e) => setDishPrepTime(e.target.value)}
                            placeholder="1 KG Fresh Pot / 12 Pieces"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Rate Subtitle Tag (Optional)
                          </label>
                          <input
                            type="text"
                            value={dishUrduTag}
                            onChange={(e) => setDishUrduTag(e.target.value)}
                            placeholder="e.g. 1400 / 1 KG · Fresh Karahi"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Dish Photo (Choose Preset or Paste https:// URL)
                          </label>
                          <select
                            value={
                              CATALOG_IMAGE_OPTIONS.some((o) => o.src === dishImage)
                                ? dishImage
                                : 'custom'
                            }
                            onChange={(e) => {
                              if (e.target.value !== 'custom') setDishImage(e.target.value);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs sm:text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          >
                            {CATALOG_IMAGE_OPTIONS.map((opt) => (
                              <option key={opt.src} value={opt.src}>
                                {opt.label}
                              </option>
                            ))}
                            <option value="custom">Custom Image URL...</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#C7B198] mb-1">
                          Image Path / URL
                        </label>
                        <input
                          type="text"
                          value={dishImage}
                          onChange={(e) => setDishImage(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs text-[#E6D7C3] focus:outline-none focus:border-[#EAB344]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#C7B198] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={dishDesc}
                          onChange={(e) => setDishDesc(e.target.value)}
                          placeholder="Short homemade description..."
                          className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <label className="inline-flex items-center gap-2 text-xs text-[#E6D7C3] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={dishFeatured}
                            onChange={(e) => setDishFeatured(e.target.checked)}
                            className="accent-[#EAB344]"
                          />
                          <span>Mark as Featured Special</span>
                        </label>

                        <button
                          type="submit"
                          disabled={busyId !== null}
                          className="px-5 py-2 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] cursor-pointer"
                        >
                          {editingDishId ? 'Update Dish' : 'Save New Dish'}
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2.5">
                    {filteredDishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="p-3 sm:p-3.5 rounded-xl bg-[#21120B]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover bg-[#2E1910] shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#FDF6E9] truncate">
                              {dish.name}
                            </p>
                            <p className="text-[11px] text-[#C7B198] truncate">
                              {dish.category} · {dish.prepTime}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <div className="inline-flex items-center rounded-lg bg-[#140B07] border border-white/15 px-2 py-1">
                            <span className="text-[11px] font-mono text-[#EAB344] mr-1">
                              Rs.
                            </span>
                            <input
                              type="number"
                              min={1}
                              value={priceDrafts[dish.id] ?? String(dish.pricePkr)}
                              onChange={(e) =>
                                setPriceDrafts((prev) => ({
                                  ...prev,
                                  [dish.id]: e.target.value,
                                }))
                              }
                              className="w-20 bg-transparent text-xs font-mono text-[#FDF6E9] focus:outline-none"
                              aria-label={`Price for ${dish.name}`}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleQuickSaveDishPrice(dish)}
                            disabled={busyId === dish.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#EAB344]/20 border border-[#EAB344]/40 text-xs font-semibold text-[#F5C451] hover:bg-[#EAB344] hover:text-[#140B07] cursor-pointer"
                            title="Save updated rate"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Rate</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => startEditDish(dish)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/15 text-xs text-[#E6D7C3] hover:border-[#F5C451] cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {confirmDeleteId === dish.id ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDeleteDish(dish)}
                                disabled={busyId === dish.id}
                                className="px-2 py-1.5 rounded-lg bg-[#991B1B] text-white text-[11px] font-semibold cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1.5 rounded-lg border border-white/15 text-[11px] text-[#C7B198] cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(dish.id)}
                              className="p-1.5 rounded-lg border border-white/10 text-[#FCA5A5] hover:bg-[#991B1B]/30 cursor-pointer"
                              aria-label={`Delete ${dish.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-[#FDF6E9]">
                        Packed Kitchen Products
                      </h3>
                      <p className="text-xs text-[#C7B198]">
                        Fry Onion, Lehsan Adrak Paste aur baqi packed products add, remove aur unke rates update karein.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (productFormOpen && !editingProductId) {
                          resetProductForm();
                        } else {
                          resetProductForm();
                          setProductFormOpen(true);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>
                        {productFormOpen && !editingProductId
                          ? 'Close Form'
                          : 'Add New Product'}
                      </span>
                    </button>
                  </div>

                  {productFormOpen && (
                    <form
                      onSubmit={handleSaveProductForm}
                      className="p-4 sm:p-5 rounded-xl bg-[#21120B] border border-[#EAB344]/40 space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[#F5C451]">
                          {editingProductId
                            ? 'Edit Packed Product Details'
                            : 'Add New Packed Product'}
                        </h4>
                        <button
                          type="button"
                          onClick={resetProductForm}
                          className="text-xs text-[#C7B198] hover:text-[#FDF6E9] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            placeholder="e.g. Homemade Red Chilli Powder"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Rate (PKR Rs.) *
                          </label>
                          <input
                            type="number"
                            min={1}
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Category
                          </label>
                          <select
                            value={prodCategory}
                            onChange={(e) =>
                              setProdCategory(
                                e.target.value as Exclude<PackedCategory, 'All Packs'>
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs sm:text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          >
                            {PRODUCT_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Pack Size
                          </label>
                          <input
                            type="text"
                            value={prodPackSize}
                            onChange={(e) => setProdPackSize(e.target.value)}
                            placeholder="e.g. 250g Zip Pouch"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Shelf Life
                          </label>
                          <input
                            type="text"
                            value={prodShelfLife}
                            onChange={(e) => setProdShelfLife(e.target.value)}
                            placeholder="e.g. 60 Days Airtight"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Urdu Product Name (Optional)
                          </label>
                          <input
                            type="text"
                            value={prodUrduName}
                            onChange={(e) => setProdUrduName(e.target.value)}
                            placeholder="e.g. خالص تلی ہوئی پیاز"
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Product Photo
                          </label>
                          <select
                            value={
                              CATALOG_IMAGE_OPTIONS.some((o) => o.src === prodImage)
                                ? prodImage
                                : 'custom'
                            }
                            onChange={(e) => {
                              if (e.target.value !== 'custom') setProdImage(e.target.value);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs sm:text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                          >
                            {CATALOG_IMAGE_OPTIONS.map((opt) => (
                              <option key={opt.src} value={opt.src}>
                                {opt.label}
                              </option>
                            ))}
                            <option value="custom">Custom Image URL...</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Purity Badge
                          </label>
                          <input
                            type="text"
                            value={prodPurity}
                            onChange={(e) => setProdPurity(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs text-[#E6D7C3] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#C7B198] mb-1">
                            Image Path / URL
                          </label>
                          <input
                            type="text"
                            value={prodImage}
                            onChange={(e) => setProdImage(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-xs text-[#E6D7C3] focus:outline-none focus:border-[#EAB344]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#C7B198] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={prodDesc}
                          onChange={(e) => setProdDesc(e.target.value)}
                          placeholder="Short homemade pack description..."
                          className="w-full px-3 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <label className="inline-flex items-center gap-2 text-xs text-[#E6D7C3] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={prodFeatured}
                            onChange={(e) => setProdFeatured(e.target.checked)}
                            className="accent-[#EAB344]"
                          />
                          <span>Mark as Featured Pack</span>
                        </label>

                        <button
                          type="submit"
                          disabled={busyId !== null}
                          className="px-5 py-2 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] cursor-pointer"
                        >
                          {editingProductId ? 'Update Product' : 'Save New Product'}
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2.5">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="p-3 sm:p-3.5 rounded-xl bg-[#21120B]/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover bg-[#2E1910] shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#FDF6E9] truncate">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-[#C7B198] truncate">
                              {product.category} · {product.packSize}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <div className="inline-flex items-center rounded-lg bg-[#140B07] border border-white/15 px-2 py-1">
                            <span className="text-[11px] font-mono text-[#EAB344] mr-1">
                              Rs.
                            </span>
                            <input
                              type="number"
                              min={1}
                              value={priceDrafts[product.id] ?? String(product.pricePkr)}
                              onChange={(e) =>
                                setPriceDrafts((prev) => ({
                                  ...prev,
                                  [product.id]: e.target.value,
                                }))
                              }
                              className="w-20 bg-transparent text-xs font-mono text-[#FDF6E9] focus:outline-none"
                              aria-label={`Price for ${product.name}`}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleQuickSaveProductPrice(product)}
                            disabled={busyId === product.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#EAB344]/20 border border-[#EAB344]/40 text-xs font-semibold text-[#F5C451] hover:bg-[#EAB344] hover:text-[#140B07] cursor-pointer"
                            title="Save updated rate"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Rate</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => startEditProduct(product)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/15 text-xs text-[#E6D7C3] hover:border-[#F5C451] cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {confirmDeleteId === product.id ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(product)}
                                disabled={busyId === product.id}
                                className="px-2 py-1.5 rounded-lg bg-[#991B1B] text-white text-[11px] font-semibold cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1.5 rounded-lg border border-white/15 text-[11px] text-[#C7B198] cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(product.id)}
                              className="p-1.5 rounded-lg border border-white/10 text-[#FCA5A5] hover:bg-[#991B1B]/30 cursor-pointer"
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
