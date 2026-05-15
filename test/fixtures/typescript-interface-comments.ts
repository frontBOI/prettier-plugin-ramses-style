export interface MySuggestion {
  keyword: string;
  category: string;
  modules: Module[];
  // Stable id from the API (e.g. {@link Job} slug) for catalogue filtering `?theme=`. Unlike {@link MySuggestion.keyword}, not localized.
  rawKeyword: string;
  labs: LabSummary[];
}
