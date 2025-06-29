import { FileNode, FileNodeConfig } from '../domain/files-tree'
import { FileItem } from '../ui/file-item'
import { FolderItem } from '../ui/folder-item'

const FILE_NODE_MAP = {
  file: FileItem,
  folder: FolderItem
} as Record<FileNodeConfig['type'], FileNode>

export const getFileNode = (type: FileNodeConfig['type']): FileNode => {
  return FILE_NODE_MAP[type] ?? { Field: () => null }
}
