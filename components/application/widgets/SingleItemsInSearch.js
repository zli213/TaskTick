/**
 * Compoent for single Item in the TodolistInSearch
 *
 * @param
 * All the attribute of one task
 */

"use client";

import Link from "next/link";
import styles from "../../../styles/scss/singleItemInSearch.module.scss";
import Scheduler, { formatDate } from "./Scheduler";
import { useState } from "react";
import PopupMenu, { useMenu } from "./PopupMenu";
import Icon from "./Icon";
import CheckBoxButton from "./CheckBoxButton";
import TaskHeaderLeft from "../../pages/AppPages/Task/TaskHeaderLeft";
import TaskEditor from "./taskEditor/TaskEditor";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";
import { useDispatch } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../../store/tasks";

export function SingleItemsInSearch({
  title,
  _id,
  dueDate,
  description,
  projectName,
  projectId,
  board,
  tags,
  priority,
  completed,
  showProject,
  allTags,
  allProjects,
}) {
  const dispatch = useDispatch();
  const dateJson = dueDate ? formatDate(dueDate) : "";
  const hasDue = dueDate == null ? false : true;

  const {
    showItemMenu,
    buttonPosition: menuPosition,
    swithMenuHandler,
  } = useMenu();
  const { showDeleteCard, showDeleteCardHandler } = useDelete();

  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [isShowScheduler, setIsShowScheduler] = useState(false);
  const [selectedPriority, setPriority] = useState(priority);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);

  /** for change the display values when save */
  const [dispTitle, setDispTitle] = useState(title);
  const [dispDescription, setDispDescription] = useState(description);
  const [dispTags, setDispTags] = useState(tags);
  const [dispProjectId, setDispProjectId] = useState(projectId);
  const [dispProjectName, setDispProjectName] = useState(projectName);
  const [dispBoard, setDispBoard] = useState(board);
  const formatDescription = (description) => {
    const words = description.split(/\s+/);
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return description;
  };

  const changeSelectedDate = (date) => {
    setSelectedDate(date.dateStr);
  };

  // Show/Hide Scheduler
  const showScheduler = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({
      width: buttonRect.width,
      height: buttonRect.height,
      top: buttonRect.bottom,
      left: buttonRect.left,
      bottom: buttonRect.top,
      right: buttonRect.right,
    });
    setIsShowScheduler(true);
  };

  const hideScheduler = () => {
    setIsShowScheduler(false);
  };

  // const priorityChangeHandler = (option) => {
  //   setPriority(option);
  // };

  const updateTaskHandler = async (task) => {
    if (completed) return;
    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const result = await res.json();
      dispatch(updateTaskAction(result.body, dueDate, projectId));

      setIsEditing(false);
      setDispTitle(result.body.title);
      setDispDescription(result.body.description);
      setPriority(result.body.priority);
      setDispTags(result.body.tags);
      setSelectedDate(
        formatDate(
          result.body.dueDate == null ? "" : new Date(result.body.dueDate)
        ).dateStr
      );
      setDispProjectId(result.body.projectId);
      setDispProjectName(result.body.projectName);
      setDispBoard(result.body.board);
    } catch (error) {
      throw error;
    }
  };

  const deleteTaskHandler = async () => {
    if (completed) return;
    try {
      const res = await fetch("/api/deleteTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });

      const result = await res.json();
      // console.log(result);
      dispatch(deleteTaskAction(_id, dueDate, projectId));
    } catch (error) {
      throw error;
    }
  };

  const menuDeleteHandler = (event) => {
    swithMenuHandler(event);
    showDeleteCardHandler();
  };

  return (
    <li className={styles.taskListItem}>
      {isEditing ? (
        <TaskEditor
          formType={"edit"}
          taskData={{
            _id: _id,
            selectedDate: selectedDate,
            priority: parseInt(selectedPriority[1]),
            taskName: dispTitle,
            taskContent: dispDescription,
            tags: dispTags,
            projectId: dispProjectId,
            projectName: dispProjectName,
            board: dispBoard,
          }}
          tagList={allTags} // alltags
          allProjects={allProjects}
          cancelCallBack={() => {
            setIsEditing(false);
          }}
          submitCallBack={(newTaskData) => {
            // console.log(newTaskData);
            updateTaskHandler(newTaskData);
          }}
        />
      ) : (
        <div className={styles.task_container}>
          {/* content */}
          <div className={styles.content_container}>
            <CheckBoxButton
              priority={selectedPriority}
              taskId={_id}
              dueDate={dueDate}
              projectId={projectId}
              completed={completed}
              styles={styles}
            />
            <div className={styles.task_content}>
              <Link href={`/application/task/${_id}`} scroll={false}>
                <div className={styles.task_title}>{dispTitle}</div>
                <div className={styles.task_description}>
                  {formatDescription(dispDescription)}
                </div>
              </Link>
              <div className={styles.task_info_container}>
                <div className={styles.task_info}>
                  {hasDue && (
                    <button
                      className={styles.task_info_date}
                      onClick={showScheduler}
                    >
                      <Icon type="calender_small" />
                      {selectedDate}
                    </button>
                  )}
                  {dispTags.map((tag) => (
                    <Link href={`/application/label/${tag}`} key={tag}>
                      <Icon type="small_tag" />
                      {tag}
                    </Link>
                  ))}
                </div>
                {showProject && (
                  <TaskHeaderLeft
                    projectId={projectId}
                    projectName={projectName}
                    board={board}
                    reverse={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
