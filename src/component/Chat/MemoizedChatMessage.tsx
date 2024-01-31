import { FC, memo } from "react";
import { ChatMessage, Props } from "./ChatMessage";

interface IProps extends Props {
  handleSend?: any;
  totalMessages?: number;
  prevMessage?: any;
}

export const MemoizedChatMessage: FC<IProps> = memo(
  ChatMessage,
  (prevProps, nextProps) => prevProps.message.content === nextProps.message.content
);
