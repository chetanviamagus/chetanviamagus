import { FolderInterface } from "util/types/folder";

export const saveFolders = (folders: FolderInterface[], isPrompt?: boolean) => {
  localStorage.setItem(isPrompt ? "promptFolders" : "folders", JSON.stringify(folders));
};
