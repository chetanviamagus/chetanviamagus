import { useCallback, useContext, useEffect } from "react";

import { useTranslation } from "react-i18next";

import { useCreateReducer } from "hook/useCreateReducer";

import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from "util/app/const";
import { saveConversation, saveConversations } from "util/app/conversation";
import { saveFolders } from "util/app/folders";
import { exportData, importData } from "util/app/importExport";

import { Conversation } from "util/types/chat";
import { LatestExportFormat, SupportedExportFormats } from "util/types/export";
import { OpenAIModels } from "util/types/openai";
import { PluginKey } from "util/types/plugin";

import HomeContext from "util/api/home/home.context";

import { ChatFolders } from "./component/ChatFolders";
import { ChatbarSettings } from "./component/ChatbarSettings";
import { Conversations } from "./component/Conversations";

import Sidebar from "../Sidebar";
import ChatbarContext from "./Chatbar.context";
import { ChatbarInitialState, initialState } from "./Chatbar.state";

import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

export const Chatbar = ({ isPrompt }: { isPrompt?: boolean }) => {
  const { t } = useTranslation("sidebar");

  const chatBarContextValue = useCreateReducer<ChatbarInitialState>({
    initialState,
  });

  const {
    state: {
      conversations,
      promptTemplateConversations,
      showChatbar,
      showPromptbar,
      defaultModelId,
      folders,
      pluginKeys,
      selectedConversation,
      selectedPromptTemplate,
    },
    dispatch: homeDispatch,
    handleCreateFolder,
    handleNewConversation,
    handleUpdateConversation,
  } = useContext(HomeContext);

  const {
    state: {
      searchTerm,
      filteredConversations,
      promptTemplateSearchTerm,
      promptTemplateFilteredConversations,
    },
    dispatch: chatDispatch,
  } = chatBarContextValue;

  const handleApiKeyChange = useCallback(
    (apiKey: string) => {
      homeDispatch({ field: "apiKey", value: apiKey });

      localStorage.setItem("apiKey", apiKey);
    },
    [homeDispatch]
  );

  const handlePluginKeyChange = (pluginKey: PluginKey) => {
    if (pluginKeys.some((key) => key.pluginId === pluginKey.pluginId)) {
      const updatedPluginKeys = pluginKeys.map((key) => {
        if (key.pluginId === pluginKey.pluginId) {
          return pluginKey;
        }

        return key;
      });

      homeDispatch({ field: "pluginKeys", value: updatedPluginKeys });

      localStorage.setItem("pluginKeys", JSON.stringify(updatedPluginKeys));
    } else {
      homeDispatch({ field: "pluginKeys", value: [...pluginKeys, pluginKey] });

      localStorage.setItem("pluginKeys", JSON.stringify([...pluginKeys, pluginKey]));
    }
  };

  const handleClearPluginKey = (pluginKey: PluginKey) => {
    const updatedPluginKeys = pluginKeys.filter((key) => key.pluginId !== pluginKey.pluginId);

    if (updatedPluginKeys.length === 0) {
      homeDispatch({ field: "pluginKeys", value: [] });
      localStorage.removeItem("pluginKeys");
      return;
    }

    homeDispatch({ field: "pluginKeys", value: updatedPluginKeys });

    localStorage.setItem("pluginKeys", JSON.stringify(updatedPluginKeys));
  };

  const handleExportData = () => {
    exportData();
  };

  const handleImportConversations = (data: SupportedExportFormats) => {
    const { history, folders, prompts }: LatestExportFormat = importData(data);
    homeDispatch({
      field: isPrompt ? "promptTemplateConversations" : "conversations",
      value: history,
    });
    homeDispatch({
      field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
      value: history[history.length - 1],
    });
    homeDispatch({ field: isPrompt ? "promptFolders" : "folders", value: folders });
    homeDispatch({ field: "prompts", value: prompts });

    window.location.reload();
  };

  const handleClearConversations = () => {
    defaultModelId &&
      homeDispatch({
        field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
        value: {
          id: uuidv4(),
          name: isPrompt ? "New Prompt" : t("New Conversation"),
          messages: [],
          model: OpenAIModels[defaultModelId],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      });

    homeDispatch({ field: isPrompt ? "promptTemplateConversations" : "conversations", value: [] });

    if (isPrompt) {
      localStorage.removeItem("promptConversationHistory");
      localStorage.removeItem("selectedPromptTemplate");
    } else {
      localStorage.removeItem("conversationHistory");
      localStorage.removeItem("selectedConversation");
    }

    const updatedFolders = folders.filter((f) => f.type !== "chat");

    homeDispatch({ field: isPrompt ? "promptFolders" : "folders", value: updatedFolders });
    saveFolders(updatedFolders, isPrompt);
  };

  const handleDeleteConversation = (conversation: Conversation) => {
    const updatedConversations = (isPrompt ? promptTemplateConversations : conversations).filter(
      (c) => c.id !== conversation.id
    );

    chatDispatch({ field: isPrompt ? "promptTemplateSearchTerm" : "searchTerm", value: "" });

    if (updatedConversations.length > 0) {
      homeDispatch({
        field: isPrompt ? "promptTemplateConversations" : "conversations",
        value: updatedConversations,
      });

      saveConversations(updatedConversations, isPrompt);

      homeDispatch({
        field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
        value: updatedConversations[updatedConversations.length - 1],
      });

      saveConversation(updatedConversations[updatedConversations.length - 1], isPrompt);
    } else {
      homeDispatch({
        field: isPrompt ? "promptTemplateConversations" : "conversations",
        value: [],
      });
      saveConversations(updatedConversations, isPrompt);

      homeDispatch({
        field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
        value: {
          id: uuidv4(),
          name: isPrompt ? "New Prompt" : t("New Conversation"),
          messages: [],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: DEFAULT_TEMPERATURE,
          folderId: null,
        },
      });
      if (isPrompt) {
        localStorage.removeItem("selectedPromptTemplate");
      } else {
        localStorage.removeItem("selectedConversation");
      }
    }
  };

  const handleToggleChatbar = () => {
    homeDispatch({
      field: isPrompt ? "showPromptbar" : "showChatbar",
      value: isPrompt ? !showPromptbar : !showChatbar,
    });
    localStorage.setItem(
      isPrompt ? "showPromptbar" : "showChatbar",
      JSON.stringify(isPrompt ? !showPromptbar : !showChatbar)
    );
  };

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const conversation = JSON.parse(e.dataTransfer.getData("conversation"));
      handleUpdateConversation(conversation, { key: "folderId", value: 0 });
      chatDispatch({ field: isPrompt ? "promptTemplateSearchTerm" : "searchTerm", value: "" });
      e.target.style.background = "none";
    }
  };

  const { uid: projectUid } = useParams<{ uid: string }>();

  useEffect(() => {
    let _conversations =
      (isPrompt ? promptTemplateConversations : conversations)?.filter(
        (conversation) => conversation.projectUid === projectUid
      ) ?? [];
    if (searchTerm) {
      chatDispatch({
        field: "filteredConversations",
        value: _conversations.filter((conversation) => {
          const searchable =
            conversation.name.toLocaleLowerCase() +
            " " +
            conversation.messages.map((message) => message.content).join(" ");
          return searchable.toLowerCase().includes(searchTerm.toLowerCase());
        }),
      });
    } else {
      chatDispatch({
        field: "filteredConversations",
        value: _conversations,
      });
      const isSelectedConversationAvailable = _conversations?.filter((item: any) => {
        return item.id === selectedConversation?.id;
      });
      if (isSelectedConversationAvailable?.length > 0) {
        homeDispatch({ field: "selectedConversation", value: isSelectedConversationAvailable[0] });
      } else {
        if (_conversations?.length > 0) {
          homeDispatch({ field: "selectedConversation", value: _conversations[0] });
        } else {
          homeDispatch({ field: "selectedConversation", value: null });
        }
      }
    }

    if (promptTemplateSearchTerm) {
      chatDispatch({
        field: "promptTemplateFilteredConversations",
        value: _conversations.filter((conversation) => {
          const searchable =
            conversation.name.toLocaleLowerCase() +
            " " +
            conversation.messages.map((message) => message.content).join(" ");
          return searchable.toLowerCase().includes(searchTerm.toLowerCase());
        }),
      });
    } else {
      chatDispatch({
        field: "promptTemplateFilteredConversations",
        value: _conversations,
      });
      const isSelectedConversationAvailable = _conversations?.filter((item: any) => {
        return item.id === selectedPromptTemplate?.id;
      });
      if (isSelectedConversationAvailable?.length > 0) {
        homeDispatch({
          field: "selectedPromptTemplate",
          value: isSelectedConversationAvailable[0],
        });
      } else {
        if (_conversations?.length > 0) {
          homeDispatch({ field: "selectedPromptTemplate", value: _conversations[0] });
        } else {
          homeDispatch({ field: "selectedPromptTemplate", value: null });
        }
      }
    }
  }, [
    searchTerm,
    conversations,
    promptTemplateConversations,
    promptTemplateSearchTerm,
    projectUid,
    isPrompt,
  ]);

  return (
    <ChatbarContext.Provider
      value={{
        ...chatBarContextValue,
        handleDeleteConversation,
        handleClearConversations,
        handleImportConversations,
        handleExportData,
        handlePluginKeyChange,
        handleClearPluginKey,
        handleApiKeyChange,
      }}
    >
      <Sidebar<Conversation>
        side={"left"}
        isOpen={isPrompt ? showPromptbar : showChatbar}
        addItemButtonTitle={isPrompt ? "New Prompt" : t("New Session")}
        itemComponent={
          <Conversations
            conversations={isPrompt ? promptTemplateFilteredConversations : filteredConversations}
            isPrompt={isPrompt}
          />
        }
        folderComponent={
          <ChatFolders
            searchTerm={isPrompt ? promptTemplateSearchTerm : searchTerm}
            isPrompt={isPrompt}
          />
        }
        items={isPrompt ? promptTemplateFilteredConversations : filteredConversations}
        searchTerm={isPrompt ? promptTemplateSearchTerm : searchTerm}
        handleSearchTerm={(searchTerm: string) =>
          chatDispatch({
            field: isPrompt ? "promptTemplateSearchTerm" : "searchTerm",
            value: searchTerm,
          })
        }
        toggleOpen={handleToggleChatbar}
        handleCreateItem={handleNewConversation}
        handleCreateFolder={() => handleCreateFolder(t("New folder"), "chat", projectUid)}
        handleDrop={handleDrop}
        // footerComponent={<ChatbarSettings />}
        isPrompt={isPrompt}
      />
    </ChatbarContext.Provider>
  );
};
