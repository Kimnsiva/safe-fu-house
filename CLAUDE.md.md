# Safe-fu House: Vibe Code Prompt Pack

วิธีใช้: วาง **Master Prompt** ลงใน CLAUDE.md (หรือ rules ของ Cursor) หนึ่งครั้ง แล้วสั่งงานทีละเฟสจากหัวข้อ **Phase Prompts** อย่าวางทั้งหมดในข้อความเดียว ให้ AI ทำทีละเฟส รันได้ก่อนแล้วค่อยไปต่อ

---

## 📊 Progress Status (Updated: 2026-09-28)

| Phase | Status | Notes |
|-------|--------|-------|
| **Phase 1: Foundation** | ✅ Done (90%) | Monorepo, Docker, Prisma schema, API skeleton, design tokens, shared UI components — ทุกอย่างทำแล้ว ยกเว้น DB ยังไม่ได้ migrate จริง (Docker ไม่ได้รันบน host ปัจจุบัน ใช้ file-backed JSON แทน) |
| **Phase 2: Public site UI** | ✅ Done (100%) | Landing page ครบทุก section: Header, Hero, CategoryTiles, MenuGrid, SandGarden, Workshops, InfoStrip, Footer — ทำ pixel-polished แล้ว |
| **Phase 3: Menu API + Admin** | ✅ Done (85%) | Menu CRUD API (GET/POST/DELETE) ทำงานได้จริง, Admin shell + MenuManager + Dashboard + Settings ทำแล้ว — ยังเหลือ: media upload pipeline, drag-to-reorder, TH/EN fields, TanStack Query (ใช้ useEffect fetch ตรง) |
| **Phase 4: Orders & Bookings** | ⏸️ ข้ามไปก่อน | User ต้องการเฉพาะ Landing page + Admin เพิ่ม/ลบเมนู ยังไม่ต้องการระบบสั่งซื้อและจอง |
| **Phase 5: Polish & Launch** | 🚀 Started (50%) | เพิ่ม SEO Meta tags, JSON-LD, ปรับแต่ง Lighthouse (Image priorities, lazy-load), สร้างไฟล์ DEPLOYMENT.md แล้ว |

---

## 🎨 Design Direction (Adjusted per User Feedback)

ผู้ใช้เปลี่ยนจาก Master Prompt เดิม (Chanel/Dior luxury editorial) เป็น:

> **Modern Japanese Zen Minimalism** — Calm, Quiet, Natural, Premium, Warm, Slow living

**สีหลัก (เปลี่ยนตามที่ User ต้องการ):**
- Background: **Pure White `#FFFFFF`** (ไม่ใช้ cream/ivory/yellow cast)
- Primary Accent: **Vivid Matcha Green `#2E7D32`** (สดจริง ไม่ใช่สีมอสเก่าโทนน้ำตาล)
- Light Tint: `#E8F5E9` (ใช้เป็น badge bg, hover bg)
- Hairline Border: `#E0ECE1`
- Text Dark: `#132A17` (Deep forest)
- Text Muted: `#506954`

**หลีกเลี่ยง:** สีน้ำตาล, โทนอุ่น cream/tan, Neon colors, Heavy gradients, Glassmorphism, Strong shadows

**Typography:** Noto Sans Thai + Noto Sans + Cormorant Garamond (serif สำหรับ heading)

---

## ✅ สิ่งที่ทำเสร็จแล้ว (Detailed)

