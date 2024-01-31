import { Conversation } from "util/types/chat";

export interface ChatbarInitialState {
  searchTerm: string;
  promptTemplateSearchTerm: string;
  filteredConversations: Conversation[];
  promptTemplateFilteredConversations: Conversation[];
}

export const initialState: ChatbarInitialState = {
  searchTerm: "",
  filteredConversations: [],
  promptTemplateSearchTerm: "",
  promptTemplateFilteredConversations: [],
};
