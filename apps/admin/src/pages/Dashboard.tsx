import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Layers, Clock, ArrowRight, ExternalLink } from 'lucide-react';

interface MenuItem {
  id: string;
  category: string;
}

const API_BASE = 'http://localhost:3000/api/v1/menu-items';

export function Dashboard() {
  const [itemCount, setItemCount] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data: MenuItem[]) => {
        setItemCount(data.length);
        const uniqueCats = Array.from(new Set(data.map((i) => i.category)));
        setCategories(uniqueCats);
      })
      .catch((err) => console.error('Failed to fetch menu count:', err));
  }, []);

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">
            Safe-fu House Admin
          </p>
        </div>
        <h2 className="text-4xl font-serif font-normal text-[#132A17]">ระบบจัดการร้าน & เมนู</h2>
        <p className="text-xs text-[#506954] mt-1 font-light">
          ภาพรวมของระบบ Safe-fu House Landing Page & Menu Management
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Menu Items */}
        <div className="bg-white p-7 rounded-[22px] border border-[#E0ECE1] shadow-sm">
          <div className="flex items-center justify-between text-[#506954] mb-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold">เมนูทั้งหมดในระบบ</h3>
            <Coffee size={18} className="text-[#2E7D32]" />
          </div>
          <p className="text-4xl font-serif text-[#132A17] font-normal">
            {itemCount !== null ? itemCount : '...'}
          </p>
          <span className="text-[11px] text-[#2E7D32] font-medium mt-1.5 block">
            แสดงผลสดบนหน้า Landing page
          </span>
        </div>

        {/* Categories */}
        <div className="bg-white p-7 rounded-[22px] border border-[#E0ECE1] shadow-sm">
          <div className="flex items-center justify-between text-[#506954] mb-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold">หมวดหมู่เมนู</h3>
            <Layers size={18} className="text-[#2E7D32]" />
          </div>
          <p className="text-4xl font-serif text-[#132A17] font-normal">
            {categories.length > 0 ? categories.length : '4'}
          </p>
          <span className="text-[11px] text-[#506954] font-light mt-1.5 block">
            Matcha, Desserts, Food, Coffee
          </span>
        </div>

        {/* Store Status */}
        <div className="bg-white p-7 rounded-[22px] border border-[#E0ECE1] shadow-sm">
          <div className="flex items-center justify-between text-[#506954] mb-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold">สถานะร้าน Safe-fu</h3>
            <Clock size={18} className="text-[#2E7D32]" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
            <span className="text-base font-medium text-[#132A17]">เปิดให้บริการปกติ</span>
          </div>
          <span className="text-[11px] text-[#506954] font-light mt-1.5 block">
            09:00 – 18:00 (หยุดทุกวันพุธ)
          </span>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/menu"
          className="group bg-white p-8 rounded-[24px] border border-[#E0ECE1] hover:border-[#2E7D32] hover:shadow-md transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-[#2E7D32] text-xs font-semibold uppercase tracking-wider mb-2">
              <Coffee size={15} />
              <span>Menu Manager</span>
            </div>
            <h4 className="font-serif text-2xl text-[#132A17] group-hover:text-[#2E7D32] transition-colors">
              จัดการรายการเมนู (เพิ่ม / ลบ)
            </h4>
            <p className="text-xs text-[#506954] mt-1 font-light">
              กดเพื่อเพิ่มเมนูใหม่ อัปเดตราคา หรือลบเมนูที่ไม่ต้องการออก
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4FAF5] border border-[#E0ECE1] flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
            <ArrowRight size={16} />
          </div>
        </Link>

        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="group bg-white p-8 rounded-[24px] border border-[#E0ECE1] hover:border-[#2E7D32] hover:shadow-md transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-[#2E7D32] text-xs font-semibold uppercase tracking-wider mb-2">
              <ExternalLink size={15} />
              <span>Customer View</span>
            </div>
            <h4 className="font-serif text-2xl text-[#132A17] group-hover:text-[#2E7D32] transition-colors">
              เปิดดูหน้าเว็บ Landing Page
            </h4>
            <p className="text-xs text-[#506954] mt-1 font-light">
              ดูหน้าเว็บสำหรับลูกค้า แสดงผลรูปภาพและข้อมูลสไตล์ Modern Zen
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F4FAF5] border border-[#E0ECE1] flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
            <ArrowRight size={16} />
          </div>
        </a>
      </div>
    </div>
  );
}