import { createSlice, unwrapResult } from "@reduxjs/toolkit";

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

    // ----- tasks -----
    addTaskAction: (state, action) => {
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

      //update projects
      if (task.projectId !== "" && task.projectId !== null) {
        state.projects = state.projects.map((project) => {
          if (project.projectId === task.projectId) {
            return { ...project, num: project.num + 1 };
          }
          return project;
        });
      }
    },
    deleteTaskAction: (state, action) => {
      state.tasks = state.tasks.filter((task) => {
        return task._id !== action.payload._id;
      });

      //update counters
      if (
        action.payload.projectId !== "" &&
        action.payload.projectId !== null
      ) {
        const num = state.projects.filter(
          (project) => project.projectId === action.payload.projectId
        )[0].num;
        state.projects = state.projects.map((project) => {
          if (project.projectId === action.payload.projectId) {
            return { ...project, num: num - 1 };
          }
          return project;
        });
      }

      if (
        action.payload.projectId === "" ||
        action.payload.projectId === null
      ) {
        state.inboxNum = state.inboxNum - 1;
      }

      if (action.payload.dueDate !== null && action.payload.dueDate !== "") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDueDate = new Date(action.payload.dueDate);
        if (taskDueDate.getTime() <= today.getTime()) {
          state.todayNum = state.todayNum - 1;
        }
      }
    },
    updateTaskAction: (state, action) => {
      const oldDue = action.payload.oldDue;
      const oldProjectId = action.payload.oldProjectId;
      const newTask = action.payload.task;

      state.tasks = state.tasks.map((task) => {
        if (task._id === newTask._id) {
          return { ...task, ...newTask };
        }
        return task;
      });

      //  update counters
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDueDate = new Date(newTask.dueDate);
      const oldDueDate = new Date(oldDue);

      if (oldDue !== newTask.dueDate) {
        if (oldDue == null || oldDue == "") {
          if (newTask.dueDate !== null && newTask.dueDate !== "") {
            if (taskDueDate.getTime() <= today.getTime()) {
              state.todayNum = state.todayNum + 1;
            }
          }
        } else {
          if (newTask.dueDate == null || newTask.dueDate == "") {
            if (oldDueDate.getTime() <= today.getTime()) {
              state.todayNum = state.todayNum - 1;
            }
          } else {
            if (
              oldDueDate.getTime() <= today.getTime() &&
              taskDueDate.getTime() > today.getTime()
            ) {
              state.todayNum = state.todayNum - 1;
            } else if (
              oldDueDate.getTime() > today.getTime() &&
              taskDueDate.getTime() <= today.getTime()
            ) {
              state.todayNum = state.todayNum + 1;
            }
          }
        }
      }

      if (oldProjectId !== newTask.projectId) {
        if (oldProjectId === "" || oldProjectId === null) {
          state.projects = state.projects.map((project) => {
            if (project.projectId === newTask.projectId) {
              return { ...project, num: project.num + 1 };
            }
            return project;
          });
          state.inboxNum = state.inboxNum - 1;
        } else {
          if (newTask.projectId === "" || newTask.projectId === null) {
            state.projects = state.projects.map((project) => {
              if (project.projectId === oldProjectId) {
                return { ...project, num: project.num - 1 };
              }
              return project;
            });
            state.inboxNum = state.inboxNum + 1;
          } else {
            state.projects = state.projects.map((project) => {
              if (project.projectId === oldProjectId) {
                return { ...project, num: project.num - 1 };
              }
              if (project.projectId === newTask.projectId) {
                return { ...project, num: project.num + 1 };
              }
              return project;
            });
          }
        }
      }
    },
    completeTaskAction: (state, action) => {
      const dueDate = action.payload.dueDate;
      const projectId = action.payload.projectId;

      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.taskId) {
          return { ...task, completed: true };
        }
        return task;
      });

      //update counters
      if (projectId !== "" && projectId !== null) {
        state.projects = state.projects.map((project) => {
          if (project.projectId === projectId) {
            return { ...project, num: project.num - 1 };
          }
          return project;
        });
      } else {
        state.inboxNum = state.inboxNum - 1;
      }

      if (dueDate !== null && dueDate !== "") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDueDate = new Date(dueDate);
        if (taskDueDate.getTime() <= today.getTime()) {
          state.todayNum = state.todayNum - 1;
        }
      }
    },

    // ----- projects -----
    addProjectAction: (state, action) => {
      state.projects = [...state.projects, { ...action.payload, num: 0 }];
    },
    deleteProjectAction: (state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.projectId === action.payload) {
          return { ...project, state: "deleted" };
        }
        return project;
      });

      //update tasks
      state.tasks = state.tasks.filter(
        (task) => task.projectId !== action.payload
      );

      const todayTasks = state.tasks
        .filter((task) => task.dueDate !== null && task.dueDate !== "")
        .filter((task) => {
          return task.archived !== true;
        })
        .filter((task) => {
          return task.completed !== true;
        })
        .filter((task) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const taskDueDate = new Date(task.dueDate);
          return taskDueDate.getTime() <= today.getTime();
        });
      state.todayNum = todayTasks.length;
    },
    updateProjectAction: (state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.projectId === action.payload.id) {
          return { ...project, name: action.payload.newName };
        }
        return project;
      });

      //update tasks
      state.tasks = state.tasks.map((task) => {
        if (task.projectId === action.payload.id) {
          return {
            ...task,
            projectName: action.payload.newName,
          };
        } else {
          return task;
        }
      });
    },
    archiveProjectAction: (state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.projectId === action.payload) {
          return { ...project, archived: true };
        }
        return project;
      });

      //update tasks
      state.tasks = state.tasks.map((task) => {
        if (task.projectId === action.payload) {
          return {
            ...task,
            archived: true,
          };
        } else {
          return task;
        }
      });

      const todayTasks = state.tasks
        .filter((task) => task.dueDate !== null && task.dueDate !== "")
        .filter((task) => {
          return task.archived !== true;
        })
        .filter((task) => {
          return task.completed !== true;
        })
        .filter((task) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const taskDueDate = new Date(task.dueDate);
          return taskDueDate.getTime() <= today.getTime();
        });
      state.todayNum = todayTasks.length;
    },
    unarchiveProjectAction: (state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.projectId === action.payload) {
          return { ...project, archived: false };
        }
        return project;
      });

      //update tasks
      state.tasks = state.tasks.map((task) => {
        if (task.projectId === action.payload) {
          return {
            ...task,
            archived: false,
          };
        } else {
          return task;
        }
      });

      const todayTasks = state.tasks
        .filter((task) => task.dueDate !== null && task.dueDate !== "")
        .filter((task) => {
          return task.archived !== true;
        })
        .filter((task) => {
          return task.completed !== true;
        })
        .filter((task) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const taskDueDate = new Date(task.dueDate);
          return taskDueDate.getTime() <= today.getTime();
        });
      state.todayNum = todayTasks.length;
    },

    // ----- boards -----
    addBoardAction: (state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          if (
            action.payload.fromBoard == null ||
            action.payload.fromBoard == ""
          ) {
            return {
              ...project,
              boards: [action.payload.board, ...project.boards],
            };
          } else {
            const preIndex = project.boards.indexOf(action.payload.fromBoard);
            return {
              ...project,
              boards: [
                ...project.boards.slice(0, preIndex + 1),
                action.payload.board,
                ...project.boards.slice(preIndex + 1),
              ],
            };
          }
        }
        return project;
      });
    },
    deleteBoardAction: (state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.projectId === action.payload.projectId) {
          return {
            ...project,
            boards: project.boards.filter(
              (board) => board !== action.payload.board
            ),
            num:
              project.num -
              state.tasks.filter(
                (task) =>
                  task.projectId === action.payload.projectId &&
                  task.board === action.payload.board &&
                  task.archived !== true &&
                  task.completed !== true
              ).length,
          };
        }
        return project;
      });

      //update tasks
      state.tasks = state.tasks.filter((task) => {
        if (task.projectId !== action.payload.projectId) {
          return true;
        } else {
          if (task.board !== action.payload.board) {
            return true;
          }
        }
      });

      const todayTasks = state.tasks
        .filter((task) => task.dueDate !== null && task.dueDate !== "")
        .filter((task) => {
          return task.archived !== true;
        })
        .filter((task) => {
          return task.completed !== true;
        })
        .filter((task) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const taskDueDate = new Date(task.dueDate);
          return taskDueDate.getTime() <= today.getTime();
        });
      state.todayNum = todayTasks.length;
    },

    // ----- tags -----
    addTagAction: (state, action) => {
      state.tags = [...state.tags, action.payload];
    },
    editOneTagAction: (state, action) => {
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
            tags: [
              ...task.tags.slice(0, index),
              newTag,
              ...task.tags.slice(index + 1),
            ],
          };
        } else {
          return task;
        }
      });
    },
    deleteOneTagAction: (state, action) => {
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

  addTaskAction,
  deleteTaskAction,
  updateTaskAction,
  completeTaskAction,

  addProjectAction,
  deleteProjectAction,
  updateProjectAction,
  archiveProjectAction,
  unarchiveProjectAction,
  addBoardAction,
  deleteBoardAction,

  addTagAction,
  editOneTagAction,
  deleteOneTagAction,
} = tasksSlice.actions;

export default tasksSlice.reducer;
