import { useState } from "react";

import type { FileNode, FileNodeId, Path } from "../domain/files-tree";

export function usePath() {
  const [path, setPath] = useState<Path[]>([{ id: "root", name: "Root" }]);
  const [currentDirectory, setCurrentDirectory] = useState<FileNodeId>("root");

  const navigatePath = (file: FileNode) => {
    if (file.type === "folder") {
      setCurrentDirectory(file.id);
      setPath([...path, { id: file.id, name: file.name }]);
    }
  };

  const navigateUp = (targetId: FileNodeId) => {
    const targetIndex = path.findIndex((item) => item.id === targetId);
    if (targetIndex >= 0) {
      setCurrentDirectory(targetId);
      setPath(path.slice(0, targetIndex + 1));
    }
  };

  return {
    data: path,
    currentDirectory,
    navigatePath,
    navigateUp,
  } as const;
}