### Phase 1: Foundation
- [x] **pnpm monorepo**: `apps/web`, `apps/admin`, `apps/api`, `packages/ui`, `packages/types`
- [x] **Docker Compose**: Postgres 16 + API service (ยังไม่ได้ใช้งานจริง)
- [x] **Prisma schema** (`apps/api/prisma/schema.prisma`): User, Category, MenuItem, Media, Workshop, WorkshopSlot, Booking, Order, OrderItem, Setting, AuditLog — ครบตาม spec
- [x] **Fastify API** (`apps/api/src/index.ts`): health check, CORS, helmet, rate-limit, JWT (httpOnly cookie), Zod validation, argon2 password hashing
- [x] **Auth routes**: login, logout, /me endpoints
- [x] **Design tokens** (`packages/ui/tailwind.config.ts`): สีครบ (matcha, forest, moss, stone, etc.), border-radius organic/zen, shadows, font families
- [x] **CSS variables** (`packages/ui/src/globals.css`): background, primary, secondary, muted, accent, destructive — ตั้งค่าเป็น White + Matcha Green
- [x] **Shared UI components** (`packages/ui/src/components/ui/`): Button, Card, Chip, Input

### Phase 2: Public Site UI (apps/web)
- [x] **Header** — Announcement bar (deep matcha green), wordmark centered, nav links (Menu, Workshops, Visit), Admin Portal button, mobile hamburger
- [x] **Hero** — Large serif headline "Matcha, *slowly.*" พร้อมรูปจริง hero-bar.jpg, CTA buttons (Explore menu / Visit us), overlapping accent card "Since 2024 · Bang Khae"
- [x] **CategoryTiles** — 3 tiles (Ceremonial Matcha, Bridge Set, Marbling Art) พร้อมรูปจริง
- [x] **MenuGrid** — Filter chips ตามหมวดหมู่ 5 หมวด, sweetness level selector, menu cards แบบ showcase (ไม่มี add-to-cart), ราคาแยก Clear/Latte/Whisked, tag badges, ดึงข้อมูลจาก API + fallback data
- [x] **SandGarden** — Interactive canvas ลาก Zen sand garden ได้, มีปุ่ม reset
- [x] **Workshops** — 4 workshops จริงของ Marblin Marblin (Marbling Art, Resin Art, Matcha Pairing & Zen Garden, Wabi-Sabi Painting) พร้อมราคา, ตาราง, Line contact
- [x] **InfoStrip** — ที่อยู่, เบอร์โทร, live open/closed badge (computed from Asia/Bangkok timezone), delivery info
- [x] **Footer** — Deep forest green, nav links, social links, contact info

### Phase 3: Menu API + Admin (Partial)

**API (apps/api):**
- [x] `GET /api/v1/menu-items` — ดึง menu ทั้งหมด
- [x] `POST /api/v1/menu-items` — เพิ่ม menu item ใหม่ (auto-generate ID)
- [x] `DELETE /api/v1/menu-items/:id` — ลบ menu item
- [x] **File-backed JSON store** (`apps/api/data/menu.json`) — ใช้แทน Prisma/Postgres เพราะ Docker ไม่ได้รัน ข้อมูลจริง 16 รายการ
- [x] `GET /api/v1/settings` — ดึง settings
- [ ] PUT/PATCH menu items (edit existing)
- [ ] Media upload pipeline (sharp → WebP/AVIF)
- [ ] Categories CRUD
- [ ] Drag-to-reorder (sortOrder)

**Admin (apps/admin):**
- [x] **Layout** — Sidebar (deep forest `#132A17`), active nav green `#2E7D32`, white content area
- [x] **Dashboard** — 3 metric cards (Total menu items live from API, Categories count, Store status), quick action links to Menu Manager and Landing Page
- [x] **MenuManager** — เพิ่มเมนูใหม่ (modal: name, jpName, category, price, desc, tag, image selector), ลบเมนู (confirm dialog), ค้นหา & กรองหมวดหมู่, Toast notification
- [x] **SettingsPage** — Announcement text, Slow bar tagline, Contact phone (UI only ยังไม่ persist)
- [ ] Image upload with crop
- [ ] TH/EN dual fields
- [ ] Draft/Published toggle
- [ ] Optimistic updates (TanStack Query)
- [ ] Command palette (Cmd+K)

### Phase 4: Orders & Bookings — ⏸️ ข้ามตามที่ User ต้องการ
- [ ] Cart / Bag drawer
- [ ] Order creation flow
- [ ] Workshop booking form
- [ ] Admin Orders page (status pipeline)
- [ ] Admin Bookings page (calendar + list)
- [ ] Notifications (LINE Notify / email)

