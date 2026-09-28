import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'th' ? 'en' : 'th';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement - Vibrant Deep Matcha Green */}
      <div className="bg-[#225C29] text-white text-[11px] text-center py-2.5 tracking-[0.25em] uppercase font-medium shadow-sm">
        {t('header.announcement')}
      </div>

      {/* Main nav - Pure White with Clean Light Green Hairline */}
      <nav className="bg-white/95 border-b border-[#E0ECE1] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#menu" className="text-[11px] tracking-[0.25em] uppercase text-forest/70 hover:text-matcha transition-colors duration-300 font-medium">
              {t('header.menu')}
            </a>
            <a href="#workshops" className="text-[11px] tracking-[0.25em] uppercase text-forest/70 hover:text-matcha transition-colors duration-300 font-medium">
              {t('header.workshops')}
            </a>
            <a href="#visit" className="text-[11px] tracking-[0.25em] uppercase text-forest/70 hover:text-matcha transition-colors duration-300 font-medium">
              {t('header.visit')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-forest p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          {/* Wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2 font-serif text-[26px] font-normal text-forest tracking-[-0.01em]">
            Safe-fu House
          </div>

          {/* Right side - Admin portal link and Lang switcher */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-forest/70 hover:text-matcha transition-colors duration-300 font-medium"
            >
              <Globe size={14} />
              <span>{i18n.language === 'th' ? 'EN' : 'TH'}</span>
            </button>
            <a
              href={`${import.meta.env.BASE_URL}admin/index.html`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-block text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-matcha text-matcha hover:bg-matcha hover:text-white transition-all duration-300 font-medium"
            >
              {t('header.admin')}
            </a>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E0ECE1] bg-white px-6 py-6 space-y-4">
            <a href="#menu" onClick={() => setMobileOpen(false)} className="block text-[11px] tracking-[0.25em] uppercase text-forest/80 hover:text-matcha font-medium">{t('header.menu')}</a>
            <a href="#workshops" onClick={() => setMobileOpen(false)} className="block text-[11px] tracking-[0.25em] uppercase text-forest/80 hover:text-matcha font-medium">{t('header.workshops')}</a>
            <a href="#visit" onClick={() => setMobileOpen(false)} className="block text-[11px] tracking-[0.25em] uppercase text-forest/80 hover:text-matcha font-medium">{t('header.visit')}</a>
            <a href={`${import.meta.env.BASE_URL}admin/index.html`} target="_blank" rel="noreferrer" className="block text-[11px] tracking-[0.25em] uppercase text-matcha font-medium pt-2">{t('header.admin')} →</a>
          </div>
        )}
      </nav>
    </header>
  );
}