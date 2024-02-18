import { createSlice } from "@reduxjs/toolkit";
import { updateTodayNumAction } from "./num";
import {
  deleteProjectTasks,
  updateTaskProjectName,
  archiveTaskofProject,
  unarchiveTaskofProject,
  deleteBoardTasks,
  updateTaskBoard,
} from "./tasks";

const initialState = {};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    initialProjects: (state, action) => {
      state = action.payload.map((item) => {
        return (state[item.projectId] = item);
      });
    },
    updateProjectNum: (state, action) => {
      state[action.payload.projectId].num = action.payload.num;
    },
    addProjectNum: (state, action) => {
      state[action.payload.projectId].num += action.payload.num;
    },
    addProject: (state, action) => {
      return {
        ...state,
        [action.payload.projectId]: { ...action.payload, num: 0 },
      };
    },
    deleteProject: (state, action) => {
      state[action.payload] = {
        ...state[action.payload],
        isDeleted: true,
      };
    },
    editProject: (state, action) => {
      state[action.payload.projectId].name = action.payload.newName;
    },
    archiveProject: (state, action) => {
      state[action.payload] = {
        ...state[action.payload],
        archived: true,
      };
    },
    unarchiveProject: (state, action) => {
      state[action.payload] = {
        ...state[action.payload],
        archived: false,
      };
    },

    addBoard: (state, action) => {
      let newBoards = state[action.payload.projectId].boards;
      const preIndex = newBoards.indexOf(action.payload.fromBoard);

      if (action.payload.fromBoard === "") {
        newBoards = [action.payload.board, ...newBoards];
      } else {
        newBoards = [
          ...newBoards.slice(0, preIndex + 1),
          action.payload.board,
          ...newBoards.slice(preIndex + 1),
        ];
      }
      state[action.payload.projectId].boards = newBoards;
    },
    deleteBoard: (state, action) => {
      let newBoards = state[action.payload.projectId].boards;
      state[action.payload.projectId].boards = newBoards.filter(
        (board) => board !== action.payload.board
      );
    },
    editBoard: (state, action) => {
      let newBoards = state[action.payload.projectId].boards;
      const preIndex = newBoards.indexOf(action.payload.oldBoard);
      newBoards[preIndex] = action.payload.board;
      state[action.payload.projectId].boards = newBoards;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialProjects,
  updateProjectNum,
  addProjectNum,
  addProject,
  deleteProject,
  editProject,
  archiveProject,
  unarchiveProject,

  addBoard,
  deleteBoard,
  editBoard,
} = projectSlice.actions;

export default projectSlice.reducer;

export const updateProjectNumAction = (projectId) => (dispatch, getState) => {
  let tasks = Object.values(getState().tasks);
  console.log("1", tasks);

  tasks = tasks
    .filter((task) => task.archived !== true && task.completed !== true)
    .filter((task) => task.projectId === projectId);
  dispatch(updateProjectNum({ projectId, num: tasks.length }));
};

export const deleteProjectAction = (projectId) => (dispatch, getState) => {
  dispatch(deleteProject(projectId));
  dispatch(deleteProjectTasks(projectId));
  dispatch(updateTodayNumAction());
};

export const updateProjectAction =
  (projectId, newName) => (dispatch, getState) => {
    dispatch(editProject({ projectId, newName }));
    dispatch(updateTaskProjectName({ projectId, newName }));
  };

export const archiveProjectAction = (projectId) => (dispatch, getState) => {
  dispatch(archiveProject(projectId));
  dispatch(archiveTaskofProject(projectId));
  dispatch(updateTodayNumAction());
};

export const unarchiveProjectAction = (projectId) => (dispatch, getState) => {
  dispatch(unarchiveProject(projectId));
  dispatch(unarchiveTaskofProject(projectId));
  dispatch(updateTodayNumAction());
};

export const deleteBoardAction = (projectId, board) => (dispatch, getState) => {
  dispatch(deleteBoard({ projectId, board }));
  dispatch(deleteBoardTasks({ projectId, board }));
  dispatch(updateTodayNumAction());
  dispatch(updateProjectNumAction(projectId));
};

export const editBoardAction =
  (projectId, board, oldBoard) => (dispatch, getState) => {
    dispatch(editBoard({ projectId, board, oldBoard }));
    dispatch(updateTaskBoard({ projectId, board, oldBoard }));
  };
