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
        if(task.projectId === null || task.projectId === '') {
          state.inbox[task._id] = task;
        } else {
          if(!state[task.projectId]) {
            state[task.projectId] = {};
          }
          state[task.projectId][task._id] = task;
        }
      })
    },
    addCompletedTask: (state, action) => {
      const task = action.payload;
      if(task.projectId === null || task.projectId === '') {
        state.inbox[task._id] = {...task, completed: true};
      } else {
        if(!state[task.projectId]) {
          state[task.projectId] = {};
        }
        state[task.projectId][task._id] = {...task, completed: true};
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { initialCompletedTasks, addCompletedTask } = completedTaskSlice.actions;

export default completedTaskSlice.reducer;
