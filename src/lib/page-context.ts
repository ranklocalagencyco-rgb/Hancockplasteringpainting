// Classifies a URL into a page type + human name. Shared by the WhatsApp
// button (pre-filled message) and GA4 analytics (content_group / page_name),
// so both always agree on what "this page" is.
import { AREAS, SERVICES } from './business';

export type PageType =
  | 'home'
  | 'service'
  | 'services_index'
  | 'area'
  | 'areas_index'
  | 'blog'
  | 'blog_index'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'thank_you'
  | 'legal'
  | 'other';

export interface PageContext {
  type: PageType;
  /** Human label: "Eastcote", "Interior Painting", the article title, "Home"... */
  name: string;
  /** Last URL segment ("eastcote", "interior-painting", "" for home). */
  slug: string;
  /** Short tag for attribution, e.g. "area:eastcote", "service:skimming", "page:gallery". */
  source: string;
}

const GENERAL: Record<string, [PageType, string]> = {
  '/': ['home', 'Home'],
  '/services': ['services_index', 'Services'],
  '/areas': ['areas_index', 'Areas'],
  '/blog': ['blog_index', 'Blog'],
  '/gallery': ['gallery', 'Gallery'],
  '/about': ['about', 'About'],
  '/contact': ['contact', 'Contact'],
  '/thank-you': ['thank_you', 'Thank You'],
  '/privacy-policy': ['legal', 'Privacy Policy'],
  '/terms-of-service': ['legal', 'Terms of Service'],
};

export function pageContext(pathname: string, title = ''): PageContext {
  const path = pathname.replace(/\/$/, '') || '/';
  const [, section = '', slug = ''] = path.split('/');

  if (section === 'areas' && slug && AREAS[slug]) {
    return { type: 'area', name: AREAS[slug], slug, source: `area:${slug}` };
  }
  if (section === 'services' && slug && SERVICES[slug]) {
    return { type: 'service', name: SERVICES[slug], slug, source: `service:${slug}` };
  }
  if (section === 'blog' && slug) {
    const article = title.replace(/\s*\|.*$/, '').trim() || slug;
    return { type: 'blog', name: article, slug, source: `blog:${slug}` };
  }
  const [type, name] = GENERAL[path] ?? ['other', title.replace(/\s*\|.*$/, '').trim() || path];
  const key = path === '/' ? 'home' : path.slice(1);
  return { type, name, slug: key, source: `page:${key}` };
}
