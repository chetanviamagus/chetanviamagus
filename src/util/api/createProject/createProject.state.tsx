import { Conversation, Message } from "util/types/chat";
import { ErrorMessage } from "util/types/error";
import { FolderInterface } from "util/types/folder";
import { OpenAIModel, OpenAIModelID } from "util/types/openai";
import { PluginKey } from "util/types/plugin";
import { Prompt } from "util/types/prompt";

export interface CreateProjectInitialState {
  apiKey: string;
  pluginKeys: PluginKey[];
  loading: boolean;
  lightMode: "light" | "dark";
  messageIsStreaming: boolean;
  modelError: ErrorMessage | null;
  models: OpenAIModel[];
  //   folders: FolderInterface[];
  conversations: Conversation[];
  projectConversation: Conversation | undefined;
  currentMessage: Message | undefined;
  prompts: Prompt[];
  temperature: number;
  showChatbar: boolean;
  showPromptbar: boolean;
  //   currentFolder: FolderInterface | undefined;
  messageError: boolean;
  searchTerm: string;
  defaultModelId: OpenAIModelID | undefined;
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
}

export const initialState: CreateProjectInitialState = {
  apiKey: "",
  loading: false,
  pluginKeys: [],
  lightMode: "dark",
  messageIsStreaming: false,
  modelError: null,
  models: [],
  //   folders: [],
  conversations: [],
  projectConversation: undefined,
  currentMessage: undefined,
  prompts: [],
  temperature: 1,
  showPromptbar: true,
  showChatbar: true,
  //   currentFolder: undefined,
  messageError: false,
  searchTerm: "",
  defaultModelId: undefined,
  serverSideApiKeyIsSet: false,
  serverSidePluginKeysSet: false,
};
