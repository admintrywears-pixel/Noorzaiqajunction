import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Minus,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { buildOrderWhatsAppUrl, WHATSAPP_DISPLAY } from '../data/menuData';
import type { CartEntry } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: CartEntry[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenOrdersPage: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  entries,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOpenOrdersPage,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<{
    orderId: string;
    customerName: string;
    fulfillment: 'delivery' | 'pickup';
    total: number;
    whatsappUrl: string;
  } | null>(null);

  const subtotal = useMemo(
    () => entries.reduce((sum, e) => sum + e.item.pricePkr * e.quantity, 0),
    [entries]
  );
  const deliveryFee = fulfillment === 'delivery' && subtotal > 0 && subtotal < 2500 ? 180 : 0;
  const total = subtotal + deliveryFee;

  const isReady =
    entries.length > 0 &&
    customerName.trim().length > 0 &&
    phone.trim().length > 0 &&
    (fulfillment === 'pickup' || address.trim().length > 0);

  const orderId = useMemo(() => `ZJ-${Math.floor(1000 + (subtotal % 8999))}`, [subtotal]);

  const whatsappUrl = useMemo(
    () =>
      buildOrderWhatsAppUrl({
        orderId,
        fulfillment,
        entries,
        subtotal,
        deliveryFee,
        total,
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
      }),
    [orderId, fulfillment, entries, subtotal, deliveryFee, total, customerName, phone, address]
  );

  const confirmOrder = () => {
    setErrorMsg('');
    setReceipt({
      orderId,
      customerName: customerName.trim(),
      fulfillment,
      total,
      whatsappUrl,
    });
    onClearCart();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and mobile number.');
      return;
    }
    if (fulfillment === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter a delivery address.');
      return;
    }
    confirmOrder();
  };

  const handleReset = () => {
    setReceipt(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Order Bag"
    >
      <div className="w-full max-w-md h-[100dvh] bg-[#FDF6E9] text-[#140B07] flex flex-col shadow-2xl">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#D4A64A]/30 flex items-center justify-between bg-[#21120B] text-[#FDF6E9]">
          <div>
            <h2 className="text-lg font-semibold text-[#F5C451]">
              Order Bag · <span lang="ur" className="font-urdu-inline text-base text-[#FDF6E9]">آرڈر بیگ</span>
            </h2>
            <p className="text-xs text-[#E6D7C3]">
              Zaiqa Junction · WhatsApp {WHATSAPP_DISPLAY}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-[#EAB344]/35 flex items-center justify-center text-[#FDF6E9] hover:bg-[#2E1910] cursor-pointer"
            aria-label="Close Order Bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {receipt ? (
            <div className="p-5 rounded-2xl bg-white border border-[#D4A64A]/30 space-y-4">
              <div className="flex items-center gap-3 text-[#21120B]">
                <CheckCircle2 className="w-6 h-6 text-[#D4A23E] shrink-0" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#9E7522]">
                    Order Confirmed
                  </p>
                  <h3 className="text-xl font-semibold text-[#140B07]">
                    {receipt.orderId}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#5E4030] leading-relaxed">
                Thank you,{' '}
                <span className="font-semibold text-[#140B07]">
                  {receipt.customerName}
                </span>
                . Your fresh Zaiqa Junction order is ready to send to WhatsApp{' '}
                <span className="font-mono">{WHATSAPP_DISPLAY}</span>.
              </p>

              <div className="pt-3 border-t border-[#140B07]/10 flex items-center justify-between text-sm">
                <span className="text-[#7A5742]">
                  {receipt.fulfillment === 'delivery'
                    ? 'Cash on Delivery Total'
                    : 'Pickup Counter Total'}
                </span>
                <span className="font-mono font-semibold tabular-nums text-[#140B07]">
                  Rs. {receipt.total.toLocaleString()}
                </span>
              </div>

              <a
                href={receipt.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to WhatsApp ({WHATSAPP_DISPLAY})</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 rounded-lg bg-[#21120B] text-[#FDF6E9] text-sm font-semibold hover:bg-[#2E1910] transition-colors cursor-pointer"
              >
                Back to Kitchen
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-14 text-center space-y-4">
              <p className="text-base font-semibold text-[#140B07]">
                Your order bag is empty
              </p>
              <p className="text-sm text-[#5E4030]">
                Add Beef or Chicken Shami Kabab, Chicken Achaari, Biryani, Qorma, Aalu
                Qeema, Zarda, Chowmien, or Daal Chawal + Kabab—or tell us any custom
                dish you want cooked on order.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrdersPage();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#21120B] text-[#F5C451] text-xs font-semibold hover:bg-[#2E1910] cursor-pointer"
              >
                <span>Open Full Orders Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenOrdersPage();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F3E6D2] text-[#140B07] text-xs font-semibold hover:bg-[#E8D4B4] transition-colors cursor-pointer border border-[#D4A64A]/30"
              >
                <span>Open Full Orders &amp; Attached Photo Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="space-y-3">
                {entries.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white border border-[#D4A64A]/30 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#D4A64A]/25"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#140B07] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#7A5742] font-mono tabular-nums">
                        Rs. {(item.pricePkr * quantity).toLocaleString()} · {item.spice}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-7 h-7 rounded-md bg-[#F3E6D2] text-[#140B07] flex items-center justify-center hover:bg-[#E8D4B4] cursor-pointer"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-medium tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-7 h-7 rounded-md bg-[#F3E6D2] text-[#140B07] flex items-center justify-center hover:bg-[#E8D4B4] cursor-pointer"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="w-7 h-7 rounded-md text-[#855E14] hover:bg-[#F3E6D2] flex items-center justify-center cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2 border-t border-[#D4A64A]/25">
                <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-[#F3E6D2]">
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'delivery'
                        ? 'bg-[#21120B] text-[#F5C451]'
                        : 'text-[#5E4030] hover:text-[#140B07]'
                    }`}
                  >
                    Home Delivery (COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      fulfillment === 'pickup'
                        ? 'bg-[#21120B] text-[#F5C451]'
                        : 'text-[#5E4030] hover:text-[#140B07]'
                    }`}
                  >
                    Self Pickup
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#D4A64A]/30 space-y-2 text-sm">
                  <div className="flex justify-between text-[#7A5742]">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#7A5742]">
                    <span>Delivery (Free over Rs. 2,500)</span>
                    <span className="font-mono tabular-nums">
                      {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#140B07]/10 flex justify-between font-semibold text-[#140B07]">
                    <span>Total Payable</span>
                    <span className="font-mono tabular-nums">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5E4030] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Hamza Tariq"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4A64A]/35 text-sm text-[#140B07] focus:outline-none focus:border-[#21120B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5E4030] mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4A64A]/35 text-sm text-[#140B07] focus:outline-none focus:border-[#21120B]"
                    />
                  </div>
                  {fulfillment === 'delivery' && (
                    <div>
                      <label className="block text-xs font-medium text-[#5E4030] mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House, Street & Sector"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-[#D4A64A]/35 text-sm text-[#140B07] focus:outline-none focus:border-[#21120B]"
                      />
                    </div>
                  )}
                  {errorMsg && (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </form>
              </div>
            </>
          )}
        </div>

        {!receipt && entries.length > 0 && (
          <div className="p-5 border-t border-[#D4A64A]/30 bg-white">
            {isReady ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={confirmOrder}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#21120B] text-[#F5C451] text-sm font-bold hover:bg-[#2E1910] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#EAB344]" />
                <span>
                  Send on WhatsApp ({WHATSAPP_DISPLAY}) · Rs. {total.toLocaleString()}
                </span>
              </a>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 rounded-lg bg-[#21120B] text-[#F5C451] text-sm font-bold hover:bg-[#2E1910] transition-colors cursor-pointer"
              >
                Confirm &amp; Send on WhatsApp · Rs. {total.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
