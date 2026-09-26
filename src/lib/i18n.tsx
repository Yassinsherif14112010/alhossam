import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'ar' | 'en';

const translations = {
  ar: {
    meta: { title: 'الحسام للمحاماة والاستشارات القانونية | Al-Hossam Law Firm' },
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      practice: 'مجالات الممارسة',
      approach: 'منهجيتنا',
      insights: 'رؤى قانونية',
      contact: 'اتصل بنا',
      cta: 'احجز استشارة',
      tagline: 'محاماة · استشارات · تحكيم',
    },
    hero: {
      eyebrow: 'توثيق زواج الأجانب والإقامات',
      line1: 'توثيق زواج الأجانب',
      line2: 'وإقامات مصر',
      sub: 'الحسام للمحاماة والاستشارات القانونية — متخصصون في توثيق عقود زواج الأجانب واستخراج وتجديد الإقامات في مصر بسرعة وسرّية تامة، إلى جانب تمثيل عملائنا أمام جميع درجات المحاكم وهيئات التحكيم بالتزام مطلق.',
      ctaPrimary: 'اطلب استشارة سرّية',
      ctaSecondary: 'استكشف مجالات الممارسة',
      stats: [
        { value: '+15', label: 'عامًا من الخبرة' },
        { value: '+1200', label: 'قضية واستشارة' },
        { value: '98%', label: 'رضا العملاء' },
      ],
      scroll: 'اكتشف المزيد',
      badge: 'سرّية تامة · التزام مطلق',
    },
    marquee: ['القانون المدني', 'القانون التجاري', 'التحكيم', 'الأحوال الشخصية', 'القانون الجنائي', 'العقارات', 'قانون العمل', 'القضاء الإداري'],
    intro: {
      number: '٠١',
      eyebrow: 'مقدمة',
      title: 'مكتبٌ يُدار كدار خبرة، ويُمارس كرسالة',
      lead: 'في الحسام للمحاماة، لا نرى القضية ملفًا، بل أمانة. ندرس كل تفصيلة، ونبني كل استراتيجية دفاع كما تُبنى الصروح: على أساسٍ من العلم، وهيكلٍ من الدقة، وتشطيبٍ من الإتقان.',
      body: 'من مقرّنا على كورنيش النيل بالمهندسين، نخدم الأفراد والشركات والمؤسسات في القاهرة الكبرى وجميع محافظات مصر، ونمثّل عملاءنا أمام المحاكم الابتدائية والاستئناف والنقض، ومحاكم مجلس الدولة، وهيئات التحكيم المحلية والدولية.',
      points: ['تمثيل أمام جميع درجات المحاكم', 'صياغة ومراجعة العقود والاتفاقيات', 'استشارات وقائية للشركات والأفراد'],
      link: 'تعرّف على المكتب',
    },
    about: {
      number: '٠٢',
      eyebrow: 'من نحن',
      title: 'عراقة المهنة… بدقّة العصر',
      lead: 'تأسس مكتب الحسام للمحاماة والاستشارات القانونية ليكون عنوانًا للثقة في قلب الجيزة، على ضفاف النيل حيث يلتقي التاريخ بالحداثة.',
      p1: 'نؤمن أن المحاماة الحقيقية تبدأ قبل قاعة المحكمة: تبدأ من الإنصات العميق لموكّلنا، والفهم الكامل لوقائع قضيته، والدراسة المتأنية لنصوص القانون وأحكام القضاء — ثم صياغة استراتيجية محكمة لا تترك شيئًا للمصادفة.',
      p2: 'فريقنا يجمع بين الخبرة الميدانية الممتدة والمعرفة الأكاديمية المتجددة، ويتعامل مع كل قضية — مهما صغرت — بذات الجدية والسرّية والالتزام التي تستحقها كبرى القضايا.',
      quote: 'العدالة تُنتزع بالعلم والإعداد والدقة — لا بالصدفة.',
      quoteBy: '— فلسفة المكتب',
      creds: [
        { t: 'قيد نقابة المحامين', d: 'محامون مقيدون بالنقض والإدارية العليا والدستورية العليا' },
        { t: 'تغطية شاملة', d: 'تمثيل أمام كافة المحاكم وجهات التحكيم داخل مصر' },
        { t: 'خدمة ثنائية اللغة', d: 'مراسلات ومذكرات بالعربية والإنجليزية باحترافية كاملة' },
      ],
    },
    practice: {
      number: '٠٣',
      eyebrow: 'مجالات الممارسة',
      title: 'خبرة متخصصة في فروع القانون',
      sub: 'نغطي الطيف الكامل للاحتياجات القانونية للأفراد والشركات — من الاستشارة الوقائية إلى المرافعة أمام أعلى درجات التقاضي.',
      more: 'اقرأ المزيد',
      less: 'إخفاء التفاصيل',
      cta: 'ناقش قضيتك معنا',
      loading: 'جارٍ تحميل مجالات الممارسة…',
      error: 'تعذّر تحميل البيانات. يرجى المحاولة لاحقًا.',
    },
    approach: {
      number: '٠٤',
      eyebrow: 'منهجيتنا',
      title: 'منهج من أربع مراحل… لا يقبل المساومة',
      sub: 'كل قضية تمر عبر منظومة عمل صارمة تضمن أعلى مستويات الجودة في كل مرحلة.',
      steps: [
        { n: '01', t: 'الإنصات والفهم', d: 'جلسة استماع متأنية لوقائع القضية، وجمع المستندات، وفهم أهداف الموكّل بدقة قبل أي خطوة.' },
        { n: '02', t: 'الدراسة والاستراتيجية', d: 'بحث قانوني معمّق في النصوص والسوابق القضائية، وبناء استراتيجية دفاع أو تفاوض مصممة خصيصًا لقضيتك.' },
        { n: '03', t: 'التنفيذ والتمثيل', d: 'صياغة المذكرات والصحف بدقة لغوية وقانونية، وتمثيل رصين أمام المحاكم وهيئات التحكيم.' },
        { n: '04', t: 'المتابعة والحماية', d: 'متابعة مستمرة لمسار القضية، وإطلاعك على كل مستجد، وحماية مصالحك حتى بعد صدور الحكم.' },
      ],
    },
    principles: {
      number: '٠٥',
      eyebrow: 'مبادئنا',
      title: 'قيَم لا تتغير بتغيّر القضايا',
      items: [
        { t: 'السرّية المطلقة', d: 'معلوماتك أمانة مقدسة. لا تُناقش قضيتك خارج غرفة الاجتماعات — أبدًا.' },
        { t: 'الدقة المتناهية', d: 'كل مذكرة تُراجع مرتين، وكل موعد يُحترم بالدقيقة، وكل تفصيلة تُدرس.' },
        { t: 'الأمانة والصدق', d: 'نخبرك بموقفك القانوني الحقيقي — ولو كان صعبًا — قبل أن نعدك بأي شيء.' },
        { t: 'الالتزام الكامل', d: 'قضيتك هي أولويتنا. فريق مخصص، ومتابعة مستمرة، وتواصل مباشر.' },
        { t: 'التميّز المهني', d: 'تطوير مستمر للمعرفة القانونية ومواكبة أحدث التشريعات والأحكام.' },
        { t: 'الشفافية', d: 'أتعاب واضحة متفق عليها مسبقًا، وتقارير دورية عن سير قضيتك.' },
      ],
    },
    insights: {
      number: '٠٦',
      eyebrow: 'رؤى قانونية',
      title: 'معرفة نشاركها… لثقة نبنيها',
      sub: 'مقالات وتحليلات قانونية بلغة واضحة، تشرح حقوقك وتبسّط التشريعات.',
      readMore: 'قراءة المقال',
      close: 'إغلاق',
      minRead: 'دقائق قراءة',
      loading: 'جارٍ تحميل المقالات…',
      error: 'تعذّر تحميل المقالات. يرجى المحاولة لاحقًا.',
    },
    contact: {
      number: '٠٧',
      eyebrow: 'اتصل بنا',
      title: 'خطوتك الأولى نحو حقّك',
      sub: 'أرسل تفاصيل موضوعك وسنتواصل معك في أقرب وقت. جميع الاستفسارات تُعامل بسرّية تامة.',
      form: {
        name: 'الاسم الكامل',
        namePh: 'اكتب اسمك',
        phone: 'رقم الهاتف',
        phonePh: '01xxxxxxxxx',
        email: 'البريد الإلكتروني (اختياري)',
        emailPh: 'name@email.com',
        service: 'موضوع الاستشارة',
        servicePh: 'اختر المجال القانوني',
        message: 'اشرح موضوعك باختصار',
        messagePh: 'اكتب نبذة عن القضية أو الاستشارة المطلوبة…',
        submit: 'إرسال طلب الاستشارة',
        sending: 'جارٍ الإرسال…',
        successT: 'تم استلام طلبك بنجاح',
        successD: 'شكرًا لثقتك. سيتواصل معك فريق المكتب خلال ساعات العمل. رقم المرجع:',
        newRequest: 'إرسال طلب آخر',
        errName: 'يرجى إدخال الاسم',
        errPhone: 'يرجى إدخال رقم هاتف صحيح',
        errEmail: 'البريد الإلكتروني غير صحيح',
        errMsg: 'يرجى كتابة نبذة لا تقل عن ١٠ أحرف',
        errSend: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
        privacy: 'بإرسالك هذا النموذج فأنت توافق على تواصل المكتب معك بخصوص استشارتك بسرّية تامة.',
      },
      info: {
        addressT: 'العنوان',
        address: 'كورنيش النيل، الكيت كات، المهندسين، الجيزة، مصر',
        phoneT: 'الهاتف / واتساب',
        hoursT: 'ساعات العمل',
        hours: 'السبت – الخميس · ١٠ صباحًا – ٦ مساءً',
        call: 'اتصل الآن',
        whatsapp: 'محادثة واتساب',
      },
    },
    location: {
      eyebrow: 'موقعنا',
      title: 'على ضفاف النيل… في قلب الجيزة',
      body: 'يقع مكتبنا في موقع متميز على كورنيش النيل بمنطقة الكيت كات بالمهندسين — دقائق من وسط القاهرة ومحاور الجيزة الرئيسية، لسهولة الوصول من جميع أنحاء القاهرة الكبرى.',
      directions: 'احصل على الاتجاهات',
    },
    footer: {
      about: 'مكتب الحسام للمحاماة والاستشارات القانونية — تمثيل رصين، واستشارات دقيقة، والتزام مطلق بسرّية موكّلينا.',
      quick: 'روابط سريعة',
      practiceT: 'مجالات الممارسة',
      contactT: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة © 2026 — الحسام للمحاماة والاستشارات القانونية',
      made: 'صُمم بإتقان في القاهرة',
    },
    common: { dir: 'rtl' as 'rtl' | 'ltr' },
  },
  en: {
    meta: { title: 'Al-Hossam Law Firm | Legal Consultancy — Giza, Egypt' },
    nav: {
      home: 'Home',
      about: 'About',
      practice: 'Practice Areas',
      approach: 'Our Approach',
      insights: 'Insights',
      contact: 'Contact',
      cta: 'Book a Consultation',
      tagline: 'Advocacy · Counsel · Arbitration',
    },
    hero: {
      eyebrow: "Foreigners' Marriage & Residency Documentation",
      line1: "Foreigners' Marriage",
      line2: 'and Residency in Egypt',
      sub: "Al-Hossam Law Firm & Legal Consultancy — specialists in documenting foreigners' marriage contracts and obtaining or renewing residency permits in Egypt, swiftly and confidentially, alongside representing clients before all court levels and arbitral tribunals.",
      ctaPrimary: 'Request a Confidential Consultation',
      ctaSecondary: 'Explore Practice Areas',
      stats: [
        { value: '15+', label: 'Years of Experience' },
        { value: '1,200+', label: 'Cases & Consultations' },
        { value: '98%', label: 'Client Satisfaction' },
      ],
      scroll: 'Discover more',
      badge: 'Absolute discretion · Total commitment',
    },
    marquee: ['Civil Law', 'Commercial Law', 'Arbitration', 'Family Law', 'Criminal Law', 'Real Estate', 'Labour Law', 'Administrative Courts'],
    intro: {
      number: '01',
      eyebrow: 'Introduction',
      title: 'Run as a house of expertise, practised as a calling',
      lead: 'At Al-Hossam Law Firm, a case is never just a file — it is a trust. We study every detail and build every defence strategy the way monuments are built: on a foundation of knowledge, a structure of precision, and a finish of mastery.',
      body: 'From our offices on the Nile Corniche in Mohandessin, we serve individuals, companies and institutions across Greater Cairo and all of Egypt — before Courts of First Instance, Appeal, Cassation, the State Council courts, and local and international arbitral tribunals.',
      points: ['Representation before all court levels', 'Drafting & review of contracts and agreements', 'Preventive counsel for businesses and individuals'],
      link: 'Meet the firm',
    },
    about: {
      number: '02',
      eyebrow: 'About Us',
      title: 'The heritage of the profession, with modern precision',
      lead: 'Al-Hossam Law Firm & Legal Consultancy was founded to be an address of trust in the heart of Giza — on the banks of the Nile, where history meets modernity.',
      p1: 'We believe true advocacy begins long before the courtroom: it begins with deep listening to our client, complete understanding of the facts, and careful study of statutes and jurisprudence — then crafting an airtight strategy that leaves nothing to chance.',
      p2: 'Our team combines long field experience with ever-renewed academic knowledge, treating every matter — however small — with the same seriousness, discretion and commitment that the greatest cases deserve.',
      quote: 'Justice is secured through knowledge, preparation and precision — never by chance.',
      quoteBy: '— The firm\u2019s philosophy',
      creds: [
        { t: 'Bar Admission', d: 'Counsel admitted before Cassation, High Administrative & Supreme Constitutional Courts' },
        { t: 'Full Coverage', d: 'Representation before all courts and arbitral bodies across Egypt' },
        { t: 'Bilingual Service', d: 'Fully professional correspondence and pleadings in Arabic and English' },
      ],
    },
    practice: {
      number: '03',
      eyebrow: 'Practice Areas',
      title: 'Specialised expertise across the law',
      sub: 'We cover the full spectrum of legal needs for individuals and businesses — from preventive counsel to pleading before the highest courts.',
      more: 'Read more',
      less: 'Show less',
      cta: 'Discuss your case with us',
      loading: 'Loading practice areas…',
      error: 'Could not load data. Please try again later.',
    },
    approach: {
      number: '04',
      eyebrow: 'Our Approach',
      title: 'A four-stage method that accepts no compromise',
      sub: 'Every matter passes through a rigorous workflow guaranteeing the highest quality at each stage.',
      steps: [
        { n: '01', t: 'Listen & Understand', d: 'A careful intake session to grasp the facts, gather documents and understand your objectives precisely — before any action.' },
        { n: '02', t: 'Analyse & Strategise', d: 'In-depth legal research across statutes and precedents, building a defence or negotiation strategy tailored to your case.' },
        { n: '03', t: 'Act & Represent', d: 'Memoranda and pleadings drafted with linguistic and legal precision, and dignified representation before courts and tribunals.' },
        { n: '04', t: 'Follow Through & Protect', d: 'Continuous monitoring of your matter, updates on every development, and protection of your interests even after judgment.' },
      ],
    },
    principles: {
      number: '05',
      eyebrow: 'Our Principles',
      title: 'Values that never change with the case',
      items: [
        { t: 'Absolute Discretion', d: 'Your information is a sacred trust. Your case is never discussed outside the meeting room — ever.' },
        { t: 'Extreme Precision', d: 'Every memorandum reviewed twice, every deadline honoured to the minute, every detail studied.' },
        { t: 'Honesty & Integrity', d: 'We tell you your true legal position — even when difficult — before promising anything.' },
        { t: 'Total Commitment', d: 'Your case is our priority. A dedicated team, continuous follow-up, direct communication.' },
        { t: 'Professional Excellence', d: 'Continuous development of legal knowledge, tracking the latest legislation and rulings.' },
        { t: 'Transparency', d: 'Clear fees agreed in advance, and periodic reports on the progress of your matter.' },
      ],
    },
    insights: {
      number: '06',
      eyebrow: 'Legal Insights',
      title: 'Knowledge we share… to build trust',
      sub: 'Legal articles and analysis in clear language — explaining your rights and simplifying legislation.',
      readMore: 'Read article',
      close: 'Close',
      minRead: 'min read',
      loading: 'Loading articles…',
      error: 'Could not load articles. Please try again later.',
    },
    contact: {
      number: '07',
      eyebrow: 'Contact',
      title: 'Your first step toward your right',
      sub: 'Send us the details of your matter and we will reach out promptly. All enquiries are treated in strict confidence.',
      form: {
        name: 'Full Name',
        namePh: 'Your name',
        phone: 'Phone Number',
        phonePh: '01xxxxxxxxx',
        email: 'Email (optional)',
        emailPh: 'name@email.com',
        service: 'Consultation Subject',
        servicePh: 'Select a legal field',
        message: 'Briefly describe your matter',
        messagePh: 'A short note about your case or required consultation…',
        submit: 'Send Consultation Request',
        sending: 'Sending…',
        successT: 'Request received successfully',
        successD: 'Thank you for your trust. Our team will contact you during working hours. Reference:',
        newRequest: 'Send another request',
        errName: 'Please enter your name',
        errPhone: 'Please enter a valid phone number',
        errEmail: 'Invalid email address',
        errMsg: 'Please write at least 10 characters',
        errSend: 'An error occurred while sending. Please try again or call us directly.',
        privacy: 'By submitting this form you agree to be contacted by the firm regarding your consultation, in strict confidence.',
      },
      info: {
        addressT: 'Address',
        address: 'Nile Corniche, Kit Kat, Mohandessin, Giza, Egypt',
        phoneT: 'Phone / WhatsApp',
        hoursT: 'Working Hours',
        hours: 'Sat – Thu · 10:00 AM – 6:00 PM',
        call: 'Call Now',
        whatsapp: 'WhatsApp Chat',
      },
    },
    location: {
      eyebrow: 'Our Location',
      title: 'On the banks of the Nile… in the heart of Giza',
      body: 'Our office sits in a prime position on the Nile Corniche in Kit Kat, Mohandessin — minutes from downtown Cairo and Giza\u2019s main corridors, with easy access from across Greater Cairo.',
      directions: 'Get Directions',
    },
    footer: {
      about: 'Al-Hossam Law Firm & Legal Consultancy — dignified representation, precise counsel, and an absolute commitment to client confidentiality.',
      quick: 'Quick Links',
      practiceT: 'Practice Areas',
      contactT: 'Get in Touch',
      rights: 'All rights reserved © 2026 — Al-Hossam Law Firm & Legal Consultancy',
      made: 'Crafted with precision in Cairo',
    },
    common: { dir: 'ltr' as 'rtl' | 'ltr' },
  },
};

export type Dict = typeof translations.en;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  isAr: boolean;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'ar',
  setLang: () => {},
  t: translations.ar as unknown as Dict,
  isAr: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('alhossam-lang');
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('alhossam-lang', l);
    } catch { /* noop */ }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = translations[lang].meta.title;
  }, [lang]);

  const value: LangCtx = {
    lang,
    setLang,
    t: translations[lang],
    isAr: lang === 'ar',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
