import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: {},
  inbox: { showCompletedTasks: false },
};

export const viewOptionSlice = createSlice({
  name: "viewOptions",
  initialState,
  reducers: {
    initialInfo: (state, action) => {},
    switchInboxCompletedTasks: (state, action) => {
      state.inbox.showCompletedTasks = !state.inbox.showCompletedTasks;
    },
    switchProjectCompletedTasks: (state, action) => {
      if(!state.projects[action.payload]) {
        state.projects[action.payload] = {};
      }
      state.projects[action.payload].showCompletedTasks =
        !state.projects[action.payload].showCompletedTasks;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialInfo,
  switchInboxCompletedTasks,
  switchProjectCompletedTasks,
} = viewOptionSlice.actions;

export default viewOptionSlice.reducer;
