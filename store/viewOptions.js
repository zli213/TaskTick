import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: { },
  inbox: { showCompletedTasks: false },
};

export const viewOptionSlice = createSlice({
  name: "viewOptions",
  initialState,
  reducers: {
    initialInfo: (state, action) => {
      
    },
    switchInboxCompletedTasks: (state, action) => {
      state.inbox.showCompletedTasks = !state.inbox.showCompletedTasks;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialInfo, switchInboxCompletedTasks } = viewOptionSlice.actions;

export default viewOptionSlice.reducer;
