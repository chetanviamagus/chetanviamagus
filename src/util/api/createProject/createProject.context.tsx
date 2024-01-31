import { Dispatch, createContext } from "react";

import { ActionType } from "hook/useCreateReducer";

import { Conversation } from "util/types/chat";
import { KeyValuePair } from "util/types/data";
import { FolderType } from "util/types/folder";

import { CreateProjectInitialState } from "./createProject.state";

export interface CreateProjectContextProps {
  state: CreateProjectInitialState;
  dispatch: Dispatch<ActionType<CreateProjectInitialState>>;
    // handleNewConversation: () => void;
  //   handleCreateFolder: (name: string, type: FolderType) => void;
  //   handleDeleteFolder: (folderId: string) => void;
  //   handleUpdateFolder: (folderId: string, name: string) => void;
  //   handleSelectConversation: (conversation: Conversation) => void;
  //   handleUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
}

const CreateProjectContext = createContext<CreateProjectContextProps>(undefined!);

export default CreateProjectContext;
