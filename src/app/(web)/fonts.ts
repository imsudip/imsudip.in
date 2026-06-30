import {
  Noto_Nastaliq_Urdu,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Oriya,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
  Plus_Jakarta_Sans,
} from 'next/font/google';

// Primary font — modern geometric sans for Latin text
const bodyFont = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  display: 'swap',
  subsets: ['latin'],
});

// Indic script fallbacks — unicode-range subsetting means browsers only
// fetch the woff2 for scripts actually rendered on the page.
// preload: false → lazy-load on first Indic character (no upfront cost).
const notoDevanagari = Noto_Sans_Devanagari({
  variable: '--font-noto-devanagari',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoBengali = Noto_Sans_Bengali({
  variable: '--font-noto-bengali',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoTamil = Noto_Sans_Tamil({
  variable: '--font-noto-tamil',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoTelugu = Noto_Sans_Telugu({
  variable: '--font-noto-telugu',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoGujarati = Noto_Sans_Gujarati({
  variable: '--font-noto-gujarati',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoKannada = Noto_Sans_Kannada({
  variable: '--font-noto-kannada',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoMalayalam = Noto_Sans_Malayalam({
  variable: '--font-noto-malayalam',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoGurmukhi = Noto_Sans_Gurmukhi({
  variable: '--font-noto-gurmukhi',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const notoOriya = Noto_Sans_Oriya({
  variable: '--font-noto-oriya',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

// Urdu — Nastaliq calligraphic script, not a variable font
const notoUrdu = Noto_Nastaliq_Urdu({
  variable: '--font-noto-urdu',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

// Combined className with all CSS variables — apply on <html>
export const fonts = [
  bodyFont,
  notoDevanagari,
  notoBengali,
  notoTamil,
  notoTelugu,
  notoGujarati,
  notoKannada,
  notoMalayalam,
  notoGurmukhi,
  notoOriya,
  notoUrdu,
]
  .map((font) => font.variable)
  .join(' ');
