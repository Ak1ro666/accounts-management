import type { FeatureFlagsStore } from '../model/use-feature-flags-store'

import { useFeatureFlagsStore } from '../model/use-feature-flags-store'

export function useFeatureFlag(featureFlag: keyof FeatureFlagsStore) {
  return useFeatureFlagsStore((state) => state[featureFlag])
}
