import { useContext } from "react";

import { FolderInterface } from "util/types/folder";

import HomeContext from "util/api/home/home.context";

import Folder from "component/Folder";

import { ConversationComponent } from "./Conversation";

interface Props {
  searchTerm: string;
  isPrompt?: boolean;
}

export const ChatFolders = ({ searchTerm, isPrompt }: Props) => {
  const {
    state: { folders, conversations, promptTemplateConversations, promptFolders },
    handleUpdateConversation,
  } = useContext(HomeContext);

  const handleDrop = (e: any, folder: FolderInterface) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData("conversation"));
      handleUpdateConversation(conversation, {
        key: "folderId",
        value: folder.id,
      });
    }
  };

  const ChatFolders = (currentFolder: FolderInterface) => {
    return (
      (isPrompt ? promptTemplateConversations : conversations) &&
      (isPrompt ? promptTemplateConversations : conversations)
        .filter((conversation) => conversation.folderId)
        .map((conversation, index) => {
          if (conversation.folderId === currentFolder.id) {
            return (
              <div key={index} className="ml-5 gap-2 pl-2">
                <ConversationComponent conversation={conversation} isPrompt={isPrompt} />
              </div>
            );
          }
        })
    );
  };

  return (
    <div className="flex w-full flex-col pt-2">
      {(isPrompt ? promptFolders : folders)
        .filter((folder) => folder.type === "chat")
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder, index) => (
          <Folder
            key={index}
            searchTerm={searchTerm}
            currentFolder={folder}
            handleDrop={handleDrop}
            folderComponent={ChatFolders(folder)}
          />
        ))}
    </div>
  );
};
