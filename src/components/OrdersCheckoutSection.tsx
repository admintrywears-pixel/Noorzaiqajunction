import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import {
  buildOrderWhatsAppText,
  buildOrderWhatsAppUrl,
  MENU_ITEMS,
  QUICK_ATTACH_IDS,
  WHATSAPP_DISPLAY,
} from '../data/menuData';
import type { CartEntry, MenuItem } from '../types';

interface OrdersCheckoutSectionProps {
  entries: CartEntry[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function OrdersCheckoutSection({
  entries,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: OrdersCheckoutSectionProps) {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('Karachi Home Delivery');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    orderId: string;
    whatsappUrl: string;
    whatsappText: string;
    customerName: string;
    total: number;
  } | null>(null);

  const subtotal = useMemo(
    () => entries.reduce((sum, e) => sum + e.item.pricePkr * e.quantity, 0),
    [entries]
  );
  const deliveryFee = fulfillment === 'delivery' && subtotal > 0 && subtotal < 2500 ? 180 : 0;
  const total = subtotal + deliveryFee;

  const quickItems = useMemo(
    () =>
      QUICK_ATTACH_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(
        (m): m is MenuItem => Boolean(m)
      ),
    []
  );

  const isReady =
    entries.length > 0 &&
    customerName.trim().length > 0 &&
    phone.trim().length > 0 &&
    (fulfillment === 'pickup' || address.trim().length > 0);

  const liveOrderId = useMemo(
    () => `NZJ-${Math.floor(1000 + (subtotal % 8999))}`,
    [subtotal]
  );

  const payload = useMemo(
    () => ({
      orderId: liveOrderId,
      fulfillment,
      branch,
      entries,
      subtotal,
      deliveryFee,
      total,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
    }),
    [liveOrderId, fulfillment, branch, entries, subtotal, deliveryFee, total, customerName, phone, address, notes]
  );

  const liveWhatsAppUrl = useMemo(() => buildOrderWhatsAppUrl(payload), [payload]);

  const finalizeReceipt = () => {
    setErrorMsg('');
    setConfirmed({
      orderId: liveOrderId,
      whatsappUrl: liveWhatsAppUrl,
      whatsappText: buildOrderWhatsAppText(payload),
      customerName: customerName.trim(),
      total,
    });
    onClearCart();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (entries.length === 0) {
      setErrorMsg('Please attach at least one dish to your order tray first.');
      return;
    }
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and mobile/WhatsApp number.');
      return;
    }
    if (fulfillment === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your complete delivery address.');
      return;
    }
    finalizeReceipt();
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard restrictions
    }
  };

