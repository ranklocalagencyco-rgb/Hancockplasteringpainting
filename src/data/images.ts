// Branded site photography (heroes, banners, feature tiles).
//
// Every entry exists in public/uploads/ as `<file>-{640,960,1280,1920}.webp`
// (the homepage hero also has matching .avif files). The originals were only
// 590-1020px wide and were being stretched full-width by the browser, which
// is why banners looked soft. They were upscaled 4x with Real-ESRGAN and
// re-exported at these widths so each viewport gets a sharp, right-sized file.
// Two stock shots (312px and 346px wide) were too small to rescue and have
// been retired, so do not reintroduce them.
//
// `focus` is the default object-position: it keeps the Hancock logo (where the
// photo has one) inside the crop on both wide banners and tall phone screens.
//
// Use via <BgImage name="..."/> (full-bleed backgrounds) or imgAttrs() (<img>).

export const IMAGE_WIDTHS = [640, 960, 1280, 1920] as const;

export const IMAGES = {
  'plastered-interior-roof-trusses': {
    file: 'plastered-interior-roof-trusses',
    alt: 'Immaculate white interior with exposed dark roof trusses, plastering by Hancock',
  },
  'hancock-plasterer-steel-trowel': {
    file: 'hancock-plasterer-steel-trowel',
    alt: 'Hancock tradesperson holding a steel trowel in branded workwear',
    focus: 'center 20%',
  },
  'white-rendered-wall': {
    file: 'white-rendered-wall',
    alt: 'Smooth white rendered exterior wall in dappled sunlight',
  },
  'venetian-plaster-shelf-lighting': {
    file: 'venetian-plaster-shelf-lighting',
    alt: 'Metallic Venetian plaster wall finish with built-in shelf lighting',
  },
  'ornate-plaster-cornice': {
    file: 'ornate-plaster-cornice',
    alt: 'Ornate white plaster cornice and ceiling detail, Hancock plaster refurbishment',
    focus: 'center 30%',
  },
  'polished-venetian-plaster-wall': {
    file: 'polished-venetian-plaster-wall',
    alt: 'Polished dark Venetian plaster wall catching the light',
  },
  'sash-window-painting-detail': {
    file: 'sash-window-painting-detail',
    alt: 'Careful sash window painting on a period property, detail of brush on frame',
    focus: 'center 40%',
  },
  'painting-window-frame': {
    file: 'painting-window-frame',
    alt: 'Painting a window frame with a brush, Victorian terraces beyond',
  },
  'painting-window-frame-portrait': {
    file: 'painting-window-frame-portrait',
    alt: 'Decorator cutting in a window frame with a brush',
  },
  'white-rendered-house-exterior': {
    file: 'white-rendered-house-exterior',
    alt: 'Freshly rendered and painted white detached house with a gravel drive',
    focus: 'center 35%',
    avif: true,
  },
  'hancock-plasterer-skim-coat': {
    file: 'hancock-plasterer-skim-coat',
    alt: 'Hancock plasterer in branded polo shirt applying skim plaster to a wall',
    focus: '85% 25%',
  },
  'scratch-coat-render-float': {
    file: 'scratch-coat-render-float',
    alt: 'Applying scratch coat render to an external wall, Hancock rendering service',
    focus: 'center 30%',
  },
  'hancock-branded-van': {
    file: 'hancock-branded-van',
    alt: 'Hancock Plastering branded van parked outside a residential property',
    focus: 'center 40%',
  },
} as const satisfies Record<string, { file: string; alt: string; focus?: string; avif?: boolean }>;

export type ImageName = keyof typeof IMAGES;

export function srcsetFor(name: ImageName, ext: 'webp' | 'avif' = 'webp'): string {
  const { file } = IMAGES[name];
  return IMAGE_WIDTHS.map((w) => `/uploads/${file}-${w}.${ext} ${w}w`).join(', ');
}

/** src/srcset/alt attributes for a plain <img>; pick `fallback` = the width closest to the rendered size. */
export function imgAttrs(name: ImageName, fallback: (typeof IMAGE_WIDTHS)[number] = 960) {
  const { file, alt } = IMAGES[name];
  return { src: `/uploads/${file}-${fallback}.webp`, srcset: srcsetFor(name), alt, title: alt };
}
