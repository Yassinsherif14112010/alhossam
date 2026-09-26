import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`font-display text-sm tracking-[0.25em] ${dark ? 'text-gold' : 'text-muted-gold'}`}>{number}</span>
      <span className={`h-px w-12 ${dark ? 'bg-gold/70' : 'bg-muted-gold/60'}`} />
      <span className={`text-xs font-semibold uppercase tracking-[0.35em] ${dark ? 'text-champagne' : 'text-muted-gold'}`}>{label}</span>
    </div>
  );
}

export function SectionHead({
  number,
  label,
  title,
  sub,
  dark = false,
  align = 'start',
}: {
  number: string;
  label: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: 'start' | 'center';
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'text-center' : ''}>
      <Reveal>
        <div className={centered ? 'flex justify-center' : ''}>
          <Eyebrow number={number} label={label} dark={dark} />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`font-display mt-6 text-4xl leading-[1.15] font-medium text-balance sm:text-5xl lg:text-[3.4rem] ${
            dark ? 'text-ivory' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.2}>
          <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${centered ? 'mx-auto' : ''} ${dark ? 'text-ivory/65' : 'text-ink/65'}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
