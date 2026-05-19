export enum LearningLevel {
  'EXPERT' = 4,
  'BEGINNER' = 1,
  'ADVANCED' = 3,
  'INTERMEDIATE' = 2,
}

/**
 * The display language that a string can be translated into
 */
export enum Lang {
  EN = 'EN',
  FR = 'FR',
  EL = 'EL',
  DE = 'DE',
  ES = 'ES',
  IT = 'IT',
  NL = 'NL',
  PT = 'PT',
}

export const PUBLICLY_AVAILABLE_LANGUAGES: readonly Lang[] = [Lang.EN, Lang.FR, Lang.EL, Lang.ES, Lang.IT, Lang.PT]

export const AppLanguages: {
  [key in Lang]: {
    flag: string
    code: string
    label: string
    shortCode: string
    crowdinCode: string
    nativeLabel: string
  }
} = {
  [Lang.EL]: { flag: '🇬🇷', code: 'el_GR', label: 'Greek', shortCode: 'el', crowdinCode: 'el', nativeLabel: 'Ελληνικά' },
  [Lang.DE]: { flag: '🇩🇪', code: 'de_DE', shortCode: 'de', label: 'German', crowdinCode: 'de', nativeLabel: 'Deutsch' },
  [Lang.EN]: {
    flag: '🇬🇧',
    code: 'en_US',
    shortCode: 'en',
    label: 'English',
    crowdinCode: 'en',
    nativeLabel: 'English',
  },
  [Lang.FR]: {
    flag: '🇫🇷',
    code: 'fr_FR',
    shortCode: 'fr',
    label: 'French',
    crowdinCode: 'fr',
    nativeLabel: 'Français',
  },
  [Lang.IT]: {
    flag: '🇮🇹',
    code: 'it_IT',
    shortCode: 'it',
    label: 'Italian',
    crowdinCode: 'it',
    nativeLabel: 'Italiano',
  },
  [Lang.NL]: {
    flag: '🇳🇱',
    code: 'nl_NL',
    label: 'Dutch',
    shortCode: 'nl',
    crowdinCode: 'nl',
    nativeLabel: 'Nederlands',
  },
  [Lang.ES]: {
    flag: '🇪🇸',
    code: 'es_ES',
    shortCode: 'es',
    label: 'Spanish',
    crowdinCode: 'es-ES',
    nativeLabel: 'Español',
  },
  [Lang.PT]: {
    flag: '🇵🇹',
    code: 'pt_PT',
    shortCode: 'pt',
    label: 'Portuguese',
    crowdinCode: 'pt-PT',
    nativeLabel: 'Português',
  },
}
