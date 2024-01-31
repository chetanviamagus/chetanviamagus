import dp from "asset/img/dp.png";
import logo from "asset/img/logos/logo.svg";
import { FC, memo, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Message } from "util/types/chat";
import { CodeBlock } from "../Markdown/CodeBlock";
import { MemoizedReactMarkdown } from "../Markdown/MemoizedReactMarkdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ChatDiagram from "component/ChatDiagram/ChatDiagram";
import Citation from "component/Citation/Citation";
import DoughNut from "component/DoughNut/DoughNut";
import NivoLineChart from "component/NivoLineChart/NivoLineChart";
import NivoPieChart from "component/NivoPieChart/NivoPieChart";
import SplitView from "component/SplitView/SplitView";
import CreateProjectContext from "util/api/createProject/createProject.context";

export interface Props {
  message: Message;
  messageIndex: number;
  onEdit?: (editedMessage: Message) => void;
}

export const ProjectChatMessage: FC<Props> = memo(({ message, messageIndex, onEdit }) => {
  const { t } = useTranslation("chat");

  const {
    state: { projectConversation, conversations, currentMessage, messageIsStreaming },
    dispatch: homeDispatch,
  } = useContext(CreateProjectContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState(message.content);
  const [messagedCopied, setMessageCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEditMessage = () => {
    if (message.content != messageContent) {
      if (projectConversation && onEdit) {
        onEdit({ ...message, content: messageContent });
      }
    }
    setIsEditing(false);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isTyping && !e.shiftKey) {
      e.preventDefault();
      handleEditMessage();
    }
  };

  const copyOnClick = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(message.content).then(() => {
      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    });
  };

  useEffect(() => {
    setMessageContent(message.content);
  }, [message.content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  return (
    <div className={`group my-3 md:px-4`} style={{ overflowWrap: "anywhere" }}>
      <div
        className={` relative flex w-fit rounded-2xl p-6 text-body-copy-2 shadow-light-black-transparent-25-lg backdrop-blur-[50px] dark:shadow-dark-black-transparent-25-lg ${
          message.role === "assistant"
            ? "dark:dark-assistant-chat-gradient mr-auto bg-light-assistant-chat-gradient"
            : "ml-auto bg-light-user-chat-gradient dark:bg-dark-user-chat-gradient "
        }`}
      >
        {message.role === "assistant" ? (
          <div className="min-w-[40px] text-right font-bold">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <img src={logo} alt="logo" className="w-4" />
            </div>
          </div>
        ) : null}

        <div className="prose dark:prose-invert mt-[-2px] w-full">
          {message.role === "user" ? (
            <div className="flex w-full">
              {isEditing ? (
                <div className="flex w-full flex-col">
                  <textarea
                    ref={textareaRef}
                    className="w-full resize-none whitespace-pre-wrap border-none dark:bg-[#343541]"
                    value={messageContent}
                    onChange={handleInputChange}
                    onKeyDown={handlePressEnter}
                    onCompositionStart={() => setIsTyping(true)}
                    onCompositionEnd={() => setIsTyping(false)}
                    style={{
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      lineHeight: "inherit",
                      padding: "0",
                      margin: "0",
                      overflow: "hidden",
                    }}
                  />

                  <div className="mt-10 flex justify-center space-x-4">
                    <button
                      className="h-[40px] rounded-md bg-blue-500 px-4 py-1 text-sm font-medium text-white enabled:hover:bg-blue-600 disabled:opacity-50"
                      onClick={handleEditMessage}
                      disabled={messageContent.trim().length <= 0}
                    >
                      {t("Save & Submit")}
                    </button>
                    <button
                      className="h-[40px] rounded-md border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                      onClick={() => {
                        setMessageContent(message.content);
                        setIsEditing(false);
                      }}
                    >
                      {t("Cancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`prose dark:prose-invert mr-4 flex-1 whitespace-pre-wrap pt-1 text-right `}
                >
                  {message.content}
                </div>
              )}

              {/* {!isEditing && (
                <div className="ml-1 flex flex-col items-center justify-end gap-4 md:-mr-8 md:ml-0 md:flex-row md:items-start md:justify-start md:gap-1">
                  <button
                    className="invisible text-gray-500 hover:text-gray-700 focus:visible group-hover:visible dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={toggleEditing}
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    className="invisible text-gray-500 hover:text-gray-700 focus:visible group-hover:visible dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={handleDeleteMessage}
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              )} */}
            </div>
          ) : (
            <div className="flex flex-row">
              <MemoizedReactMarkdown
                className="prose dark:prose-invert flex-1"
                //@ts-ignore
                remarkPlugins={[remarkGfm]}
                //@ts-ignore
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (children.length) {
                      if (children[0] == "▍") {
                        return <span className="mt-1 animate-pulse cursor-default">▍</span>;
                      }

                      children[0] = (children[0] as string).replace("`▍`", "▍");
                    }

                    const match = /language-(\w+)/.exec(className || "");

                    return match?.[1]?.includes("graph_line") ? (
                      <NivoLineChart chartData={String(children).replace(/\n$/, "")} />
                    ) : match?.[1]?.includes("graph_pie") ? (
                      <NivoPieChart chartData={String(children).replace(/\n$/, "")} showLegends />
                    ) : match?.[1]?.includes("graph_doughnut") ? (
                      <NivoPieChart
                        chartData={String(children).replace(/\n$/, "")}
                        innerRadius={0.5}
                        showLegends
                      />
                    ) : match?.[1]?.includes("doughnutchart") ? (
                      <DoughNut
                        chartData={String(children).replace(/\n$/, "")}
                        style={{ height: "173px", width: "173px" }}
                        chartLabel={"Doughnut"}
                        className="h-full w-full"
                      />
                    ) : match?.[1]?.includes("split_view") ? (
                      <SplitView>{String(children)}</SplitView>
                    ) : match?.[1]?.includes("citation") ? (
                      <Citation stringData={String(children).replace(/\n$/, "")} />
                    ) : match?.[1]?.includes("diagram") ? (
                      <ChatDiagram diagramData={String(children).replace(/\n$/, "")} />
                    ) : !inline ? (
                      <CodeBlock
                        key={Math.random()}
                        language={(match && match[1]) || ""}
                        value={String(children).replace(/\n$/, "")}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return (
                      <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                        {children}
                      </table>
                    );
                  },
                  th({ children }) {
                    return (
                      <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="break-words border border-black px-3 py-1 dark:border-white">
                        {children}
                      </td>
                    );
                  },
                }}
              >
                {`${message.content}${
                  messageIsStreaming &&
                  messageIndex == (projectConversation?.messages?.length ?? 0) - 1
                    ? "▍"
                    : " "
                }`}
              </MemoizedReactMarkdown>

              {/* <div className="ml-1 flex flex-col items-center justify-end gap-4 md:-mr-8 md:ml-0 md:flex-row md:items-start md:justify-start md:gap-1">
                {messagedCopied ? (
                  <IconCheck size={20} className="text-green-500 dark:text-green-400" />
                ) : (
                  <button
                    className="invisible text-gray-500 hover:text-gray-700 focus:visible group-hover:visible dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={copyOnClick}
                  >
                    <IconCopy size={20} />
                  </button>
                )}
              </div> */}
            </div>
          )}
        </div>

        {message.role === "user" ? (
          <div className="min-w-[24px] text-right font-bold">
            <img src={dp} alt="logo" className="h-6 w-6 rounded-full" />
          </div>
        ) : null}
      </div>
    </div>
  );
});
ProjectChatMessage.displayName = "ChatMessage";
