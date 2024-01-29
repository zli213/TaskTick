import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasks";
import { userInfoSlice } from "./userInfo";

export const store = configureStore({
  reducer: { tasks: tasksSlice.reducer, userInfo: userInfoSlice.reducer },
});
