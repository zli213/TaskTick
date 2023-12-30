"use client";

import Link from "next/link";
import styles from "../../../styles/scss/singleItem.module.scss";
import Scheduler from "./Scheduler";
import { convertDate, formatDate } from "./Scheduler";
import { useState } from "react";

import CheckButton from "../../../public/icon/uncheck_grey_button.svg";
import DragIcon from "../../../public/icon/drag.svg";
import SmallTagIcon from "../../../public/icon/small_tag.svg";
import SmallCalenderIcon from "../../../public/icon/small_calender.svg";
import EditIcon from "../../../public/icon/edit.svg";
import CalenderIcon from "../../../public/icon/big_calender.svg";
import MenuIcon from "../../../public/icon/three_point_unfill.svg";

export function SingleItems({
  title,
  _id,
  dueDate,
  description,
  projectName,
  board,
  tags,
  priority,
  completed,
}) {
  const dateJson = formatDate(dueDate);

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(dateJson.dateStr);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const changeSelectedDate = (date) => {
    setSelectedDate(date.dateStr);
  };

  // Show/Hide Scheduler
  const [isShowScheduler, setIsShowScheduler] = useState(false);

  const showScheduler = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({
      width: buttonRect.width,
      top: buttonRect.bottom,
      left: buttonRect.left,
      bottom: buttonRect.top,
      right: buttonRect.right
    });
    setIsShowScheduler(true);
  };

  const hideScheduler = () => {
    setIsShowScheduler(false);
  };

  return (
    <li>
      <div className={styles.task_container}>
        {/* content */}
        <div className={styles.content_container}>
          <div className={styles.drag_tool}>
            <div>
              <span>
                <DragIcon />
              </span>
            </div>
          </div>
          <button>
            <CheckButton />
          </button>
          <div className={styles.task_content}>
            <Link href={`/application/task/${_id}`} scroll={false}>
              <div className={styles.task_title}>{title}</div>
              <div className={styles.task_description}>{description}</div>
            </Link>
            <div className={styles.task_info}>
              <button className={styles.task_info_date} onClick={showScheduler}>
                <SmallCalenderIcon />
                {selectedDate}
              </button>
              {tags.map((tag) => (
                <span>
                  <SmallTagIcon />
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
              <EditIcon />
            </button>
            <button onClick={showScheduler}>
              <CalenderIcon />
            </button>
          </div>
          <div className={styles.task_list_action_last}>
            <button>
              <MenuIcon />
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
      </div>
    </li>
  );
}
