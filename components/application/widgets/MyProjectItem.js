import React, { useState } from "react";
import styles from "../../../styles/scss/application.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import NewProject, { useProject } from "./NewProject";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";
import { UnarchiveProject } from "../../../public/CommonFunctions";
import { useRouter } from "next/navigation";

function MyProjectItem({ project, type }) {
  const router = useRouter();

  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  const {
    ifArchive,
    showArchiveCardHandler,
    showDeleteCard,
    showDeleteCardHandler,
  } = useDelete();
  const [showedName, setShowedName] = useState(project.name);

  const menuEditHandler = () => {
    swithMenuHandler(event);
    showProjectCardHandler();
  };

  const menuDeleteHandler = () => {
    swithMenuHandler(event);
    showDeleteCardHandler();
  };

  const menuArchiveHandler = async () => {
    swithMenuHandler(event);
    if (type == "active") {
      showArchiveCardHandler();
    } else {
      await UnarchiveProject(project.projectId);
      router.refresh();
    }
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
            <button onClick={menuArchiveHandler}>
              <Icon type={type == "active" ? "archive" : "unarchive"} />
              <span>{type == "active" ? "Archive" : "Unarchive"}</span>
            </button>
            <button onClick={menuDeleteHandler}>
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
      {showDeleteCard && (
        <DeleteConfirmCard
          closeHandler={showDeleteCardHandler}
          projectId={project.projectId}
          name={project.name}
          type="project"
          ifArchive={ifArchive}
        />
      )}
    </li>
  );
}

export default MyProjectItem;
