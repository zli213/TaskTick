"use client";
import { useState } from "react";
import TaskEditor from "./taskEditor/TaskEditor";
import { useSession } from "next-auth/react";

/**
 * @param
 * fromProject
 * fromBoard
 */
function AddTask(props) {
  const { data: session } = useSession();
  // Show/Hide add task btn
  const [isShowAddBtn, setIsShowAddBtn] = useState(true);
  const showAddBtn = () => {
    setIsShowAddBtn(true);
  };
  const hideAddBtn = () => {
    setIsShowAddBtn(false);
  };

  // Show/Hide task editor
  const [isShowTaskEditor, setIsShowTaskEditor] = useState(false);
  const showTaskEditor = () => {
    setIsShowTaskEditor(true);
  };
  const hideTaskEditor = () => {
    setIsShowTaskEditor(false);
  };

  const saveNewTask = async (newtask) => {
    console.log(session.user);
    const newTaskWithUser = {
      ...newtask,
      userId: session.user.userId,
      username: session.user.username,
    };
    delete newTaskWithUser._id;
    try {
      const res = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskWithUser),
      });
      console.log(res);
      showAddBtn();
      hideTaskEditor();
    } catch (err) {}
    // console.log(newTaskWithUser);
  };

  return (
    <>
      {isShowAddBtn ? (
        <button
          onClick={() => {
            showTaskEditor();
            hideAddBtn();
          }}
        >
          <span>
            <svg width="13" height="13">
              <path
                fill="red"
                d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
              ></path>
            </svg>
          </span>
          Add a task
        </button>
      ) : null}
      {isShowTaskEditor ? (
        <TaskEditor
          formType="add"
          tagList={props.allTags}
          allProjects={props.allProjects}
          fromProject={props.fromProject}
          fromBoard={props.fromBoard}
          fromTag={props.fromTag}
          cancelCallBack={() => {
            showAddBtn();
            hideTaskEditor();
          }}
          submitCallBack={(newtask) => {
            saveNewTask(newtask);
          }}
        />
      ) : null}
    </>
  );
}

export default AddTask;
