"use client";

import Link from "next/link";
import styles from "../../../styles/scss/singleItem.module.scss";
import Scheduler from "./Scheduler";
import { formatDate } from "./Scheduler";
import { useState } from "react";
import PopupMenu from "./PopupMenu";
import Icon from "./Icon";

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
  const dateJson = formatDate(dueDate);

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [isShowScheduler, setIsShowScheduler] = useState(false);

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

  const swithMenuHandler = () => {
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({
      width: buttonRect.width,
      height: buttonRect.height,
      top: buttonRect.bottom,
      left: buttonRect.left,
      bottom: buttonRect.top,
      right: buttonRect.right,
    });
    setShowItemMenu((preState) => !preState);
  };

  return (
    <li>
      <div className={styles.task_container}>
        {/* content */}
        <div className={styles.content_container}>
          <div className={styles.drag_tool}>
            <div>
              <span>
                <Icon type="drag" />
              </span>
            </div>
          </div>
          <button>
            <Icon type="uncheck" />
          </button>
          <div className={styles.task_content}>
            <Link href={`/application/task/${_id}`} scroll={false}>
              <div className={styles.task_title}>{title}</div>
              <div className={styles.task_description}>{description}</div>
            </Link>
            <div className={styles.task_info}>
              <button className={styles.task_info_date} onClick={showScheduler}>
                <Icon type="calender_small" />
                {selectedDate}
              </button>
              {tags.map((tag) => (
                <span>
                  <Icon type="small_tag" />
                  {tag}
                </span>
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
            position={buttonPosition}
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
                <div className={styles.menu_title}>Due date</div>
                <div className={styles.priority_button_list}>icons</div>
              </div>
              <div>
                <div className={styles.menu_title}>Priority</div>
                <div className={styles.priority_button_list}>
                  <button>
                    <Icon type="flag_filled" className={styles.button_red} />
                  </button>
                  <button>
                    <Icon type="flag_filled" className={styles.button_yellow} />
                  </button>
                  <button>
                    <Icon type="flag_filled" className={styles.button_blue} />
                  </button>
                  <button>
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
                <span >Delete</span>
              </button>
            </div>
          </PopupMenu>
        )}
      </div>
    </li>
  );
}
