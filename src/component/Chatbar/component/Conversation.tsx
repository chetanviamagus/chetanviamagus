import { IconCheck, IconMessage, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import {
  DragEvent,
  KeyboardEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";

import { Conversation } from "util/types/chat";

import HomeContext from "util/api/home/home.context";

import SidebarActionButton from "component/Buttons/SidebarActionButton";
import ChatbarContext from "component/Chatbar/Chatbar.context";

interface Props {
  conversation: Conversation;
  isPrompt?: boolean;
}

export const ConversationComponent = ({ conversation, isPrompt }: Props) => {
  const {
    state: { selectedConversation, selectedPromptTemplate, messageIsStreaming },
    handleSelectConversation,
    handleUpdateConversation,
  } = useContext(HomeContext);

  const { handleDeleteConversation } = useContext(ChatbarContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isPrompt) {
        selectedPromptTemplate && handleRename(selectedPromptTemplate);
      } else {
        selectedConversation && handleRename(selectedConversation);
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel(e as any);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, conversation: Conversation) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("conversation", JSON.stringify(conversation));
    }
  };

  const handleRename = (conversation: Conversation) => {
    if (renameValue.trim().length > 0) {
      handleUpdateConversation(
        conversation,
        {
          key: "name",
          value: renameValue,
        },
        isPrompt
      );
      setRenameValue("");
      setIsRenaming(false);
    }
  };

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isDeleting) {
      handleDeleteConversation(conversation);
    } else if (isRenaming) {
      handleRename(conversation);
    }
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleOpenRenameModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
    if (isPrompt) {
      selectedPromptTemplate && setRenameValue(selectedPromptTemplate.name);
    } else {
      selectedConversation && setRenameValue(selectedConversation.name);
    }
  };
  const handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isRenaming &&
      (isPrompt
        ? selectedPromptTemplate?.id === conversation.id
        : selectedConversation?.id === conversation.id) ? (
        <div className="flex w-full items-center gap-3 rounded-lg bg-[#343541]/90 p-3">
          {/* <IconMessage size={18} /> */}
          <input
            className="mr-12 flex-1  overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
            onBlur={(e: any) => handleCancel(e)}
          />
        </div>
      ) : (
        <button
          className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-dark-login-card hover:backdrop-blur-2xl ${
            messageIsStreaming ? "disabled:cursor-not-allowed" : ""
          } ${
            (
              isPrompt
                ? selectedPromptTemplate?.id === conversation.id
                : selectedConversation?.id === conversation.id
            )
              ? "bg-dark-neutral-gray-300/50 backdrop-blur-2xl"
              : ""
          }`}
          onClick={() => handleSelectConversation(conversation, isPrompt)}
          disabled={messageIsStreaming}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, conversation)}
          onDoubleClick={handleOpenRenameModal}
        >
          {/* <IconMessage size={18} /> */}
          <div
            className={`relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3 ${
              selectedConversation?.id === conversation.id ? "pr-12" : "pr-1"
            }`}
          >
            {conversation.name}
          </div>
        </button>
      )}

      {(isDeleting || isRenaming) &&
        (isPrompt
          ? selectedPromptTemplate?.id === conversation.id
          : selectedConversation?.id === conversation.id) && (
          <div className="z-100 absolute right-1 flex text-gray-300">
            <SidebarActionButton handleClick={handleConfirm}>
              <IconCheck size={18} />
            </SidebarActionButton>
            <SidebarActionButton handleClick={handleCancel}>
              <IconX size={18} />
            </SidebarActionButton>
          </div>
        )}

      {(isPrompt
        ? selectedPromptTemplate?.id === conversation.id
        : selectedConversation?.id === conversation.id) &&
        !isDeleting &&
        !isRenaming &&
        isHovering && (
          <div className="absolute right-1 z-10 flex text-gray-300">
            <SidebarActionButton handleClick={handleOpenRenameModal}>
              <IconPencil size={18} />
            </SidebarActionButton>
            <SidebarActionButton handleClick={handleOpenDeleteModal}>
              <IconTrash size={18} />
            </SidebarActionButton>
          </div>
        )}
    </div>
  );
};
