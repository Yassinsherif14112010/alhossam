import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, ChevronDown, Clock, Loader2, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { createInquiry, getPracticeAreas, type PracticeArea } from '../lib/api';
import { PHONE, PHONE_INTL } from './Navbar';
import { Reveal, SectionHead } from './Reveal';

const MAP_EMBED =
  'https://maps.google.com/maps?q=Corniche%20El%20Nil%2C%20Kit%20Kat%2C%20Mohandessin%2C%20Giza%2C%20Egypt&t=&z=14&ie=UTF8&iwloc=&output=embed';
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Corniche+El+Nil+Kit+Kat+Mohandessin+Giza+Egypt';

export default function Contact() {
  const { t, lang, isAr } = useLang();
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [refId, setRefId] = useState<number | null>(null);

  useEffect(() => {
    getPracticeAreas().then(setAreas).catch(() => {});
  }, []);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = t.contact.form.errName;
    if (!/^[0-9+\s-]{8,16}$/.test(form.phone.trim())) e.phone = t.contact.form.errPhone;
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.contact.form.errEmail;
    if (form.message.trim().length < 10) e.message = t.contact.form.errMsg;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSendError('');
    if (!validate()) return;
    setSending(true);
    try {
      const saved = await createInquiry({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        service: form.service || undefined,
        message: form.message,
        language: lang,
      });
      setRefId(saved?.id ?? 0);
    } catch {
      setSendError(t.contact.form.errSend);
    } finally {
      setSending(false);
    }
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-sm border bg-white/70 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink/35 outline-none transition-all duration-300 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/25 ${bad ? 'border-red-400' : 'border-ink/15'}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-parchment py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead number={t.contact.number} label={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-sm bg-ivory p-7 shadow-[0_24px_64px_rgba(20,16,11,0.08)] ring-1 ring-ink/5 sm:p-10">
              {refId !== null ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15">
                    <CheckCircle2 size={38} className="text-muted-gold" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl text-ink">{t.contact.form.successT}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-8 text-ink/65">
                    {t.contact.form.successD}{' '}
                    <span className="font-bold text-muted-gold" dir="ltr">#{String(refId).padStart(4, '0')}</span>
                  </p>
                  <button
                    onClick={() => {
                      setRefId(null);
                      setForm({ name: '', phone: '', email: '', service: '', message: '' });
                    }}
                    className="mt-8 rounded-full border border-ink/20 px-7 py-3 text-sm font-bold text-ink transition hover:border-gold hover:text-muted-gold"
                  >
                    {t.contact.form.newRequest}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[13px] font-bold tracking-wide text-ink/80">{t.contact.form.name}</label>
                      <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder={t.contact.form.namePh} className={inputCls(errors.name)} />
                      {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-bold tracking-wide text-ink/80">{t.contact.form.phone}</label>
                      <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder={t.contact.form.phonePh} inputMode="tel" dir="ltr" className={`${inputCls(errors.phone)} text-left`} />
                      {errors.phone && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-[13px] font-bold tracking-wide text-ink/80">{t.contact.form.email}</label>
                      <input value={form.email} onChange={(e) => set('email', e.target.value)} placeholder={t.contact.form.emailPh} inputMode="email" dir="ltr" className={`${inputCls(errors.email)} text-left`} />
                      {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>}
                    </div>
                    <div className="relative">
                      <label className="mb-2 block text-[13px] font-bold tracking-wide text-ink/80">{t.contact.form.service}</label>
                      <select
                        value={form.service}
                        onChange={(e) => set('service', e.target.value)}
                        className={`${inputCls()} appearance-none pe-10 cursor-pointer`}
                      >
                        <option value="">{t.contact.form.servicePh}</option>
                        {areas.map((a) => (
                          <option key={a.id} value={lang === 'ar' ? a.title_ar : a.title_en}>
                            {lang === 'ar' ? a.title_ar : a.title_en}
                          </option>
                        ))}
                        <option value={isAr ? 'أخرى' : 'Other'}>{isAr ? 'أخرى' : 'Other'}</option>
                      </select>
                      <ChevronDown size={17} className="pointer-events-none absolute end-3.5 bottom-4 text-ink/40" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-[13px] font-bold tracking-wide text-ink/80">{t.contact.form.message}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                        placeholder={t.contact.form.messagePh}
                        rows={5}
                        className={`${inputCls(errors.message)} resize-none`}
                      />
                      {errors.message && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.message}</p>}
                    </div>
                  </div>
                  {sendError && (
                    <p className="mt-5 rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{sendError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-sm bg-ink px-8 py-4 text-[15px] font-bold text-ivory transition-all duration-300 hover:bg-gold hover:text-ink disabled:opacity-60 sm:w-auto sm:px-12"
                  >
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} className={isAr ? 'rotate-180' : ''} />}
                    {sending ? t.contact.form.sending : t.contact.form.submit}
                  </button>
                  <p className="mt-5 text-xs leading-6 text-ink/45">{t.contact.form.privacy}</p>
                </form>
              )}
            </div>
          </Reveal>

          <div className="space-y-5 lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-sm bg-ink p-8 text-ivory">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><MapPin size={20} /></span>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest text-champagne uppercase">{t.contact.info.addressT}</h3>
                    <p className="mt-2 text-[15px] leading-8 text-ivory/85">{t.contact.info.address}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-4 border-t border-ivory/10 pt-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Clock size={20} /></span>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest text-champagne uppercase">{t.contact.info.hoursT}</h3>
                    <p className="mt-2 text-[15px] text-ivory/85">{t.contact.info.hours}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="rounded-sm border border-gold/30 bg-coal p-8 text-center">
                <h3 className="text-sm font-bold tracking-widest text-champagne uppercase">{t.contact.info.phoneT}</h3>
                <a href={`tel:${PHONE_INTL}`} dir="ltr" className="font-display mt-3 block text-4xl tracking-wide text-ivory transition-colors hover:text-gold">
                  {PHONE}
                </a>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a href={`tel:${PHONE_INTL}`} className="flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-champagne">
                    <Phone size={16} /> {t.contact.info.call}
                  </a>
                  <a href={`https://wa.me/${PHONE_INTL.replace('+', '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-sm border border-gold/50 px-5 py-3.5 text-sm font-bold text-champagne transition hover:bg-gold hover:text-ink">
                    <MessageCircle size={16} /> {t.contact.info.whatsapp}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Location() {
  const { t } = useLang();
  return (
    <section id="location" className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <img src="/images/nile-dusk.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead number="08" label={t.location.eyebrow} title={t.location.title} dark />
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-lg text-[15px] leading-9 text-ivory/70">{t.location.body}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-bold text-champagne transition-all duration-300 hover:bg-gold hover:text-ink"
              >
                <MapPin size={17} /> {t.location.directions}
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-sm ring-1 ring-gold/30 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <iframe
                title="Al-Hossam Law Firm — Location"
                src={MAP_EMBED}
                className="h-[380px] w-full grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
