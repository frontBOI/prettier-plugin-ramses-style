function useModuleScreen() {
  return {
    labs,
    module,
    isError,
    isLoading,
    moduleTags,
    handleBack,
    moduleTotalXP,
    user: user ?? null,
    isModuleInJourney,
    isTogglingJourney,
    isModuleFavorited,
    isModuleInProgress,
    isTogglingFavorite,
    handleToggleFavorite,
    moduleProgressPercent,
    moduleId: moduleId ?? '',
    moduleTotalDurationMinutes,
    toggleModuleInLearningPath,
  }
}
