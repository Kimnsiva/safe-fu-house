import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Ceremonial Matcha',
    subtitle: 'Uji & Fukuoka · Cold Whisked & Oatmilk',
    image: '/images/ceremonial-matcha.jpg',
    href: '#menu',
  },
  {
    name: 'Food & Desserts',
    subtitle: 'Safefu Bridge Set · Biscoff Tart · Somen',
    image: '/images/bridge-set.jpg',
    href: '#menu',
  },
  {
    name: 'Creative Workshops',
    subtitle: 'Marblin Marblin · Suminagashi & Zen',
    image: '/images/marbling-art.jpg',
    href: '#workshops',
  },
];

export function CategoryTiles() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-matcha" />
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-matcha font-medium">
              Craft & Origin
            </h2>
          </div>
          <div className="flex-1 h-px bg-[#E0ECE1] ml-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href={cat.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative block"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-[26px] border border-[#E0ECE1] shadow-sm bg-[#F4FAF5]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 mb-2 flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-forest group-hover:text-matcha transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.08em] text-forest/60 mt-1 font-light">{cat.subtitle}</p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-matcha font-medium group-hover:translate-x-1 transition-all duration-300">
                  Explore →
                </span>
              </div>
              <div className="h-px bg-[#E0ECE1] w-full group-hover:bg-matcha transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}