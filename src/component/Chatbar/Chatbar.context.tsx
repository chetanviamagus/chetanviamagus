import { Dispatch, createContext } from "react";

import { ActionType } from "hook/useCreateReducer";

import { Conversation } from "util/types/chat";
import { SupportedExportFormats } from "util/types/export";
import { PluginKey } from "util/types/plugin";

import { ChatbarInitialState } from "./Chatbar.state";

export interface ChatbarContextProps {
  state: ChatbarInitialState;
  dispatch: Dispatch<ActionType<ChatbarInitialState>>;
  handleDeleteConversation: (conversation: Conversation) => void;
  handleClearConversations: () => void;
  handleExportData: () => void;
  handleImportConversations: (data: SupportedExportFormats) => void;
  handlePluginKeyChange: (pluginKey: PluginKey) => void;
  handleClearPluginKey: (pluginKey: PluginKey) => void;
  handleApiKeyChange: (apiKey: string) => void;
}

const ChatbarContext = createContext<ChatbarContextProps>(undefined!);

export default ChatbarContext;
