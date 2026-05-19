export enum LearningLevel {
  'BEGINNER' = 1,
  'INTERMEDIATE' = 2,
  'ADVANCED' = 3,
  'EXPERT' = 4,
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
    shortCode: string
    crowdinCode: string
    label: string
    nativeLabel: string
  }
} = {
  [Lang.EN]: {
    flag: '🇬🇧',
    code: 'en_US',
    shortCode: 'en',
    crowdinCode: 'en',
    label: 'English',
    nativeLabel: 'English',
  },
  [Lang.FR]: {
    flag: '🇫🇷',
    code: 'fr_FR',
    shortCode: 'fr',
    crowdinCode: 'fr',
    label: 'French',
    nativeLabel: 'Français',
  },
  [Lang.EL]: {
    flag: '🇬🇷',
    code: 'el_GR',
    shortCode: 'el',
    crowdinCode: 'el',
    label: 'Greek',
    nativeLabel: 'Ελληνικά',
  },
  [Lang.DE]: {
    flag: '🇩🇪',
    code: 'de_DE',
    shortCode: 'de',
    crowdinCode: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
  },
  [Lang.ES]: {
    flag: '🇪🇸',
    code: 'es_ES',
    shortCode: 'es',
    crowdinCode: 'es-ES',
    label: 'Spanish',
    nativeLabel: 'Español',
  },
  [Lang.IT]: {
    flag: '🇮🇹',
    code: 'it_IT',
    shortCode: 'it',
    crowdinCode: 'it',
    label: 'Italian',
    nativeLabel: 'Italiano',
  },
  [Lang.NL]: {
    flag: '🇳🇱',
    code: 'nl_NL',
    shortCode: 'nl',
    crowdinCode: 'nl',
    label: 'Dutch',
    nativeLabel: 'Nederlands',
  },
  [Lang.PT]: {
    flag: '🇵🇹',
    code: 'pt_PT',
    shortCode: 'pt',
    crowdinCode: 'pt-PT',
    label: 'Portuguese',
    nativeLabel: 'Português',
  },
}
