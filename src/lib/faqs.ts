// FAQ content for service + area pages.
// Written for "query fan-out": each set anticipates the cluster of related
// questions a user (or an AI answer engine) asks around the topic — cost,
// duration, process, qualifications, local coverage — enriched with the
// service + location keywords. Visible on-page AND emitted as FAQPage JSON-LD.

import { SERVICES, AREAS, SITE_URL, BUSINESS } from './business';

export interface QA {
  q: string;
  a: string;
}

const PHONE = BUSINESS.phoneDisplay;
const REGION = 'Middlesex and the Home Counties';

// --- Service FAQs (hand-written per service) --------------------------------

const SERVICE_FAQS: Record<string, QA[]> = {
  plastering: [
    { q: 'How much does plastering cost in Middlesex and the Home Counties?', a: `Every plastering job is quoted at a fixed price agreed before work starts, so there are no surprises or hourly rates. The cost depends on room size, wall condition and whether it's a skim or full re-plaster — call ${PHONE} for a free, no-obligation quote.` },
    { q: 'How long does it take to plaster a room?', a: 'A single-room skim is usually finished in a day, while a full re-plaster of a larger space takes two to three days including drying time. We confirm exact timings with your fixed-price quote.' },
    { q: 'How long should new plaster dry before painting?', a: 'Fresh plaster normally needs at least a week to dry out fully — longer in colder, damper months — before it is painted. We always tell you when your walls are ready to decorate.' },
    { q: 'Are your plasterers qualified?', a: 'Yes. All four of our team are City & Guilds certified and every plastering job is completed in-house — we never use subcontractors.' },
    { q: 'Do you clear up after plastering work?', a: 'We protect floors and furniture, keep dust to a minimum and leave the room clean and ready. Tidy, considerate working is part of every job.' },
  ],
  skimming: [
    { q: 'What is the difference between skimming and plastering?', a: `Skimming applies a thin 2–3mm finishing coat over a sound existing surface for a smooth, flat finish, whereas full plastering builds up backing coats first. We carry out both across ${REGION}.` },
    { q: 'Can you skim over Artex or textured ceilings?', a: 'Yes — we regularly skim over Artex and textured surfaces to leave a smooth, modern finish that is ready for paint.' },
    { q: 'How much does it cost to skim a room?', a: `Skimming is quoted at a fixed price based on the area and condition of the walls or ceiling. Call ${PHONE} for a free quote with no obligation.` },
    { q: 'How long does a skim coat take to dry?', a: 'A skim coat usually dries within two to seven days depending on conditions and ventilation. We let you know exactly when it can be decorated.' },
    { q: 'Will skimming fix cracks and uneven walls?', a: 'Skimming flattens minor imperfections and fine cracks. Larger damage may need patching or a backing coat first, which we assess and include in your quote.' },
  ],
  rendering: [
    { q: 'What types of rendering do you offer?', a: `We apply sand and cement render, monocouche (through-coloured) render and traditional pebble dash to homes across ${REGION}, matching the finish to your property.` },
    { q: 'How much does rendering a house cost?', a: `Rendering is priced per project at a fixed rate agreed up front, based on wall area, render type and access. Call ${PHONE} for a free site visit and quote.` },
    { q: 'How long does exterior render take to cure?', a: 'Render needs to cure gradually — typically several days before painting, and longer in cold or wet weather. We schedule work around the forecast for the best result.' },
    { q: 'Can rendering help with damp or insulation?', a: 'Modern renders shed water far better than old, cracked finishes and can be combined with external wall insulation systems. We will advise what suits your home.' },
    { q: 'Do you remove old, blown render first?', a: 'Yes — we hack off loose or blown render, prepare the substrate properly and re-render, rather than patching over failing material.' },
  ],
  'pebble-dashing': [
    { q: 'What is pebble dashing and is it still popular?', a: `Pebble dashing throws a layer of small stones onto a fresh render coat for a hard-wearing, low-maintenance exterior. It remains a practical, weather-resistant choice for many homes across ${REGION}.` },
    { q: 'How much does pebble dashing cost?', a: `We quote pebble dashing at a fixed price based on wall area and access, agreed before work begins. Call ${PHONE} for a free quote.` },
    { q: 'Can you repair patches of damaged pebble dash?', a: 'Yes — we can patch-repair sections and blend the finish, or re-dash a whole elevation where the existing coat has failed.' },
    { q: 'How long does pebble dashing last?', a: 'Applied properly over a sound base, pebble dash can last decades with very little maintenance, which is a big part of its appeal.' },
    { q: 'Can pebble dashing be painted over?', a: 'It can, using a breathable masonry paint. We can both apply pebble dash and paint exterior walls, so the whole job is handled in-house.' },
  ],
  'venetian-plastering': [
    { q: 'What is Venetian plastering?', a: `Venetian (polished) plaster is a high-end decorative finish made from lime and marble dust, burnished to a smooth, marble-like sheen. We create it for feature walls and luxury interiors across ${REGION}.` },
    { q: 'How much does Venetian plastering cost?', a: `Polished plaster is a specialist finish quoted per square metre and per design, with the fixed price agreed in advance. Call ${PHONE} to discuss your project.` },
    { q: 'Where does Venetian plaster work best?', a: 'It suits feature walls, hallways, fireplaces and high-end bathrooms in homes around Windsor, Gerrards Cross, Ascot and beyond, adding depth and a premium finish.' },
    { q: 'Is Venetian plaster hard to maintain?', a: 'Once sealed it is durable and wipeable. We finish it correctly so it holds its lustre for years with simple care.' },
    { q: 'Can you match a specific colour or sheen?', a: 'Yes — polished plaster can be tinted to a wide range of colours and finished from a soft satin to a high-gloss marble look to match your scheme.' },
  ],
  'floating-plaster': [
    { q: 'What is floating and plastering walls and ceilings?', a: `Floating builds up the backing coats that flatten and true a wall or ceiling before the finishing skim goes on. It is the groundwork that gives a properly flat finish across ${REGION}.` },
    { q: 'When do walls need floating rather than just skimming?', a: 'Walls that are out of true, heavily damaged or freshly built usually need floating first. A simple sound surface can often just be skimmed — we assess and advise.' },
    { q: 'How much does floating and plastering cost?', a: `It is quoted at a fixed price based on area and condition, agreed before we start. Call ${PHONE} for a free quote.` },
    { q: 'How long does floating and plastering take to dry?', a: 'Backing coats need to dry before the finish coat, and the finished surface then needs about a week before painting. We confirm the schedule in your quote.' },
    { q: 'Do you plaster ceilings as well as walls?', a: 'Yes — we float and plaster both walls and ceilings, including overboarding and re-skimming tired or cracked ceilings.' },
  ],
  'plaster-refurbishment': [
    { q: 'What does plaster wall refurbishment involve?', a: `Refurbishment covers repairing, re-floating and re-skimming tired, cracked or damp-damaged plaster to bring older walls back to a smooth, sound finish — a common job in period homes across ${REGION}.` },
    { q: 'Can you save original lime plaster?', a: 'Where original lime plaster is sound we work with it sympathetically; where it has failed we replace like-for-like to keep older properties breathing correctly.' },
    { q: 'How much does plaster refurbishment cost?', a: `Each refurbishment is quoted at a fixed price after a site visit, based on the extent of repair needed. Call ${PHONE} for a free assessment.` },
    { q: 'Do you fix cracks and damp-damaged walls?', a: 'Yes — we cut out and repair cracks, treat the cause where possible and re-plaster, rather than skimming over problems that will return.' },
    { q: 'Will refurbished walls be ready to paint?', a: 'Once the new plaster has dried fully — usually around a week — the walls are ready to decorate, and we can paint them for you too.' },
  ],
  'repair-insurance': [
    { q: 'Do you carry out insurance repair work?', a: `Yes — we handle plastering and painting repairs after escape of water, fire, impact and other insured damage for homeowners across ${REGION}, restoring rooms to their original finish.` },
    { q: 'Can you provide a quote for my insurer?', a: `We provide clear, itemised fixed-price quotes suitable for submitting to your insurance company. Call ${PHONE} to arrange a site visit.` },
    { q: 'How quickly can you start repair work?', a: 'We understand insurance jobs are often urgent and disruptive, so we prioritise getting you a quote and a start date as quickly as we can.' },
    { q: 'Do you handle both the making-good and redecoration?', a: 'Yes — we repair the damaged plaster and then redecorate, so the repair is finished properly and blends with the rest of the room.' },
    { q: 'Are you qualified for insurance-standard work?', a: 'All our work is carried out by City & Guilds certified tradespeople in-house, with 20+ verified Checkatrade reviews behind us.' },
  ],
  'interior-painting': [
    { q: 'How much does interior painting cost?', a: `Interior painting is quoted at a fixed price based on the rooms, surfaces and preparation needed, agreed before work starts. Call ${PHONE} for a free quote across ${REGION}.` },
    { q: 'Do you prepare walls before painting?', a: 'Yes — proper preparation is most of the job. We fill, sand, caulk and prime as needed so the finished paintwork is clean, even and long-lasting.' },
    { q: 'How many coats of paint do you apply?', a: 'Typically two coats over a suitable primer or undercoat, though deep colour changes or new plaster may need more. We include the right number in your quote.' },
    { q: 'How long does it take to paint a room?', a: 'A standard room is often painted in a day or two depending on preparation, colour changes and drying between coats.' },
    { q: 'Do you protect furniture and floors?', a: 'Always — we mask, sheet up and protect your floors and belongings, and clean up thoroughly at the end.' },
  ],
  'exterior-painting': [
    { q: 'How much does exterior painting cost?', a: `Exterior painting is quoted at a fixed price based on wall area, surface condition and access. Call ${PHONE} for a free site visit and quote anywhere in ${REGION}.` },
    { q: 'What is the best time of year for exterior painting?', a: 'Dry, mild weather from spring to early autumn is ideal, as masonry and woodwork need dry conditions to take the coating. We plan jobs around the forecast.' },
    { q: 'How long does exterior paint last?', a: 'Quality exterior masonry paint applied over well-prepared surfaces typically lasts around ten years, while painted woodwork needs more regular upkeep.' },
    { q: 'Do you prepare and repair surfaces first?', a: 'Yes — we clean down, treat and repair render, masonry and woodwork before painting so the finish protects the property and lasts.' },
    { q: 'Can you paint render, brick and woodwork?', a: 'We paint masonry, render, pebble dash, fascias, soffits and exterior woodwork, so the whole exterior is finished by one team.' },
  ],
  wallpapering: [
    { q: 'How much does wallpapering cost?', a: `Wallpapering is quoted at a fixed price based on the number of rolls, wall preparation and the type of paper. Call ${PHONE} for a free quote across ${REGION}.` },
    { q: 'Do you prepare walls before hanging wallpaper?', a: 'Yes — we make good, line where needed and size the walls so the paper hangs flat, with neatly matched seams and patterns.' },
    { q: 'Can you hang feature walls and high-end papers?', a: 'We hang everything from feature walls to delicate, expensive and hand-printed papers, where careful matching and handling really matter.' },
    { q: 'Can you remove old wallpaper first?', a: 'We strip old paper, prepare the surface and repair any damage underneath before hanging the new covering.' },
    { q: 'Do you also paint as well as paper?', a: 'Yes — as plasterers, painters and decorators we can combine papering and painting in the same project for a coordinated finish.' },
  ],
  'sash-window-painting': [
    { q: 'How much does sash window painting cost?', a: `Sash window painting is quoted per window or per project at a fixed price, depending on size, condition and preparation. Call ${PHONE} for a free quote.` },
    { q: 'Do you repair sash windows before painting?', a: 'We carry out the preparation and minor repairs — sanding, filling and making good — that period sash windows need before they are repainted properly.' },
    { q: 'Will you paint heritage and period windows correctly?', a: `Yes — sash windows are common in period homes across ${REGION}, and we prepare and finish them carefully to protect the timber and keep them operating smoothly.` },
    { q: 'How long does sash window painting take?', a: 'Timing depends on the number of windows and their condition, including drying between coats. We confirm the schedule with your quote.' },
    { q: 'What paint do you use on sash windows?', a: 'We use durable exterior-grade systems suited to timber windows so the finish withstands the weather and lasts.' },
  ],
  'commercial-decorating': [
    { q: 'Do you take on commercial decorating projects?', a: `Yes — we provide commercial painting and decorating for offices, shops, lettings and other premises across ${REGION}, with fixed-price quotes agreed in advance.` },
    { q: 'Can you work out of hours to avoid disruption?', a: `We can plan commercial work around your opening hours, including evenings and weekends where needed, to keep disruption to a minimum. Call ${PHONE} to discuss.` },
    { q: 'How is commercial decorating priced?', a: 'Commercial projects are quoted at a fixed price after a site visit, based on area, specification and access requirements.' },
    { q: 'Do you handle large or repeat contracts?', a: 'Yes — because all our team are in-house and certified, we can deliver consistent quality across larger and repeat commercial jobs.' },
    { q: 'Are you insured for commercial premises?', a: 'Our work is carried out by City & Guilds certified decorators with 20+ verified Checkatrade reviews, suitable for commercial environments.' },
  ],
  'eco-friendly-decorating': [
    { q: 'What is eco-friendly decorating?', a: `Eco-friendly decorating uses low-VOC and water-based paints and more sustainable materials and methods, for a healthier finish with less environmental impact across ${REGION}.` },
    { q: 'Do low-VOC paints perform as well as standard paint?', a: 'Modern low-VOC and water-based paints give excellent coverage and durability while releasing far fewer fumes, so rooms are usable again sooner.' },
    { q: 'How much does eco-friendly decorating cost?', a: `It is quoted at a fixed price like any of our work; some specialist eco paints cost a little more, which we set out clearly. Call ${PHONE} for a quote.` },
    { q: 'Are eco paints better for allergies and children?', a: 'Lower fumes and fewer solvents make low-VOC paints a popular choice for nurseries, bedrooms and homes with allergy sensitivities.' },
    { q: 'Can you advise on sustainable colour and material choices?', a: 'Yes — we can recommend eco-friendly paint ranges and finishes to suit your room and your budget.' },
  ],
};

