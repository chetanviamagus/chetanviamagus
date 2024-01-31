import {
  MutableRefObject,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { getEndpoint } from "util/app/api";
import { saveConversation, saveConversations, updateConversation } from "util/app/conversation";

import { ChatBody, Conversation, Message } from "util/types/chat";
import { Plugin } from "util/types/plugin";

import HomeContext from "util/api/home/home.context";

import AnimateTyping from "component/AnimateTyping/AnimateTyping";
import { throttle } from "util/data/throttle";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ErrorMessageDiv } from "./ErrorMessageDiv";
import { MemoizedChatMessage } from "./MemoizedChatMessage";

import { useAppSelector } from "hook/redux";
import { useParams } from "react-router-dom";
import { generateRegex } from "util/CommonUtil";
import QuickNavCard from "component/QuickNavCard/QuicknavCard";
import { linkAuthRoute, linkProjectBase, linkProjectDatasource, linkTeamsBase } from "routes";

interface Props {
  stopConversationRef: MutableRefObject<boolean>;
  isPrompt?: boolean;
}

export const Chat = memo(({ stopConversationRef, isPrompt }: Props) => {
  const { t } = useTranslation("chat");

  const {
    state: {
      selectedConversation,
      selectedPromptTemplate,
      conversations,
      promptTemplateConversations,
      models,
      apiKey,
      pluginKeys,
      serverSideApiKeyIsSet,
      messageIsStreaming,
      modelError,
      loading,
      prompts,
    },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] = useState<boolean>(false);

  const [chatArrayWithRegex, setChatArrayWithRegex] = useState<any[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentProject = useAppSelector((state) => state.project.selectedProject);

  const importDataFile = async () => {
    let iData: any[] = [];
    try {
      let a: any;
      const projectName = currentProject.projectInfo?.projectName ?? currentProject?.name;
      if (isPrompt) {
        a = await import(`./../../poc/${projectName?.toLowerCase?.()}/chat/prompt.json`);
      } else {
        a = await import(`./../../poc/${projectName?.toLowerCase?.()}/chat/session.json`);
      }

      iData = a.data;
    } catch (err) {
      let a: any;

      if (isPrompt) {
        a = await import("./../../poc/kroger/chat/prompt.json");
      } else {
        a = await import("./../../poc/kroger/chat/session.json");
      }

      iData = a.data;
    } finally {
      const _chatArrayWithRegex = iData?.map((item: any) => {
        return {
          ...item,
          regex: generateRegex(item.keywords),
        };
      });
      setChatArrayWithRegex([..._chatArrayWithRegex]);
    }
  };

  useEffect(() => {
    importDataFile();
  }, []);

  useEffect(() => {
    importDataFile();
  }, [currentProject, isPrompt]);

  const { uid: projectUid } = useParams<{ uid: string }>();

  const handleSend = useCallback(
    async (message: Message, deleteCount = 0, plugin: Plugin | null = null) => {
      const _selectedConv = isPrompt ? selectedPromptTemplate : selectedConversation;

      if (_selectedConv) {
        let updatedConversation: Conversation;
        if (deleteCount) {
          const updatedMessages = [..._selectedConv.messages];
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop();
          }
          updatedConversation = {
            ..._selectedConv,
            messages: [...updatedMessages, message],
          };
        } else {
          updatedConversation = {
            ..._selectedConv,
            messages: [..._selectedConv.messages, message],
          };
        }
        homeDispatch({
          field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
          value: updatedConversation,
        });
        homeDispatch({ field: "loading", value: true });
        homeDispatch({ field: "messageIsStreaming", value: true });
        const chatBody: ChatBody = {
          model: updatedConversation.model,
          messages: updatedConversation.messages,
          key: apiKey,
          prompt: updatedConversation.prompt,
          temperature: updatedConversation.temperature,
        };

        const endpoint = getEndpoint(plugin);
        let body;
        if (!plugin) {
          body = JSON.stringify(chatBody);
        } else {
          body = JSON.stringify({
            ...chatBody,
            googleAPIKey: pluginKeys
              .find((key) => key.pluginId === "google-search")
              ?.requiredKeys.find((key: any) => key.key === "GOOGLE_API_KEY")?.value,
            googleCSEId: pluginKeys
              .find((key) => key.pluginId === "google-search")
              ?.requiredKeys.find((key: any) => key.key === "GOOGLE_CSE_ID")?.value,
          });
        }

        if (!plugin) {
          if (updatedConversation.messages.length === 1) {
            const { content } = message;
            const customName = content.length > 30 ? content.substring(0, 30) + "..." : content;
            updatedConversation = {
              ...updatedConversation,
              name: customName,
            };
          }
          homeDispatch({ field: "loading", value: false });
          // const reader = data.getReader();
          const decoder = new TextDecoder();
          const done = false;
          let isFirst = true;

          const messageContent = message.content?.toLowerCase();

          let d = "";

          let graphType = "";

          for (let i = 0; i < chatArrayWithRegex.length; i++) {
            if (chatArrayWithRegex?.[i]?.regex?.test?.(messageContent)) {
              graphType = chatArrayWithRegex?.[i]?.graphType;
              d = chatArrayWithRegex?.[i]?.response ?? "I apologize. I'm not sure I've understood";
            }
          }

          if (!d) {
            d = "I apologize. I'm not sure I've understood";
          }

          let text = "";

          let pc = 0;

          const getRandomNumbersBetween = (start: number, end: number) => {
            return Math.floor(Math.random() * (end - start + 1) + start);
          };

          while (pc < d.length) {
            const randomDelay = getRandomNumbersBetween(20, 150);
            const randomLength = getRandomNumbersBetween(7, 12);
            const randomText = d.substring(pc, pc + randomLength);
            pc += randomLength;
            text += randomText;
            if (isFirst) {
              isFirst = false;
              const updatedMessages: Message[] = [
                ...updatedConversation.messages,
                { role: "assistant", content: randomText },
              ];
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              };
              homeDispatch({
                field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
                value: updatedConversation,
              });
            } else {
              const updatedMessages: Message[] = updatedConversation.messages.map(
                (message, index) => {
                  if (index === updatedConversation.messages.length - 1) {
                    return {
                      ...message,
                      content: text,
                    };
                  }
                  return message;
                }
              );
              updatedConversation = {
                ...updatedConversation,
                messages: updatedMessages,
              };
              homeDispatch({
                field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
                value: updatedConversation,
              });
            }
            await new Promise((resolve) => setTimeout(resolve, randomDelay));
          }

          homeDispatch({ field: "messageIsStreaming", value: false });
          saveConversation(updatedConversation, isPrompt);

          const updatedConversations: Conversation[] = (
            isPrompt ? promptTemplateConversations : conversations
          ).map((conversation) => {
            if (conversation.id === _selectedConv.id) {
              return updatedConversation;
            }
            return conversation;
          });

          const projectConversations = updatedConversations?.filter(
            (conversation: Conversation) => {
              return conversation.projectUid === projectUid;
            }
          );

          if (updatedConversations.length === 0 || projectConversations.length === 0) {
            updatedConversations.push(updatedConversation);
          }

          homeDispatch({
            field: isPrompt ? "promptTemplateConversations" : "conversations",
            value: updatedConversations,
          });
          saveConversations(updatedConversations, isPrompt);
          homeDispatch({ field: "messageIsStreaming", value: false });
        } else {
          // const { answer } = await response.json();
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: "assistant", content: "hi" },
          ];
          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };
          homeDispatch({
            field: isPrompt ? "selectedPromptTemplate" : "selectedConversation",
            value: updateConversation,
          });
          saveConversation(updatedConversation, isPrompt);
          const updatedConversations: Conversation[] = (
            isPrompt ? promptTemplateConversations : conversations
          ).map((conversation) => {
            if (conversation.id === _selectedConv.id) {
              return updatedConversation;
            }
            return conversation;
          });
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation);
          }
          homeDispatch({
            field: isPrompt ? "promptTemplateConversations" : "conversations",
            value: updatedConversations,
          });
          saveConversations(updatedConversations, isPrompt);
          homeDispatch({ field: "loading", value: false });
          homeDispatch({ field: "messageIsStreaming", value: false });
        }
      }
    },
    [
      apiKey,
      conversations,
      promptTemplateConversations,
      pluginKeys,
      selectedConversation,
      selectedPromptTemplate,
      stopConversationRef,
      chatArrayWithRegex,
      projectUid,
    ]
  );

  const scrollToBottom = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      textareaRef.current?.focus();
    }
  }, [autoScrollEnabled]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
        setShowScrollDownButton(true);
      } else {
        setAutoScrollEnabled(true);
        setShowScrollDownButton(false);
      }
    }
  };

  const handleScrollDown = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const onClearAll = () => {
    if (
      confirm(t<string>("Are you sure you want to clear all messages?")) &&
      selectedConversation
    ) {
      handleUpdateConversation(
        selectedConversation,
        {
          key: "messages",
          value: [],
        },
        isPrompt
      );
    }
  };

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown();
    if (isPrompt) {
      selectedConversation &&
        setCurrentMessage(selectedConversation.messages[selectedConversation.messages.length - 2]);
    } else {
      selectedPromptTemplate &&
        setCurrentMessage(
          selectedPromptTemplate.messages[selectedPromptTemplate.messages.length - 2]
        );
    }
  }, [selectedConversation, selectedPromptTemplate, throttledScrollDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting);
        if (entry.isIntersecting) {
          textareaRef.current?.focus();
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      observer.observe(messagesEndElement);
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement);
      }
    };
  }, [messagesEndRef]);

  const renderEmptyState = () => {
    return (
      <div>
        <div className="absolute left-1/2 top-1/3 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-3">
          {currentProject?.projectInfo?.projectIcon || currentProject?.icon ? (
            <div className="h-12 w-12 rounded-full">
              <img
                src={currentProject?.projectInfo?.projectIcon ?? currentProject?.icon}
                className="h-full w-full rounded-full"
                alt="project-icon"
              />
            </div>
          ) : null}

          <div className="flex max-w-fit flex-col space-y-5 px-3 text-center text-2xl font-semibold">
            <AnimateTyping
              delay={75}
              key={currentProject?.projectInfo?.projectName ?? currentProject?.name ?? "Project"}
            >
              {"Start chatting with " +
                (currentProject?.projectInfo?.projectName ?? currentProject?.name ?? "Project") +
                " !"}
            </AnimateTyping>
          </div>
        </div>
      </div>
    );
  };

  const emptyState = useMemo(renderEmptyState, [projectUid]);

  return (
    <div className="relative ml-4 flex-1 overflow-auto rounded-md bg-primary-chat-box backdrop-blur-sm dark:shadow-dark-black-transparent-25">
      {!(apiKey || serverSideApiKeyIsSet) ? (
        <div className="h-full" />
      ) : modelError ? (
        <ErrorMessageDiv error={modelError} />
      ) : (
        <>
          <div
            className="max-h-full gap-y-3 overflow-x-hidden px-3"
            ref={chatContainerRef}
            onScroll={handleScroll}
          >
            {((isPrompt ? selectedPromptTemplate : selectedConversation)?.messages?.length ?? 0) ===
            0 ? (
              <div>
                {emptyState}
                <div
                  className="absolute bottom-20 left-0 right-4 flex w-full flex-col gap-3 px-4
                 sm:flex-row"
                >
                  <div className="w-full sm:w-1/2">
                    <QuickNavCard
                      title={"Add Team Member"}
                      description={"You don't have any members in your project... add team members"}
                      navigateTo={
                        linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkTeamsBase
                      }
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <QuickNavCard
                      title={"View schema"}
                      description={"View and edit relationships in your data sources"}
                      navigateTo={
                        linkAuthRoute +
                        linkProjectBase +
                        `/${currentProject?.id}` +
                        linkProjectDatasource
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {(isPrompt ? selectedPromptTemplate : selectedConversation)?.messages.map(
                  (message: any, index: any) => (
                    <MemoizedChatMessage
                      key={index}
                      message={message}
                      messageIndex={index}
                      onEdit={(editedMessage) => {
                        setCurrentMessage(editedMessage);
                        // discard edited message and the ones that come after then resend
                        handleSend(
                          editedMessage,
                          ((isPrompt ? selectedPromptTemplate : selectedConversation)?.messages
                            ?.length ?? 0) - index
                        );
                      }}
                      handleSend={handleSend}
                      totalMessages={
                        (isPrompt ? selectedPromptTemplate : selectedConversation)?.messages
                          ?.length ?? 0
                      }
                      prevMessage={
                        index > 0
                          ? (isPrompt ? selectedPromptTemplate : selectedConversation)?.messages[
                              index - 1
                            ]
                          : null
                      }
                    />
                  )
                )}

                {loading && <ChatLoader />}
                <div className="h-64" ref={messagesEndRef} />
              </>
            )}
          </div>

          <ChatInput
            stopConversationRef={stopConversationRef}
            textareaRef={textareaRef}
            onSend={(message, plugin) => {
              setCurrentMessage(message);
              handleSend(message, 0, plugin);
            }}
            onScrollDownClick={handleScrollDown}
            onRegenerate={() => {
              if (currentMessage) {
                handleSend(currentMessage, 2, null);
              }
            }}
            showScrollDownButton={showScrollDownButton}
            showFollowUps={
              ((isPrompt ? selectedPromptTemplate : selectedConversation)?.messages?.length ?? 0) >
              1
                ? true
                : false
            }
            followUpQuestions={[
              "Which are the highest performing CPUs in my system?",
              "Which are the slowest servers in my network?",
              "Which are the highest performing CPUs in my system?",
            ]}
          />
        </>
      )}
    </div>
  );
});
Chat.displayName = "Chat";
