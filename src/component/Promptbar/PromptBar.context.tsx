import { Dispatch, createContext } from "react";

import { ActionType } from "hook/useCreateReducer";

import { Prompt } from "util/types/prompt";

import { PromptbarInitialState } from "./Promptbar.state";

export interface PromptbarContextProps {
  state: PromptbarInitialState;
  dispatch: Dispatch<ActionType<PromptbarInitialState>>;
  handleCreatePrompt: () => void;
  handleDeletePrompt: (prompt: Prompt) => void;
  handleUpdatePrompt: (prompt: Prompt) => void;
}

const PromptbarContext = createContext<PromptbarContextProps>(undefined!);

export default PromptbarContext;
