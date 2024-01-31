import { FC, memo } from "react";
import { ProjectChatMessage, Props } from "./ProjectChatMessage";

export const MemoizedProjectChatMessage: FC<Props> = memo(
  ProjectChatMessage,
  (prevProps, nextProps) => prevProps.message.content === nextProps.message.content
);
