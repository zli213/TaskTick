import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./tasks";
import { projectSlice } from "./projects";
import { userInfoSlice } from "./userInfo";
import { viewOptionSlice } from "./viewOptions";
import { labelSlice } from "./labels";
import { numSlice } from "./num";
import { completedTaskSlice } from "./completedTask";


export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    tasks: tasksSlice.reducer,
    projects: projectSlice.reducer,
    labels: labelSlice.reducer,
    num: numSlice.reducer,
    viewOptions: viewOptionSlice.reducer,
    completedTasks: completedTaskSlice.reducer,

  },
});
