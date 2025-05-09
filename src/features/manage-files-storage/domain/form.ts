export type FileFormData = {
  name?: string;
  type?: "file" | "folder";
  size?: number;
};

export type FormErrors = {
  name?: string[];
  size?: string[];
};
