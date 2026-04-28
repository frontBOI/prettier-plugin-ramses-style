function useModuleScreen() {
  return {
    labs,
    module,
    isError,
    isLoading,
    moduleTags,
    handleBack,
    moduleTotalXP,
    isModuleInJourney,
    isTogglingJourney,
    isModuleFavorited,
    user: user ?? null,
    isModuleInProgress,
    isTogglingFavorite,
    handleToggleFavorite,
    moduleProgressPercent,
    moduleId: moduleId ?? '',
    moduleTotalDurationMinutes,
    toggleModuleInLearningPath,
  }
}
