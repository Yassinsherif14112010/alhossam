import { useEffect, useState } from 'react';
import { ArrowUp, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { getPracticeAreas, type PracticeArea } from '../lib/api';
import { PHONE, PHONE_INTL } from './Navbar';

export default function Footer() {
  const { t, lang } = useLang();
  const [areas, setAreas] = useState<PracticeArea[]>([]);

  useEffect(() => {
    getPracticeAreas().then((a) => setAreas(a.slice(0, 6))).catch(() => {});
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const links = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'practice', label: t.nav.practice },
    { id: 'approach', label: t.nav.approach },
    { id: 'insights', label: t.nav.insights },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-gold/20 bg-ink pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="block h-16 w-16 shrink-0 overflow-hidden rounded-sm ring-1 ring-gold/40">
                <img src="/logo-official.png" alt="الحسام للمحاماة — Al-Hossam Law Firm" className="h-full w-full object-cover" />
              </span>
              <div>
                <div className="font-display text-xl text-ivory" lang="ar">الحسام للمحاماة</div>
                <div className="text-[11px] tracking-[0.3em] text-champagne/80 uppercase">Al-Hossam Law Firm</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-8 text-ivory/55">{t.footer.about}</p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-bold tracking-[0.25em] text-gold uppercase">{t.footer.quick}</h4>
            <ul className="mt-6 space-y-3">
              {links.map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} className="text-sm text-ivory/60 transition-colors hover:text-gold">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold tracking-[0.25em] text-gold uppercase">{t.footer.practiceT}</h4>
            <ul className="mt-6 space-y-3">
              {areas.map((a) => (
                <li key={a.id}>
                  <button onClick={() => go('practice')} className="text-sm text-ivory/60 transition-colors hover:text-gold">
                    {lang === 'ar' ? a.title_ar : a.title_en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold tracking-[0.25em] text-gold uppercase">{t.footer.contactT}</h4>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-ivory/60">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-gold/70" />
                <span>{t.contact.info.address}</span>
              </li>
              <li>
                <a href={`tel:${PHONE_INTL}`} className="flex gap-3 transition-colors hover:text-gold">
                  <Phone size={16} className="mt-1 shrink-0 text-gold/70" />
                  <span dir="ltr">{PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${PHONE_INTL.replace('+', '')}`} target="_blank" rel="noreferrer" className="flex gap-3 transition-colors hover:text-gold">
                  <MessageCircle size={16} className="mt-1 shrink-0 text-gold/70" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="mt-1 shrink-0 text-gold/70" />
                <span>{t.contact.info.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-7 text-[12.5px] text-ivory/40 sm:flex-row">
          <p>{t.footer.rights}</p>
          <p className="tracking-wide">{t.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed bottom-6 end-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${PHONE_INTL.replace('+', '')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-gold p-3.5 text-ink shadow-[0_12px_32px_rgba(194,160,89,0.45)] transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle size={21} />
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-ink/80 text-ivory backdrop-blur transition hover:border-gold hover:text-gold"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
