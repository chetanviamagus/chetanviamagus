import { Conversation } from "util/types/chat";

import { ConversationComponent } from "./Conversation";

interface Props {
  conversations: Conversation[];
  isPrompt?: boolean;
}

export const Conversations = ({ conversations, isPrompt }: Props) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {conversations
        .filter((conversation) => !conversation.folderId)
        .slice()
        .reverse()
        .map((conversation, index) => (
          <ConversationComponent key={index} conversation={conversation} isPrompt={isPrompt} />
        ))}
    </div>
  );
};
