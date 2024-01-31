export interface FolderInterface {
  id: string;
  name: string;
  type: FolderType;
  projectUid?: string;
}

export type FolderType = "chat" | "prompt";
