export function Footer() {
  return (
    <footer className="bg-forest text-ivory/70 border-t border-forest-light">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Main footer */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl font-normal text-ivory mb-4">Safe-fu House</h3>
            <p className="text-[12px] font-light leading-relaxed text-ivory/45 max-w-xs">
              A Japanese-style matcha slow bar in Bang Khae.
              Water-flow preparation, moss garden, and zen sand garden.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-ivory/35 mb-5 font-light">Navigate</h4>
              <div className="space-y-3">
                <a href="#menu" className="block text-[12px] text-ivory/50 hover:text-ivory transition-colors duration-500 font-light">Menu</a>
                <a href="#workshops" className="block text-[12px] text-ivory/50 hover:text-ivory transition-colors duration-500 font-light">Workshops</a>
                <a href="#visit" className="block text-[12px] text-ivory/50 hover:text-ivory transition-colors duration-500 font-light">Visit</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-ivory/35 mb-5 font-light">Community</h4>
              <div className="space-y-3">
                <a href="#" className="block text-[12px] text-ivory/50 hover:text-ivory transition-colors duration-500 font-light">Instagram</a>
                <a href="#" className="block text-[12px] text-ivory/50 hover:text-ivory transition-colors duration-500 font-light">Facebook</a>
                <a href="#" className="block text-[12px] text-ivory/50 hover:text-ivory transition-colors duration-500 font-light">Wongnai</a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-ivory/35 mb-5 font-light">Contact</h4>
            <p className="text-[12px] text-ivory/50 font-light leading-relaxed">
              672 Phetkasem 94, Bang Khae<br />
              Bangkok 10160<br />
              <span className="text-ivory/80 font-normal">081 622 2111</span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ivory/10 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-ivory/30 font-light">
            © {new Date().getFullYear()} Safe-fu House. All rights reserved.
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/30 font-light">
            Matcha, slowly.
          </span>
        </div>
      </div>
    </footer>
  );
}