### Phase 5: Polish & Launch — ⏸️ ยังไม่เริ่ม
- [ ] i18n (th/en) with react-i18next
- [ ] SEO: JSON-LD (CafeOrCoffeeShop), Open Graph, sitemap
- [ ] Accessibility audit (WCAG AA)
- [ ] Playwright tests
- [ ] Lighthouse optimization
- [ ] Audit log implementation
- [ ] Production Docker build
- [ ] README + deployment guide

---

## 🏃 Running Services

| Service | URL | Port | Status |
|---------|-----|------|--------|
| Landing Page (web) | http://localhost:5173 | 5173 | ✅ Running |
| Admin Portal | http://localhost:5174 | 5174 | ✅ Running |
| Fastify API | http://localhost:3000 | 3000 | ✅ Running |

**Run all:** `pnpm dev` (root — runs all workspaces concurrently)

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `apps/web/src/App.tsx` | Landing page main layout (ลำดับ sections ทั้งหมด) |
| `apps/web/src/components/MenuGrid.tsx` | เมนูหลักแสดงผลพร้อม API sync |
| `apps/admin/src/pages/MenuManager.tsx` | หน้าจัดการเพิ่ม/ลบเมนู |
| `apps/api/src/routes/menu.ts` | REST API สำหรับ CRUD menu items |
| `apps/api/data/menu.json` | ข้อมูลเมนูจริง (file-backed store) |
| `packages/ui/tailwind.config.ts` | Design tokens (สี, font, border-radius) |
| `packages/ui/src/globals.css` | CSS variables สำหรับ shadcn/ui components |
| `apps/web/public/images/` | รูปภาพจริงของร้าน (hero, matcha, bridge-set, marbling, desserts) |

---

## 🖼️ Real Images Available

| Filename | Content |
|----------|---------|
| `hero-bar.jpg` | Safe-fu House slow bar counter |
| `ceremonial-matcha.jpg` | Ceremonial matcha cold whisked |
| `bridge-set.jpg` | Bridge Set (Somen & Mochi) |
| `matcha-desserts.jpg` | Biscoff Tart & Uji Pudding |
| `marbling-art.jpg` | Marbling Art workshop |

---

## 🚀 แนะนำ Next Steps

1. **Phase 3 เหลือ (ถ้าต้องการต่อ):**
   - เพิ่ม `PUT /api/v1/menu-items/:id` สำหรับแก้ไขเมนู
   - เพิ่ม image upload (sharp pipeline → WebP)
   - ย้ายจาก file-backed JSON → Prisma/Postgres (เมื่อ Docker พร้อม)
   - เพิ่ม TanStack Query แทน raw fetch

2. **Phase 5 บางส่วน (แนะนำทำก่อน deploy):**
   - SEO meta tags + JSON-LD
   - Lighthouse performance audit
   - Production build + deployment

---

## Master Prompt

You are a senior full-stack engineer and product designer. Build a production-quality website and admin back office for **Safe-fu House**, a Japanese-style matcha slow-bar cafe in Bang Khae, Bangkok. Work in phases, keep the app runnable after every phase, commit after each phase, and ask me before making big decisions I did not specify.

### 1. Business facts (use as seed data, do not invent other facts)
- Name: Safe-fu House, matcha slow bar (concept: water-flow matcha bar, moss garden, spiral staircase, zen sand garden)
- Address: 672 ซอยเพชรเกษม 94 แขวงบางแคเหนือ เขตบางแค กรุงเทพฯ 10160 (Plus Code P97Q+VC)
- Phone: 081 622 2111
- Hours: 09:00-18:00, closed every Wednesday (timezone Asia/Bangkok)
- Services: dine-in, takeaway, delivery via Wongnai
- Price range: about 200-400 THB per person
- Links: Instagram @safefu_house, Facebook page "Safe-fu House", Wongnai listing, Google Maps
- Menu seed: Matcha Latte with Maple Leaf (signature), Matcha Lemonade, Houjicha Latte, Genmaicha Latte, Cold Brew, Cold Brew Coconut, Salted Blue Coconut (signature), Chia Overnight. Prices are unknown, so leave them nullable and editable in admin.
- Workshops with Marblin Marblin: Snow Globe 2,590 THB (includes 2 drinks), Marbling Art from 550 THB, Terrarium Art / Resin 1,290 THB. Time slots 10:00, 13:00, 16:00 daily, booking via LINE or Instagram @marblinmarblin.

