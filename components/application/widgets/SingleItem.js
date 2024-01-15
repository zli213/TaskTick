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
}) {
  const dateJson = dueDate ? formatDate(dueDate) : "";
  const hasDue = dueDate == null ? false : true;

  const { showItemMenu, buttonPosition: menuPosition, swithMenuHandler } = useMenu();
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [isShowScheduler, setIsShowScheduler] = useState(false);
  const [selectedPriority, setPriority] = useState(priority);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

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

  const priorityChangeHandler = (option) => {
    setPriority(option);
  };

  return (
    <li key={_id}>
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
          <CheckBoxButton priority={priority} />
          <div className={styles.task_content}>
            <Link href={`/application/task/${_id}`} scroll={false}>
              <div className={styles.task_title}>{title}</div>
              <div className={styles.task_description}>{description}</div>
            </Link>
            <div className={styles.task_info}>
              {hasDue && (<button className={styles.task_info_date} onClick={showScheduler}>
                <Icon type="calender_small" />
                {selectedDate}
              </button>)}
              {tags.map((tag) => (
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
            <button>
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
          <PopupMenu
            onOverlayClick={swithMenuHandler}
            position={menuPosition}
            levels={projectId ? 6 : 5}
          >
            <div className={styles.task_item_action_menu}>
              <button>
                <Icon type="edit" />
                <span>Edit</span>
              </button>
              {projectName && (
                <Link href={`/application/project/${projectId}`}>
                  <Icon type="list" />
                  <span>Go to Project</span>
                </Link>
              )}
              <hr />
            
              <div>
                <div className={styles.menu_title}>Priority</div>
                <div className={styles.priority_button_list}>
                  <button
                    className={
                      selectedPriority == "P1" ? styles.button_selected : ""
                    }
                  >
                    <Icon type="flag_filled" className={styles.button_red} />
                  </button>
                  <button
                    className={
                      selectedPriority == "P2" ? styles.button_selected : ""
                    }
                  >
                    <Icon type="flag_filled" className={styles.button_yellow} />
                  </button>
                  <button
                    className={
                      selectedPriority == "P3" ? styles.button_selected : ""
                    }
                  >
                    <Icon type="flag_filled" className={styles.button_blue} />
                  </button>
                  <button
                    className={
                      selectedPriority == "P4" ? styles.button_selected : ""
                    }
                  >
                    <Icon type="flag_big" className={styles.button_gray} />
                  </button>
                </div>
              </div>
              <hr />
              <button>
                <Icon type="move_list" />
                <span>Move to...</span>
              </button>
              <hr />
              <button className={styles.button_delete}>
                <Icon type="delete" />
                <span>Delete</span>
              </button>
            </div>
          </PopupMenu>
        )}
      </div>
    </li>
  );
}
