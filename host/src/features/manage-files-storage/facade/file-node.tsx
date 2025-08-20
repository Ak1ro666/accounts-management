import type { FileNodeProps } from '../domain/files-tree'

import { getFileNode } from '../lib/mapper'

export function FileNode({ file, onDelete, onNavigate }: FileNodeProps) {
  const Component = getFileNode(file.type)

  return (
    <Component
      file={file}
      onDelete={onDelete}
      onNavigate={onNavigate}
    />
  )
}
