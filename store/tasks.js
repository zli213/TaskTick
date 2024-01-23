import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  inboxNum: 0,
  todayNum: 0,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initialTasksState: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tasks = JSON.parse(action.payload.tasks);
      state.inboxNum = action.payload.inboxNum;
      state.todayNum = action.payload.todayNum;
    },

    addTaskState: (state, action) => {
      const task = action.payload;
      state.tasks = [...state.tasks, task];
      if (task.projectId == "" || task.projectId == null) {
        state.inboxNum = state.inboxNum + 1;
      }

      if (task.dueDate !== null && task.dueDate !== "") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDueDate = new Date(task.dueDate);
        if (taskDueDate.getTime() <= today.getTime()) {
          state.todayNum = state.todayNum + 1;
        }
      }
    },
    
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialTasksState, addTaskState, incrementByAmount } =
  tasksSlice.actions;

export default tasksSlice.reducer;
