import React, { useState } from "react";
import styles from "../../../styles/scss/application.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import PopupMenu, {useMenu} from "./PopupMenu";

function MyProjectItem({ project }) {
  const {showItemMenu, buttonPosition, swithMenuHandler} = useMenu();

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
        <PopupMenu onOverlayClick={swithMenuHandler} position={buttonPosition} levels='2'>
          <div className={`${styles.task_item_action_menu}`}>
            <button>
              <Icon type="edit" />
              <span>Edit</span>
            </button>
            <hr />
            <button>
              <Icon type="delete" />
              <span>Delete</span>
            </button>
          </div>
        </PopupMenu>
      )}
    </li>
  );
}

export default MyProjectItem;
