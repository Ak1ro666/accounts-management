import { getLastPath } from '../domain/files-tree'
import { useFiles } from '../model/use-files'
import { usePath } from '../model/use-path'
import { FileForm } from '../ui/file-form'
import { FilesBodyView } from '../ui/files-body-view'
import { PathItem } from '../ui/path-item'
import { FileNode } from './file-node'

export function ModalBody() {
  const files = useFiles()
  const path = usePath()

  return (
    <FilesBodyView
      title='Files'
      path={path.data}
      form={
        <FileForm
          onSubmit={(data) => files.create(data, path.currentDirectory)}
        />
      }
      renderPath={(item, index) => (
        <PathItem
          isLast={getLastPath(path.data, index)}
          item={item}
          onClick={() => path.navigateUp(item.id)}
        />
      )}
      files={files.getChildrenFiles(path.currentDirectory).map((file) => (
        <FileNode
          file={file}
          onDelete={files.remove}
          onNavigate={path.navigatePath}
        />
      ))}
    />
  )
}
