import dp from "asset/img/dp.png";
import logo from "asset/img/logos/logo.svg";
import { FC, memo, useContext, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { updateConversation } from "util/app/conversation";

import { Message } from "util/types/chat";

import HomeContext from "util/api/home/home.context";

import NBMarkdown from "component/NBMarkdown/NBMarkdown";
import {
  ArrowPathIcon,
  ChevronLeftIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  HandThumbDownIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PencilIcon,
  PlayCircleIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HandThumbDownIcon as HandThumbDownIconSolid } from "@heroicons/react/24/solid";
import InputTextArea from "component/InputTextArea/InputTextArea";
import ButtonBox from "component/ButtonBox/ButtonBox";
import DialogBox from "component/Dialog/Dialog";
import Text from "component/Text/Text";
import CustomTooltip from "component/Tooltip/Tooltip";
import InputBox from "component/InputBox/InputBox";
import MetaData from "component/MetaData/MetaData";
import { GraphEdge } from "model/GraphEdge";
import { MarkerType, Node } from "reactflow";
import { GraphNode } from "model/GraphNode";
import { GraphNodeData } from "model/GraphNodeData";
// Data imports
import dataSourceGraphNodeData from "poc/dataSourceGraphNodes";
import dataSourceTableJson from "poc/dataSource.json";
import SimpleAccordion from "component/SimpleAccordion/SimpleAccordion";
import { Menu } from "primereact/menu";
import ToastCustom from "component/Toast/Toast";
import { TOAST_VARIANT } from "util/Constant";
import { Tooltip } from "primereact/tooltip";

// Constants
const dataSourceTable = dataSourceTableJson.dataSources[0].data;

//Later this array will be fetched from the backend API
const dataSourceGraphNodes = dataSourceGraphNodeData;
const nodesList = dataSourceGraphNodes.map(
  (node) =>
    new GraphNode(
      new GraphNodeData(
        node.data.image,
        node.data.label,
        node.data.isDisabled,
        node.data.isParent,
        node.data.isTruncate,
        node.data.enableSourceHandle,
        node.data.enableTargetHandle
      ),
      node.id,
      node.position,
      node.type,
      // @ts-ignore: will fix later
      node.className,
      node.parentNode
    )
);

const initialEdgesArray: GraphEdge[] = [];
const whyIsMyWebsiteSlow: GraphEdge[] = [
  {
    id: "InfluxData-PrometheusDB",
    source: "InfluxData",
    target: "PrometheusDB",
    animated: true,
    label: "InfluxData PrometheusDB",
    type: "bezier",
    sourceHandle: "InfluxDataHandle",
    targetHandle: "Datadog-InfluxDataHandle",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "PrometheusDB-Datadog",
    source: "PrometheusDB",
    target: "Datadog",
    animated: true,
    label: "PrometheusDB and Datadog",
    type: "bezier",
    sourceHandle: "InfluxDataHandle",
    targetHandle: "Datadog-InfluxDataHandle",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Datadog-InfluxData",
    source: "Datadog",
    target: "InfluxData",
    animated: true,
    label: "Datadog and InfluxData",
    type: "bezier",
    sourceHandle: "InfluxDataHandle",
    targetHandle: "Datadog-InfluxDataHandle",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
]; // Assume this is your edges array
export interface Props {
  message: Message;
  messageIndex: number;
  onEdit?: (editedMessage: Message) => void;
  handleSend?: any;
  totalMessages?: any;
  prevMessage?: any;
}

export const ChatMessage: FC<Props> = memo(
  ({ message, messageIndex, onEdit, handleSend, totalMessages, prevMessage }) => {
    const { t } = useTranslation("chat");

    const {
      state: { selectedConversation, conversations, messageIsStreaming },
      dispatch: homeDispatch,
    } = useContext(HomeContext);

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
        if (selectedConversation && onEdit) {
          onEdit({ ...message, content: messageContent });
        }
      }
      setIsEditing(false);
    };

    const handleDeleteMessage = () => {
      if (!selectedConversation) return;

      const { messages } = selectedConversation;
      const findIndex = messages.findIndex((elm) => elm === message);

      if (findIndex < 0) return;

      if (findIndex < messages.length - 1 && messages[findIndex + 1].role === "assistant") {
        messages.splice(findIndex, 2);
      } else {
        messages.splice(findIndex, 1);
      }
      const updatedConversation = {
        ...selectedConversation,
        messages,
      };

      const { single, all } = updateConversation(updatedConversation, conversations);
      homeDispatch({ field: "selectedConversation", value: single });
      homeDispatch({ field: "conversations", value: all });
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

    const [isSourceVisible, setIsSourceVisible] = useState(false);
    const [isPromptTemplateVisible, setIsPromptTemplate] = useState(false);
    const [key, setKey] = useState(Math.random());
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleFullScreen = (isFullScreen: boolean) => {
      setIsFullScreen(isFullScreen);
    };

    const [initialEdges, setInitialEdges] = useState<GraphEdge[]>(initialEdgesArray); // Assume this is your edges array
    const [initialNodes, setInitialNodes] =
      useState<Node<GraphNodeData, string | undefined>[]>(nodesList);

    const [isDisliked, setIsDisliked] = useState(false);

    const menuRef = useRef<any>();
    const toastRef = useRef<any>();

    const onShowMenuOverlay = (e: any) => {
      if (!messageIsStreaming) {
        menuRef?.current?.toggle?.(e);
      }
    };

    const handleReRender = () => {
      setKey(Math.random());
    };
    return (
      <div className={`group my-3 md:px-4`} style={{ overflowWrap: "anywhere" }}>
        <div
          className={`relative flex ${
            message.role === "assistant"
              ? "2xl:min-w-2/5 w-fit min-w-1/2 flex-col"
              : "ml-auto w-fit"
          }`}
        >
          <div
            className={` flex w-full flex-col rounded-2xl p-6 text-body-copy-2 shadow-light-black-transparent-25-lg backdrop-blur-[50px] dark:shadow-dark-black-transparent-25-lg ${
              message.role === "assistant"
                ? "dark:dark-assistant-chat-gradient mr-auto  bg-light-assistant-chat-gradient "
                : "ml-auto bg-light-user-chat-gradient dark:bg-dark-user-chat-gradient "
            }`}
          >
            <div className="flex">
              {message.role === "assistant" ? (
                <div className="min-w-[40px] text-right font-bold">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <img src={logo} alt="logo" className="w-4" />
                  </div>
                </div>
              ) : null}

              <div className="prose dark:prose-invert mt-[-2px] w-full">
                {message.role === "user" ? (
                  <div className="flex">
                    {isEditing ? (
                      <div className="flex w-full flex-col">
                        {/* <textarea
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
                        /> */}
                        <InputTextArea
                          hideLabel
                          hideErrorRow
                          value={messageContent}
                          onChange={handleInputChange}
                          onKeyDown={handlePressEnter}
                          className="h-auto bg-transparent dark:bg-[#343541]"
                          rows={2}
                        />

                        <div className="mt-10 flex justify-center space-x-4">
                          {/* <button
                            className="h-[40px] rounded-md bg-blue-500 px-4 py-1 text-sm font-medium text-white enabled:hover:bg-blue-600 disabled:opacity-50"
                            onClick={handleEditMessage}
                            disabled={messageContent.trim().length <= 0}
                          >
                            {t("Save & Submit")}
                          </button> */}
                          <div className="w-48">
                            <ButtonBox
                              label="Save & Submit"
                              className="w-48"
                              onClick={handleEditMessage}
                              disabled={messageContent.trim().length <= 0}
                            />
                          </div>
                          <ButtonBox
                            label="Cancel"
                            variant="no-border"
                            className="w-24"
                            onClick={() => {
                              setMessageContent(message.content);
                              setIsEditing(false);
                            }}
                          />
                          {/* <button
                            className="h-[40px] rounded-md border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            onClick={() => {
                              setMessageContent(message.content);
                              setIsEditing(false);
                            }}
                          >
                            {t("Cancel")}
                          </button> */}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`prose dark:prose-invert mr-4 flex-1 whitespace-pre-wrap pt-1 text-right `}
                        // onClick={toggleEditing}
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
                  <div className="flex flex-col">
                    <NBMarkdown
                      openPromptTemplate={() => {
                        setIsPromptTemplate(true);
                      }}
                    >
                      {`${message.content}${
                        messageIsStreaming &&
                        messageIndex == (selectedConversation?.messages?.length ?? 0) - 1
                          ? "▍"
                          : " "
                      }`}
                    </NBMarkdown>
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
          {message.role === "assistant" ? (
            <div className="my-1.5 flex justify-between">
              <div className="flex items-center gap-x-3">
                <div
                  onClick={onShowMenuOverlay}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-full hover:bg-dark-neutral-gray-300"
                  id={`export-${messageIndex}`}
                >
                  <ShareIcon className="h-6 w-6 " />
                </div>
                <Tooltip
                  className={`max-w-65 rounded-xl bg-base-white p-3 text-xs text-neutral-900`}
                  target={`#export-${messageIndex}`}
                  position="top"
                >
                  Export
                </Tooltip>
                <Menu
                  model={[
                    {
                      label: "Export to Tableau",
                    },
                    {
                      label: "Export to Jupiter",
                    },
                    {
                      label: "Add to Dashboard",
                    },
                    {
                      label: "Add to Report",
                    },
                  ]}
                  popup
                  ref={menuRef}
                  id={"profile-s"}
                />
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-full hover:bg-dark-neutral-gray-300"
                  onClick={() => {
                    //Regenerate
                    if (prevMessage && !messageIsStreaming) {
                      handleSend?.(prevMessage, totalMessages - messageIndex + 1, null);
                    }
                  }}
                  id={`regenerate-${messageIndex}`}
                >
                  <ArrowPathIcon className="h-6 w-6" />
                </div>
                <Tooltip
                  className={`max-w-65 rounded-xl bg-base-white p-3 text-xs text-neutral-900`}
                  target={`#regenerate-${messageIndex}`}
                  position="top"
                >
                  Regenerate
                </Tooltip>
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-full  hover:bg-dark-neutral-gray-300"
                  onClick={() => {
                    //Open Sources
                    if (!messageIsStreaming) {
                      setIsSourceVisible(true);
                    }
                  }}
                  id={`sources-${messageIndex}`}
                >
                  <PaperClipIcon className="h-6 w-6" />
                </div>
                <Tooltip
                  className={`max-w-65 rounded-xl bg-base-white p-3 text-xs text-neutral-900`}
                  target={`#sources-${messageIndex}`}
                  position="top"
                >
                  Sources
                </Tooltip>
                <DialogBox
                  visible={isSourceVisible}
                  maskClassName="bg-black/80"
                  className="w-123 rounded-xl bg-base p-6"
                  onHide={() => {
                    setIsSourceVisible(false);
                  }}
                  closable={false}
                >
                  <div className="flex items-center pb-3">
                    <Text label="Sources" className="w-full text-center text-heading-3" />
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-dark-neutral-gray-300"
                      onClick={() => {
                        setIsSourceVisible(false);
                      }}
                    >
                      <XMarkIcon className="h-6 w-6 cursor-pointer" />
                    </div>
                  </div>
                  <div className="mt-1.5 flex flex-col gap-3">
                    <CitationCard
                      description={" IOPS col in Specs tab from Schema2 (AWS)"}
                      source={"Schema 264"}
                      number={1}
                      openPromptTemplate={() => {
                        setIsPromptTemplate(true);
                      }}
                    />
                    <CitationCard
                      description={" IOPS col in Specs tab from Schema2 (AWS)"}
                      source={"Schema 265"}
                      number={2}
                      openPromptTemplate={() => {
                        setIsPromptTemplate(true);
                      }}
                    />
                    <CitationCard
                      description={" IOPS col in Specs tab from Schema2 (AWS)"}
                      source={"Hawkeye"}
                      number={3}
                      openPromptTemplate={() => {
                        setIsPromptTemplate(true);
                      }}
                    />
                    <CitationCard
                      description={" IOPS col in Specs tab from Schema2 (AWS)"}
                      source={"Schema 264"}
                      number={4}
                      openPromptTemplate={() => {
                        setIsPromptTemplate(true);
                      }}
                    />
                  </div>
                </DialogBox>
              </div>
              <div className="flex items-center gap-x-3">
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-dark-neutral-gray-300"
                  id={`feedback-${messageIndex}`}
                >
                  {isDisliked ? (
                    <HandThumbDownIconSolid
                      className="h-6 w-6 "
                      onClick={() => {
                        setIsDisliked(false);
                      }}
                    />
                  ) : (
                    <HandThumbDownIcon
                      className="h-6 w-6 "
                      onClick={() => {
                        setIsDisliked(true);
                      }}
                    />
                  )}
                </div>
                <Tooltip
                  className={`max-w-65 rounded-xl bg-base-white p-3 text-xs text-neutral-900`}
                  target={`#feedback-${messageIndex}`}
                  position="top"
                >
                  {isDisliked ? "I'm okay with the response" : "The answer could be better"}
                </Tooltip>
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-dark-neutral-gray-300"
                  onClick={() => {
                    if (!messageIsStreaming) {
                      setIsPromptTemplate(true);
                    }
                  }}
                  id={`prompt-${messageIndex}`}
                >
                  <CubeTransparentIcon className="h-6 w-6" />
                </div>

                <Tooltip
                  className={`max-w-65 rounded-xl bg-base-white p-3 text-xs text-neutral-900`}
                  target={`#prompt-${messageIndex}`}
                  position="top"
                >
                  Prompt Template
                </Tooltip>

                <DialogBox
                  closable={false}
                  modal
                  visible={isPromptTemplateVisible}
                  position="right"
                  onHide={() => {
                    setIsPromptTemplate(false);
                    setIsFullScreen(false);
                  }}
                  className={`slide-dialog-modal h-screen bg-base transition-all delay-100 ${
                    isFullScreen ? "w-full" : "w-full rounded-l-xl md:w-5/6 lg:w-3/5"
                  }`}
                >
                  <div className="flex flex-col gap-6">
                    {isFullScreen ? null : (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => {
                                setIsPromptTemplate(false);
                                setIsFullScreen(false);
                              }}
                              className="mr-1.5 rounded-full p-1.5 text-dark-neutral-gray-900 hover:bg-dark-neutral-gray-300"
                            >
                              <ChevronLeftIcon className="h-6 w-6 " />
                            </button>

                            <Text
                              className="text-heading-3 font-semibold text-base-white"
                              label={"Prompt Template"}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32">
                              <ButtonBox
                                variant="no-border"
                                label="Save Schema"
                                onClick={() => {
                                  toastRef?.current.showFunction();
                                }}
                              />
                            </div>
                            <div className="w-28">
                              <ButtonBox
                                label="Run Prompt"
                                onClick={() => {
                                  //Hide Dialog
                                  setIsPromptTemplate(false);
                                  setIsSourceVisible(false);
                                  //Regenerate
                                  if (prevMessage) {
                                    handleSend?.(
                                      prevMessage,
                                      totalMessages - messageIndex + 1,
                                      null
                                    );
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-dark-neutral-gray-800">
                          <Text label="server-performance-template" />
                        </div>

                        <div className="flex flex-col  gap-3">
                          <Text label="Prompts" />
                          <div className="text-dark-neutral-gray-800">
                            <div>Why do we have so many trouble tickets?</div>
                          </div>
                        </div>

                        <div>
                          <SimpleAccordion
                            variant="secondary"
                            // multiple={true}
                            accordionItems={[
                              {
                                header: "Sources (Schema)",
                                content: (
                                  <div className="mt-1.5 flex items-center gap-3">
                                    <div className="w-64">
                                      <CitationCard
                                        description={"IOPS col in Specs tab from Schema2 (AWS)"}
                                        source={"Schema 264"}
                                        number={1}
                                        openPromptTemplate={() => {
                                          setIsPromptTemplate(true);
                                        }}
                                      />
                                    </div>
                                    <div className="w-64">
                                      <CitationCard
                                        description={"IOPS col in Specs tab from Schema2 (AWS)"}
                                        source={"Confluence"}
                                        isExternal
                                        number={2}
                                        openPromptTemplate={() => {
                                          setIsPromptTemplate(true);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ),
                              },
                            ]}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <Text label="Virtual Schema" />
                        </div>
                      </>
                    )}

                    <div>
                      <div className="relative m-auto mb-3 w-full">
                        <InputBox
                          placeholder="Add or remove tables and columns right here!"
                          className="!h-12.5 py-3"
                          // onChange={handleInputChange}
                          hideLabel
                          hideErrorRow
                        />
                        <button
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 transform text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900"
                          // onClick={handleUpdateInitialNodes}
                        >
                          <PaperAirplaneIcon className="h-6 w-6 " />
                        </button>
                      </div>
                      <ToastCustom
                        position="bottom-right"
                        ref={toastRef}
                        message={"Schema saved"}
                        variant={TOAST_VARIANT.PRIMARY}
                      />
                      <div
                        className={`${isFullScreen ? "" : "h-87"}`}
                        style={{
                          height: isFullScreen ? "calc(100vh - 150px)" : "",
                        }}
                      >
                        <MetaData
                          delayForFitView={175}
                          hideMinimap
                          initialEdges={initialEdges}
                          initialNodes={initialNodes}
                          key={key}
                          onFullScreen={handleFullScreen}
                          onReRender={handleReRender}
                        />
                      </div>
                    </div>
                    {isFullScreen ? null : (
                      <>
                        <div>
                          <SimpleAccordion
                            variant="secondary"
                            // multiple={true}
                            accordionItems={[
                              {
                                header: "Query",
                                content: (
                                  <div className="text-dark-neutral-gray-800">
                                    The sun dipped below the horizon, casting a fiery glow across
                                    the canvas of the sky. As twilight descended, the world seemed
                                    to hush, the bustling city streets now tranquil and the distant
                                    hum of traffic fading into a gentle whisper. A cool breeze
                                    danced through the trees, rustling leaves and carrying the sweet
                                    scent of honeysuckle. Fireflies twinkled like stars fallen to
                                    earth, their ethereal light adding a touch of magic to the
                                    evening's embrace. In the park, couples strolled hand-in-hand,
                                    their quiet laughter mingling with the soft chirping of
                                    crickets. The moon, a luminous pearl in the velvet expanse,
                                    painted the scene in shades of silver and blue, a soothing balm
                                    for the weary soul.
                                  </div>
                                ),
                              },
                              // {
                              //   header: "Alternate Prompts",
                              //   content: (
                              //     <div className="text-dark-neutral-gray-800">
                              //       <ul className="list-disc pl-5">
                              //         <li
                              //           className="mb-3  cursor-pointer list-disc "
                              //           onClick={() => {
                              //             setIsPromptTemplate(false);
                              //             const message: Message = {
                              //               role: "user",
                              //               content: "Why is my server responding so slowly?",
                              //             };
                              //             handleSend(message, 0, null);
                              //           }}
                              //         >
                              //           <div className="group flex gap-3 hover:text-dark-neutral-gray-900">
                              //             <div>Why is my server responding so slowly?</div>
                              //             <div className="hidden transition-all group-hover:block">
                              //               <div className="flex items-center gap-1.5">
                              //                 <PlayCircleIcon className="h-6 w-6" />
                              //                 <div>Run Prompt</div>
                              //               </div>
                              //             </div>
                              //           </div>
                              //         </li>
                              //         <li
                              //           className="my-3  cursor-pointer list-disc "
                              //           onClick={() => {
                              //             setIsPromptTemplate(false);
                              //             const message: Message = {
                              //               role: "user",
                              //               content: "Why is internet slow?",
                              //             };
                              //             handleSend(message, 0, null);
                              //           }}
                              //         >
                              //           <div className="group flex gap-3 hover:text-dark-neutral-gray-900">
                              //             <div>Why is internet slow?</div>
                              //             <div className="hidden transition-all group-hover:block">
                              //               <div className="flex items-center gap-1.5">
                              //                 <PlayCircleIcon className="h-6 w-6" />
                              //                 <div>Run Prompt</div>
                              //               </div>
                              //             </div>
                              //           </div>
                              //         </li>
                              //         <li
                              //           className="my-3  cursor-pointer list-disc "
                              //           onClick={() => {
                              //             setIsPromptTemplate(false);
                              //             const message: Message = {
                              //               role: "user",
                              //               content: "Why is my server responding so slowly?",
                              //             };
                              //             handleSend(message, 0, null);
                              //           }}
                              //         >
                              //           <div className="group flex gap-3 hover:text-dark-neutral-gray-900">
                              //             <div>Why is my server responding so slowly?</div>
                              //             <div className="hidden transition-all group-hover:block">
                              //               <div className="flex items-center gap-1.5">
                              //                 <PlayCircleIcon className="h-6 w-6" />
                              //                 <div>Run Prompt</div>
                              //               </div>
                              //             </div>
                              //           </div>
                              //         </li>
                              //       </ul>
                              //     </div>
                              //   ),
                              // },
                              // Add more sections as needed
                            ]}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </DialogBox>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
ChatMessage.displayName = "ChatMessage";

const CitationCard = (props: any) => {
  const onClick = () => {
    if (props.isExternal) {
      window.open("https://www.google.com", "_blank");
    } else {
      props?.openPromptTemplate?.();
    }
  };

  return (
    <div className="cursor-pointer rounded-md bg-dark-neutral-gray-200 p-3" onClick={onClick}>
      <div className="mb-3 text-dark-neutral-gray-800">{props.description ?? ""}</div>
      <div className=" flex items-center justify-between text-dark-neutral-gray-900">
        <div className="flex items-center gap-x-1.5">
          {props.isExternal ? (
            <GlobeAltIcon className="h-6 w-6" />
          ) : (
            <CubeTransparentIcon className="h-6 w-6" />
          )}

          <div>{props.source ?? ""}</div>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-electron-blue-300 text-primary-electron-blue-900">
          {props.number ?? ""}
        </div>
      </div>
    </div>
  );
};
