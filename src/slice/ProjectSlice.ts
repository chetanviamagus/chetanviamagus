import { createSlice } from "@reduxjs/toolkit";
import { setSelectedProjectReducer } from "slice/reducer/ProjectReducer";

export interface ProjectState {
  selectedProject: any;
}

const initialState: ProjectState = {
  selectedProject: null,
};

const cartSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSelectedProject: setSelectedProjectReducer,
  },
});

export const { setSelectedProject } = cartSlice.actions;

export default cartSlice.reducer;
