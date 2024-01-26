import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tags: null,
};

export const labelSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    initialLabels: (state, action) => {
      state.tags = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialLabels } = labelSlice.actions;

export default labelSlice.reducer;
