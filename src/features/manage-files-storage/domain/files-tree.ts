export type FileNodeId = string

export type Path = { id: string; name: string }
export type FieldNodeBase = {
  id: string
  name: string
  parentId?: FileNodeId
  size?: number
}

export type FileItemNode = FieldNodeBase & {
  type: 'file'
}

export type FolderItemNode = FieldNodeBase & {
  type: 'folder'
}

export type FileNodeConfig = FileItemNode | FolderItemNode
export type FileNodeProps<T extends FileNodeConfig = FileNodeConfig> = {
  file: T
  onNavigate: (file: T) => void
  onDelete: (id: FileNodeId) => void
}
export type FileNode = <T extends FileNodeConfig = FileNodeConfig>(
  props: FileNodeProps<T>
) => React.ReactNode

export const createFileNode = (data: {
  name?: string
  type?: 'file' | 'folder'
  size?: number
  parentId?: FileNodeId
}): FileNodeConfig => ({
  id: crypto.randomUUID(),
  name: data.name ?? '',
  size: data.size,
  type: data.type ?? 'file',
  parentId: data.parentId
})

export const getCurrentFiles = (
  filesRecord: Record<FileNodeId, FileNodeConfig>,
  parentId?: FileNodeId
) =>
  Object.values(filesRecord)
    .filter((file) => file.parentId === parentId)
    .sort((fileA, fileB) => fileA.name.localeCompare(fileB.name))

export const getLastPath = (path: Path[], index: number) =>
  index === path.length - 1
