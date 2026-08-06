/**
 * constants/index.ts
 *
 * Project-wide constants. Import from this file so values
 * are never hardcoded in component files.
 */

/** The site owner's name — used in metadata and UI. */
export const SITE_NAME    = 'Muhammed Arshal V' as const

/** Canonical base URL — update when the domain changes. */
export const SITE_URL     = 'https://arshalv.dev' as const

/** Short handle used in social links and metadata. */
export const SITE_HANDLE  = '@arshalv' as const

/** Brief tagline shown in metadata and potentially in UI. */
export const SITE_TAGLINE =
  'AI Developer building intelligent applications using Generative AI and modern web technologies.' as const

/**
 * Section IDs used for in-page anchor navigation.
 * Defined once here; referenced by both nav links and section components.
 */
export const SECTION_IDS = {
  hero:        'hero',
  about:       'about',
  work:        'work',
  journey:     'journey',
  stack:       'stack',
  contact:     'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]
