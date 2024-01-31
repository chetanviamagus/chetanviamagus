import {
  IconArrowDown,
  IconBolt,
  IconBrandGoogle,
  IconPlayerStop,
  IconRepeat,
  IconSend,
} from "@tabler/icons-react";
import {
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { Message } from "util/types/chat";
import { Plugin } from "util/types/plugin";
import { Prompt } from "util/types/prompt";

import HomeContext from "util/api/home/home.context";

import { PluginSelect } from "./PluginSelect";
import { PromptList } from "./PromptList";
import { VariableModal } from "./VariableModal";
import InputTextArea from "component/InputTextArea/InputTextArea";

import sendMessageIcon from "asset/img/icons/send-message.svg";
import { useAppSelector } from "hook/redux";
import { PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface Props {
  onSend: (message: Message, plugin: Plugin | null) => void;
  onRegenerate: () => void;
  onScrollDownClick: () => void;
  stopConversationRef: MutableRefObject<boolean>;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  showScrollDownButton: boolean;
  showFollowUps?: boolean;
  followUpQuestions?: string[];
}

export const ChatInput = ({
  onSend,
  onRegenerate,
  onScrollDownClick,
  stopConversationRef,
  textareaRef,
  showScrollDownButton,
  showFollowUps,
  followUpQuestions,
}: Props) => {
  const { t } = useTranslation("chat");

  const {
    state: { selectedConversation, messageIsStreaming, prompts },

    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showPromptList, setShowPromptList] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [promptInputValue, setPromptInputValue] = useState("");
  const [variables, setVariables] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPluginSelect, setShowPluginSelect] = useState(false);
  const [plugin, setPlugin] = useState<Plugin | null>(null);

  const promptListRef = useRef<HTMLUListElement | null>(null);
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.name.toLowerCase().includes(promptInputValue.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const maxLength = selectedConversation?.model?.maxLength;

    if (maxLength && value.length > maxLength) {
      alert(
        t(
          `Message limit is {{maxLength}} characters. You have entered {{valueLength}} characters.`,
          { maxLength, valueLength: value.length }
        )
      );
      return;
    }

    setContent(value);
    updatePromptListVisibility(value);
  };

  const handleSend = (e?: any, overriddenMessage?: string) => {
    if (messageIsStreaming) {
      return;
    }

    if (!content && !overriddenMessage) {
      alert(t("Please enter a message"));
      return;
    }

    onSend({ role: "user", content: overriddenMessage ?? content ?? "" }, plugin);
    setContent("");
    setPlugin(null);

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const handleStopConversation = () => {
    stopConversationRef.current = true;
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  };

  const isMobile = () => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  const handleInitModal = () => {
    const selectedPrompt = filteredPrompts[activePromptIndex];
    if (selectedPrompt) {
      setContent((prevContent) => {
        const newContent = prevContent?.replace(/\/\w*$/, selectedPrompt.content);
        return newContent;
      });
      handlePromptSelect(selectedPrompt);
    }
    setShowPromptList(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (showPromptList) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActivePromptIndex((prevIndex) =>
          prevIndex < prompts.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActivePromptIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      } else if (e.key === "Tab") {
        e.preventDefault();
        setActivePromptIndex((prevIndex) => (prevIndex < prompts.length - 1 ? prevIndex + 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleInitModal();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowPromptList(false);
      } else {
        setActivePromptIndex(0);
      }
    } else if (e.key === "Enter" && !isTyping && !isMobile() && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "/" && e.metaKey) {
      e.preventDefault();
      setShowPluginSelect(!showPluginSelect);
    }
  };

  const parseVariables = (content: string) => {
    const regex = /{{(.*?)}}/g;
    const foundVariables = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      foundVariables.push(match[1]);
    }

    return foundVariables;
  };

  const updatePromptListVisibility = useCallback((text: string) => {
    const match = text.match(/\/\w*$/);

    if (match) {
      setShowPromptList(true);
      setPromptInputValue(match[0].slice(1));
    } else {
      setShowPromptList(false);
      setPromptInputValue("");
    }
  }, []);

  const handlePromptSelect = (prompt: Prompt) => {
    const parsedVariables = parseVariables(prompt.content);
    setVariables(parsedVariables);

    if (parsedVariables.length > 0) {
      setIsModalVisible(true);
    } else {
      setContent((prevContent) => {
        const updatedContent = prevContent?.replace(/\/\w*$/, prompt.content);
        return updatedContent;
      });
      updatePromptListVisibility(prompt.content);
    }
  };

  const handleSubmit = (updatedVariables: string[]) => {
    const newContent = content?.replace(/{{(.*?)}}/g, (match, variable) => {
      const index = variables.indexOf(variable);
      return updatedVariables[index];
    });

    setContent(newContent);

    if (textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (promptListRef.current) {
      promptListRef.current.scrollTop = activePromptIndex * 30;
    }
  }, [activePromptIndex]);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
      textareaRef.current.style.overflow = `${
        textareaRef?.current?.scrollHeight > 400 ? "auto" : "hidden"
      }`;
    }
  }, [content]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (promptListRef.current && !promptListRef.current.contains(e.target as Node)) {
        setShowPromptList(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [openFollowUps, setOpenFollowUps] = useState(false);

  return (
    <div
      // style={{ width: "calc(100% - 11px)" }}
      className="absolute bottom-0 left-0 w-full border-transparent pt-6 md:pt-2"
    >
      <div className="stretch mx-2 mt-4 flex flex-row gap-3 last:mb-3 md:mx-4  lg:mx-auto lg:max-w-3xl xl:max-w-6xl">
        <div className="relative mx-2 flex w-full flex-grow flex-col shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:text-white sm:mx-4">
          {showFollowUps && (
            <div
              onClick={() => {
                setOpenFollowUps(!openFollowUps);
              }}
              className="border-b-none absolute -top-0 flex w-full -translate-y-full transform flex-col gap-4 rounded-t-lg border border-primary-oauth-btn-border bg-dark-neutral-gray-100 p-3  transition-all dark:border-dark-oauth-btn-border"
            >
              <div>Follow up questions</div>
              {openFollowUps && (
                <>
                  {followUpQuestions?.map((question: string, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="cursor-pointer hover:underline"
                        onClick={(e) => {
                          handleSend(undefined, question);
                        }}
                      >
                        {question}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          <div className={`${showFollowUps ? "-translate-y-1 transform" : ""}`}>
            <div className="absolute bottom-3 left-3">
              <SparklesIcon className="h-6 w-6 text-dark-neutral-gray-700" />
            </div>
            <InputTextArea
              value={content}
              rows={1}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              hideLabel
              hideErrorRow
              autoResize
              placeholder={`Ask more questions on the ${
                currentProject?.projectInfo?.projectName ?? ""
              } project...`}
              className=" !h-12.5 !rounded-t-md bg-dark-neutral-gray-100 !px-12 !py-3.5"
              onFocus={() => {
                setOpenFollowUps(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setOpenFollowUps(false);
                }, 150);
              }}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-sm px-2 text-neutral-800 opacity-60 hover:text-neutral-900 dark:bg-opacity-50 dark:text-neutral-100 dark:hover:text-neutral-200"
              onClick={handleSend}
              id="send-message-button"
            >
              {messageIsStreaming ? (
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
              ) : (
                <PaperAirplaneIcon className="h-6 w-6 cursor-pointer" />
              )}
            </button>
          </div>

          {showScrollDownButton && (
            <div className="absolute bottom-25 right-0">
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-gray-800 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-neutral-200"
                onClick={onScrollDownClick}
              >
                {""}
                <IconArrowDown size={18} />
              </button>
            </div>
          )}

          {showPromptList && filteredPrompts.length > 0 && (
            <div className="absolute bottom-12 w-full">
              <PromptList
                activePromptIndex={activePromptIndex}
                prompts={filteredPrompts}
                onSelect={handleInitModal}
                onMouseOver={setActivePromptIndex}
                promptListRef={promptListRef}
              />
            </div>
          )}

          {isModalVisible && (
            <VariableModal
              prompt={filteredPrompts[activePromptIndex]}
              variables={variables}
              onSubmit={handleSubmit}
              onClose={() => setIsModalVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
