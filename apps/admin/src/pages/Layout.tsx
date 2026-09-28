import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coffee, Settings, ExternalLink } from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/menu', label: 'Menu Manager (เพิ่ม/ลบ)', icon: Coffee },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAF8] text-[#132A17]">
      {/* Sidebar - Deep Tea Forest with Clean Green Accent */}
      <aside className="w-64 bg-[#132A17] text-white/90 p-6 flex flex-col justify-between border-r border-[#1E3E23]">
        <div>
          <div className="mb-8 px-2">
            <h1 className="font-serif text-2xl font-normal text-white tracking-tight">Safe-fu House</h1>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#81C784] font-medium mt-1">Admin Portal</p>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                    active
                      ? 'bg-[#2E7D32] text-white font-medium shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 px-2 pt-6 border-t border-white/10">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-xs text-[#81C784] hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
          >
            <span>ดูหน้าเว็บ Landing Page</span>
            <ExternalLink size={14} />
          </a>
          <p className="text-[10px] text-white/30 tracking-wider">
            Safe-fu Matcha Slow Bar
          </p>
        </div>
      </aside>

      {/* Main Content Area - Clean White Canvas */}
      <main className="flex-1 p-10 overflow-auto bg-[#F8FAF8]">
        <Outlet />
      </main>
    </div>
  );
}