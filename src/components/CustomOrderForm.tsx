import {
  AlertCircle,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Plus,
  Store,
  Trash2,
  Truck,
} from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../data/menuData';

interface CustomDishRow {
  id: string;
  name: string;
  quantity: string;
  spice: string;
}

interface CustomOrderFormProps {
  variant?: 'page' | 'section';
}

const TIME_SLOTS = [
  'Lunch (1:00 PM – 3:00 PM)',
  'Evening Snacks (5:00 PM – 7:00 PM)',
  'Dinner (7:30 PM – 9:30 PM)',
  'Late Dinner (10:00 PM – 11:30 PM)',
  'Custom Time',
] as const;

const SPICE_OPTIONS = [
  'Classic Masala',
  'Mild / Less Spice',
  'Spicy Homestyle',
  'Zero Spice (Kids / Elders)',
] as const;

function createEmptyDish(index: number): CustomDishRow {
  return {
    id: `dish-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
    name: '',
    quantity: '1 KG',
    spice: 'Classic Masala',
  };
}

function formatTime12h(time24: string): string {
  if (!time24 || !time24.includes(':')) return time24;
  const [hStr, mStr] = time24.split(':');
  const h = Number(hStr);
  if (Number.isNaN(h)) return time24;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${mStr} ${suffix}`;
}

export function CustomOrderForm({ variant = 'page' }: CustomOrderFormProps) {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('2026-11-26');
  const [slot, setSlot] = useState<string>('Dinner (7:30 PM – 9:30 PM)');
  const [customTime, setCustomTime] = useState('19:30');
  const [orderType, setOrderType] = useState('Custom Dish Outside Menu');
  const [dishes, setDishes] = useState<CustomDishRow[]>([createEmptyDish(1)]);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState<{
    id: string;
    name: string;
    phone: string;
    fulfillmentLabel: string;
    address: string;
    date: string;
    timeLabel: string;
    dishes: CustomDishRow[];
    whatsappUrl: string;
  } | null>(null);

  const handleAddDish = () => {
    setDishes((prev) => [...prev, createEmptyDish(prev.length + 1)]);
  };

  const handleRemoveDish = (id: string) => {
    setDishes((prev) => (prev.length > 1 ? prev.filter((d) => d.id !== id) : prev));
  };

  const handleUpdateDish = (
    id: string,
    field: keyof Omit<CustomDishRow, 'id'>,
    value: string
  ) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const validDishes = useMemo(
    () => dishes.filter((d) => d.name.trim().length > 0),
    [dishes]
  );

  const isReady =
    guestName.trim().length > 0 &&
    phone.trim().length > 0 &&
    (fulfillment === 'pickup' || address.trim().length > 0) &&
    date.trim().length > 0 &&
    (slot !== 'Custom Time' || customTime.trim().length > 0) &&
    validDishes.length > 0;

  const liveOrderId = useMemo(
    () => `ORD-${1000 + ((guestName.length * 137 + validDishes.length * 97) % 8999)}`,
    [guestName.length, validDishes.length]
  );

  const liveTimeLabel = useMemo(
    () => (slot === 'Custom Time' ? `Custom Time (${formatTime12h(customTime)})` : slot),
    [slot, customTime]
  );

  const liveFulfillmentLabel =
    fulfillment === 'delivery' ? 'Home Delivery' : 'Self Pickup';

  const liveWhatsAppUrl = useMemo(() => {
    const dishLines = validDishes.map(
      (dish, idx) =>
        `${idx + 1}. *${dish.name.trim()}* — Qty: ${dish.quantity.trim() || '1 KG'} | Spice: ${dish.spice}`
    );

    const lines = [
      '*ZAIQA JUNCTION™ — CUSTOM / DAWAT ORDER*',
      `Ref: *${liveOrderId}*`,
      `Order Type: ${orderType}`,
      `Mode: ${liveFulfillmentLabel}`,
      `Date & Time: ${date} · ${liveTimeLabel}`,
      '',
      `*Requested Dishes (${validDishes.length}):*`,
      ...dishLines,
      '',
      '*Customer Details:*',
      `Name: ${guestName.trim()}`,
      `Mobile: ${phone.trim()}`,
      ...(fulfillment === 'delivery'
        ? [`Address: ${address.trim()}`]
        : ['Pickup: Self Pickup from Karachi Kitchen']),
      ...(notes.trim() ? [`Extra Notes: ${notes.trim()}`] : []),
      '',
      'Ghar ka Zaiqa, Har Plate Mein · Sent via Zaiqa Junction Web',
    ];

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  }, [
    liveOrderId,
    orderType,
    liveFulfillmentLabel,
    date,
    liveTimeLabel,
    validDishes,
    guestName,
    phone,
    fulfillment,
    address,
    notes,
  ]);

  const confirmCustomOrder = () => {
    setErrorMsg('');
    setConfirmed({
      id: liveOrderId,
      name: guestName.trim(),
      phone: phone.trim(),
      fulfillmentLabel: liveFulfillmentLabel,
      address: address.trim(),
      date,
      timeLabel: liveTimeLabel,
      dishes: validDishes,
      whatsappUrl: liveWhatsAppUrl,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Full Name and Mobile Number.');
      return;
    }

    if (fulfillment === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your complete delivery address for Home Delivery.');
      return;
    }

    if (!date.trim()) {
      setErrorMsg('Please select a date for your order.');
      return;
    }

    if (slot === 'Custom Time' && !customTime.trim()) {
      setErrorMsg('Please enter your preferred custom time.');
      return;
    }

    if (validDishes.length === 0) {
      setErrorMsg('Please enter at least one dish name you want us to prepare.');
      return;
    }

    confirmCustomOrder();
  };

  if (confirmed) {
    return (
      <div className="space-y-4 my-auto">
        <div className="flex items-center gap-3 text-[#F5C451]">
          <CheckCircle2 className="w-7 h-7 shrink-0" />
          <div>
            <p className="text-xs font-mono uppercase">Custom Request Ready</p>
            <h3 className="text-2xl font-semibold text-[#FDF6E9]">{confirmed.id}</h3>
          </div>
        </div>

        <div className="rounded-xl bg-[#140B07]/90 border border-[#EAB344]/25 p-4 space-y-2 text-sm text-[#E6D7C3]">
          <p>
            <span className="text-[#C7B198]">Customer:</span>{' '}
            <span className="font-semibold text-[#FDF6E9]">{confirmed.name}</span> (
            {confirmed.phone})
          </p>
          <p>
            <span className="text-[#C7B198]">Mode:</span>{' '}
            <span className="font-semibold text-[#F5C451]">
              {confirmed.fulfillmentLabel}
            </span>
            {confirmed.address ? ` — ${confirmed.address}` : ''}
          </p>
          <p>
            <span className="text-[#C7B198]">Schedule:</span> {confirmed.date} ·{' '}
            {confirmed.timeLabel}
          </p>
          <div className="pt-2 border-t border-white/10 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F5C451]">
              Dishes ({confirmed.dishes.length})
            </p>
            {confirmed.dishes.map((dish, idx) => (
              <p key={dish.id} className="text-xs sm:text-sm text-[#FDF6E9]">
                {idx + 1}. {dish.name} — {dish.quantity} ({dish.spice})
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={confirmed.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send on WhatsApp ({WHATSAPP_DISPLAY})</span>
          </a>
          <button
            type="button"
            onClick={() => setConfirmed(null)}
            className="px-4 py-2.5 rounded-lg border border-[#EAB344]/35 text-xs font-semibold text-[#FDF6E9] hover:border-[#F5C451] transition-colors cursor-pointer"
          >
            Edit / New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
          Custom Order Form · کسٹم آرڈر فارم
        </p>
        <h2
          className={
            variant === 'page'
              ? 'text-2xl sm:text-3xl font-semibold text-[#FDF6E9]'
              : 'text-2xl sm:text-3xl font-semibold tracking-tight text-[#FDF6E9]'
          }
        >
          Fill Form to Order Any Dish Fresh
        </h2>
        <p lang="ur" className="font-urdu text-base sm:text-lg text-[#EAB344]">
          نام، موبائل نمبر، پتہ اور ڈشز شامل کر کے واٹس ایپ پر آرڈر بھیجیں
        </p>
      </div>

      {/* Customer Name & Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-medium text-[#C7B198] mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="e.g. Tariq Mahmood"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#C7B198] mb-1">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0300-1234567"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
          />
        </div>
      </div>

      {/* Home Delivery vs Self Pickup */}
      <div>
        <label className="block text-xs font-medium text-[#C7B198] mb-1.5">
          Delivery or Self Pickup · ڈلیوری یا خود پک اپ *
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setFulfillment('delivery')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              fulfillment === 'delivery'
                ? 'bg-[#EAB344]/20 border-[#EAB344] text-[#F5C451]'
                : 'bg-[#140B07] border-white/15 text-[#C7B198] hover:border-white/30'
            }`}
          >
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>Home Delivery</span>
          </button>
          <button
            type="button"
            onClick={() => setFulfillment('pickup')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              fulfillment === 'pickup'
                ? 'bg-[#EAB344]/20 border-[#EAB344] text-[#F5C451]'
                : 'bg-[#140B07] border-white/15 text-[#C7B198] hover:border-white/30'
            }`}
          >
            <Store className="w-3.5 h-3.5 shrink-0" />
            <span>Self Pickup</span>
          </button>
        </div>
      </div>

      {/* Address when Home Delivery is selected */}
      {fulfillment === 'delivery' ? (
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-[#C7B198] mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#EAB344]" />
            <span>Complete Delivery Address *</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House / Flat No, Street, Block / Area, Near Landmark, Karachi"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
          />
        </div>
      ) : (
        <div className="px-3.5 py-2.5 rounded-lg bg-[#140B07]/85 border border-[#EAB344]/25 text-xs text-[#C7B198]">
          Self Pickup chosen — Kitchen pickup address in Karachi will be shared upon
          WhatsApp confirmation.
        </div>
      )}

      {/* Custom Date, Time Slot / Custom Time & Order Type */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-medium text-[#C7B198] mb-1">
            Custom Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C7B198] mb-1">
            Time / Slot *
          </label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
          >
            {TIME_SLOTS.map((option) => (
              <option key={option} value={option}>
                {option === 'Custom Time'
                  ? 'Custom Time (Apna Time Chunein)'
                  : option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#C7B198] mb-1">
            Order Type
          </label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
          >
            <option>Custom Dish Outside Menu</option>
            <option>Family Dawat Pre-Order</option>
            <option>Monthly Home / Office Tiffin Plan</option>
          </select>
        </div>
      </div>

      {/* Custom Time picker shown clearly when Custom Time is chosen */}
      {slot === 'Custom Time' && (
        <div className="p-3 rounded-lg bg-[#140B07]/90 border border-[#EAB344]/35 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-xs font-semibold text-[#F5C451] shrink-0">
            Select Your Exact Custom Time:
          </label>
          <input
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 rounded-lg bg-[#21120B] border border-[#EAB344]/40 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#F5C451]"
          />
          <span className="text-xs text-[#C7B198]">
            Selected: {formatTime12h(customTime)}
          </span>
        </div>
      )}

      {/* Multi-Dish Add / Remove Section */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#F5C451]">
            Dishes to Prepare ({dishes.length}) · ڈشز شامل یا ختم کریں
          </label>
          <button
            type="button"
            onClick={handleAddDish}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAB344]/15 border border-[#EAB344]/50 text-xs font-semibold text-[#F5C451] hover:bg-[#EAB344] hover:text-[#140B07] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Dish</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {dishes.map((dish, idx) => (
            <div
              key={dish.id}
              className="p-3 rounded-xl bg-[#140B07]/95 border border-white/12 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#EAB344]">
                  Dish #{idx + 1}
                </span>
                {dishes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDish(dish.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[#FCA5A5] hover:bg-[#991B1B]/30 transition-colors cursor-pointer"
                    aria-label={`Remove Dish ${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    value={dish.name}
                    onChange={(e) =>
                      handleUpdateDish(dish.id, 'name', e.target.value)
                    }
                    placeholder="Dish name (e.g. White Chicken Karahi)"
                    className="w-full px-3 py-2 rounded-lg bg-[#21120B] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={dish.quantity}
                    onChange={(e) =>
                      handleUpdateDish(dish.id, 'quantity', e.target.value)
                    }
                    placeholder="Qty (e.g. 2 KG)"
                    className="w-full px-3 py-2 rounded-lg bg-[#21120B] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <select
                    value={dish.spice}
                    onChange={(e) =>
                      handleUpdateDish(dish.id, 'spice', e.target.value)
                    }
                    className="w-full px-2.5 py-2 rounded-lg bg-[#21120B] border border-white/15 text-xs sm:text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                  >
                    {SPICE_OPTIONS.map((sp) => (
                      <option key={sp} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddDish}
          className="w-full py-2 rounded-lg border border-dashed border-[#EAB344]/40 text-xs font-semibold text-[#F5C451] hover:bg-[#EAB344]/10 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Another Dish · مزید ڈش شامل کریں</span>
        </button>
      </div>

      {/* Extra cooking notes */}
      <div>
        <label className="block text-xs font-medium text-[#C7B198] mb-1">
          Special Instructions (Optional)
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Less oil, boneless chicken, raita & salad needed"
          className="w-full px-3.5 py-2 rounded-lg bg-[#140B07] border border-white/15 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
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
          onClick={confirmCustomOrder}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer shadow-lg"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Send Custom Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
        </a>
      ) : (
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer shadow-lg"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Send Custom Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
        </button>
      )}
    </form>
  );
}
