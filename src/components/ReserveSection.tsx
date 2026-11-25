import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { IMAGE_ASSETS, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../data/menuData';

export function ReserveSection() {
  const [guestName, setGuestName] = useState('');
  const [zone, setZone] = useState('Karachi Home Delivery');
  const [date, setDate] = useState('2026-11-26');
  const [slot, setSlot] = useState('Dinner (7:30 PM – 9:30 PM)');
  const [packSize, setPackSize] = useState('Family Meal / 1–2 KG Order');
  const [customRequest, setCustomRequest] = useState('Special Custom Homemade Dish');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingRef, setBookingRef] = useState<{
    id: string;
    name: string;
    zone: string;
    date: string;
    slot: string;
    packSize: string;
    customRequest: string;
    whatsappUrl: string;
  } | null>(null);

  const handleReserve = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Please enter your name to book a custom or dawat order.');
      return;
    }
    setErrorMsg('');
    const id = `ORD-${Math.floor(1000 + Math.random() * 8999)}`;
    const text = [
      '*NOOR ZAIQA JUNCTION™ — CUSTOM / DAWAT ORDER*',
      `Ref: *${id}*`,
      `Name: ${guestName.trim()}`,
      `Karachi Zone: ${zone}`,
      `Date & Slot: ${date} (${slot})`,
      `Order Scale: ${packSize}`,
      `Custom Request: ${customRequest}`,
    ].join('\n');

    setBookingRef({
      id,
      name: guestName.trim(),
      zone,
      date,
      slot,
      packSize,
      customRequest,
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    });
  };

  return (
    <section id="reserve" className="relative z-10 text-[#FDF6E9] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="rounded-t-[200px] rounded-b-3xl p-2.5 border border-[#EAB344]/35 bg-[#21120B]/88 flex-1 min-h-[300px] shadow-2xl">
              <div className="w-full h-full rounded-t-[190px] rounded-b-2xl overflow-hidden bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.mutanjanZarda}
                  alt="Noor Zaiqa Junction Mutanjan Zarda & Homemade Dawat Feast"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#21120B]/90 border border-[#EAB344]/20 text-xs text-[#C7B198]">
              <div>
                <p className="font-semibold text-[#F5C451]">1 KG Trays</p>
                <p>Biryani, Qorma, Achaari, Qeema, Zarda</p>
              </div>
              <div>
                <p className="font-semibold text-[#F5C451]">12-Piece Kababs</p>
                <p>Beef &amp; Chicken Shami (Fresh / Frozen)</p>
              </div>
              <div>
                <p className="font-semibold text-[#F5C451]">Order Par Tayyar</p>
                <p>In dishes ke ilawa har dish on order</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-[#21120B]/94 border border-[#EAB344]/35 p-7 sm:p-10 shadow-2xl flex flex-col justify-between">
            {bookingRef ? (
              <div className="space-y-5 my-auto">
                <div className="flex items-center gap-3 text-[#F5C451]">
                  <CheckCircle2 className="w-7 h-7 shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase">Custom Request Ready</p>
                    <h3 className="text-2xl font-semibold text-[#FDF6E9]">
                      {bookingRef.id}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#E6D7C3]">
                  Shukriya,{' '}
                  <span className="font-semibold text-[#FDF6E9]">
                    {bookingRef.name}
                  </span>
                  . Your request for{' '}
                  <span className="font-semibold text-[#F5C451]">
                    {bookingRef.packSize}
                  </span>{' '}
                  ({bookingRef.customRequest}) in {bookingRef.zone} on {bookingRef.date} (
                  {bookingRef.slot}) is ready to send on WhatsApp.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={bookingRef.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#EAB344] text-[#140B07] text-xs font-bold hover:bg-[#F5C451] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm on WhatsApp ({WHATSAPP_DISPLAY})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingRef(null);
                      setGuestName('');
                    }}
                    className="px-4 py-2.5 rounded-lg border border-[#EAB344]/35 text-xs font-semibold text-[#FDF6E9] hover:border-[#F5C451] transition-colors cursor-pointer"
                  >
                    New Custom Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="space-y-2 pb-2">
                  <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#F5C451]">
                    Custom Homemade Cooking · 0371-2442688
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-[#FDF6E9]">
                    Book Custom Dishes or Dawat Trays
                  </h2>
                  <p lang="ur" className="font-urdu text-lg text-[#EAB344]">
                    ان ڈشز کے علاوہ بھی جو بنوانا ہو، آرڈر پر تیار ہو جاتا ہے
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#E6D7C3] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Ayesha Siddiqui"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-[#EAB344]/20 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#E6D7C3] mb-1">
                      Karachi Delivery Zone
                    </label>
                    <select
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-[#EAB344]/20 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Karachi Home Delivery</option>
                      <option>Clifton / Defence / PECHS</option>
                      <option>Gulshan / Nazimabad / North</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#E6D7C3] mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-[#EAB344]/20 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#E6D7C3] mb-1">
                      Delivery Slot
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-[#EAB344]/20 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Lunch (1:00 PM – 3:00 PM)</option>
                      <option>Dinner (7:30 PM – 9:30 PM)</option>
                      <option>Late Dinner (10:00 PM – 11:30 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#E6D7C3] mb-1">
                      Quantity / Scale
                    </label>
                    <select
                      value={packSize}
                      onChange={(e) => setPackSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-[#EAB344]/20 text-sm text-[#FDF6E9] focus:outline-none focus:border-[#EAB344]"
                    >
                      <option>Family Meal / 1–2 KG Order</option>
                      <option>Frozen Shami Kabab Trays (24+)</option>
                      <option>Dawat Catering (10–25 Guests)</option>
                      <option>Custom Daily Tiffin Plan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E6D7C3] mb-1">
                    Custom Dish / Preference (Anything Outside Menu)
                  </label>
                  <input
                    type="text"
                    value={customRequest}
                    onChange={(e) => setCustomRequest(e.target.value)}
                    placeholder="e.g. Karahi, Nihari, Palak Paneer, Haleem, or Mild Masala"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0705] border border-[#EAB344]/20 text-sm text-[#FDF6E9] placeholder:text-[#9E8468] focus:outline-none focus:border-[#EAB344]"
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
                  className="w-full py-3 rounded-lg bg-[#EAB344] text-[#140B07] text-sm font-bold hover:bg-[#F5C451] transition-colors cursor-pointer"
                >
                  Prepare Custom Order for WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
