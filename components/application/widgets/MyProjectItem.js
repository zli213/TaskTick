import React, { useState } from "react";
import styles from "../../../styles/scss/application.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import NewProject, { useProject } from "./NewProject";

function MyProjectItem({ project }) {
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  const [showedName, setShowedName] = useState(project.name);

  const menuEditHandler = () => {
    swithMenuHandler(event);
    showProjectCardHandler();
  };

  return (
    <li key={project.projectId}>
      <Link href={`/application/project/${project.projectId}`}>
        <Icon type="hashtag" />
        {showedName}
      </Link>
      <span className={styles.project_item_menu} onClick={swithMenuHandler}>
        <Icon type="menu_unfill" />
      </span>
      {showItemMenu && (
        <PopupMenu
          onOverlayClick={swithMenuHandler}
          position={buttonPosition}
          levels="2"
        >
          <div className={`${styles.task_item_action_menu}`}>
            <button onClick={menuEditHandler}>
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
      {showAddProjectCard && (
        <NewProject
          name={project.name}
          projectId={project.projectId}
          closeHandler={showProjectCardHandler}
          showNameHandler={setShowedName}
        />
      )}
    </li>
  );
}

export default MyProjectItem;
