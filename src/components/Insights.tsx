import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Loader2, X } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { getInsights, type Insight } from '../lib/api';
import { Reveal, SectionHead } from './Reveal';

export function formatDate(iso: string, lang: 'ar' | 'en') {
  try {
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function Insights() {
  const { t, lang, isAr } = useLang();
  const [items, setItems] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState<Insight | null>(null);

  useEffect(() => {
    getInsights()
      .then(setItems)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="insights" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead number={t.insights.number} label={t.insights.eyebrow} title={t.insights.title} sub={t.insights.sub} align="center" />

        <div className="mt-16">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-ink/60">
              <Loader2 className="animate-spin text-muted-gold" size={22} />
              <span>{t.insights.loading}</span>
            </div>
          )}
          {error && !loading && <p className="py-20 text-center text-ink/60">{t.insights.error}</p>}
          {!loading && !error && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((a, i) => (
                <Reveal key={a.id} delay={0.07 * (i % 3)}>
                  <article
                    onClick={() => setActive(a)}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-sm bg-white shadow-[0_10px_36px_rgba(20,16,11,0.06)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_rgba(20,16,11,0.14)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={a.image}
                        alt={lang === 'ar' ? a.title_ar : a.title_en}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-107"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent opacity-70" />
                      <span className="absolute top-4 start-4 rounded-full bg-ink/80 px-4 py-1.5 text-[11px] font-bold tracking-widest text-champagne uppercase backdrop-blur-sm">
                        {lang === 'ar' ? a.category_ar : a.category_en}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center gap-4 text-[12px] text-ink/45">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} /> {formatDate(a.published_at, lang)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} /> {a.read_minutes} {t.insights.minRead}
                        </span>
                      </div>
                      <h3 className="font-display mt-4 text-[1.4rem] leading-9 text-ink transition-colors group-hover:text-muted-gold">
                        {lang === 'ar' ? a.title_ar : a.title_en}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-ink/60">
                        {lang === 'ar' ? a.excerpt_ar : a.excerpt_en}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-muted-gold">
                        {t.insights.readMore}
                        <Arrow size={16} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-ivory shadow-2xl sm:rounded-sm"
            >
              <div className="relative">
                <img src={active.image} alt="" className="aspect-[21/9] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-ivory backdrop-blur transition hover:bg-gold hover:text-ink"
                  aria-label={t.insights.close}
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-9">
                  <span className="rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold tracking-widest text-ink uppercase">
                    {lang === 'ar' ? active.category_ar : active.category_en}
                  </span>
                  <h3 className="font-display mt-4 text-2xl leading-snug text-ivory sm:text-[2rem]">
                    {lang === 'ar' ? active.title_ar : active.title_en}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-[12px] text-ivory/70">
                    <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(active.published_at, lang)}</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} /> {active.read_minutes} {t.insights.minRead}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-5 p-6 sm:p-10">
                {(lang === 'ar' ? active.body_ar : active.body_en).split('\n\n').map((p, i) => (
                  <p key={i} className="text-[15px] leading-9 text-ink/75">{p}</p>
                ))}
                <div className="border-t border-ink/10 pt-6">
                  <button
                    onClick={() => {
                      setActive(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-ivory transition hover:bg-gold hover:text-ink"
                  >
                    {isAr ? 'استشرنا في هذا الموضوع' : 'Consult us on this matter'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
