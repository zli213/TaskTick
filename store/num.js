import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxNum: 0,
  todayNum: 0,
};

export const numSlice = createSlice({
  name: "numSlice",
  initialState,
  reducers: {
    initialNum: (state, action) => {
      state.inboxNum = action.payload.inboxNum;
      state.todayNum = action.payload.todayNum;
    },
    addInboxNum: (state, action) => {
      state.inboxNum += action.payload;
    },
    addTodayNum: (state, action) => {
      state.todayNum += action.payload;
    },

    updateTodayNum: (state, action) => {
      state.todayNum = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialNum, addInboxNum, addTodayNum, updateTodayNum } =
  numSlice.actions;

export default numSlice.reducer;

export const updateTodayNumAction = () => (dispatch, getState) => {
  let tasks = Object.values(getState().tasks);
  tasks = tasks
    .filter(
      (task) =>
        task.dueDate !== null &&
        task.dueDate !== "" &&
        task.archived !== true &&
        task.completed !== true
    )
    .filter((task) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate.getTime() <= today.getTime();
    });
  dispatch(updateTodayNum(tasks.length));
};