### 2. Tech stack
- Monorepo (pnpm workspaces): `apps/web` (public site), `apps/admin` (back office), `apps/api`, `packages/ui` (shared components and tokens), `packages/types` (shared Zod schemas)
- Frontend: React 18 + Vite + TypeScript, React Router, TanStack Query, Zustand (cart), Tailwind CSS with CSS-variable design tokens, Radix UI primitives (shadcn/ui style), Framer Motion (subtle, respects prefers-reduced-motion), react-i18next (th default, en)
- Backend: Node.js + Fastify + TypeScript, PostgreSQL + Prisma, Zod validation, JWT (httpOnly cookie) + role-based access (owner, staff), argon2 password hashing, rate limiting, helmet, CORS allow-list
- Images: upload to local disk or S3-compatible storage, convert to WebP/AVIF with sharp, generate responsive sizes and blurhash placeholders
- Infra: Docker Compose (postgres, api, web, admin, nginx), `.env.example`, seed script, GitHub Actions (lint, typecheck, test)
- Testing: Vitest + Testing Library for units, Playwright for critical flows (order, booking, admin login, menu edit)

### 3. Design direction (adjusted)
Modern Japanese Zen Minimalism — Calm, Quiet, Natural, Premium, Warm, Slow living.
- Palette tokens: pure white `#FFFFFF`, matcha green `#2E7D32` (primary), forest `#132A17` (text), hairline `#E0ECE1`, matcha tint `#E8F5E9`, muted `#506954`. ไม่ใช้สีน้ำตาล/cream/tan.
- Type: display serif Cormorant Garamond (light, with italic for one accent word per heading), body Noto Sans + Noto Sans Thai 300/400. Small uppercase labels with wide letter-spacing only for nav and buttons.
- Photography first: full-bleed and collage layouts, generous whitespace, hairline borders instead of shadows, aspect-ratio locked image frames, hover zoom under 6%.
- Motion: one orchestrated hero entrance, drawer and page transitions only. Nothing bouncy.
- Accessibility: WCAG AA contrast, visible focus, keyboard-operable drawer and tabs, alt text editable in admin.
- Responsive: mobile-first, tested at 375, 768, 1280, 1728 widths.

### 4. Public website (apps/web) — ✅ ปรับเป็น Landing Page Showcase
Sections and behavior:
1. Announcement bar (text editable in admin) and nav header: wordmark centered, nav links (Menu, Workshops, Visit), Admin Portal link
2. Hero: large serif headline "Matcha, *slowly.*" with hero photo (Safe-fu bar counter), CTA to menu and visit
3. Three category tiles (Ceremonial Matcha, Bridge Set, Marbling Art), click-to-scroll
4. The Menu: filter chips, sweetness selector, item count, showcase cards (photo, name, Japanese name, origin, description, tag, price tiers) — **ไม่มี add-to-cart/bag** (เฉพาะ showcase)
5. Sand Garden: canvas the visitor can drag to rake sand with strokes, reset button, pointer and touch support
6. Workshops: info cards with price, schedule, badge (Walk-in / Advance Booking), Line contact — **ไม่มี booking form** (ให้ติดต่อผ่าน Line แทน)
7. Info strip: address with map link, live open/closed badge computed in Asia/Bangkok, delivery, contact
8. Footer

