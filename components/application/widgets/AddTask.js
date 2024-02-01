"use client";
import { useState } from "react";
import TaskEditor from "./taskEditor/TaskEditor";
import { useSession } from "next-auth/react";
import {  useDispatch } from "react-redux";
import { addTaskAction } from "../../../store/tasks";
import styles from "../../../styles/scss/components/application/widgets/addTask.module.scss";
import Icon from "./Icon";

/**
 * @param
 * fromProject
 * fromBoard
 */
function AddTask(props) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  // Show/Hide add task btn
  const [isShowAddBtn, setIsShowAddBtn] = useState(props.openEditor ? false : true);
  const showAddBtn = () => {
    setIsShowAddBtn(true);
  };
  const hideAddBtn = () => {
    setIsShowAddBtn(false);
  };

  // Show/Hide task editor
  const [isShowTaskEditor, setIsShowTaskEditor] = useState(props.openEditor ? true : false);
  const showTaskEditor = () => {
    setIsShowTaskEditor(true);
  };
  const hideTaskEditor = () => {
    props.openEditor && props.closeCardHandler() ;
    setIsShowTaskEditor(false);
  };

  const saveNewTask = async (newtask) => {
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
      const data = await res.json();
      showAddBtn();
      hideTaskEditor();
      dispatch(addTaskAction(data.task));
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
          className={styles.add_task_btn}
        >
          <span className={styles.add_task_icon }>
            <Icon type="add" />
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
          fromDate={props.fromDate}
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
