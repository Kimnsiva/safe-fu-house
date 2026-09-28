const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
fs.mkdirSync(dir, { recursive: true });
fs.mkdirSync(path.join(__dirname, 'src', 'store'), { recursive: true });

const files = {
  'src/components/Header.tsx': `
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '../store/cart';

export function Header() {
  const cartCount = useCartStore(state => state.items.length);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b border-hairline">
      <div className="bg-moss text-cream text-xs text-center py-1 tracking-widest uppercase">
        Matcha, slowly. Open 09:00 - 18:00 (Closed Wed)
      </div>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <nav className="hidden md:flex gap-6 text-sm tracking-widest uppercase text-ink">
          <a href="#menu" className="hover:text-moss transition-colors">Menu</a>
          <a href="#workshops" className="hover:text-moss transition-colors">Workshops</a>
        </nav>
        <div className="text-2xl font-serif text-ink tracking-tight flex-1 text-center md:flex-none">
          Safe-fu House
        </div>
        <div className="flex items-center gap-4 text-ink">
          <button className="flex items-center gap-2 hover:text-moss transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">Wishlist</span>
          </button>
          <button className="flex items-center gap-2 hover:text-moss transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
`,
  'src/components/Hero.tsx': `
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-cream overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1599553594191-11910243be44?auto=format&fit=crop&q=80&w=2000" alt="Matcha" className="w-full h-full object-cover mix-blend-multiply" />
      </div>
      <div className="container mx-auto z-10 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-serif text-ink mb-6"
        >
          Matcha, <em className="italic font-light">slowly.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-ink/80 max-w-lg mb-10 font-sans font-light"
        >
          A Japanese-style matcha slow-bar cafe in Bang Khae. Experience the water-flow matcha bar and zen sand garden.
        </motion.p>
        <motion.a 
          href="#menu"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-ink text-cream px-8 py-4 uppercase tracking-widest text-sm hover:bg-moss transition-colors"
        >
          Explore Menu
        </motion.a>
      </div>
    </section>
  );
}
`,
  'src/components/CategoryTiles.tsx': `
export function CategoryTiles() {
  const categories = [
    { name: 'Matcha', image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800' },
    { name: 'Tea & Coffee', image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800' },
    { name: 'Workshops', image: 'https://images.unsplash.com/photo-1493606371202-6275828f90f3?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="group relative aspect-square overflow-hidden cursor-pointer border border-hairline">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-serif text-cream drop-shadow-sm">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/MenuGrid.tsx': `
import { useCartStore } from '../store/cart';

export function MenuGrid() {
  const addItem = useCartStore(state => state.addItem);
  
  const items = [
    { id: '1', name: 'Matcha Latte with Maple Leaf', desc: 'Signature matcha with a hint of maple', price: 250, image: 'https://images.unsplash.com/photo-1536420121552-b37f54436390?auto=format&fit=crop&q=80&w=600' },
    { id: '2', name: 'Salted Blue Coconut', desc: 'Signature blue coconut blend', price: 220, image: 'https://images.unsplash.com/photo-1544145945-f90427840987?auto=format&fit=crop&q=80&w=600' },
    { id: '3', name: 'Matcha Lemonade', desc: 'Refreshing matcha with lemon', price: 180, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600' },
    { id: '4', name: 'Houjicha Latte', desc: 'Roasted green tea latte', price: 190, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section id="menu" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-hairline pb-4">
          <h2 className="text-4xl font-serif text-ink">The Menu</h2>
          <span className="text-sm tracking-widest uppercase text-ink/60">{items.length} items</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {items.map(item => (
            <div key={item.id} className="group flex flex-col">
              <div className="aspect-[3/4] overflow-hidden mb-4 border border-hairline bg-sand/30">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-xl text-ink mb-1">{item.name}</h3>
              <p className="font-sans text-sm text-ink/70 font-light mb-3 flex-1">{item.desc}</p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-hairline">
                <span className="text-ink tracking-widest text-sm">฿{item.price}</span>
                <button 
                  onClick={() => addItem({ ...item, quantity: 1 })}
                  className="text-xs uppercase tracking-widest text-moss hover:text-ink transition-colors"
                >
                  Add to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/Workshops.tsx': `
export function Workshops() {
  const workshops = [
    { id: 'w1', name: 'Snow Globe', desc: 'Includes 2 drinks', price: 2590 },
    { id: 'w2', name: 'Marbling Art', desc: 'Basic course', price: 550 },
    { id: 'w3', name: 'Terrarium Art / Resin', desc: 'Create your own mini garden', price: 1290 },
  ];

  return (
    <section id="workshops" className="py-24 bg-sand/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-ink mb-4">Workshops</h2>
          <p className="text-ink/70 font-light">With Marblin Marblin. Time slots 10:00, 13:00, 16:00 daily.</p>
        </div>
        
        <div className="space-y-4">
          {workshops.map(ws => (
            <div key={ws.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-cream border border-hairline hover:border-moss transition-colors">
              <div>
                <h3 className="font-serif text-2xl text-ink mb-1">{ws.name}</h3>
                <p className="text-sm text-ink/70">{ws.desc}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-6">
                <span className="tracking-widest">฿{ws.price}</span>
                <button className="bg-ink text-cream px-6 py-2 text-xs uppercase tracking-widest hover:bg-moss transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/SandGarden.tsx': `
import { useEffect, useRef } from 'react';

export function SandGarden() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#E4DCC8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      imgData.data[i] = Math.min(255, Math.max(0, imgData.data[i] + noise));
      imgData.data[i+1] = Math.min(255, Math.max(0, imgData.data[i+1] + noise));
      imgData.data[i+2] = Math.min(255, Math.max(0, imgData.data[i+2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    let isDrawing = false;

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      let x, y;
      if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = (e as MouseEvent).clientX - rect.left;
        y = (e as MouseEvent).clientY - rect.top;
      }
      
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.strokeStyle = 'rgba(37, 41, 31, 0.1)';
      ctx.lineTo(x, y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(250, 247, 240, 0.4)';
      ctx.lineTo(x - 2, y - 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; draw(e); });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => { isDrawing = false; ctx.beginPath(); });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; ctx.beginPath(); });
    
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; draw(e); });
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', () => { isDrawing = false; ctx.beginPath(); });

  }, []);

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-serif text-ink mb-8">Zen Sand Garden</h2>
        <div className="relative aspect-[2/1] w-full border border-hairline overflow-hidden cursor-crosshair">
          <canvas 
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-full object-cover touch-none"
          />
        </div>
        <p className="mt-4 text-sm text-ink/60 font-light tracking-wider">Drag to rake the sand</p>
      </div>
    </section>
  );
}
`,
  'src/components/InfoStrip.tsx': `
export function InfoStrip() {
  return (
    <section className="border-y border-hairline bg-cream">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex-1">
          <h4 className="uppercase tracking-widest text-xs font-semibold mb-2">Location</h4>
          <p className="font-light text-sm text-ink/80">672 Phetkasem 94<br/>Bang Khae, Bangkok 10160</p>
        </div>
        <div className="flex-1 border-y md:border-y-0 md:border-x border-hairline py-8 md:py-0 md:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage text-moss rounded-full text-xs font-medium tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-moss animate-pulse"></span>
            Open Now
          </div>
          <p className="font-light text-sm text-ink/80">09:00 - 18:00<br/>Closed on Wednesdays</p>
        </div>
        <div className="flex-1 text-center md:text-right">
          <h4 className="uppercase tracking-widest text-xs font-semibold mb-2">Contact</h4>
          <p className="font-light text-sm text-ink/80">081 622 2111<br/>IG: @safefu_house</p>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/Footer.tsx': `
export function Footer() {
  return (
    <footer className="bg-ink text-cream py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-serif mb-8 md:mb-0">
          Safe-fu House
        </div>
        <div className="flex gap-8 text-xs tracking-widest uppercase">
          <a href="#" className="hover:text-sand transition-colors">Instagram</a>
          <a href="#" className="hover:text-sand transition-colors">Facebook</a>
          <a href="#" className="hover:text-sand transition-colors">Wongnai</a>
        </div>
      </div>
    </footer>
  );
}
`,
  'src/store/cart.ts': `
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    if (existing) {
      return { items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
}
console.log('Files generated successfully.');
