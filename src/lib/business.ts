// Central business data + JSON-LD schema generation.
// NAP (name/address/phone) is the single source of truth — keep byte-identical
// with the Google Business Profile and the visible footer/contact details.

// IMPORTANT: set this to the real production domain before launch.
export const SITE_URL = 'https://hancockplasteringpainting.co.uk';

export const BUSINESS = {
  name: 'Hancock Plastering & Painting Services',
  phone: '+447734903439',
  phoneDisplay: '07734 903439',
  email: 'hancockplasteringpainting@gmail.com',
  street: '3 Anderson Close',
  locality: 'Harefield',
  region: 'Middlesex',
  postalCode: 'UB9 6HF',
  country: 'GB',
  logo: SITE_URL + '/uploads/Hancockplasterandpainting-logo.png',
  sameAs: ['https://www.checkatrade.com/trades/HancockPlasteringandPaintingServices'],
};

// slug -> display name
export const SERVICES: Record<string, string> = {
  plastering: 'Plastering',
  skimming: 'Skimming',
  rendering: 'Rendering',
  'pebble-dashing': 'Pebble Dashing',
  'venetian-plastering': 'Venetian Plastering',
  'floating-plaster': 'Floating Plaster',
  'plaster-refurbishment': 'Plaster Refurbishment',
  'repair-insurance': 'Repair & Insurance Work',
  'interior-painting': 'Interior Painting',
  'exterior-painting': 'Exterior Painting',
  wallpapering: 'Wallpapering',
  'sash-window-painting': 'Sash Window Painting',
  'commercial-decorating': 'Commercial Decorating',
  'eco-friendly-decorating': 'Eco-Friendly Decorating',
};

export const AREAS: Record<string, string> = {
  amersham: 'Amersham',
  ascot: 'Ascot',
  beaconsfield: 'Beaconsfield',
  binfield: 'Binfield',
  bracknell: 'Bracknell',
  burnham: 'Burnham',
  chalfont: 'Chalfont',
  chesham: 'Chesham',
  chorleywood: 'Chorleywood',
  denham: 'Denham',
  eastcote: 'Eastcote',
  farnborough: 'Farnborough',
  farnham: 'Farnham',
  'gerrards-cross': 'Gerrards Cross',
  harefield: 'Harefield',
  'hatch-end': 'Hatch End',
  ickenham: 'Ickenham',
  iver: 'Iver',
  northwood: 'Northwood',
  pinner: 'Pinner',
  rickmansworth: 'Rickmansworth',
  ruislip: 'Ruislip',
  stanmore: 'Stanmore',
  'stoke-poges': 'Stoke Poges',
  uxbridge: 'Uxbridge',
  watford: 'Watford',
  windsor: 'Windsor',
};

const abs = (p: string) => SITE_URL + p;

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.locality,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
  };
}

const areaServedAll = () =>
  Object.values(AREAS).map((name) => ({ '@type': 'City', name }));

// Full LocalBusiness node. GeneralContractor is the most specific real
// schema.org LocalBusiness subtype covering plastering + painting + decorating.
export function localBusiness(extra: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': abs('/#business'),
    name: BUSINESS.name,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    image: BUSINESS.logo,
    logo: BUSINESS.logo,
    address: postalAddress(),
    areaServed: areaServedAll(),
    sameAs: BUSINESS.sameAs,
    ...extra,
  };
}

function providerRef() {
  return {
    '@type': 'GeneralContractor',
    name: BUSINESS.name,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    address: postalAddress(),
  };
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/**
 * Build the JSON-LD graph for a page based on its pathname.
 * Returns an array of schema objects (each rendered as its own script tag).
 */
export function schemaFor(pathname: string, title: string, description: string) {
  // Normalise: strip trailing slash (keep root as '/').
  const path = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
  const out: Record<string, unknown>[] = [];

  if (path === '/') {
    out.push(localBusiness());
    out.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': abs('/#website'),
      url: SITE_URL,
      name: BUSINESS.name,
      publisher: { '@id': abs('/#business') },
    });
    out.push(breadcrumb([{ name: 'Home', path: '/' }]));
    return out;
  }

  if (path === '/services' || path === '/areas' || path === '/gallery') {
    const label =
      path === '/services' ? 'Services' : path === '/areas' ? 'Areas We Cover' : 'Gallery';
    out.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: abs(path),
      isPartOf: { '@id': abs('/#website') },
    });
    out.push(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: label, path },
      ])
    );
    return out;
  }

  if (path === '/blog') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: title,
      description,
      url: abs(path),
      publisher: { '@id': abs('/#business') },
    });
    out.push(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ])
    );
    return out;
  }

  if (path === '/about' || path === '/contact') {
    const isAbout = path === '/about';
    out.push({
      '@context': 'https://schema.org',
      '@type': isAbout ? 'AboutPage' : 'ContactPage',
      name: title,
      description,
      url: abs(path),
      about: { '@id': abs('/#business') },
    });
    out.push(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: isAbout ? 'About' : 'Contact', path },
      ])
    );
    return out;
  }

  const svc = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (svc && SERVICES[svc[1]]) {
    const name = SERVICES[svc[1]];
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${name} | ${BUSINESS.name}`,
      serviceType: name,
      description,
      url: abs(path),
      provider: providerRef(),
      areaServed: areaServedAll(),
    });
    out.push(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name, path },
      ])
    );
    return out;
  }

  const area = path.match(/^\/areas\/([a-z0-9-]+)$/);
  if (area && AREAS[area[1]]) {
    const name = AREAS[area[1]];
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Plastering & Painting in ${name}`,
      serviceType: 'Plastering and Painting',
      description,
      url: abs(path),
      provider: providerRef(),
      areaServed: { '@type': 'City', name },
    });
    out.push(
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Areas We Cover', path: '/areas' },
        { name, path },
      ])
    );
    return out;
  }

  return out;
}
