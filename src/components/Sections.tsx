import { useEffect, useState } from 'react';
import {
  ArrowUpRight, Award, Briefcase, Building2, Check, FileText, Gavel, Handshake,
  Landmark, Loader2, Minus, Scale, ShieldCheck, Users,
} from 'lucide-react';
import { useLang } from '../lib/i18n';
import { getPracticeAreas, type PracticeArea } from '../lib/api';
import { Eyebrow, Reveal, SectionHead } from './Reveal';

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="overflow-hidden border-y border-gold/20 bg-coal py-5" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-xl text-ivory/80 italic">{m}</span>
            <Scale size={15} className="shrink-0 text-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Intro() {
  const { t, isAr } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="intro" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionHead number={t.intro.number} label={t.intro.eyebrow} title={t.intro.title} />
          <Reveal delay={0.25}>
            <p className="font-display mt-8 border-s-2 border-gold ps-6 text-xl leading-10 text-ink/85 italic sm:text-2xl sm:leading-[2.75rem]">
              {t.intro.lead}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-[15px] leading-8 text-ink/65 sm:text-base">{t.intro.body}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <ul className="mt-8 space-y-3">
              {t.intro.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-ink/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-muted-gold">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.4}>
            <button
              onClick={() => go('about')}
              className="group mt-10 inline-flex items-center gap-3 text-[15px] font-bold text-ink"
            >
              <span className="border-b-2 border-gold pb-1 transition-colors group-hover:text-muted-gold">{t.intro.link}</span>
              <ArrowUpRight size={18} className={`text-gold transition-transform duration-300 group-hover:-translate-y-0.5 ${isAr ? 'rotate-90' : ''}`} />
            </button>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-sm border border-muted-gold/30" aria-hidden />
              <div className="relative overflow-hidden rounded-sm">
                <img src="/images/legal-services-ad.png" alt={isAr ? 'خدمات الحسام للمحاماة القانونية' : 'Al-Hossam Law Firm legal services'} className="aspect-square w-full object-cover transition-transform duration-[2s] hover:scale-105" loading="lazy" />
              </div>
              <div className="absolute -bottom-8 -start-6 hidden bg-ink px-7 py-5 shadow-2xl sm:block" aria-hidden>
                <div className="font-display text-4xl text-gold" dir="ltr">15+</div>
                <div className="mt-1 text-xs tracking-widest text-ivory/60 uppercase">{isAr ? 'عامًا من الثقة' : 'Years of trust'}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="scroll-mt-20 bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead number={t.about.number} label={t.about.eyebrow} title={t.about.title} />
              <Reveal delay={0.25}>
                <p className="mt-8 text-lg leading-9 font-medium text-ink/80">{t.about.lead}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 overflow-hidden rounded-sm">
                  <img src="/images/library.jpg" alt="" className="aspect-[3/4] w-full object-cover transition-transform duration-[2s] hover:scale-105" loading="lazy" />
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-[15px] leading-9 text-ink/70 sm:text-base">{t.about.p1}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[15px] leading-9 text-ink/70 sm:text-base">{t.about.p2}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <figure className="relative mt-12 overflow-hidden rounded-sm bg-ink px-8 py-10 sm:px-12">
                <img src="/images/marble.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" loading="lazy" />
                <div className="relative">
                  <Scale size={26} className="text-gold" />
                  <blockquote className="font-display mt-5 text-2xl leading-10 text-ivory italic sm:text-[1.7rem]">
                    &ldquo;{t.about.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm tracking-widest text-champagne/80">{t.about.quoteBy}</figcaption>
                </div>
              </figure>
            </Reveal>
            <div className="mt-10 space-y-5">
              {t.about.creds.map((c, i) => (
                <Reveal key={c.t} delay={0.1 * i}>
                  <div className="group flex gap-5 rounded-sm border border-ink/10 bg-ivory/60 p-6 transition-all duration-300 hover:border-gold/60 hover:bg-ivory hover:shadow-[0_16px_40px_rgba(20,16,11,0.08)]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                      {i === 0 ? <Award size={20} /> : i === 1 ? <Landmark size={20} /> : <FileText size={20} />}
                    </span>
                    <span>
                      <span className="font-display block text-xl text-ink">{c.t}</span>
                      <span className="mt-1 block text-sm leading-7 text-ink/60">{c.d}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, typeof Scale> = {
  building: Building2,
  scale: Scale,
  gavel: Gavel,
  users: Users,
  landmark: Landmark,
  briefcase: Briefcase,
  file: FileText,
  handshake: Handshake,
};

export function Practice() {
  const { t, lang } = useLang();
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    getPracticeAreas()
      .then(setAreas)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="practice" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 sm:py-32">
      <img src="/images/architecture.jpg" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead number={t.practice.number} label={t.practice.eyebrow} title={t.practice.title} sub={t.practice.sub} dark align="center" />

        <div className="mt-16">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-ivory/60">
              <Loader2 className="animate-spin text-gold" size={22} />
              <span>{t.practice.loading}</span>
            </div>
          )}
          {error && !loading && (
            <p className="py-20 text-center text-ivory/60">{t.practice.error}</p>
          )}
          {!loading && !error && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((a, i) => {
                const Icon = ICONS[a.icon] ?? Scale;
                const open = openId === a.id;
                return (
                  <Reveal key={a.id} delay={0.06 * (i % 4)}>
                    <article
                      className={`group flex h-full flex-col rounded-sm border p-7 transition-all duration-500 ${
                        open ? 'border-gold/70 bg-espresso shadow-[0_20px_60px_rgba(0,0,0,0.5)]' : 'border-ivory/12 bg-white/[0.03] hover:border-gold/50 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className={`flex h-13 w-13 items-center justify-center rounded-full border p-3 transition-all duration-500 ${open ? 'border-gold bg-gold text-ink' : 'border-gold/40 text-gold group-hover:bg-gold group-hover:text-ink'}`}>
                          <Icon size={21} />
                        </span>
                        <span className="font-display text-sm tracking-widest text-ivory/30" dir="ltr">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="font-display mt-6 text-[1.35rem] leading-9 text-ivory">
                        {lang === 'ar' ? a.title_ar : a.title_en}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-ivory/60">
                        {lang === 'ar' ? a.summary_ar : a.summary_en}
                      </p>
                      <div className={`grid transition-all duration-500 ${open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <p className="overflow-hidden text-[13px] leading-7 text-champagne/85">
                          {lang === 'ar' ? a.details_ar : a.details_en}
                        </p>
                      </div>
                      <button
                        onClick={() => setOpenId(open ? null : a.id)}
                        className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-gold transition-colors hover:text-champagne"
                      >
                        {open ? <Minus size={15} /> : <span className="text-lg leading-none">+</span>}
                        {open ? t.practice.less : t.practice.more}
                      </button>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 text-center">
            <button
              onClick={() => go('contact')}
              className="rounded-full bg-gold px-9 py-4 text-[15px] font-bold text-ink shadow-[0_16px_48px_rgba(194,160,89,0.3)] transition-all duration-300 hover:bg-champagne"
            >
              {t.practice.cta}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Approach() {
  const { t } = useLang();
  return (
    <section id="approach" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead number={t.approach.number} label={t.approach.eyebrow} title={t.approach.title} sub={t.approach.sub} />
              <Reveal delay={0.3}>
                <div className="mt-10 hidden overflow-hidden rounded-sm lg:block">
                  <img src="/images/architecture.jpg" alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-[2s] hover:scale-105" loading="lazy" />
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="relative space-y-2 border-s border-ink/10 ps-0">
              {t.approach.steps.map((s, i) => (
                <Reveal key={s.n} delay={0.08 * i}>
                  <li className="group relative flex gap-6 py-8 ps-10 sm:gap-10 sm:ps-12">
                    <span className="absolute top-10 start-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-gold/60 bg-ivory text-[11px] font-bold text-muted-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink rtl:translate-x-1/2" dir="ltr">
                      {s.n}
                    </span>
                    <div className="flex-1 border-b border-ink/10 pb-8 transition-colors group-hover:border-gold/50">
                      <span className="font-display text-5xl text-ink/10 transition-colors duration-300 group-hover:text-gold/40 sm:text-6xl" dir="ltr">{s.n}</span>
                      <h3 className="font-display mt-2 text-2xl text-ink sm:text-[1.7rem]">{s.t}</h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-8 text-ink/65">{s.d}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Principles() {
  const { t } = useLang();
  return (
    <section id="principles" className="relative scroll-mt-20 overflow-hidden bg-coal py-24 sm:py-32">
      <div className="grain absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead number={t.principles.number} label={t.principles.eyebrow} title={t.principles.title} dark />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-sm">
                <img src="/images/signing.jpg" alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-[2s] hover:scale-105" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ivory/10 ring-1 ring-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {t.principles.items.map((p, i) => (
            <Reveal key={p.t} delay={0.06 * i} y={20}>
              <div className="group h-full bg-coal p-8 transition-colors duration-500 hover:bg-espresso sm:p-9">
                <div className="flex items-center justify-between">
                  <Eyebrow number={String(i + 1).padStart(2, '0')} label="" dark />
                  <ShieldCheck size={20} className="text-gold/50 transition-colors duration-300 group-hover:text-gold" />
                </div>
                <h3 className="font-display mt-5 text-2xl text-ivory">{p.t}</h3>
                <p className="mt-3 text-sm leading-7 text-ivory/60">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
