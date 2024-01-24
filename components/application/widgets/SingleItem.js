/**
 * Compoent for single Item in the Todolist
 *
 * @param
 * All the attribute of one task
 */

"use client";

import Link from "next/link";
import styles from "../../../styles/scss/singleItem.module.scss";
import Scheduler, { formatDate } from "./Scheduler";
import { useState } from "react";
import PopupMenu, { useMenu } from "./PopupMenu";
import Icon from "./Icon";
import CheckBoxButton from "./CheckBoxButton";
import TaskEditor from "./taskEditor/TaskEditor";
import ProjectSelector from "./taskEditor/ProjectSelector";

export function SingleItems({
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
  allTags,
  allProjects,
}) {
  const dateJson = dueDate ? formatDate(dueDate) : "";
  const hasDue = dueDate == null ? false : true;

  const {
    showItemMenu,
    buttonPosition: menuPosition,
    swithMenuHandler,
  } = useMenu();
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [isShowScheduler, setIsShowScheduler] = useState(false);
  const [selectedPriority, setPriority] = useState(priority);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [isShowProjectSel, setIsShowProjectSel] = useState(false);

  /** for change the display values when save */
  const [dispTitle, setDispTitle] = useState(title);
  const [dispDescription, setDispDescription] = useState(description);
  const [dispTags, setDispTags] = useState(tags);
  const [dispProjectId, setDispProjectId] = useState(projectId);
  const [dispProjectName, setDispProjectName] = useState(projectName);
  const [dispBoard, setDispBoard] = useState(board);

  const updateTaskInDatabase = async (newtask, callBack) => {
    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newtask),
      });

      const result = await res.json();
      callBack(result.body);
    } catch (error) {
      return null;
    }
  };

  const changeSelectedDate = (date) => {
    const newtask = { _id: _id, selectedDate: date.dateStr };
    updateTaskInDatabase(newtask, (result) => {
      setSelectedDate(
        formatDate(result.dueDate == null ? "" : new Date(result.dueDate))
          .dateStr
      );
    });
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

  const priorityChangeHandler = (pri) => {
    const newtask = { _id: _id, priority: pri };
    updateTaskInDatabase(newtask, (result) => {
      setPriority(result.priority);
    });
  };
  const moveTaskTo = (projId, projName, board) => {
    const newtask = {
      _id: _id,
      projectId: projId,
      projectName: projName,
      board: board,
    };
    updateTaskInDatabase(newtask, (result) => {
      setDispProjectId(result.projectId);
      setDispProjectName(result.projectName);
      setDispBoard(result.board);
      setIsShowProjectSel(false);
      swithMenuHandler();
    });
  };

  const updateTaskHandler = (task) => {
    updateTaskInDatabase(task, (result) => {
      setIsEditing(false);
      setDispTitle(result.title);
      setDispDescription(result.description);
      setPriority(result.priority);
      setDispTags(result.tags);
      setSelectedDate(
        formatDate(result.dueDate == null ? "" : new Date(result.dueDate))
          .dateStr
      );
      setDispProjectId(result.projectId);
      setDispProjectName(result.projectName);
      setDispBoard(result.board);
    });
  };

  const deleteTaskHandler = async (task) => {
    try {
      await fetch("/api/deleteTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      // const result = await res.json();
      // console.log(result);
    } catch (error) {}
    swithMenuHandler();
  };

  return (
    <li>
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
            <div className={styles.drag_tool}>
              <div>
                <span className={styles.check}>
                  <Icon type="drag" />
                </span>
              </div>
            </div>
            <CheckBoxButton priority={selectedPriority} />
            <div className={styles.task_content}>
              <Link href={`/application/task/${_id}`} scroll={false}>
                <div className={styles.task_title}>{dispTitle}</div>
                <div className={styles.task_description}>{dispDescription}</div>
              </Link>
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
                  <Link href={`/application/label/${tag}`}>
                    <Icon type="small_tag" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* right buttons */}
          <div className={styles.task_list_action}>
            <div>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <Icon type="edit" />
              </button>
              <button onClick={showScheduler}>
                <Icon type="calender_big" />
              </button>
            </div>
            <div className={styles.task_list_action_last}>
              <button onClick={swithMenuHandler}>
                <Icon type="menu_unfill" />
              </button>
            </div>
          </div>
          {isShowScheduler && (
            <Scheduler
              position={buttonPosition}
              data={{ selectedDate: selectedDate }}
              onChangeDate={(dateJson) => {
                changeSelectedDate(dateJson);
                hideScheduler();
              }}
              onOverlayClick={hideScheduler}
            />
          )}
          {showItemMenu && (
            <>
              <PopupMenu
                onOverlayClick={swithMenuHandler}
                position={menuPosition}
                levels={projectId ? 6 : 5}
              >
                <div className={styles.task_item_action_menu}>
                  <button
                    onClick={() => {
                      swithMenuHandler();
                      setIsEditing(true);
                    }}
                  >
                    <Icon type="edit" />
                    <span>Edit</span>
                  </button>
                  {projectName && (
                    <Link href={`/application/project/${dispProjectId}`}>
                      <Icon type="list" />
                      <span>Go to Project</span>
                    </Link>
                  )}
                  <hr />
                  <div>
                    <div className={styles.menu_title}>Due date</div>
                    <div className={styles.priority_button_list}>icons</div>
                  </div>
                  <div>
                    <div className={styles.menu_title}>Priority</div>
                    <div className={styles.priority_button_list}>
                      <button
                        className={
                          selectedPriority == "P1" ? styles.button_selected : ""
                        }
                        onClick={() => {
                          priorityChangeHandler(1);
                          swithMenuHandler();
                        }}
                      >
                        <Icon
                          type="flag_filled"
                          className={styles.button_red}
                        />
                      </button>
                      <button
                        className={
                          selectedPriority == "P2" ? styles.button_selected : ""
                        }
                        onClick={() => {
                          priorityChangeHandler(2);
                          swithMenuHandler();
                        }}
                      >
                        <Icon
                          type="flag_filled"
                          className={styles.button_yellow}
                        />
                      </button>
                      <button
                        className={
                          selectedPriority == "P3" ? styles.button_selected : ""
                        }
                        onClick={() => {
                          priorityChangeHandler(3);
                          swithMenuHandler();
                        }}
                      >
                        <Icon
                          type="flag_filled"
                          className={styles.button_blue}
                        />
                      </button>
                      <button
                        className={
                          selectedPriority == "P4" ? styles.button_selected : ""
                        }
                        onClick={() => {
                          priorityChangeHandler(4);
                          swithMenuHandler();
                        }}
                      >
                        <Icon type="flag_big" className={styles.button_gray} />
                      </button>
                    </div>
                  </div>
                  <hr />
                  <button
                    onClick={() => {
                      setIsShowProjectSel(true);
                    }}
                  >
                    <Icon type="move_list" />
                    <span>Move to...</span>
                  </button>
                  <hr />
                  <button
                    className={styles.button_delete}
                    onClick={() => {
                      deleteTaskHandler({ _id: _id });
                    }}
                  >
                    <Icon type="delete" />
                    <span>Delete</span>
                  </button>
                </div>
              </PopupMenu>
              {isShowProjectSel && (
                <ProjectSelector
                  allProjects={allProjects}
                  onProjSelect={moveTaskTo}
                ></ProjectSelector>
              )}
            </>
          )}
        </div>
      )}
    </li>
  );
}
