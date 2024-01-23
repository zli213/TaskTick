import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  inboxNum: 0,
  todayNum: 0,
  projects: [],
  tags: [],
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
      state.projects = action.payload.projects;
      state.tags = action.payload.tags;
    },

    //tasks
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

    //projects
    addProjectState: (state, action) => {
      //
    },
    deleteProjectState: (state, action) => {
      //   state.value += action.payload
    },
    updateProjectState: (state, action) => {
      //   state.value += action.payload
    },

    //tags
    addTagState: (state, action) => {
      state.tags = [...state.tags, action.payload];
    },
    editOneTagState: (state, action) => {
      const { oldTag, newTag } = action.payload;
      const index = state.tags.indexOf(oldTag);
      state.tags = [
        ...state.tags.slice(0, index),
        newTag,
        ...state.tags.slice(index + 1),
      ];

      //update tasks
      state.tasks = state.tasks.map((task) => {
        if (task.tags.includes(oldTag)) {
          const index = task.tags.indexOf(oldTag);
          return {
            ...task,
            tags: [...task.tags.slice(0, index), newTag, ...task.tags.slice(index + 1)],
          };
        } else {
          return task;
        }
      });
    },
    deleteOneTagState: (state, action) => {
      const index = state.tags.indexOf(action.payload);
      state.tags = [
        ...state.tags.slice(0, index),
        ...state.tags.slice(index + 1),
      ];

      //update tasks
      state.tasks = state.tasks.map((task) => {
        if (task.tags.includes(action.payload)) {
          const index = task.tags.indexOf(action.payload);
          return {
            ...task,
            tags: [...task.tags.slice(0, index), ...task.tags.slice(index + 1)],
          };
        } else {
          return task;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialTasksState,
  addTaskState,
  incrementByAmount,
  addProjectState,
  deleteProjectState,
  updateProjectState,
  addTagState,
  editOneTagState,
  deleteOneTagState,
} = tasksSlice.actions;

export default tasksSlice.reducer;
