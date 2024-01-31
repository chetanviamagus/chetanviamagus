import {
  MutableRefObject,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { getEndpoint } from "util/app/api";
import {
  saveConversation,
  saveConversations,
  saveProjectConversation,
  saveProjectConversations,
  updateConversation,
} from "util/app/conversation";

import { ChatBody, Conversation, Message } from "util/types/chat";
import { Plugin } from "util/types/plugin";

import { AnimateTyping } from "component/AnimateTyping/AnimateTyping";
import CreateProjectContext from "util/api/createProject/createProject.context";
import { throttle } from "util/data/throttle";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ErrorMessageDiv } from "./ErrorMessageDiv";
import { MemoizedProjectChatMessage } from "./MemoizedProjectChatMessage";

interface Props {
  stopConversationRef: MutableRefObject<boolean>;
}

export const ProjectChat = memo(({ stopConversationRef }: Props) => {
  const { t } = useTranslation("chat");

  const {
    state: {
      projectConversation,
      conversations,
      //   models,
      apiKey,
      pluginKeys,
      serverSideApiKeyIsSet,
      //   messageIsStreaming,
      modelError,
      loading,
      //   prompts,
    },
    // handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(CreateProjectContext);

  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(
    async (message: Message, deleteCount = 0, plugin: Plugin | null = null) => {
      if (projectConversation) {
        let updatedConversation: Conversation;
        if (deleteCount) {
          const updatedMessages = [...projectConversation.messages];
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop();
          }
          updatedConversation = {
            ...projectConversation,
            messages: [...updatedMessages, message],
          };
        } else {
          updatedConversation = {
            ...projectConversation,
            messages: [...projectConversation.messages, message],
          };
        }
        homeDispatch({
          field: "projectConversation",
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
        const controller = new AbortController();

        if (!plugin) {
          if (updatedConversation.messages.length === 1) {
            const { content } = message;
            const customName = content.length > 60 ? content.substring(0, 60) : content;
            updatedConversation = {
              ...updatedConversation,
              name: customName,
            };
          }
          homeDispatch({ field: "loading", value: false });
          // const reader = data.getReader();
          const decoder = new TextDecoder();
          //   let done = false;
          let isFirst = true;
          const lineChartWithTextStr =
            "**Summary:**<br/>This week's Daily Active Users (DAU) have shown a notable increase of 18%compared to last week. This is overloading the mongo atlas cluster deployment in the US-WEST-1 region.<br/><br/>**Detailed Breakdown:**<br/>This Week: 26,000 DAU <span style='color:#9FD356'>(↑18% from the previous week)</span><br/>Last Week: 22,000 DAU<br/><br/>**Key Insights:**<br/>Growth: An <span style='color:#9FD356'>18%</span> increase in DAU compared to last week reflects a growing user base and heightened engagement. This in turn is causing an increased number of queries per second on the Mongo deployment.<br/>Handling more queries in a given time window causes Mongo to reply with increased latencies.  Since your shopping cart feature depends on the results from Mongo Atlas, this is the reason for slow response times on that feature of this project.<br/>\n\n```graph_line\n hjsadfsdf ~END~ \n```\n\n";

          const messageContent = message.content?.toLowerCase();

          const d =
            messageContent?.includes("slow") && messageContent?.includes("response")
              ? lineChartWithTextStr
              : "Sample chat";

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
                field: "projectConversation",
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
                field: "projectConversation",
                value: updatedConversation,
              });
            }
            await new Promise((resolve) => setTimeout(resolve, randomDelay));
          }

          // const updatedMessages: Message[] = [
          //   ...updatedConversation.messages,
          //   { role: "assistant", content: d },
          // ];

          // updatedConversation = {
          //   ...updatedConversation,
          //   messages: updatedMessages,
          // };
          // homeDispatch({
          //   field: "selectedConversation",
          //   value: updatedConversation,
          // });

          console.log(updatedConversation);

          homeDispatch({ field: "messageIsStreaming", value: false });
          saveProjectConversation(updatedConversation);

          // let text =
          // 'Here is the doughnut representation\n```doughnutchart\n hi \n```\n\n';
          // while (!done) {
          //   if (stopConversationRef.current === true) {
          //     controller.abort();
          //     done = true;
          //     break;
          //   }
          //   const { value, done: doneReading } = await reader.read();
          //   done = doneReading;
          //   const chunkValue = decoder.decode(value);
          //   text += chunkValue;
          //   if (isFirst) {
          //     isFirst = false;
          //     const updatedMessages: Message[] = [
          //       ...updatedConversation.messages,
          //       { role: 'assistant', content: chunkValue },
          //     ];
          //     updatedConversation = {
          //       ...updatedConversation,
          //       messages: updatedMessages,
          //     };
          //     homeDispatch({
          //       field: 'selectedConversation',
          //       value: updatedConversation,
          //     });
          //   } else {
          //     const updatedMessages: Message[] =
          //       updatedConversation.messages.map((message, index) => {
          //         if (index === updatedConversation.messages.length - 1) {
          //           return {
          //             ...message,
          //             content: text,
          //           };
          //         }
          //         return message;
          //       });
          //     updatedConversation = {
          //       ...updatedConversation,
          //       messages: updatedMessages,
          //     };
          //     homeDispatch({
          //       field: 'selectedConversation',
          //       value: updatedConversation,
          //     });
          //   }
          // }

          const updatedConversations: Conversation[] = conversations.map((conversation) => {
            if (conversation.id === projectConversation.id) {
              return updatedConversation;
            }
            return conversation;
          });
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation);
          }
          homeDispatch({ field: "conversations", value: updatedConversations });
          saveProjectConversations(updatedConversations);
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
            field: "projectConversation",
            value: updateConversation,
          });
          saveProjectConversation(updatedConversation);
          const updatedConversations: Conversation[] = conversations.map((conversation) => {
            if (conversation.id === projectConversation.id) {
              return updatedConversation;
            }
            return conversation;
          });
          if (updatedConversations.length === 0) {
            updatedConversations.push(updatedConversation);
          }
          homeDispatch({ field: "conversations", value: updatedConversations });
          saveProjectConversations(updatedConversations);
          homeDispatch({ field: "loading", value: false });
          homeDispatch({ field: "messageIsStreaming", value: false });
        }
      }
    },
    [apiKey, pluginKeys, projectConversation, stopConversationRef]
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

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  // useEffect(() => {
  //   console.log('currentMessage', currentMessage);
  //   if (currentMessage) {
  //     handleSend(currentMessage);
  //     homeDispatch({ field: 'currentMessage', value: undefined });
  //   }
  // }, [currentMessage]);

  useEffect(() => {
    throttledScrollDown();
    projectConversation &&
      setCurrentMessage(projectConversation.messages[projectConversation.messages.length - 2]);
  }, [projectConversation, throttledScrollDown]);

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

  return (
    <div className="relative ml-4 flex-1 overflow-auto rounded-md bg-primary-chat-box backdrop-blur-sm dark:shadow-dark-black-transparent-25">
      {!(apiKey || serverSideApiKeyIsSet) ? (
        <div className="mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[600px]">
          <div className="text-center text-4xl font-bold">Welcome to Chatbot UI</div>
          <div className="text-center text-lg">
            <div className="mb-8">{`Chatbot UI is an open source clone of OpenAI's ChatGPT UI.`}</div>
            <div className="mb-2 font-bold">
              Important: Chatbot UI is 100% unaffiliated with OpenAI.
            </div>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="mb-2">
              Chatbot UI allows you to plug in your API key to use this UI with their API.
            </div>
            <div className="mb-2">
              It is <span className="italic">only</span> used to communicate with their API.
            </div>
            <div className="mb-2">
              {t("Please set your OpenAI API key in the bottom left of the sidebar.")}
            </div>
            <div>
              {t("If you don't have an OpenAI API key, you can get one here: ")}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                openai.com
              </a>
            </div>
          </div>
        </div>
      ) : modelError ? (
        <ErrorMessageDiv error={modelError} />
      ) : (
        <>
          <div
            className="max-h-full gap-y-3 overflow-x-hidden px-3"
            ref={chatContainerRef}
            onScroll={handleScroll}
          >
            {projectConversation?.messages.length === 0 ? (
              <>
                <div className="mx-auto flex flex-col space-y-5 px-3 pt-5 text-center text-4xl md:space-y-10 md:pt-12">
                  <AnimateTyping delay={75}>Welcome to Kroger.com!</AnimateTyping>
                </div>
              </>
            ) : (
              <>
                {projectConversation?.messages.map((message: any, index: any) => (
                  <MemoizedProjectChatMessage
                    key={index}
                    message={message}
                    messageIndex={index}
                    onEdit={(editedMessage) => {
                      setCurrentMessage(editedMessage);
                      // discard edited message and the ones that come after then resend
                      handleSend(editedMessage, projectConversation?.messages.length - index);
                    }}
                  />
                ))}

                {loading && <ChatLoader />}

                <div className="h-[162px]" ref={messagesEndRef} />
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
          />
        </>
      )}
    </div>
  );
});
ProjectChat.displayName = "Chat";
