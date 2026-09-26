import { localPracticeAreas, localInsights } from './localData';

export interface PracticeArea {
  id: number;
  slug: string;
  icon: string;
  title_ar: string;
  title_en: string;
  summary_ar: string;
  summary_en: string;
  details_ar: string;
  details_en: string;
  sort_order: number;
}

export interface Insight {
  id: number;
  slug: string;
  category_ar: string;
  category_en: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  body_ar: string;
  body_en: string;
  image: string;
  published_at: string;
  read_minutes: number;
}

export interface InquiryPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  language: 'ar' | 'en';
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function getPracticeAreas(): Promise<PracticeArea[]> {
  try {
    const res = await fetch('/api/practice-areas');
    return await handle<PracticeArea[]>(res);
  } catch {
    return localPracticeAreas;
  }
}

export async function getInsights(): Promise<Insight[]> {
  try {
    const res = await fetch('/api/insights');
    return await handle<Insight[]>(res);
  } catch {
    return localInsights;
  }
}

export async function createInquiry(payload: InquiryPayload): Promise<{ id: number }> {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handle<{ id: number }>(res);
}
