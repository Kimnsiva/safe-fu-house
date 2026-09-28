const fs = require('fs');
const path = require('path');

// --- API ---
const apiRoutesDir = path.join(__dirname, 'apps/api/src/routes');
fs.mkdirSync(apiRoutesDir, { recursive: true });

const menuRoutes = `
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function menuRoutes(server: FastifyInstance) {
  // Public GET
  server.get('/api/v1/categories', async () => {
    return prisma.category.findMany({ include: { items: { include: { image: true } } }, orderBy: { sortOrder: 'asc' } });
  });

  server.get('/api/v1/menu-items', async () => {
    return prisma.menuItem.findMany({ include: { image: true, category: true }, orderBy: { sortOrder: 'asc' } });
  });

  // Admin POST/PUT/DELETE
  const CategorySchema = z.object({ nameTh: z.string(), nameEn: z.string(), sortOrder: z.number().optional() });
  server.post('/api/v1/categories', { schema: { body: CategorySchema } }, async (request) => {
    return prisma.category.create({ data: request.body as any });
  });

  const MenuItemSchema = z.object({ 
    categoryId: z.string(), nameTh: z.string(), nameEn: z.string(), 
    descTh: z.string().optional(), descEn: z.string().optional(), 
    priceThb: z.number().optional(), tag: z.string().optional(),
    imageId: z.string().optional(), available: z.boolean().optional(), published: z.boolean().optional() 
  });
  
  server.post('/api/v1/menu-items', { schema: { body: MenuItemSchema } }, async (request) => {
    return prisma.menuItem.create({ data: request.body as any });
  });
}
`;

fs.writeFileSync(path.join(apiRoutesDir, 'menu.ts'), menuRoutes.trim());

const settingsRoutes = `
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function settingsRoutes(server: FastifyInstance) {
  server.get('/api/v1/settings', async () => {
    return prisma.setting.findMany();
  });
  
  const SettingSchema = z.object({ key: z.string(), jsonValue: z.string() });
  server.post('/api/v1/settings', { schema: { body: SettingSchema } }, async (request) => {
    const { key, jsonValue } = request.body as z.infer<typeof SettingSchema>;
    return prisma.setting.upsert({ where: { key }, update: { jsonValue }, create: { key, jsonValue } });
  });
}
`;

fs.writeFileSync(path.join(apiRoutesDir, 'settings.ts'), settingsRoutes.trim());

// --- Admin UI ---
const adminDir = path.join(__dirname, 'apps/admin/src/pages');
fs.mkdirSync(adminDir, { recursive: true });

const adminLayout = `
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Coffee, Settings } from 'lucide-react';

export function AdminLayout() {
  return (
    <div className="flex h-screen bg-sand/10">
      <aside className="w-64 bg-ink text-cream p-6">
        <h1 className="font-serif text-2xl mb-8">Safe-fu Admin</h1>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center gap-3 hover:text-moss"><LayoutDashboard size={20} /> Dashboard</Link>
          <Link to="/menu" className="flex items-center gap-3 hover:text-moss"><Coffee size={20} /> Menu</Link>
          <Link to="/settings" className="flex items-center gap-3 hover:text-moss"><Settings size={20} /> Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'apps/admin/src/pages/Layout.tsx'), adminLayout.trim());

const adminDashboard = `
export function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-serif text-ink mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-cream p-6 rounded-lg border border-hairline shadow-sm">
          <h3 className="text-sm uppercase tracking-widest text-ink/60">Today's Orders</h3>
          <p className="text-4xl font-serif mt-2">0</p>
        </div>
        <div className="bg-cream p-6 rounded-lg border border-hairline shadow-sm">
          <h3 className="text-sm uppercase tracking-widest text-ink/60">Today's Bookings</h3>
          <p className="text-4xl font-serif mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'apps/admin/src/pages/Dashboard.tsx'), adminDashboard.trim());

const adminMenuManager = `
export function MenuManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif text-ink">Menu Manager</h2>
        <button className="bg-moss text-cream px-4 py-2 uppercase tracking-widest text-xs">Add Item</button>
      </div>
      <div className="bg-cream rounded-lg border border-hairline p-8 text-center text-ink/60">
        Menu items will be listed here. Connect to API in next step.
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'apps/admin/src/pages/MenuManager.tsx'), adminMenuManager.trim());

const adminSettings = `
export function SettingsPage() {
  return (
    <div>
      <h2 className="text-3xl font-serif text-ink mb-6">Site Settings</h2>
      <div className="bg-cream rounded-lg border border-hairline p-8">
        <form className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm uppercase tracking-widest mb-1 text-ink/80">Announcement Text</label>
            <input type="text" className="w-full border border-hairline p-2 bg-transparent focus:outline-none focus:border-moss" defaultValue="Matcha, slowly. Open 09:00 - 18:00 (Closed Wed)" />
          </div>
          <button type="button" className="bg-ink text-cream px-6 py-2 uppercase tracking-widest text-xs hover:bg-moss transition-colors">Save</button>
        </form>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(__dirname, 'apps/admin/src/pages/SettingsPage.tsx'), adminSettings.trim());

// App.tsx
const appTsx = `
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from './pages/Layout';
import { Dashboard } from './pages/Dashboard';
import { MenuManager } from './pages/MenuManager';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`;
fs.writeFileSync(path.join(__dirname, 'apps/admin/src/App.tsx'), appTsx.trim());
console.log('Phase 3 generated!');
