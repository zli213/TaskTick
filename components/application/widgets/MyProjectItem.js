import React, { useState } from "react";
import styles from "../../../styles/scss/application.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import PopupMenu from "./PopupMenu";

function MyProjectItem({ project }) {
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const swithMenuHandler = (event) => {
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
    <li key={project.projectId}>
      <Link href={`/application/project/${project.projectId}`}>
        <Icon type="hashtag" />
        {project.name}
      </Link>
      <span
        className={styles.project_item_menu}
        onClick={swithMenuHandler}
      >
        <Icon type="menu_unfill" />
      </span>
      {showItemMenu && (
        <PopupMenu onOverlayClick={swithMenuHandler} position={buttonPosition}>
          <div className={`${styles.task_item_action_menu}`}>
            <button>
              <Icon type="edit" />
              <span>Edit label</span>
            </button>
            <hr />
            <button>
              <Icon type="delete" />
              <span>Delete label</span>
            </button>
          </div>
        </PopupMenu>
      )}
    </li>
  );
}

export default MyProjectItem;
