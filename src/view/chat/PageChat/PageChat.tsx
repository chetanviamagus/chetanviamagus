import { useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import { useCreateReducer } from "hook/useCreateReducer";

import { cleanConversationHistory, cleanSelectedConversation } from "util/app/clean";
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from "util/app/const";
import { saveConversation, saveConversations, updateConversation } from "util/app/conversation";
import { saveFolders } from "util/app/folders";
import { getSettings } from "util/app/settings";

import { Conversation } from "util/types/chat";
import { KeyValuePair } from "util/types/data";
import { FolderInterface, FolderType } from "util/types/folder";
import { OpenAIModelID, OpenAIModels } from "util/types/openai";

import { Chat } from "component/Chat/Chat";
import { Chatbar } from "component/Chatbar/Chatbar";

import HomeContext from "util/api/home/home.context";
import { HomeInitialState, initialState } from "util/api/home/home.state";

import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface Props {
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
  defaultModelId: OpenAIModelID;
  isPrompt?: boolean;
}

const PageChat = ({
  serverSideApiKeyIsSet = true,
  serverSidePluginKeysSet,
  defaultModelId,
  isPrompt,
}: Props) => {
  const { t } = useTranslation("chat");
  // const { getModels } = useApiService();
  // const { getModelsError } = useErrorService();
  // const [initialRender, setInitialRender] = useState<boolean>(true);

  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });

  const {
    state: {
      apiKey = "",
      lightMode,
      folders,
      conversations,
      promptTemplateConversations,
      selectedConversation,
      selectedPromptTemplate,
      prompts,
      temperature,
    },
    dispatch,
  } = contextValue;

  const { uid: projectUid } = useParams<{ uid: string }>();

  const stopConversationRef = useRef<boolean>(false);

  // FETCH MODELS ----------------------------------------------

  const handleSelectConversation = (conversation: Conversation, isPrompt?: boolean) => {
    dispatch({
      field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
      value: conversation,
    });
    saveConversation(conversation, isPrompt);
  };

  // FOLDER OPERATIONS  --------------------------------------------

  const handleCreateFolder = (name: string, type: FolderType, projectUid?: string) => {
    const newFolder: FolderInterface = {
      id: uuidv4(),
      name,
      type,
      projectUid: projectUid,
    };

    const updatedFolders = [...folders, newFolder];

    dispatch({ field: isPrompt ? "promptFolders" : "folders", value: updatedFolders });
    saveFolders(updatedFolders);
  };

  const handleDeleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter((f) => f.id !== folderId);
    dispatch({ field: isPrompt ? "promptFolders" : "folders", value: updatedFolders });
    saveFolders(updatedFolders);

    const updatedConversations: Conversation[] = conversations.map((c) => {
      if (c.folderId === folderId) {
        return {
          ...c,
          folderId: null,
        };
      }

      return c;
    });

    dispatch({
      field: isPrompt ? "promptTemplateConversations" : "conversations",
      value: updatedConversations,
    });
    saveConversations(updatedConversations, isPrompt);
  };

  const handleUpdateFolder = (folderId: string, name: string) => {
    const updatedFolders = folders.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          name,
        };
      }

      return f;
    });

    dispatch({ field: isPrompt ? "promptFolders" : "folders", value: updatedFolders });

    saveFolders(updatedFolders, isPrompt);
  };

  // CONVERSATION OPERATIONS  --------------------------------------------

  const handleNewConversation = (projectUid?: string) => {
    const lastConversation = isPrompt
      ? promptTemplateConversations[promptTemplateConversations.length - 1]
      : conversations[conversations.length - 1];

    const newConversation: Conversation = {
      id: uuidv4(),
      name: isPrompt ? "New Prompt" : t("New Conversation"),
      messages: [],
      prompt: DEFAULT_SYSTEM_PROMPT,
      temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
      folderId: null,
      projectUid: projectUid || null,
    };

    const updatedConversations = [
      ...(isPrompt ? promptTemplateConversations : conversations),
      newConversation,
    ];

    dispatch({
      field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
      value: newConversation,
    });
    dispatch({
      field: isPrompt ? "promptTemplateConversations" : "conversations",
      value: updatedConversations,
    });

    saveConversation(newConversation, isPrompt);
    saveConversations(updatedConversations, isPrompt);

    dispatch({ field: "loading", value: false });
  };

  const handleUpdateConversation = (
    conversation: Conversation,
    data: KeyValuePair,
    isPrompt?: boolean
  ) => {
    const updatedConversation = {
      ...conversation,
      [data.key]: data.value,
    };

    const { single, all } = updateConversation(
      updatedConversation,
      conversations,
      undefined,
      isPrompt
    );

    if (isPrompt) {
      dispatch({ field: "selectedPromptTemplate", value: single });
      dispatch({ field: "promptTemplateConversations", value: all });
    } else {
      dispatch({ field: "selectedConversation", value: single });
      dispatch({ field: "conversations", value: all });
    }
  };

  // EFFECTS  --------------------------------------------

  useEffect(() => {
    if (window.innerWidth < 640) {
      dispatch({ field: "showChatbar", value: false });
      dispatch({ field: "showPromptbar", value: false });
    }
  }, [selectedConversation, selectedPromptTemplate]);

  useEffect(() => {
    defaultModelId && dispatch({ field: "defaultModelId", value: defaultModelId });
    serverSideApiKeyIsSet &&
      dispatch({
        field: "serverSideApiKeyIsSet",
        value: serverSideApiKeyIsSet,
      });
    serverSidePluginKeysSet &&
      dispatch({
        field: "serverSidePluginKeysSet",
        value: serverSidePluginKeysSet,
      });
  }, [defaultModelId, serverSideApiKeyIsSet, serverSidePluginKeysSet]);

  // ON LOAD --------------------------------------------

  useEffect(() => {
    const settings = getSettings();
    if (settings.theme) {
      dispatch({
        field: "lightMode",
        value: settings.theme,
      });
    }

    const apiKey = localStorage.getItem("apiKey");

    if (serverSideApiKeyIsSet) {
      dispatch({ field: "apiKey", value: "" });

      localStorage.removeItem("apiKey");
    } else if (apiKey) {
      dispatch({ field: "apiKey", value: apiKey });
    }

    const pluginKeys = localStorage.getItem("pluginKeys");
    if (serverSidePluginKeysSet) {
      dispatch({ field: "pluginKeys", value: [] });
      localStorage.removeItem("pluginKeys");
    } else if (pluginKeys) {
      dispatch({ field: "pluginKeys", value: pluginKeys });
    }

    if (window.innerWidth < 640) {
      dispatch({ field: "showChatbar", value: false });
      dispatch({ field: "showPromptbar", value: false });
    }

    const showChatbar = localStorage.getItem(isPrompt ? "showPromptbar" : "showChatbar");
    if (showChatbar) {
      dispatch({
        field: isPrompt ? "showPromptbar" : "showChatbar",
        value: showChatbar === "true",
      });
    }

    const folders = localStorage.getItem(isPrompt ? "promptFolders" : "folders");
    if (folders) {
      dispatch({ field: isPrompt ? "promptFolders" : "folders", value: JSON.parse(folders) });
    }

    const conversationHistory: any = localStorage.getItem(
      isPrompt ? "promptConversationHistory" : "conversationHistory"
    );

    if (conversationHistory) {
      const parsedConversationHistory: Conversation[] = JSON.parse(conversationHistory);
      const cleanedConversationHistory = cleanConversationHistory(parsedConversationHistory);

      dispatch({
        field: isPrompt ? "promptTemplateConversations" : "conversations",
        value: cleanedConversationHistory,
      });
    }

    const selectedConversation = localStorage.getItem(
      isPrompt ? "selectedPromptTemplate" : "selectedConversation"
    );

    if (selectedConversation) {
      const parsedSelectedConversation: Conversation = JSON.parse(selectedConversation);
      const cleanedSelectedConversation = cleanSelectedConversation(parsedSelectedConversation);

      dispatch({
        field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
        value: cleanedSelectedConversation,
      });
    } else {
      const lastConversation = isPrompt
        ? promptTemplateConversations[promptTemplateConversations.length - 1]
        : conversations[conversations.length - 1];

      dispatch({
        field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
        value: {
          id: uuidv4(),
          name: isPrompt ? "New Prompt" : t("New Conversation"),
          messages: [],
          model: OpenAIModels[defaultModelId],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
          folderId: null,
          projectUid: projectUid || null,
        },
      });
    }
  }, [defaultModelId, dispatch, serverSideApiKeyIsSet, serverSidePluginKeysSet, isPrompt]);

  useEffect(() => {
    const _conversations = (isPrompt ? promptTemplateConversations : conversations)?.filter(
      (item) => item.projectUid === projectUid
    );

    if (_conversations.length === 0) {
      const selectedConversation = localStorage.getItem(
        isPrompt ? "selectedPromptTemplate" : "selectedConversation"
      );

      if (selectedConversation) {
        const parsedSelectedConversation: Conversation = JSON.parse(selectedConversation);

        if (parsedSelectedConversation.projectUid === projectUid) {
          const cleanedSelectedConversation = cleanSelectedConversation(parsedSelectedConversation);

          dispatch({
            field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
            value: cleanedSelectedConversation,
          });
        }else{
          const lastConversation = isPrompt
          ? promptTemplateConversations[promptTemplateConversations.length - 1]
          : conversations[conversations.length - 1];

        dispatch({
          field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
          value: {
            id: uuidv4(),
            name: isPrompt ? "New Prompt" : t("New Conversation"),
            messages: [],
            model: OpenAIModels[defaultModelId],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
            folderId: null,
            projectUid: projectUid || null,
          },
        });
        }
      } else {
        const lastConversation = isPrompt
          ? promptTemplateConversations[promptTemplateConversations.length - 1]
          : conversations[conversations.length - 1];

        dispatch({
          field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
          value: {
            id: uuidv4(),
            name: isPrompt ? "New Prompt" : t("New Conversation"),
            messages: [],
            model: OpenAIModels[defaultModelId],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
            folderId: null,
            projectUid: projectUid || null,
          },
        });
      }
    }
  }, [conversations, promptTemplateConversations, projectUid]);

  return (
    <HomeContext.Provider
      value={{
        ...contextValue,
        handleNewConversation,
        handleCreateFolder,
        handleDeleteFolder,
        handleUpdateFolder,
        handleSelectConversation,
        handleUpdateConversation,
      }}
    >
      <div className={`flex h-full mx-auto w-full md:max-w-rightContent p-3 flex-col text-sm text-white dark:text-white ${lightMode}`}>
        <div className="relative flex h-full w-full pt-[48px] sm:pt-0">
          <Chatbar isPrompt={isPrompt} />

          <div className="flex flex-1">
            <Chat stopConversationRef={stopConversationRef} isPrompt={isPrompt} />
          </div>
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default PageChat;
