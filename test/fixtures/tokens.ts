/**
 * Design tokens - Source de vérité pour toutes les variables de style
 * Ces valeurs sont utilisées pour générer les CSS variables et peuvent être importées directement en TS
 */

export const tokens = {
  // Font sizes
  fontSize: {
    xl2: '85px',
    xl: '3.5rem',
    large: '2.2rem',
    normal: '16px',
    medium: '1.4rem',
    small: '1rem',
    xs: '0.6rem',
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semi: '600',
    bold: '700',
    extraBold: '800',
    heavy: '900',
  },

  // Font families
  fontFamily: {
    default: 'Lexend Exa',
    title: 'Ambroise Firmin',
    hamburg: 'Hamburg Hand',
  },

  // Colors
  color: {
    white: '#ffffff',
    black: '#000000',
    error: '#ef4444',
    success: '#5cca81',
    primary: '#695009',
    primarySoft: '#D6C9B5',
    secondary: '#5cabef',
    secondarySoft: '#9fc2e0',
  },

  // Layout
  layout: {
    paddingDefault: '20px',
    contentMaxWidth: '1600px',
    headerHeightLaptop: '120px',
    headerHeightMobile: '90px',
  },

  // Breakpoints
  breakpoint: {
    mobile: '425px',
    tablet: '768px',
    laptop: '1024px',
  },
} as const

export type Tokens = typeof tokens
