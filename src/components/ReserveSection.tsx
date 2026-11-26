import { IMAGE_ASSETS } from '../data/menuData';
import { CustomOrderForm } from './CustomOrderForm';

export function ReserveSection() {
  return (
    <section id="reserve" className="relative z-10 text-[#FDF6E9] py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
            <div className="rounded-t-[150px] sm:rounded-t-[200px] rounded-b-2xl sm:rounded-b-3xl p-2 sm:p-2.5 border border-[#EAB344]/35 bg-[#21120B]/88 flex-1 min-h-[240px] sm:min-h-[300px] shadow-2xl">
              <div className="w-full h-full rounded-t-[140px] sm:rounded-t-[190px] rounded-b-xl sm:rounded-b-2xl overflow-hidden bg-[#2E1910]">
                <img
                  src={IMAGE_ASSETS.mutanjanZarda}
                  alt="Zaiqa Junction Mutanjan Zarda & Homemade Dawat Feast"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-[#21120B]/90 border border-[#EAB344]/20 text-xs text-[#C7B198]">
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

          <div className="lg:col-span-7 rounded-tl-[1.75rem] rounded-br-[1.75rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl sm:rounded-tr-2xl sm:rounded-bl-2xl bg-[#21120B]/94 border border-[#EAB344]/35 p-5 sm:p-8 lg:p-10 shadow-2xl flex flex-col justify-between">
            <CustomOrderForm variant="section" />
          </div>
        </div>
      </div>
    </section>
  );
}
