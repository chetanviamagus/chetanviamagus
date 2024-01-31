import { Conversation } from "util/types/chat";

export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
  updatedProjectConversation?: Conversation,
  isPrompt?: boolean
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(updatedConversation, isPrompt);
  saveConversations(updatedConversations, isPrompt);
  if (updatedProjectConversation) saveProjectConversation(updatedProjectConversation);

  return {
    single: updatedConversation,
    all: updatedConversations,
    createProject: updatedProjectConversation,
  };
};

export const saveConversation = (conversation: Conversation, isPrompt?: boolean) => {
  if (isPrompt) {
    localStorage.setItem("selectedPromptTemplate", JSON.stringify(conversation));
  } else {
    localStorage.setItem("selectedConversation", JSON.stringify(conversation));
  }
};

export const saveConversations = (conversations: Conversation[], isPrompt?: boolean) => {
  if (isPrompt) {
    if (conversations.length > 0) {
      localStorage.setItem("promptConversationHistory", JSON.stringify(conversations));
    } else {
      localStorage.removeItem("promptConversationHistory");
    }
  } else {
    if (conversations.length > 0) {
      localStorage.setItem("conversationHistory", JSON.stringify(conversations));
    } else {
      localStorage.removeItem("conversationHistory");
    }
  }
};

export const saveProjectConversation = (conversation: Conversation) => {
  localStorage.setItem("projectConversation", JSON.stringify(conversation));
};

export const saveProjectConversations = (conversation: Conversation[]) => {
  localStorage.setItem("projectConversationHistory", JSON.stringify(conversation));
};
