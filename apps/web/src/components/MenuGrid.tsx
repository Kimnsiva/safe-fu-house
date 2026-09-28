import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  jpName?: string;
  origin?: string;
  desc: string;
  category: string;
  price: number;
  lattePrice?: number;
  whiskedPrice?: number;
  tag?: string;
  image: string;
}

const API_BASE = 'http://localhost:3000/api/v1/menu-items';

const fallbackMenuItems: MenuItem[] = [
  // ─── Ceremonial Grade Matcha ───
  {
    id: 'm1',
    name: 'Jingai no Mukashi',
    jpName: '郊外の昔 · Nakamura Tokichi',
    origin: 'Uji, Kyoto',
    desc: 'Rare, high ceremonial grade. Gentle floral bouquet, warm roasted notes, exceptionally silky and premium.',
    category: 'Ceremonial Matcha',
    price: 300,
    lattePrice: 330,
    whiskedPrice: 330,
    tag: 'Rare Grade',
    image: '/images/ceremonial-matcha.jpg',
  },
  {
    id: 'm2',
    name: 'Asahi',
    jpName: '朝日 · Uji Single Cultivar',
    origin: 'Uji, Kyoto',
    desc: 'Subtle nutty character, thick bold umami, deep velvety green ceremonial profile.',
    category: 'Ceremonial Matcha',
    price: 270,
    lattePrice: 300,
    whiskedPrice: 300,
    tag: 'Ceremonial',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'm3',
    name: 'Komakage',
    jpName: '駒影 · Uji Kyoto',
    origin: 'Uji, Kyoto',
    desc: 'Heavy full-body nuttiness, gentle creamy finish with lingering sweetness.',
    category: 'Ceremonial Matcha',
    price: 250,
    lattePrice: 280,
    whiskedPrice: 280,
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'm4',
    name: 'Kohata',
    jpName: '許波多の昔 · Uji Kyoto',
    origin: 'Uji, Kyoto',
    desc: 'Roasted cocoa-like undertones with a rich and creamy rounded texture.',
    category: 'Ceremonial Matcha',
    price: 250,
    lattePrice: 280,
    whiskedPrice: 280,
    image: 'https://images.unsplash.com/photo-1536420121552-b37f54436390?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'm5',
    name: 'Eiju',
    jpName: '栄寿 · Samidori Cultivar',
    origin: 'Uji, Kyoto',
    desc: 'Soft nutty opening, smooth samidori cultivar richness, vibrant emerald color.',
    category: 'Ceremonial Matcha',
    price: 230,
    lattePrice: 260,
    whiskedPrice: 260,
    image: 'https://images.unsplash.com/photo-1544145945-f90427840987?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'm6',
    name: 'Sakura',
    jpName: 'さくらの花と葉をブレンド',
    origin: 'Senchado Tokyo',
    desc: 'Blended with sakura blossom and leaf. Sweet floral notes, fruity brightness, natural sweetness.',
    category: 'Ceremonial Matcha',
    price: 250,
    lattePrice: 280,
    whiskedPrice: 280,
    tag: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'm7',
    name: 'Koto no Tsuki',
    jpName: '古都の月 · Uji Kyoto',
    origin: 'Uji, Kyoto',
    desc: 'Intense marine seaweed aroma, thick and remarkably dense mouthfeel.',
    category: 'Ceremonial Matcha',
    price: 220,
    lattePrice: 250,
    whiskedPrice: 250,
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'm8',
    name: 'Okumidori',
    jpName: '奥緑 · Yame Fukuoka',
    origin: 'Yame, Fukuoka',
    desc: 'Light seaweed aroma, clean grassy profile, with a delightfully smooth bitterness.',
    category: 'Ceremonial Matcha',
    price: 190,
    lattePrice: 220,
    whiskedPrice: 220,
    image: '/images/hero-bar.jpg',
  },

  // ─── Food & Appetize ───
  {
    id: 'f1',
    name: 'Safe-fu Bridge Set',
    jpName: 'セーフフ橋の御膳 · Daily Limited',
    origin: 'Safe-fu Signature Set',
    desc: 'Includes Snowflakes Somen with ice sphere, Refreshing Seasonal Seaweed, Mari Fuku Mochi (houjicha cream & matcha red bean), and Gyokuro Sencha.',
    category: 'Food & Appetize',
    price: 490,
    tag: 'Daily Limited',
    image: '/images/bridge-set.jpg',
  },
  {
    id: 'f2',
    name: 'Snowflakes Somen',
    jpName: 'スノーフレーク素麺',
    origin: 'Chilled Noodle Set',
    desc: 'Chilled Japanese somen served in hand-carved ceramic bowl with a crystal ice sphere, dashi dipping broth, fresh ginger and scallions.',
    category: 'Food & Appetize',
    price: 180,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800',
  },

  // ─── Desserts ───
  {
    id: 'd1',
    name: 'Matcha Biscoff Tart',
    jpName: '抹茶ビスコフタルト',
    origin: 'Signature Dessert',
    desc: 'Thick, velvety ceremonial matcha ganache over a crunchy Lotus Biscoff crust, topped with fresh ripe strawberry slice.',
    category: 'Desserts',
    price: 140,
    tag: 'Signature',
    image: '/images/matcha-desserts.jpg',
  },
  {
    id: 'd2',
    name: 'Matcha Uji Pudding',
    jpName: '宇治抹茶プリンパフェ',
    origin: 'House Specialty',
    desc: 'Silky smooth Uji matcha pudding layered with caramelized nuts, azuki red beans, whipped cream, and sweet potato.',
    category: 'Desserts',
    price: 165,
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'd3',
    name: 'Marifuku Set',
    jpName: '鞠福餅セット',
    origin: 'Wagashi Set',
    desc: 'Delicate daifuku mochi filled with rich houjicha cream and sweet matcha red beans, presented in natural cedar wood box.',
    category: 'Desserts',
    price: 110,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'd4',
    name: 'Safe-fu Kinako Mochi',
    jpName: 'きな粉餅',
    origin: 'Traditional Wagashi',
    desc: 'Warm and chewy artisanal mochi coated generously in aromatic roasted golden kinako soybean powder.',
    category: 'Desserts',
    price: 100,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
  },

  // ─── Coffee & Drinks ───
  {
    id: 'c1',
    name: 'Salted Blue Coconut',
    jpName: '塩ブルーココナッツ',
    origin: 'Signature Drink',
    desc: 'Natural blue spirulina with sea salt mineral balance layered over sweet fragrant coconut water and milk.',
    category: 'Coffee & Drinks',
    price: 160,
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1544145945-f90427840987?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'c2',
    name: 'Coffee Cloud Coconut',
    jpName: '珈琲クラウドココナッツ',
    origin: 'Slow Drip Special',
    desc: 'Slow-extracted cold brew coffee topped with a whipped velvet coconut milk foam cloud.',
    category: 'Coffee & Drinks',
    price: 180,
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800',
  },
];

