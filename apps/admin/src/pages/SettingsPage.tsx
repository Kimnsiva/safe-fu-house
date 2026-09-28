import { useState } from 'react';
import { Check } from 'lucide-react';

export function SettingsPage() {
  const [announcement, setAnnouncement] = useState('Open daily 09:00 – 18:00 · Closed every Wednesday');
  const [slowBarMsg, setSlowBarMsg] = useState('Matcha, slowly.');
  const [phone, setPhone] = useState('081 622 2111');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">Preferences</p>
        </div>
        <h2 className="text-4xl font-serif font-normal text-[#132A17]">การตั้งค่าร้าน Safe-fu</h2>
        <p className="text-xs text-[#506954] mt-1 font-light">ข้อมูลทั่วไปและข้อความที่ปรากฏบนหน้า Landing Page</p>
      </div>

      <div className="bg-white rounded-[24px] border border-[#E0ECE1] p-8 md:p-10 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6 max-w-xl">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] mb-2 text-[#506954] font-semibold">
              Announcement Bar (แถบประกาศด้านบนสุด)
            </label>
            <input
              type="text"
              className="w-full border border-[#E0ECE1] rounded-[14px] px-4 py-3 bg-[#F7FAF7] text-[#132A17] text-sm focus:outline-none focus:border-[#2E7D32] transition-colors"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] mb-2 text-[#506954] font-semibold">
              Slow Bar Tagline (สโลแกนหลัก)
            </label>
            <input
              type="text"
              className="w-full border border-[#E0ECE1] rounded-[14px] px-4 py-3 bg-[#F7FAF7] text-[#132A17] text-sm focus:outline-none focus:border-[#2E7D32] transition-colors"
              value={slowBarMsg}
              onChange={(e) => setSlowBarMsg(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] mb-2 text-[#506954] font-semibold">
              Contact Phone (เบอร์ติดต่อ)
            </label>
            <input
              type="text"
              className="w-full border border-[#E0ECE1] rounded-[14px] px-4 py-3 bg-[#F7FAF7] text-[#132A17] text-sm focus:outline-none focus:border-[#2E7D32] transition-colors"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="bg-[#2E7D32] text-white px-8 py-3 rounded-full text-xs uppercase tracking-wider hover:bg-[#236827] transition-all duration-300 shadow-sm font-medium"
            >
              บันทึกการตั้งค่า
            </button>

            {saved && (
              <span className="flex items-center gap-1.5 text-xs text-[#2E7D32] font-medium">
                <Check size={16} />
                <span>บันทึกเรียบร้อย</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}