### 5. Back office (apps/admin) — ✅ เน้นจัดการเมนู
Clean, calm UI using the same green+white tokens. Sidebar layout.
- Dashboard: total menu items (live from API), categories count, store status, quick action links
- Menu manager: เพิ่มเมนู (modal form) + ลบเมนู (confirm) + ค้นหา/กรอง — **ใช้งานได้จริงผ่าน REST API**
- Settings: announcement text, tagline, contact phone
- ดูหน้า Landing Page ผ่านลิงก์ใน sidebar

### 6. Data model (Prisma)
User, Category, MenuItem(nameTh, nameEn, descTh, descEn, priceThb nullable, tag, imageId, available, published, sortOrder), Media(url, alt, width, height, blurhash), Workshop, WorkshopSlot(startsAt, capacity), Booking, Order, OrderItem, Setting(key, jsonValue), AuditLog. Add indexes, soft delete where useful, and seed data from section 1.

### 7. API
REST under `/api/v1`, Zod-validated, consistent error shape, pagination, OpenAPI docs at `/docs`. Public: GET menu, workshops, settings, POST order, POST booking. Admin (auth required): full CRUD, status transitions, uploads, settings, users.
Send new order and booking notifications to a LINE Notify-compatible webhook or email (configurable, off by default).

### 8. Quality bar
- TypeScript strict, ESLint, Prettier, no `any`
- Lighthouse 90+ on mobile for the public site (lazy-load images, font preloading, code splitting)
- Secure by default: input validation, CSRF-safe cookies, upload type and size limits, no secrets in repo
- README with setup in under 5 commands, architecture diagram, and how to deploy
- Every phase ends with: what was built, how to run it, what is next

---

## Phase Prompts (ใช้ทีละข้อ)

**Phase 1: Foundation** ✅ Done
Set up the pnpm monorepo, Docker Compose with Postgres, Prisma schema with migrations and seed data, Fastify API skeleton with health check and auth (login, logout, me, roles), shared Zod types, and the design-token package (Tailwind preset, fonts, base components: Button, Input, Drawer, Tabs, Chip, Card, Toast). Show me the Storybook or a style-guide page.

**Phase 2: Public site UI with static data** ✅ Done
Build apps/web: header, hero collage, category tiles, menu grid with filters, bag drawer, workshops rows, info strip, footer, and the Sand Garden canvas. Use seed JSON first, and use placeholder images with blurhash. Make it pixel-polished on mobile and desktop.

**Phase 3: Menu and settings API + admin login** 🔧 85% Done
Implement public and admin endpoints for categories, menu items, media upload (sharp pipeline), and settings. Build apps/admin shell with login, sidebar, menu manager (CRUD, reorder, image upload), and settings page. Connect apps/web to the real API with TanStack Query.

**Phase 4: Orders and bookings** ⏸️ ข้ามไปก่อน (User ต้องการเฉพาะ Landing page + Admin เพิ่ม/ลบเมนู)
Implement cart to order flow, workshop slot availability and booking, admin Orders and Bookings pages with status pipeline, notifications, and the live open/closed badge from settings.

**Phase 5: Polish & Launch** 🚀 Started (50%)
- [x] SEO meta tags + JSON-LD
- [x] Lighthouse image optimizations (fetchpriority, lazy loading)
- [x] DEPLOYMENT.md (Production Docker build & Nginx guide)
- [ ] i18n (th/en)
- [ ] Playwright tests
- [ ] Audit log implementation

---

## Tips
- ใส่รูปจริงความละเอียดสูงของร้านใน `/seed-images` แล้วสั่งให้ AI ใช้เป็นข้อมูลตั้งต้น
- ถ้า AI ทำไม่ตรงสไตล์ ให้แนบไฟล์ตัวอย่างหน้าเว็บที่ทำไว้ (safe-fu-house-v7.html) แล้วสั่งว่า "match this visual language exactly"
- ให้ AI รัน `pnpm typecheck && pnpm test` ทุกครั้งก่อนจบแต่ละเฟส
