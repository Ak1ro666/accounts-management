import { useFiles } from "../model/use-files";
import { usePath } from "../model/use-path";

import { FileForm } from "../ui/file-form";
import { FileItem } from "../ui/file-item";
import { PathItem } from "../ui/path-item";
import { FilesBodyView } from "../ui/files-body-view";

import { getLastPath } from "../domain/files-tree";

export function ModalBody() {
  const files = useFiles();
  const path = usePath();

  return (
    <FilesBodyView
      title="Files"
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
        <FileItem
          onDelete={files.remove}
          key={file.id}
          file={file}
          onNavigate={path.navigatePath}
        />
      ))}
    />
  );
}
