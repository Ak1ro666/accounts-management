import { createStrictContext } from '@/platform/lib/react/strict-context'

export type FileStorage = {
  open: () => void
}

export const fileStorageContext = createStrictContext<FileStorage>()
