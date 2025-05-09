import { useMemo, useState } from "react";

import {
  createFileNode,
  FileFormData,
  type FileNode,
  type FileNodeId,
} from "../domain/files-tree";

type StateFiles = {
  files: Record<FileNodeId, FileNode>;
};

const initialFile1 = createFileNode({
  name: "folder",
  type: "folder",
});

const initialFile2 = createFileNode({
  name: "file1",
  type: "file",
  size: 1233,
  parentId: initialFile1.id,
});

export function useFiles() {
  const [files, setFiles] = useState<StateFiles>({
    files: {
      [initialFile1.id]: initialFile1,
      [initialFile2.id]: initialFile2,
    },
  });
  // const [updatedFiles, setUpdatedFiles] = useState<
  //   Record<FileNodeId, FileNode>
  // >({});
  // const [removedFiles, setRemovedFiles] = useState<FileNodeId[]>([]);

  const remove = (id: FileNodeId) => {
    const newFiles = { ...files.files };

    for (const key in newFiles) {
      if (newFiles[key].parentId === id) {
        delete newFiles[key];
      }
    }

    delete newFiles[id];
    setFiles((prevState) => ({ ...prevState, files: newFiles }));
  };

  const create = (data: FileFormData, parentId?: FileNodeId) => {
    const newFile: FileNode = createFileNode({
      ...data,
      parentId,
    });

    setFiles((prevFiles) => ({
      ...prevFiles,
      files: { ...prevFiles.files, [newFile.id]: newFile },
    }));
  };

  const childrenFiles = useMemo(
    () =>
      Object.values(files.files).reduce(
        (acc, file) => {
          if (file.parentId) {
            acc[file.parentId] = acc[file.parentId] ?? [];
            acc[file.parentId].push(file);
          } else {
            acc["root"] = acc["root"] ?? [];
            acc["root"].push(file);
          }
          return acc;
        },
        {} as Record<FileNodeId, FileNode[]>,
      ),
    [files.files],
  );

  const getChildrenFiles = (id: FileNodeId = "root") => childrenFiles[id] ?? [];

  return {
    getChildrenFiles,
    remove,
    create,
  } as const;
}
