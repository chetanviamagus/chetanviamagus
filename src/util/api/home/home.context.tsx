import { Dispatch, createContext } from "react";

import { ActionType } from "hook/useCreateReducer";

import { Conversation } from "util/types/chat";
import { KeyValuePair } from "util/types/data";
import { FolderType } from "util/types/folder";

import { HomeInitialState } from "./home.state";

export interface HomeContextProps {
  state: HomeInitialState;
  dispatch: Dispatch<ActionType<HomeInitialState>>;
  handleNewConversation: (projectUid?: string) => void;
  handleCreateFolder: (name: string, type: FolderType, projectUid?: string) => void;
  handleDeleteFolder: (folderId: string) => void;
  handleUpdateFolder: (folderId: string, name: string) => void;
  handleSelectConversation: (conversation: Conversation, isPrompt?: boolean) => void;
  handleUpdateConversation: (
    conversation: Conversation,
    data: KeyValuePair,
    isPrompt?: boolean
  ) => void;
}

const HomeContext = createContext<HomeContextProps>(undefined!);

export default HomeContext;
