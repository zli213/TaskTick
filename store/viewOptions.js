import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  today: null,
  upcoming: null,
  projects: null,
  inbox: null,
};

export const viewOptionSlice = createSlice({
  name: "viewOptions",
  initialState,
  reducers: {
    initialInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialInfo } = viewOptionSlice.actions;

export default viewOptionSlice.reducer;
