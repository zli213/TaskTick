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
import TaskHeaderLeft from "../../pages/AppPages/Task/TaskHeaderLeft";
import TaskEditor from "./taskEditor/TaskEditor";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../../store/tasks";
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
  showProject,
  allTags,
  task,
}) {
  const dispatch = useDispatch();
  let allProjects = Object.values(useSelector((state) => state.projects));
  allProjects = allProjects
    .filter((project) => project.archived !== true)
    .filter((project) => project.isDeleted !== true);

  const dateJson = dueDate ? formatDate(dueDate) : "";
  const hasDue = dueDate == null ? false : true;

  const {
    showItemMenu,
    buttonPosition: menuPosition,
    swithMenuHandler,
  } = useMenu();
  const { showDeleteCard, showDeleteCardHandler } = useDelete();
  const [selectedPriority, setPriority] = useState(priority);
  const [isEditing, setIsEditing] = useState(false);

  const changeSelectedDate = async (date) => {
    // setSelectedDate(date.dateStr);

    const newTask = {
      ...task,
      selectedDate: date.dateStr,
      priority: task.priority.charAt(task.priority.length - 1),
    };

    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      dispatch(updateTaskAction(result.body, task.dueDate, task.projectId));
    } catch (error) {
      throw error;
    }
  };

  // Show/Hide Scheduler
  const {
    showItemMenu: showSchedulerMenu,
    buttonPosition: schedulerPosition,
    swithMenuHandler: swichSchedulerHandler,
  } = useMenu();

  const {
    showItemMenu: showSchedulerMenu2,
    buttonPosition: schedulerPosition2,
    swithMenuHandler: swichSchedulerHandler2,
  } = useMenu();

  // Show/Hide ProjectSelector
  const {
    showItemMenu: showProjectMenu,
    buttonPosition: projectPosition,
    swithMenuHandler: swichProjectHandler,
  } = useMenu();

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
      dispatch(deleteTaskAction(_id, dueDate, projectId));
    } catch (error) {
      throw error;
    }
  };

  const menuDeleteHandler = (event) => {
    swithMenuHandler(event);
    showDeleteCardHandler();
  };

  //Update task
  const projSelectHandler = async (projId, projName, board) => {
    const newTask = {
      ...task,
      projectId: projId,
      projectName: projName,
      board: board,
      selectedDate: dateJson == "" ? null : dateJson.dateStr,
      priority: task.priority.charAt(task.priority.length - 1),
    };

    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      dispatch(updateTaskAction(result.body, task.dueDate, task.projectId));
    } catch (error) {
      throw error;
    }
    swichProjectHandler();
  };

  const changeSelectedPriority = async (priority) => {
    setPriority(priority);

    const newTask = {
      ...task,
      selectedDate: dateJson == "" ? null : dateJson.dateStr,
      priority: priority.charAt(priority.length - 1),
    };

    try {
      const res = await fetch("/api/updateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      dispatch(updateTaskAction(result.body, task.dueDate, task.projectId));
    } catch (error) {
      throw error;
    }
  };

  return (
    <li className={styles.taskListItem}>
      {isEditing ? (
        <TaskEditor
          formType={"edit"}
          taskData={{
            _id: _id,
            selectedDate: dateJson.dateStr,
            priority: parseInt(selectedPriority[1]),
            taskName: title,
            taskContent: description,
            tags: tags,
            projectId: projectId,
            projectName: projectName,
            board: board,
          }}
          tagList={allTags} // alltags
          allProjects={allProjects}
          cancelCallBack={() => {
            setIsEditing(false);
          }}
          submitCallBack={(newTaskData) => {
            updateTaskHandler(newTaskData);
          }}
        />
      ) : (
        <div className={styles.task_container}>
          {/* content */}
          <div className={styles.content_container} id="content_holder">
            <div className={styles.drag_tool} id="action_menu_btn">
              <div>
                <span className={styles.check}>
                  <Icon type="drag" id="icon"/>
                </span>
              </div>
            </div>
            <CheckBoxButton
              priority={selectedPriority}
              taskId={_id}
              dueDate={dueDate}
              projectId={projectId}
              completed={completed}
              className={styles.tag_box3}
            />
            <div className={`${styles.task_content}`}>
              <Link
                href={`/application/task/${_id}`}
                scroll={false}
                className={styles.tag_box2}
              >
                <div className={styles.task_title}>{title}</div>
                <div className={styles.task_description} id="task_discription">{description}</div>
              </Link>
              <div className={styles.task_info_container}>
                <div className={styles.task_info}>
                  {hasDue && (
                    <span className={styles.btn_menu}>
                      <button
                        className={styles.task_info_date}
                        onClick={swichSchedulerHandler}
                      >
                        <Icon type="calender_small" id="icon"/>
                        {dateJson.dateStr}
                      </button>
                      {showSchedulerMenu && (
                        <PopupMenu
                          onOverlayClick={swichSchedulerHandler}
                          position={schedulerPosition}
                          levels={10.4}
                          menuWidth="230"
                        >
                          <Scheduler
                            data={{ selectedDate: dateJson.dateStr }}
                            onChangeDate={(dateJson) => {
                              changeSelectedDate(dateJson);
                              swichSchedulerHandler();
                            }}
                            onOverlayClick={swichSchedulerHandler}
                          />
                        </PopupMenu>
                      )}
                    </span>
                  )}
                  {tags.map((tag) => (
                    <Link href={`/application/label/${tag}`} key={tag}>
                      <Icon type="small_tag" id="icon"/>
                      <span className={styles.tag_box} id="tag">{tag}</span>
                    </Link>
                  ))}
                  {showProject && (
                    <div className={styles.tag_box4}>
                      <TaskHeaderLeft
                        taskId={_id}
                        projectId={projectId}
                        projectName={projectName}
                        board={board}
                        reverse={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* right buttons */}
          <div
            className={styles.task_list_action}
            style={{ opacity: (showItemMenu || showSchedulerMenu2) && 1 }}
          >
            <div className={styles.two_btn}>
              <button
                className={`${styles.two_btn} ${styles.action_btn}`}
                onClick={() => {
                  setIsEditing(true);
                }}
                id="action_menu_btn"
              >
                <Icon type="edit" id="icon"/>
              </button>
              <span className={styles.btn_menu} >
                <button
                  onClick={swichSchedulerHandler2}
                  className={`${styles.two_btn} ${styles.action_btn}`}
                  id="action_menu_btn"
                >
                  <Icon type="calender_big" id="icon"/>
                </button>
                {showSchedulerMenu2 && (
                  <PopupMenu
                    onOverlayClick={swichSchedulerHandler2}
                    position={schedulerPosition2}
                    levels={10.4}
                    menuWidth="230"
                  >
                    <Scheduler
                      data={{ selectedDate: dateJson.dateStr }}
                      onChangeDate={(dateJson) => {
                        changeSelectedDate(dateJson);
                        swichSchedulerHandler2();
                      }}
                      onOverlayClick={swichSchedulerHandler}
                    />
                  </PopupMenu>
                )}
              </span>
            </div>
            <div className={styles.task_list_action_last}>
              <button
                onClick={swithMenuHandler}
                className={`${styles.menu_button} ${showItemMenu && styles.showing}`}
                id="action_menu_btn"
              >
                <Icon type="menu_unfill" id="icon"/>
              </button>
              {showItemMenu && (
                <PopupMenu
                  onOverlayClick={swithMenuHandler}
                  position={menuPosition}
                  levels={projectId ? 6.5 : 5.5}
                >
                  <div className={styles.task_item_action_menu}>
                    <button
                      onClick={() => {
                        swithMenuHandler();
                        setIsEditing(true);
                      }}
                      id="option_link"
                    >
                      <Icon type="edit" id="icon"/>
                      <span>Edit</span>
                    </button>
                    {projectName && (
                      <Link href={`/application/project/${projectId}`} id="option_link">
                        <Icon type="list" id="icon"/>
                        <span>Go to Project</span>
                      </Link>
                    )}
                    <hr />
                    <div>
                      <div className={styles.menu_title}>Priority</div>
                      <div className={styles.priority_button_list}>
                        <button
                          className={
                            selectedPriority === "P1"
                              ? styles.button_selected
                              : ""
                          }
                          id="option_link"
                          onClick={() => {
                            changeSelectedPriority("P1");
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
                            selectedPriority === "P2"
                              ? styles.button_selected
                              : ""
                          }
                          id="option_link"
                          onClick={() => {
                            changeSelectedPriority("P2");
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
                            selectedPriority === "P3"
                              ? styles.button_selected
                              : ""
                          }
                          id="option_link"
                          onClick={() => {
                            changeSelectedPriority("P3");
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
                            selectedPriority === "P4"
                              ? styles.button_selected
                              : ""
                          }
                          id="option_link"
                          onClick={() => {
                            changeSelectedPriority("P4");
                            swithMenuHandler();
                          }}
                        >
                          <Icon
                            type="flag_big"
                            className={styles.button_gray}
                            id="icon"
                          />
                        </button>
                      </div>
                    </div>
                    <hr />
                    <button className={styles.btn_menu} id="option_link">
                      <div
                        className={styles.flex_start}
                        onClick={swichProjectHandler}
                      >
                        <Icon type="move_list" id="icon" />
                        <span>Move to...</span>
                      </div>
                      {showProjectMenu && !task.completed && (
                        <PopupMenu
                          onOverlayClick={swichProjectHandler}
                          position={projectPosition}
                          levels={
                            boardNum(allProjects) <= 9
                              ? boardNum(allProjects) * 0.87
                              : 8.22
                          }
                          menuWidth="250"
                        >
                          <ProjectSelector
                            allProjects={allProjects}
                            onProjSelect={projSelectHandler}
                            onOverlayClick={swichProjectHandler}
                          />
                        </PopupMenu>
                      )}
                    </button>
                    <hr />
                    <button
                      className={styles.button_delete}
                      onClick={menuDeleteHandler}
                      id="option_link"
                    >
                      <Icon type="delete" />
                      <span>Delete</span>
                    </button>
                  </div>
                </PopupMenu>
              )}
            </div>
          </div>
        </div>
      )}
      {showDeleteCard && (
        <DeleteConfirmCard
          closeHandler={showDeleteCardHandler}
          actionFunction={deleteTaskHandler}
          name={title}
          type="Delete"
        />
      )}
    </li>
  );
}

const boardNum = (allProjects) => {
  if (allProjects.length === 0) return 1;

  let num = 0;
  allProjects.forEach((proj) => {
    num += proj.boards.length + 1;
  });
  return num + 2;
};
