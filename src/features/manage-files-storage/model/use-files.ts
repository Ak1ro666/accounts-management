import type { FileNodeConfig, FileNodeId } from '../domain/files-tree'

import { useState } from 'react'

import { useMyMemo } from '@/shared/lib/react/memo'

import { createFileNode, excludeFileById } from '../domain/files-tree'
import { type FileFormData } from '../domain/form'

type StateFiles = {
  files: Record<FileNodeId, FileNodeConfig>
}

const initialFile1 = createFileNode({
  name: 'folder',
  type: 'folder'
})

const initialFile2 = createFileNode({
  name: 'file1',
  type: 'file',
  size: 1233,
  parentId: initialFile1.id
})

export function useFiles() {
  const [files, setFiles] = useState<StateFiles>({
    files: {
      [initialFile1.id]: initialFile1,
      [initialFile2.id]: initialFile2
    }
  })
  // const [updatedFiles, setUpdatedFiles] = useState<
  //   Record<FileNodeId, FileNode>
  // >({});
  // const [removedFiles, setRemovedFiles] = useState<FileNodeId[]>([]);

  const remove = (id: FileNodeId) => {
    const newFiles = excludeFileById(files.files, id)
    setFiles((prevState) => ({ ...prevState, files: newFiles }))
  }

  const create = (data: FileFormData, parentId?: FileNodeId) => {
    const newFile: FileNodeConfig = createFileNode({
      ...data,
      parentId
    })

    setFiles((prevFiles) => ({
      ...prevFiles,
      files: { ...prevFiles.files, [newFile.id]: newFile }
    }))
  }

  const childrenFiles = useMyMemo(
    () =>
      Object.values(files.files).reduce(
        (acc, file) => {
          if (file.parentId) {
            acc[file.parentId] = acc[file.parentId] ?? []
            acc[file.parentId].push(file)
          } else {
            acc['root'] = acc['root'] ?? []
            acc['root'].push(file)
          }
          return acc
        },
        {} as Record<FileNodeId, FileNodeConfig[]>
      ),
    [files.files]
  )

  const getChildrenFiles = (id: FileNodeId = 'root') => childrenFiles[id] ?? []

  return {
    getChildrenFiles,
    remove,
    create
  } as const
}
