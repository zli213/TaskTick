import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: {},
};

export const completedTaskSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    initialCompletedTasks: (state, action) => {
      const tasks = JSON.parse(action.payload);
      tasks.forEach((task) => {
        if (task.projectId === null || task.projectId === "") {
          state.inbox[task._id] = task;
        } else {
          if (!state[task.projectId]) {
            state[task.projectId] = {};
          }
          state[task.projectId][task._id] = task;
        }
      });
    },
    addCompletedTask: (state, action) => {
      const task = action.payload;
      if (task.projectId === null || task.projectId === "") {
        const currentTime = new Date().toISOString();
        state.inbox[task._id] = {
          ...task,
          completed: true,
          updatedAt: currentTime,
        };
      } else {
        const currentTime = new Date().toISOString();
        if (!state[task.projectId]) {
          state[task.projectId] = {};
        }
        state[task.projectId][task._id] = {
          ...task,
          completed: true,
          updatedAt: currentTime,
        };
      }
    },
    removeCompletedTask: (state, action) => {
      const taskId = action.payload;
      if (state.inbox[taskId]) {
        delete state.inbox[taskId];
      } else {
        Object.keys(state).forEach((projectId) => {
          if (state[projectId] && state[projectId][taskId]) {
            delete state[projectId][taskId];
          }
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialCompletedTasks, addCompletedTask, removeCompletedTask } =
  completedTaskSlice.actions;

export default completedTaskSlice.reducer;
