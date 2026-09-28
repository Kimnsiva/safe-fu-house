import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, MessageSquare } from 'lucide-react';

const realWorkshops = [
  {
    id: 'ws-marbling',
    title: 'Marbling Art',
    titleTh: 'ศิลปะบนผิวน้ำ (Suminagashi)',
    desc: 'คลาสออกแบบลวดลาย สวนบนผิวน้ำและจุ่มผลิตภัณฑ์เพื่อสร้างลวดลายชิ้นเดียวในโลก เช่น แก้วน้ำ กระติกน้ำ เคสโทรศัพท์ แจกัน ถ้วย กระเป๋า จนไปถึงเฟอร์นิเจอร์',
    price: 'เริ่มต้น ฿650',
    schedule: 'MON – SUN · 10:00 / 13:00 / 16:00',
    badge: 'Walk-in Accepted',
    badgeColor: 'bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]',
  },
  {
    id: 'ws-resin',
    title: 'Resin Art',
    titleTh: 'ออกแบบเรซิ่นดอกไม้ & มอส',
    desc: 'คลาสออกแบบเครื่องประดับ กระเป๋า สวนในขวด หวี เคสมือถือ กระจก ถาด และของเครื่องใช้ต่างๆ ด้วยเทคนิคเรซิ่นญี่ปุ่น',
    price: 'เริ่มต้น ฿300',
    schedule: 'MON – SUN · 11:00 / 13:00 / 15:00',
    badge: 'Walk-in Accepted',
    badgeColor: 'bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]',
  },
  {
    id: 'ws-zen-garden',
    title: 'Matcha Pairing & Zen Garden',
    titleTh: 'ชิมมัทฉะ 6 คอร์ส & จัดสวนญี่ปุ่น',
    desc: 'เปิดประสบการณ์ชิมมัทฉะในรูปแบบใหม่ และจัดสวนญี่ปุ่น พาสำรวจประสาทสัมผัสผ่านคอร์ส matcha testing 6 เมนู และถ่ายทอดรสชาติออกมาผ่านการจัดสวนญี่ปุ่นเป็นชิ้นงานกลับบ้าน',
    price: '฿2,390 / ท่าน',
    schedule: 'SAT – SUN · 10:00 / 13:00',
    badge: 'Advance Booking Only',
    badgeColor: 'bg-[#2E7D32] text-white',
  },
  {
    id: 'ws-wabi-sabi',
    title: 'Wabi-Sabi Painting & Texture Art',
    titleTh: 'ภาพวาดเท็กซ์เจอร์ 3 มิติ',
    desc: 'คลาสเพ้นท์ติ้ง 3 มิติ ด้วยการใช้วัสดุที่ถูกมองข้าม ผสมผสานเท็กซ์เจอร์ดินและแร่ธรรมชาติลงบนแคนวาสหรือเฟรมไม้สไตล์มินิมอล',
    price: 'เริ่มต้น ฿850',
    schedule: 'MON – SUN · 10:00 – 16:00',
    badge: 'Walk-in Accepted',
    badgeColor: 'bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9]',
  },
];

export function Workshops() {
  return (
    <section id="workshops" className="py-24 md:py-36 bg-white border-t border-[#E0ECE1]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">
                Marblin Marblin x Safe-fu house
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#132A17] font-normal leading-[1.08]">
              Sip matcha,<br />
              <em className="italic font-normal text-[#2E7D32]">make art, feel inspired.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-[#506954] font-light leading-relaxed max-w-lg mb-4">
              Explore mindful art sessions in our Japanese courtyard. Sessions available daily (Closed every Wednesday).
            </p>
            <div className="flex items-center gap-4 text-xs">
              <a
                href="https://line.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2E7D32] text-white text-[11px] tracking-wider uppercase font-semibold hover:bg-[#236827] transition-colors shadow-sm"
              >
                <MessageSquare size={14} strokeWidth={2} />
                <span>Line @marblinmarblin</span>
              </a>
              <span className="text-[#506954] text-[11px] font-medium">IG: @marblinmarblin</span>
            </div>
          </div>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {realWorkshops.map((ws, i) => (
            <motion.div
              key={ws.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-[24px] border border-[#E0ECE1] bg-white p-8 flex flex-col justify-between hover:border-[#2E7D32] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase font-semibold ${ws.badgeColor}`}>
                    {ws.badge}
                  </span>
                  <span className="text-sm font-semibold text-[#2E7D32] tracking-wider">
                    {ws.price}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#132A17] font-normal group-hover:text-[#2E7D32] transition-colors duration-300 mb-1">
                  {ws.title}
                </h3>
                <p className="text-xs text-[#2E7D32] font-semibold mb-3">
                  {ws.titleTh}
                </p>

                <p className="text-xs text-[#506954] font-light leading-relaxed mb-6">
                  {ws.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E0ECE1] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#506954] text-[11px] font-medium">
                  <Clock size={13} strokeWidth={2} className="text-[#2E7D32]" />
                  <span>{ws.schedule}</span>
                </div>

                <div className="w-9 h-9 rounded-full border border-[#E0ECE1] flex items-center justify-center group-hover:bg-[#2E7D32] group-hover:border-[#2E7D32] group-hover:text-white text-[#506954] transition-all duration-300 bg-[#F4FAF5]">
                  <ArrowUpRight size={15} strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}