const categories = ['All', 'Ceremonial Matcha', 'Desserts', 'Food & Appetize', 'Coffee & Drinks'];

const sweetnessLevels = [
  { level: '0%', label: 'No Sweet', detail: '0g sugar' },
  { level: '50%', label: 'Less Sweet', detail: '5g sugar' },
  { level: '100%', label: 'Normal Sweet', detail: '8g sugar' },
  { level: '125%', label: 'Extra Sweet', detail: '10g sugar' },
];

export function MenuGrid() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackMenuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSweetness, setSelectedSweetness] = useState('50%');

  // Dynamically sync menu items from API
  useEffect(() => {
    fetch(API_BASE)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API not available');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMenuItems(data);
        }
      })
      .catch((err) => {
        console.log('Using default curated menu:', err.message);
      });
  }, []);

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="py-24 md:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">Authentic Safe-fu Menu</p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#132A17] font-normal leading-[1.05]">
              Every cup,<br /><em className="italic font-normal text-[#2E7D32]">a quiet moment.</em>
            </h2>
          </div>

          {/* Oatmilk & Alternative Milk Notice Pill - Crisp Green & White */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#F4FAF5] border border-[#C8E6C9] rounded-[20px] p-3.5 sm:px-5 sm:py-3 shadow-sm">
            <span className="px-3.5 py-1 rounded-full bg-[#2E7D32] text-white text-[10px] tracking-[0.2em] uppercase font-semibold">
              We Served Only Oatmilk
            </span>
            <span className="text-[12px] text-[#1E3E23]">
              Alternative milk: <strong className="font-semibold text-[#1B5E20]">Homemade Almond Coconut Milk</strong> (+฿20)
            </span>
          </div>
        </div>

        {/* Category Filter Chips - Vibrant Green Active State */}
        <div className="flex gap-2.5 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm font-semibold'
                  : 'bg-white text-[#132A17] border-[#E0ECE1] hover:border-[#2E7D32] hover:text-[#2E7D32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sweetness Bar - Pure White Card with Green Selection */}
        <div className="mb-14 rounded-[22px] border border-[#E0ECE1] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} strokeWidth={2} className="text-[#2E7D32]" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#132A17] font-semibold">Sweetness Level</span>
              <span className="text-[11px] text-[#506954] hidden sm:inline">/ Choose your balance</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {sweetnessLevels.map((s) => {
                const active = selectedSweetness === s.level;
                return (
                  <button
                    key={s.level}
                    onClick={() => setSelectedSweetness(s.level)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-wider transition-all duration-200 border ${
                      active
                        ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm font-semibold'
                        : 'bg-[#F4FAF5] text-[#2C4830] border-[#E0ECE1] hover:border-[#2E7D32]'
                    }`}
                  >
                    {active && <Check size={13} strokeWidth={2.5} />}
                    <span>{s.level}</span>
                    <span className="text-[10px] opacity-80">({s.label})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Count & Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-[#E0ECE1]" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">
            Showing {filtered.length} curated offerings
          </span>
        </div>

        {/* Menu Cards Grid - Pure Showcase without add-to-cart buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* Image Container - Organic rounded with crisp light green border */}
                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-5 bg-[#F4FAF5] border border-[#E0ECE1] shadow-sm group-hover:border-[#2E7D32] transition-colors duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Badge - Vibrant Green */}
                  {item.tag && (
                    <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase bg-[#2E7D32] text-white px-3.5 py-1 rounded-full shadow-sm font-semibold">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Header & Japanese subtitle */}
                <div className="px-1 mb-2">
                  <h3 className="font-serif text-2xl text-[#132A17] font-normal leading-snug group-hover:text-[#2E7D32] transition-colors duration-300">
                    {item.name}
                  </h3>
                  {item.jpName && (
                    <p className="text-xs text-[#2E7D32] font-medium tracking-wide mt-1">
                      {item.jpName}
                    </p>
                  )}
                  {item.origin && (
                    <p className="text-[10px] text-[#506954] uppercase tracking-[0.15em] font-medium mt-0.5">
                      {item.origin}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="px-1 text-xs text-[#506954] font-light leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Pricing & Formats - Real Green */}
              <div className="px-1 pt-3 border-t border-[#E0ECE1]">
                {item.lattePrice ? (
                  // Multi-tier price for matcha: Clear / Latte / Whisked
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] tracking-wider text-[#506954] uppercase font-medium">
                      Clear / Latte / Whisked
                    </span>
                    <span className="text-sm font-semibold text-[#2E7D32] tracking-wider">
                      ฿{item.price} / ฿{item.lattePrice} / ฿{item.whiskedPrice}
                    </span>
                  </div>
                ) : (
                  // Standard single price
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] tracking-wider text-[#506954] uppercase font-medium">Price</span>
                    <span className="text-lg font-semibold text-[#2E7D32] tracking-wider">
                      ฿{item.price}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}