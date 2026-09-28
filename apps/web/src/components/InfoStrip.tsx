import { MapPin, Clock, Phone } from 'lucide-react';

function isOpenNow(): boolean {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const day = now.getDay(); // 0=Sun
  if (day === 3) return false; // Wednesday closed
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour * 60 + minute;
  return time >= 540 && time < 1080; // 09:00 - 18:00
}

export function InfoStrip() {
  const open = isOpenNow();

  return (
    <section id="visit" className="py-24 md:py-36 bg-white border-t border-[#E0ECE1]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">Sanctuary</p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#132A17] font-normal">
            Come find <em className="italic font-normal text-[#2E7D32]">us.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Location */}
          <div className="rounded-[26px] border border-[#E0ECE1] bg-white p-8 md:p-10 text-center shadow-sm hover:border-[#2E7D32] transition-all duration-300">
            <MapPin size={22} strokeWidth={1.5} className="mx-auto text-[#2E7D32] mb-4" />
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#506954] mb-3 font-semibold">Location</h4>
            <p className="text-sm text-[#132A17] font-light leading-relaxed">
              672 Phetkasem 94<br />
              Bang Khae, Bangkok<br />
              10160
            </p>
            <a
              href="https://maps.google.com/?q=Safe-fu+House"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-[11px] tracking-[0.2em] uppercase text-[#2E7D32] hover:text-[#1B5E20] border-b border-[#2E7D32]/40 pb-0.5 font-medium transition-colors"
            >
              Get directions →
            </a>
          </div>

          {/* Hours */}
          <div className="rounded-[26px] border border-[#E0ECE1] bg-white p-8 md:p-10 text-center shadow-sm hover:border-[#2E7D32] transition-all duration-300">
            <Clock size={22} strokeWidth={1.5} className="mx-auto text-[#2E7D32] mb-4" />
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#506954] mb-3 font-semibold">Hours</h4>
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] border border-[#C8E6C9]">
              <span className={`w-2 h-2 rounded-full ${open ? 'bg-[#2E7D32] animate-pulse' : 'bg-gray-400'}`} />
              <span className={`text-[11px] tracking-[0.15em] uppercase ${open ? 'text-[#1B5E20]' : 'text-gray-500'} font-semibold`}>
                {open ? 'Open now' : 'Closed'}
              </span>
            </div>
            <p className="text-sm text-[#132A17] font-light leading-relaxed">
              Daily 09:00 – 18:00<br />
              Closed every Wednesday
            </p>
          </div>

          {/* Contact */}
          <div className="rounded-[26px] border border-[#E0ECE1] bg-white p-8 md:p-10 text-center shadow-sm hover:border-[#2E7D32] transition-all duration-300">
            <Phone size={22} strokeWidth={1.5} className="mx-auto text-[#2E7D32] mb-4" />
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#506954] mb-3 font-semibold">Contact</h4>
            <p className="text-sm text-[#132A17] font-medium leading-relaxed">
              081 622 2111
            </p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <a href="#" className="text-[11px] tracking-[0.15em] uppercase text-[#2E7D32] hover:text-[#1B5E20] font-medium transition-colors">
                Instagram
              </a>
              <span className="text-[#C8DBC9]">·</span>
              <a href="#" className="text-[11px] tracking-[0.15em] uppercase text-[#2E7D32] hover:text-[#1B5E20] font-medium transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}