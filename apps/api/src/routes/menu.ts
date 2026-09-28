import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';

export interface MenuItemData {
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

const dataDir = path.join(__dirname, '..', '..', 'data');
const dataFile = path.join(dataDir, 'menu.json');

const initialItems: MenuItemData[] = [
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
    image: '/images/bridge-set.jpg',
  },
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
    image: '/images/matcha-desserts.jpg',
  },
  {
    id: 'd3',
    name: 'Marifuku Set',
    jpName: '鞠福餅セット',
    origin: 'Wagashi Set',
    desc: 'Delicate daifuku mochi filled with rich houjicha cream and sweet matcha red beans, presented in natural cedar wood box.',
    category: 'Desserts',
    price: 110,
    image: '/images/bridge-set.jpg',
  },
  {
    id: 'd4',
    name: 'Safe-fu Kinako Mochi',
    jpName: 'きな粉餅',
    origin: 'Traditional Wagashi',
    desc: 'Warm and chewy artisanal mochi coated generously in aromatic roasted golden kinako soybean powder.',
    category: 'Desserts',
    price: 100,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
  },
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

function getStoredItems(): MenuItemData[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify(initialItems, null, 2), 'utf-8');
      return initialItems;
    }
    const raw = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading menu data, using initial:', err);
    return initialItems;
  }
}

function saveItems(items: MenuItemData[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFile, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving menu data:', err);
  }
}

export default async function menuRoutes(server: FastifyInstance) {
  // GET all menu items
  server.get('/api/v1/menu-items', async () => {
    return getStoredItems();
  });

  // POST add new menu item
  server.post('/api/v1/menu-items', async (request, reply) => {
    const body = request.body as Partial<MenuItemData>;
    if (!body.name || !body.price) {
      return reply.status(400).send({ error: 'Name and price are required' });
    }

    const items = getStoredItems();
    const newItem: MenuItemData = {
      id: 'm_' + Date.now(),
      name: body.name,
      jpName: body.jpName || '',
      origin: body.origin || '',
      desc: body.desc || '',
      category: body.category || 'Ceremonial Matcha',
      price: Number(body.price),
      lattePrice: body.lattePrice ? Number(body.lattePrice) : undefined,
      whiskedPrice: body.whiskedPrice ? Number(body.whiskedPrice) : undefined,
      tag: body.tag || undefined,
      image: body.image || '/images/ceremonial-matcha.jpg',
    };

    items.unshift(newItem);
    saveItems(items);
    return newItem;
  });

  // DELETE menu item by id
  server.delete('/api/v1/menu-items/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const items = getStoredItems();
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) {
      return reply.status(404).send({ error: 'Menu item not found' });
    }
    saveItems(filtered);
    return { success: true, id };
  });
}