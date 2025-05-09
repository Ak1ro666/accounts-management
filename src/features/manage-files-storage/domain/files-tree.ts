export type FileNodeId = string;

export type Path = { id: string; name: string };

export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  parentId?: FileNodeId;
};

export const createFileNode = (data: {
  name: string;
  type: "file" | "folder";
  size?: number;
  parentId?: FileNodeId;
}): FileNode => ({
  id: crypto.randomUUID(),
  name: data.name,
  size: data.size,
  type: data.type,
  parentId: data.parentId,
});

export const getCurrentFiles = (
  filesRecord: Record<FileNodeId, FileNode>,
  parentId?: FileNodeId,
) =>
  Object.values(filesRecord)
    .filter((file) => file.parentId === parentId)
    .sort((fileA, fileB) => fileA.name.localeCompare(fileB.name));

export const getLastPath = (path: Path[], index: number) =>
  index === path.length - 1;
