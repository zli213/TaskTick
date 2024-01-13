"use client";
import { useState } from "react";
import TaskEditor from "./taskEditor/TaskEditor";

function AddTask() {
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
          //   onRef={taskEditorRef}
          formType="add"
          cancelCallBack={() => {
            showAddBtn();
            hideTaskEditor();
          }}
          submitCallBack={() => {}}
        />
      ) : null}
    </>
  );
}

export default AddTask;
