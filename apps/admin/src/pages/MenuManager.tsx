import { useState, useEffect } from 'react';
import { Plus, Trash2, Search, X, Check, Coffee } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  jpName?: string;
  origin?: string;
  desc: string;
  category: string;
  price: number;
  tag?: string;
  image: string;
}

const API_BASE = 'http://localhost:3000/api/v1/menu-items';

const CATEGORIES = ['All', 'Ceremonial Matcha', 'Desserts', 'Food & Appetize', 'Coffee & Drinks'];

const IMAGE_PRESETS = [
  { label: 'Ceremonial Matcha (Cold Whisked)', url: '/images/ceremonial-matcha.jpg' },
  { label: 'Matcha Desserts (Tart & Pudding)', url: '/images/matcha-desserts.jpg' },
  { label: 'Bridge Set (Somen & Mochi)', url: '/images/bridge-set.jpg' },
  { label: 'Safe-fu Slow Bar Table', url: '/images/hero-bar.jpg' },
  { label: 'Matcha Latte with Leaf', url: 'https://images.unsplash.com/photo-1536420121552-b37f54436390?auto=format&fit=crop&q=80&w=800' },
  { label: 'Cold Brew Coffee', url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800' },
  { label: 'Salted Blue Drink', url: 'https://images.unsplash.com/photo-1544145945-f90427840987?auto=format&fit=crop&q=80&w=800' },
];

export function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [jpName, setJpName] = useState('');
  const [category, setCategory] = useState('Ceremonial Matcha');
  const [price, setPrice] = useState<number | ''>('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState(IMAGE_PRESETS[0].url);

  // Load menu items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to load menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          jpName: jpName.trim() || undefined,
          category,
          price: Number(price),
          desc: desc.trim(),
          tag: tag.trim() || undefined,
          image: image || '/images/ceremonial-matcha.jpg',
        }),
      });

      if (res.ok) {
        const newItem = await res.json();
        setItems([newItem, ...items]);
        setIsModalOpen(false);
        // Reset form
        setName('');
        setJpName('');
        setPrice('');
        setDesc('');
        setTag('');
        showToast(`เพิ่มเมนู "${newItem.name}" เรียบร้อยแล้ว`);
      } else {
        alert('เกิดข้อผิดพลาดในการเพิ่มเมนู');
      }
    } catch (err) {
      console.error('Failed to add item:', err);
      alert('ไม่สามารถเชื่อมต่อ API ได้');
    }
  };

  const handleDeleteItem = async (id: string, itemName: string) => {
    if (!window.confirm(`ต้องการลบเมนู "${itemName}" ใช่หรือไม่?`)) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
        showToast(`ลบเมนู "${itemName}" เรียบร้อยแล้ว`);
      } else {
        alert('เกิดข้อผิดพลาดในการลบเมนู');
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
      alert('ไม่สามารถลบเมนูได้');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.jpName && item.jpName.toLowerCase().includes(search.toLowerCase())) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#2E7D32] text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium animate-bounce">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">Menu Management</p>
          </div>
          <h2 className="text-4xl font-serif font-normal text-[#132A17]">จัดการเมนูอาหารและเครื่องดื่ม</h2>
          <p className="text-xs text-[#506954] mt-1">เพิ่มหรือลบรายการเมนูที่แสดงบนหน้า Landing page</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#2E7D32] text-white px-6 py-3 rounded-full text-xs tracking-wider uppercase hover:bg-[#236827] transition-all duration-300 shadow-sm font-medium self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2} />
          <span>เพิ่มเมนูใหม่</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-[22px] border border-[#E0ECE1] p-5 mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] tracking-wider transition-all duration-200 border ${
                selectedCat === cat
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] font-medium'
                  : 'bg-[#F2F7F2] text-[#2C4830] border-[#E0ECE1] hover:border-[#2E7D32]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#506954]" />
          <input
            type="text"
            placeholder="ค้นหาชื่อเมนู..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#E0ECE1] text-xs bg-[#F7FAF7] text-[#132A17] focus:outline-none focus:border-[#2E7D32]"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-[24px] border border-[#E0ECE1] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#E0ECE1] bg-[#F7FAF7] flex justify-between items-center text-xs text-[#506954] font-medium">
          <span>รายการเมนู ({filteredItems.length} รายการ)</span>
          <span>จัดการ</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-[#506954]">กำลังโหลดรายการเมนู...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-sm text-[#506954]">
            ไม่พบเมนูที่ตรงกับคำค้นหา
          </div>
        ) : (
          <div className="divide-y divide-[#E0ECE1]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-[#F9FCF9] transition-colors"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-[14px] object-cover border border-[#E0ECE1] flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif text-lg text-[#132A17] font-medium truncate">{item.name}</h4>
                      {item.tag && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] font-medium">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    {item.jpName && <p className="text-xs text-[#2E7D32]">{item.jpName}</p>}
                    <p className="text-xs text-[#506954] truncate max-w-lg mt-0.5">{item.desc}</p>
                  </div>
                </div>

                {/* Right: Category, Price & Delete Action */}
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] bg-[#F2F7F2] text-[#2C4830] border border-[#E0ECE1]">
                    {item.category}
                  </span>
                  <span className="font-semibold text-base text-[#2E7D32]">฿{item.price}</span>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    className="p-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="ลบเมนูนี้"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] max-w-xl w-full p-8 shadow-2xl border border-[#E0ECE1] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E0ECE1]">
              <div className="flex items-center gap-2">
                <Coffee size={20} className="text-[#2E7D32]" />
                <h3 className="font-serif text-2xl text-[#132A17]">เพิ่มเมนูใหม่</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#506954] hover:bg-[#F2F7F2]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                  ชื่อเมนู (ภาษาอังกฤษ/ไทย) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Uji Matcha Latte"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                  ชื่อภาษาญี่ปุ่น / สวนชา (ถ้ามี)
                </label>
                <input
                  type="text"
                  placeholder="เช่น 宇治抹茶 · Uji Kyoto"
                  value={jpName}
                  onChange={(e) => setJpName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                    หมวดหมู่ *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm bg-white focus:outline-none focus:border-[#2E7D32]"
                  >
                    <option value="Ceremonial Matcha">Ceremonial Matcha</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Food & Appetize">Food & Appetize</option>
                    <option value="Coffee & Drinks">Coffee & Drinks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                    ราคา (บาท) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="250"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm focus:outline-none focus:border-[#2E7D32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                  คำอธิบายรสชาติ / ส่วนผสม
                </label>
                <textarea
                  rows={2}
                  placeholder="คำอธิบายรสชาติ โน้ตความหอม วัตถุดิบ..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                  ป้ายแท็กพิเศษ (เช่น Signature, Popular, Daily Limited)
                </label>
                <input
                  type="text"
                  placeholder="เช่น Signature"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#132A17] font-medium mb-1">
                  รูปภาพ (เลือกรูปแบบสำเร็จหรือกรอก URL)
                </label>
                <select
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-[#E0ECE1] text-sm bg-white focus:outline-none focus:border-[#2E7D32] mb-2"
                >
                  {IMAGE_PRESETS.map((p) => (
                    <option key={p.url} value={p.url}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="หรือใส่ลิงก์รูปภาพ https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2 rounded-[12px] border border-[#E0ECE1] text-xs text-[#506954] focus:outline-none focus:border-[#2E7D32]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E0ECE1]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E0ECE1] text-xs font-medium text-[#506954] hover:bg-[#F2F7F2]"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#236827] shadow-sm transition-colors"
                >
                  บันทึกเมนู
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}