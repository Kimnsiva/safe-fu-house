import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-white pt-28 pb-16 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Text side */}
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-matcha-tint border border-matcha/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-matcha" />
            <p className="text-[11px] tracking-[0.2em] uppercase text-matcha-dark font-medium">
              Matcha Slow Bar · Bang Khae, Bangkok
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-serif font-normal text-forest leading-[1.02] tracking-tight mb-8"
          >
            Matcha,
            <br />
            <em className="italic font-normal text-matcha">slowly.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base text-forest/70 max-w-md mb-10 leading-relaxed font-light text-balance"
          >
            A tranquil Japanese sanctuary shaped by water-flow preparation,
            moss garden, spiral staircase, and meditative zen sand garden.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-5"
          >
            <a
              href="#menu"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-matcha text-white text-[11px] tracking-[0.2em] uppercase hover:bg-matcha-dark transition-all duration-300 shadow-sm font-medium"
            >
              Explore menu
            </a>
            <a
              href="#visit"
              className="inline-flex items-center px-8 py-3.5 rounded-full border border-matcha/40 text-matcha hover:bg-matcha-tint text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-medium"
            >
              Visit us
            </a>
          </motion.div>
        </div>

        {/* Image side — Large organic photography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25 }}
          className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 relative"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[68vh] rounded-[28px] overflow-hidden border border-[#E0ECE1] shadow-sm">
            <img
              src="/images/hero-bar.jpg"
              alt="Safe-fu House Water-Flow Slow Bar and Bonsai"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            {/* Soft gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Overlapping organic accent card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:left-6 rounded-[22px] border border-[#E0ECE1] bg-white p-5 sm:p-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-matcha" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-forest/50 font-medium">Since 2024</span>
            </div>
            <span className="font-serif text-lg sm:text-xl text-forest block font-normal">Bang Khae, Bangkok</span>
            <span className="text-[11px] text-matcha font-medium">Water-flow preparation & Zen garden</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-matcha font-medium">Scroll</span>
        <div className="w-px h-6 bg-matcha/30" />
      </motion.div>
    </section>
  );
}