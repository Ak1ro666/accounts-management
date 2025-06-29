import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { LOCAL_STORAGE_FEATURE_FLAGS_KEY } from '../../constants'

export type FeatureFlagsStore = {
  darkTheme: boolean
  debugMode: boolean
  navbarV2: boolean
  toggleFeatureFlag: (featureFlag: keyof FeatureFlagsStore) => void
}

export const useFeatureFlagsStore = create(
  persist<FeatureFlagsStore>(
    (set, get) => ({
      darkTheme: true,
      debugMode: true,
      navbarV2: false,
      toggleFeatureFlag: (featureFlag) => {
        const featureFlagValue = !get()[featureFlag]

        set({
          [featureFlag]: featureFlagValue
        })
      }
    }),
    {
      name: LOCAL_STORAGE_FEATURE_FLAGS_KEY,
      storage: createJSONStorage(() => localStorage)
    }
  )
)
