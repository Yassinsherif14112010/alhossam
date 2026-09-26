import { motion } from 'framer-motion';
import { ArrowDown, ShieldCheck } from 'lucide-react';
import { useLang } from '../lib/i18n';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const { t, isAr } = useLang();

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink sm:items-center">
      <div className="absolute inset-0">
        <motion.img
          src="/images/nile-dusk.jpg"
          alt=""
          aria-hidden
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/45" />
        <div className={`absolute inset-0 ${isAr ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-ink/85 via-ink/30 to-transparent`} />
        <div className="grain absolute inset-0 opacity-[0.5]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 end-6 hidden flex-col items-center justify-center gap-6 lg:flex" aria-hidden>
        <span className="h-40 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        <span className="text-[11px] tracking-[0.5em] text-ivory/50 uppercase [writing-mode:vertical-rl]">
          {isAr ? 'الحسام للمحاماة' : 'Al-Hossam Law Firm'}
        </span>
        <span className="h-40 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 pb-16 sm:px-8 lg:pt-36">
        <motion.div {...fadeUp} transition={{ duration: 0.9, delay: 0.15 }} className="flex items-center gap-4">
          <span className="h-px w-14 bg-gold" />
          <span className="text-xs font-semibold tracking-[0.4em] text-champagne uppercase sm:text-sm">{t.hero.eyebrow}</span>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display mt-8 max-w-4xl text-[2.9rem] leading-[1.08] font-medium text-balance text-ivory sm:text-7xl lg:text-[5.4rem]"
        >
          {t.hero.line1}
          <br />
          <span className="text-gold italic">{t.hero.line2}</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-8 max-w-2xl text-base leading-8 text-ivory/75 sm:text-lg sm:leading-9"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.6 }} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={() => go('contact')}
            className="group rounded-full bg-gold px-8 py-4 text-[15px] font-bold text-ink shadow-[0_16px_48px_rgba(194,160,89,0.35)] transition-all duration-300 hover:bg-champagne hover:shadow-[0_16px_56px_rgba(194,160,89,0.5)]"
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={() => go('practice')}
            className="rounded-full border border-ivory/30 px-8 py-4 text-[15px] font-semibold text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold"
          >
            {t.hero.ctaSecondary}
          </button>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-ink/50 px-5 py-2.5 backdrop-blur-md"
        >
          <ShieldCheck size={16} className="text-gold" />
          <span className="text-[13px] font-medium tracking-wide text-champagne">{t.hero.badge}</span>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-8 sm:max-w-2xl"
        >
          {t.hero.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-gold sm:text-5xl" dir="ltr">{s.value}</div>
              <div className="mt-2 text-xs leading-5 text-ivory/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={() => go('intro')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/50 transition-colors hover:text-gold md:flex"
        aria-label={t.hero.scroll}
      >
        <span className="text-[11px] tracking-[0.35em] uppercase">{t.hero.scroll}</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
