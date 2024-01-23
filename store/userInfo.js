import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  tags: [],
  showCompleted: false,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    initialInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.projects = action.payload.projects;
      state.tags = action.payload.tags;
    },
    addProjectState: (state, action) => {
      //
    },
    deleteProjectState: (state, action) => {
      //   state.value += action.payload
    },
    updateProjectState: (state, action) => {
      //   state.value += action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialInfo,
  addProjectState,
  deleteProjectState,
  updateProjectState,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
