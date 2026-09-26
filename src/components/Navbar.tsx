import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { useLang } from '../lib/i18n';

const LOGO = '/logo-official.png';
export const PHONE = '01016905586';
export const PHONE_INTL = '+201016905586';

function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center rounded-full border border-ivory/25 bg-white/5 p-1 backdrop-blur-sm ${compact ? 'text-xs' : 'text-sm'}`}
      role="group"
      aria-label="Language"
    >
      {(['ar', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 font-semibold tracking-wider uppercase transition-all duration-300 ${
            lang === l ? 'bg-gold text-ink shadow' : 'text-ivory/70 hover:text-ivory'
          } ${compact ? 'px-2.5' : ''}`}
        >
          {l === 'ar' ? 'عربي' : 'EN'}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'practice', label: t.nav.practice },
    { id: 'approach', label: t.nav.approach },
    { id: 'insights', label: t.nav.insights },
    { id: 'contact', label: t.nav.contact },
  ];

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink/90 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md' : 'bg-gradient-to-b from-ink/80 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <button onClick={() => go('home')} className="group flex items-center gap-3 text-start" aria-label="Al-Hossam Law Firm — Home">
            <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-sm ring-1 ring-gold/40 transition duration-300 group-hover:ring-gold">
              <img src={LOGO} alt="الحسام للمحاماة — Al-Hossam Law Firm" className="h-full w-full object-cover" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-semibold text-ivory">
                <span lang="ar">الحسام</span> <span className="text-gold">·</span> <span className="text-sm tracking-wide">AL-HOSSAM</span>
              </span>
              <span className="text-[11px] tracking-[0.28em] text-ivory/55 uppercase">{t.nav.tagline}</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="nav-link relative text-[13.5px] font-medium tracking-wide text-ivory/80 transition-colors hover:text-ivory"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LangSwitcher />
            </div>
            <a
              href={`tel:${PHONE_INTL}`}
              className="hidden items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-[13px] font-semibold text-champagne transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink xl:flex"
            >
              <Phone size={15} />
              <span dir="ltr">{PHONE}</span>
            </a>
            <button
              onClick={() => go('contact')}
              className="hidden rounded-full bg-gold px-5 py-2.5 text-[13.5px] font-bold text-ink shadow-[0_8px_24px_rgba(194,160,89,0.35)] transition-all duration-300 hover:bg-champagne lg:block"
            >
              {t.nav.cta}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:border-gold hover:text-gold lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/98 backdrop-blur-xl"
          >
            <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
              <span className="flex items-center gap-3">
                <span className="block h-11 w-11 overflow-hidden rounded-sm ring-1 ring-gold/40">
                  <img src={LOGO} alt="الحسام للمحاماة" className="h-full w-full object-cover" />
                </span>
                <span className="font-display text-lg text-ivory">
                  <span lang="ar">الحسام للمحاماة</span>
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:border-gold hover:text-gold"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  onClick={() => go(l.id)}
                  className="group flex items-baseline gap-4 border-b border-ivory/10 py-4 text-start"
                >
                  <span className="font-display text-xs tracking-widest text-gold/70">0{i + 1}</span>
                  <span className="font-display text-3xl font-medium text-ivory transition-colors group-hover:text-gold">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-4 border-t border-ivory/10 px-8 py-6">
              <LangSwitcher compact />
              <a href={`tel:${PHONE_INTL}`} className="flex items-center gap-2 text-champagne">
                <Phone size={16} />
                <span dir="ltr" className="font-semibold tracking-wide">{PHONE}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
