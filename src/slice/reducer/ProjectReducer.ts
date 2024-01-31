import type { PayloadAction } from "@reduxjs/toolkit";
import { ProjectState } from "slice/ProjectSlice";

export const setSelectedProjectReducer = (state: ProjectState, action: PayloadAction<any>) => {
  state.selectedProject = action.payload;
};