// --- Area FAQs (generated, enriched with the local county) ------------------

// Map each area to its county so area answers carry genuine local specificity.
const AREA_COUNTY: Record<string, string> = {
  amersham: 'Buckinghamshire',
  ascot: 'Berkshire',
  beaconsfield: 'Buckinghamshire',
  binfield: 'Berkshire',
  bracknell: 'Berkshire',
  burnham: 'Buckinghamshire',
  chalfont: 'Buckinghamshire',
  chesham: 'Buckinghamshire',
  chorleywood: 'Hertfordshire',
  denham: 'Buckinghamshire',
  eastcote: 'Middlesex',
  farnborough: 'Hampshire',
  farnham: 'Surrey',
  'gerrards-cross': 'Buckinghamshire',
  harefield: 'Middlesex',
  'hatch-end': 'Middlesex',
  ickenham: 'Middlesex',
  iver: 'Buckinghamshire',
  northwood: 'Middlesex',
  pinner: 'Middlesex',
  rickmansworth: 'Hertfordshire',
  ruislip: 'Middlesex',
  stanmore: 'Middlesex',
  'stoke-poges': 'Buckinghamshire',
  uxbridge: 'Middlesex',
  watford: 'Hertfordshire',
  windsor: 'Berkshire',
};

function areaFaqs(slug: string, name: string): QA[] {
  const county = AREA_COUNTY[slug] || 'the Home Counties';
  return [
    { q: `Do you cover ${name} for plastering and painting?`, a: `Yes — ${name} is within our core service area. We provide plastering, skimming, rendering, interior and exterior painting and full decorating throughout ${name} and the wider ${county} area.` },
    { q: `Are you local to ${name}?`, a: `We are based in Harefield, Middlesex and work across ${name} and ${county} regularly, so we can usually visit quickly to measure up and quote for your job.` },
    { q: `How much does plastering or painting cost in ${name}?`, a: `Every job in ${name} is quoted at a fixed price agreed before we start — no hourly rates and no surprise add-ons. Call ${PHONE} for a free, no-obligation quote.` },
    { q: `How soon can you start work in ${name}?`, a: `Lead times vary with the season, but we will give you a realistic start date with your quote and stick to it. For urgent plastering or painting in ${name}, call ${PHONE} directly.` },
    { q: `Are your tradespeople in ${name} qualified and reviewed?`, a: `Yes — all four of our team are City & Guilds certified with 20+ verified Checkatrade reviews, and every job in ${name} is completed in-house, never subcontracted.` },
  ];
}

// --- Public API -------------------------------------------------------------

export interface FaqResult {
  heading: string;
  items: QA[];
}

export function getFaqs(pathname: string): FaqResult | null {
  const path = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';

  const svc = path.match(/^\/services\/([a-z0-9-]+)$/);
  if (svc && SERVICE_FAQS[svc[1]]) {
    return {
      heading: `${SERVICES[svc[1]]} — frequently asked questions`,
      items: SERVICE_FAQS[svc[1]],
    };
  }

  const area = path.match(/^\/areas\/([a-z0-9-]+)$/);
  if (area && AREAS[area[1]]) {
    return {
      heading: `Plastering & painting in ${AREAS[area[1]]} — FAQs`,
      items: areaFaqs(area[1], AREAS[area[1]]),
    };
  }

  return null;
}

export function faqSchema(items: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

// re-export so Layout can import everything FAQ-related from one place
export { SITE_URL };