  return (
    <section
      id="orders-checkout"
      className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-20"
    >
      <div className="rounded-tl-[3.75rem] rounded-br-[3.75rem] rounded-tr-2xl rounded-bl-2xl bg-[#08261C]/94 border border-[#EAB344]/35 p-7 sm:p-11 shadow-2xl space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#F5C451]">
              Direct Kitchen Dispatch · {WHATSAPP_DISPLAY}
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FDF9EE]">
              Your Attached Order Tray &amp; WhatsApp Checkout
            </h2>
            <p lang="ur" className="font-urdu text-lg sm:text-2xl text-[#EAB344]">
              منتخب ڈشز اور تصاویر کے ساتھ براہِ راست واٹس ایپ آرڈر بھیجیں
            </p>
          </div>
          <p className="text-xs sm:text-sm text-[#D7D2BE] max-w-sm">
            Every selected plate automatically attaches its dish photo, spice level, and
            live PKR subtotal directly into WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-[#FDF9EE]">
                Attached Dishes ({entries.reduce((s, e) => s + e.quantity, 0)})
              </h3>
              {entries.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-[#B2C1B7] hover:text-[#F5C451] underline cursor-pointer"
                >
                  Clear Order Tray
                </button>
              )}
            </div>

            {entries.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#061C14] border border-[#EAB344]/20 space-y-3">
                <p className="text-sm font-semibold text-[#FDF9EE]">
                  No dishes attached yet
                </p>
                <p className="text-xs text-[#B2C1B7]">
                  Tap any popular homemade or frozen favorite below to attach it
                  instantly to your WhatsApp order:
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {entries.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#061C14] border border-[#EAB344]/30 flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EAB344]/20"
                    />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <p className="text-sm font-semibold text-[#FDF9EE] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#F5C451]">{item.spice}</p>
                      <p className="text-xs font-mono tabular-nums text-[#EAB344]">
                        Rs. {(item.pricePkr * quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-[#0B3024] text-[#FDF9EE] border border-[#EAB344]/20 flex items-center justify-center hover:border-[#F5C451] cursor-pointer"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold tabular-nums text-[#FDF9EE]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-[#0B3024] text-[#FDF9EE] border border-[#EAB344]/20 flex items-center justify-center hover:border-[#F5C451] cursor-pointer"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="w-7 h-7 rounded-lg text-[#B2C1B7] hover:text-[#F5C451] flex items-center justify-center cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F5C451]">
                Quick-Attach Homemade Favorites
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {quickItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onAddToCart(item)}
                    className="group flex items-center gap-2.5 p-2 rounded-xl bg-[#061C14] border border-[#EAB344]/20 hover:border-[#F5C451]/70 text-left transition-colors cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#FDF9EE] truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#F5C451] tabular-nums">
                        Rs. {item.pricePkr.toLocaleString()}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-[#F5C451] shrink-0 mr-1" />
                  </button>
                ))}
              </div>
            </div>

            {entries.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#061C14] border border-[#EAB344]/25 space-y-2 text-sm">
                <div className="flex justify-between text-[#D7D2BE]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#D7D2BE]">
                  <span>Delivery (Free over Rs. 2,500)</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EAB344]/15 flex justify-between font-semibold text-[#FDF9EE]">
                  <span>Total Payable</span>
                  <span className="font-mono tabular-nums text-[#F5C451]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl bg-[#0B2E22] border border-[#EAB344]/30">
            {confirmed ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-[#F5C451]">
                  <CheckCircle2 className="w-7 h-7 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">
                      WhatsApp Kitchen Dispatch Ready
                    </p>
                    <h3 className="text-2xl font-semibold text-[#FDF9EE]">
                      {confirmed.orderId}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#D8D3C2] leading-relaxed">
                  Shukriya,{' '}
                  <span className="font-semibold text-[#FDF9EE]">
                    {confirmed.customerName}
                  </span>
                  . Your fresh Noor Zaiqa Junction order totaling{' '}
                  <span className="font-mono text-[#F5C451] font-semibold">
                    Rs. {confirmed.total.toLocaleString()}
                  </span>{' '}
                  is formatted with dish photos for WhatsApp {WHATSAPP_DISPLAY}.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={confirmed.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-sm font-bold hover:bg-[#F5C451] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => void handleCopy(confirmed.whatsappText)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-[#EAB344]/25 bg-[#061C14] text-xs font-medium text-[#FDF9EE] hover:border-[#EAB344] cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#F5C451]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? 'Copied' : 'Copy Order Text'}</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="text-xs text-[#B2C1B7] hover:text-[#F5C451] underline cursor-pointer"
                >
                  Place Another Kitchen Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#F5C451]">
                    WhatsApp Order Checkout
                  </p>
                  <h3 className="text-2xl font-semibold text-[#FDF9EE]">
                    Complete Details &amp; Send to {WHATSAPP_DISPLAY}
                  </h3>
                </div>

                {entries.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#061C14] border border-[#EAB344]/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F5C451] font-medium">
                        Auto-Attached Dish Photos ({entries.length})
                      </span>
                      <span className="text-[#B2C1B7] font-mono">
                        Included in WhatsApp Order
                      </span>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {entries.map(({ item, quantity }) => (
                        <div
                          key={item.id}
                          className="relative shrink-0 rounded-lg overflow-hidden border border-[#EAB344]/40"
                          title={`${quantity}x ${item.name}`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover"
                          />
                          <span className="absolute bottom-0 right-0 px-1 text-[10px] font-mono font-semibold bg-[#051811]/90 text-[#F5C451]">
                            {quantity}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#061C14] border border-[#EAB344]/20">
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'delivery'
                        ? 'bg-[#EAB344] text-[#072118]'
                        : 'text-[#D8D3C2] hover:text-[#FDF9EE]'
                    }`}
                  >
                    Home Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'pickup'
                        ? 'bg-[#EAB344] text-[#072118]'
                        : 'text-[#D8D3C2] hover:text-[#FDF9EE]'
                    }`}
                  >
                    Self Pickup
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#D7D2BE] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Bilal Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-[#EAB344]/20 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#D7D2BE] mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-[#EAB344]/20 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#D7D2BE] mb-1">
                    Noor Zaiqa Junction Delivery Zone
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-[#EAB344]/20 text-sm text-[#FDF9EE] focus:outline-none focus:border-[#EAB344]"
                  >
                    <option>Karachi Home Delivery</option>
                    <option>Clifton / Defence / Saddar, Karachi</option>
                    <option>Gulshan / Nazimabad / PECHS, Karachi</option>
                  </select>
                </div>

                {fulfillment === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-[#D7D2BE] mb-1">
                      Complete Delivery Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / Flat, Street, Block / Sector"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-[#EAB344]/20 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#D7D2BE] mb-1">
                    Custom Dish / Masala Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Less spicy, frozen shami pack, or any custom dish request"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#061C14] border border-[#EAB344]/20 text-sm text-[#FDF9EE] placeholder:text-[#7E9689] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {isReady ? (
                  <a
                    href={liveWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={finalizeReceipt}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      Send Order Direct on WhatsApp ({WHATSAPP_DISPLAY}) · Rs.{' '}
                      {total.toLocaleString()}
                    </span>
                  </a>
                ) : (
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#072118] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm &amp; Send on WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
