import { createSlice } from "@reduxjs/toolkit";
import { initialProjects, addProjectNum } from "./projects";
import { initialLabels } from "./labels";
import { initialNum, addInboxNum, addTodayNum } from "./num";
import { initialCompletedTasks, addCompletedTask } from "./completedTask";


const initialState = {};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initialTasks: (state, action) => {
      const tasks = JSON.parse(action.payload);
      state = tasks.map((item) => {
        return (state[item._id] = item);
      });
    },

    // ----- tasks -----
    addTask: (state, action) => {
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    },
    deleteTask: (state, action) => {
      const { [action.payload]: deletedTask, ...rest } = state;
      return rest;
    },
    updateTask: (state, action) => {
      state[action.payload._id] = action.payload;
    },

    // ----- project related tasks -----
    deleteProjectTasks: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].projectId !== action.payload) {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },
    updateTaskProjectName: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].projectId === action.payload.projectId) {
          object[key] = { ...state[key], projectName: action.payload.newName };
        } else {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },
    archiveTaskofProject: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].projectId === action.payload) {
          object[key] = { ...state[key], archived: true };
        } else {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },
    unarchiveTaskofProject: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].projectId === action.payload) {
          object[key] = { ...state[key], archived: false };
        } else {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },

    // ----- boards -----
    deleteBoardTasks: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].projectId !== action.payload.projectId) {
          object[key] = state[key];
        } else if (state[key].board !== action.payload.board) {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },
    updateTaskBoard: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].projectId === action.payload.projectId) {
          object[key] = { ...state[key], board: action.payload.board };
        } else {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },

    // ----- tags -----
    updateTaskTag: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].tags.includes(action.payload.oldTag)) {
          const index = state[key].tags.indexOf(action.payload.oldTag);
          object[key] = {
            ...state[key],
            tags: [
              ...state[key].tags.slice(0, index),
              action.payload.newTag,
              ...state[key].tags.slice(index + 1),
            ],
          };
        } else {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },
    deleteTaskTag: (state, action) => {
      const newState = Object.keys(state).reduce((object, key) => {
        if (state[key].tags.includes(action.payload)) {
          const index = state[key].tags.indexOf(action.payload);
          object[key] = {
            ...state[key],
            tags: [
              ...state[key].tags.slice(0, index),
              ...state[key].tags.slice(index + 1),
            ],
          };
        } else {
          object[key] = state[key];
        }
        return object;
      }, {});
      return newState;
    },
  },
});

export const {
  initialTasks,

  addTask,
  deleteTask,
  updateTask,
  completeTask,

  deleteProjectTasks,
  updateTaskProjectName,
  archiveTaskofProject,
  unarchiveTaskofProject,

  deleteBoardTasks,
  updateTaskBoard,

  updateTaskTag,
  deleteTaskTag,
} = tasksSlice.actions;

export default tasksSlice.reducer;

// ----- actions -----
export const initialAllState =
  (tasks, projects, inboxNum, todayNum, tags, completedTask) => (dispatch, getState) => {
    dispatch(initialTasks(tasks));
    dispatch(initialProjects(projects));
    dispatch(initialLabels(tags));
    dispatch(initialNum({ inboxNum: inboxNum, todayNum: todayNum }));
    dispatch(initialCompletedTasks(completedTask));
  };

export const addTaskAction = (value) => (dispatch, getState) => {
  dispatch(addTask(value));

  if (value.projectId == "" || value.projectId == null) {
    dispatch(addInboxNum(1));
  }
  if (value.dueDate !== null && value.dueDate !== "") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDueDate = new Date(value.dueDate);
    if (taskDueDate.getTime() <= today.getTime()) {
      dispatch(addTodayNum(1));
    }
  }

  //update projects
  if (value.projectId !== "" && value.projectId !== null) {
    dispatch(addProjectNum({ projectId: value.projectId, num: 1 }));
  }
};

export const deleteTaskAction =
  (_id, dueDate, projectId) => (dispatch, getState) => {
    dispatch(deleteTask(_id));

    if (projectId !== "" && projectId !== null) {
      dispatch(addProjectNum({ projectId: projectId, num: -1 }));
    } else {
      dispatch(addInboxNum(-1));
    }

    if (dueDate !== null && dueDate !== "") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDueDate = new Date(dueDate);
      if (taskDueDate.getTime() <= today.getTime()) {
        dispatch(addTodayNum(-1));
      }
    }
  };

export const updateTaskAction =
  (newTask, oldDue, oldProjectId) => (dispatch, getState) => {
    dispatch(updateTask(newTask));

    //update counters
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDueDate = new Date(newTask.dueDate);
    const oldDueDate = new Date(oldDue);

    if (oldDue !== newTask.dueDate) {
      if (oldDue == null || oldDue == "") {
        if (newTask.dueDate !== null && newTask.dueDate !== "") {
          if (taskDueDate.getTime() <= today.getTime()) {
            dispatch(addTodayNum(1));
          }
        }
      } else {
        if (newTask.dueDate == null || newTask.dueDate == "") {
          if (oldDueDate.getTime() <= today.getTime()) {
            dispatch(addTodayNum(-1));
          }
        } else {
          if (
            oldDueDate.getTime() <= today.getTime() &&
            taskDueDate.getTime() > today.getTime()
          ) {
            dispatch(addTodayNum(-1));
          } else if (
            oldDueDate.getTime() > today.getTime() &&
            taskDueDate.getTime() <= today.getTime()
          ) {
            dispatch(addTodayNum(1));
          }
        }
      }
    }

    if (oldProjectId === "" || oldProjectId === null) {
      if (newTask.projectId !== "" && newTask.projectId !== null) {
        dispatch(addProjectNum({ projectId: newTask.projectId, num: 1 }));
        dispatch(addInboxNum(-1));
      }
    } else {
      if (newTask.projectId === "" || newTask.projectId === null) {
        dispatch(addProjectNum({ projectId: oldProjectId, num: -1 }));
        dispatch(addInboxNum(1));
      } else {
        dispatch(addProjectNum({ projectId: oldProjectId, num: -1 }));
        dispatch(addProjectNum({ projectId: newTask.projectId, num: 1 }));
      }
    }
  };

export const completeTaskAction = (_id) => (dispatch, getState) => {
  const task = getState().tasks[_id];

  dispatch(addCompletedTask(task));
  dispatch(deleteTask(_id));

  //update counters
  const dueDate = task.dueDate;
  const projectId = task.projectId;
  if (projectId !== "" && projectId !== null) {
    dispatch(addProjectNum({ projectId: projectId, num: -1 }));
  } else {
    dispatch(addInboxNum(-1));
  }

  if (dueDate !== null && dueDate !== "") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDueDate = new Date(dueDate);
    if (taskDueDate.getTime() <= today.getTime()) {
      dispatch(addTodayNum(-1));
    }
  }
};
