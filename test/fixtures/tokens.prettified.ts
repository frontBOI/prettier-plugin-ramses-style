/**
 * Design tokens - Source de vérité pour toutes les variables de style
 * Ces valeurs sont utilisées pour générer les CSS variables et peuvent être importées directement en TS
 */

export const tokens = {
  // Breakpoints
  breakpoint: { mobile: '425px', tablet: '768px', laptop: '1024px' },

  // Font families
  fontFamily: { default: 'Lexend Exa', hamburg: 'Hamburg Hand', title: 'Ambroise Firmin' },

  // Layout
  layout: {
    paddingDefault: '20px',
    contentMaxWidth: '1600px',
    headerHeightMobile: '90px',
    headerHeightLaptop: '120px',
  },

  // Font weights
  fontWeight: {
    semi: '600',
    bold: '700',
    light: '300',
    heavy: '900',
    normal: '400',
    medium: '500',
    extraBold: '800',
  },
  // Font sizes
  fontSize: {
    xl2: '85px',
    xl: '3.5rem',
    xs: '0.6rem',
    small: '1rem',
    normal: '16px',
    large: '2.2rem',
    medium: '1.4rem',
  },

  // Colors
  color: {
    white: '#ffffff',
    black: '#000000',
    error: '#ef4444',
    success: '#5cca81',
    primary: '#695009',
    secondary: '#5cabef',
    primarySoft: '#D6C9B5',
    secondarySoft: '#9fc2e0',
  },
} as const
export type Tokens = typeof tokens
