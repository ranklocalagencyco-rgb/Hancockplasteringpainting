// Curated gallery images with descriptive, SEO-relevant alt text.
//
// Each entry's `alt` is used for both the accessible alt attribute and the
// image title. Order here is the order shown on the page - the first four also
// feed the "Recent projects" teaser (GallerySnippet.astro).
//
// To add a photo: drop the optimised .webp in public/gallery/ and add a line
// here with real alt text. (Files not listed here are ignored - alt text is
// required, so there is no silent fallback to generic numbering.)
export interface GalleryImage {
  /** File name inside public/gallery/ */
  file: string;
  /** Long, descriptive alt text - written for search engines and accessibility. */
  alt: string;
  /** Short, visitor-facing label shown on hover and in the lightbox. */
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  { file: 'gallery-01.webp', alt: 'Hancock decorator cutting in fresh white paint along the cornice of a finished living room', caption: 'Painting a finished living room' },
  { file: 'gallery-02.webp', alt: 'Freshly skimmed feature wall around an exposed oak beam in a period cottage', caption: 'Feature wall around an oak beam' },
  { file: 'gallery-03.webp', alt: 'Hancock plasterer skimming a wall around a newly installed steel beam', caption: 'Plastering around a steel beam' },
  { file: 'gallery-04.webp', alt: 'Newly plastered ceiling with restored decorative cornice and column detailing', caption: 'Restored decorative cornice' },
  { file: 'gallery-05.webp', alt: 'Smoothly skimmed ceiling and wall with a neat plastered window reveal', caption: 'Smooth ceiling & window reveal' },
  { file: 'gallery-06.webp', alt: 'Freshly skimmed ceiling and wall beside fitted bedroom wardrobes', caption: 'Skimmed ceiling & wall' },
  { file: 'gallery-07.webp', alt: 'Hancock plasterer re-skimming a kitchen wall during a full renovation', caption: 'Re-skimming a kitchen wall' },
  { file: 'gallery-08.webp', alt: 'Newly plastered room with a smooth skim finish around the window and skylight', caption: 'Fresh skim around a skylight' },
  { file: 'gallery-09.webp', alt: 'Freshly plastered bedroom walls between two windows', caption: 'Freshly plastered bedroom' },
  { file: 'gallery-10.webp', alt: 'Hancock plasterer dry-lining and taping plasterboard in a corner', caption: 'Dry-lining & plasterboarding' },
  { file: 'gallery-11.webp', alt: 'Freshly plastered living room walls around a wood-burning stove', caption: 'Plastering around a wood-burner' },
  { file: 'gallery-12.webp', alt: 'Neatly plastered window reveal with a crisp, smooth skim finish', caption: 'Neat plastered window reveal' },
  { file: 'gallery-13.webp', alt: 'Smoothly skimmed wall ready for decoration', caption: 'Smooth skim, ready to paint' },
  { file: 'gallery-14.webp', alt: 'Freshly skimmed room with a plastered doorway and ceiling', caption: 'Freshly skimmed room' },
  { file: 'gallery-15.webp', alt: 'Hancock plastering team skimming a wall during a full renovation', caption: 'Team skimming a wall' },
  { file: 'gallery-16.webp', alt: 'Hancock plasterers skimming a large room with exposed ductwork', caption: 'Plastering a large open room' },
  { file: 'gallery-17.webp', alt: 'Hancock plasterer applying a smooth skim finish to an extension wall', caption: 'Skimming an extension wall' },
  { file: 'gallery-18.webp', alt: 'Hancock plasterer skimming an extension wall around a new window opening', caption: 'Plastering around a new window' },
  { file: 'gallery-19.webp', alt: 'Hancock plastering team skimming walls in a narrow hallway', caption: 'Team skimming a hallway' },
  { file: 'gallery-20.webp', alt: 'Freshly plastered chimney breast around a cast-iron fireplace with a newly skimmed ceiling', caption: 'Plastered chimney breast' },
  { file: 'gallery-21.webp', alt: 'Freshly plastered walls and vaulted ceiling in an open-plan home renovation', caption: 'Open-plan home renovation' },
  { file: 'gallery-22.webp', alt: 'Smoothly skimmed conservatory wall with a clean, even finish', caption: 'Smooth conservatory wall' },
  { file: 'gallery-23.webp', alt: 'Hancock plasterer smoothing the join between a freshly skimmed wall and ceiling', caption: 'Smoothing a wall-to-ceiling join' },
  { file: 'gallery-24.webp', alt: 'Garage conversion wall freshly plasterboarded and skimmed ready for decoration', caption: 'Plasterboarded & skimmed garage' },
  { file: 'gallery-25.webp', alt: 'Freshly skimmed wall in a large open-plan room during renovation', caption: 'Large room being plastered' },
  { file: 'gallery-26.webp', alt: 'Freshly plastered room with a smooth skim finish and a plasterer working through the doorway', caption: 'Room mid-plaster' },
  { file: 'gallery-27.webp', alt: 'Freshly skimmed wall during a full room refurbishment', caption: 'Freshly skimmed wall' },
  { file: 'gallery-28.webp', alt: 'Freshly skimmed alcove with a smooth, even plaster finish', caption: 'Freshly skimmed alcove' },
  { file: 'gallery-29.webp', alt: 'Repaired and re-skimmed kitchen ceiling above fitted oak units', caption: 'Kitchen ceiling repair' },
];
