import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   projects: null,
   tasks: null,
};

export const completedTaskSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    initialComTasks: (state, action) => {
      state.items = action.payload;
    },
    addCompletedTask: (state, action) => {

    }
  },
});

// Action creators are generated for each case reducer function
export const { initialComTasks, addCompletedTask } = completedTaskSlice.actions;

export default completedTaskSlice.reducer;
