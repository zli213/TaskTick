import React, { useState } from "react";
import styles from "../../../styles/scss/application.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import NewProject, { useProject } from "./NewProject";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";
import {
  ArchiveProject,
  DeleteProject,
  UnarchiveProject,
} from "../../../public/CommonFunctions";
import { useRouter } from "next/navigation";

//Custom React hook -> useProjectMenu, use for Delete and archive project
export const useProjectMenu = () => {
  const [contents, setContents] = useState({
    content1: 'This will permanently delete "',
    content2: "\" and all of its tasks. This can't be undone.",
  });
  const [actionType, setActionType] = useState("Delete");

  const setDeleteHandler = () => {
    setContents({
      content1: 'This will permanently delete "',
      content2: "\" and all of its tasks. This can't be undone.",
    });
    setActionType("Delete");
  };

  const setArchiveHandler = () => {
    setContents({
      content1: "Are you sure you want to archive ",
      content2: "?",
    });
    setActionType("Archive");
  };

  return {
    contents,
    actionType,
    setDeleteHandler,
    setArchiveHandler,
  };
};

//MyProject Item
function MyProjectItem({ project, type }) {
  const router = useRouter();

  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  const { showDeleteCard, showDeleteCardHandler } = useDelete();
  const [showedName, setShowedName] = useState(project.name);
  const { contents, actionType, setDeleteHandler, setArchiveHandler } =
    useProjectMenu();

  const menuEditHandler = (event) => {
    swithMenuHandler(event);
    showProjectCardHandler();
  };

  const menuDeleteHandler = (event) => {
    swithMenuHandler(event);
    setDeleteHandler();
    showDeleteCardHandler();
  };

  const menuArchiveHandler = async (event) => {
    swithMenuHandler(event);
    if (type === "active") {
      setArchiveHandler();
      showDeleteCardHandler();
    } else {
      await UnarchiveProject(project.projectId);
      router.refresh();
    }
  };

  const changeProjectHandler = () => {
    if (actionType === "Delete") {
      DeleteProject(project.projectId);
    } else {
      ArchiveProject(project.projectId);
    }
    const lastPage = localStorage.getItem("lastPage");
    lastPage.includes(project.projectId) && router.push("/application/inbox");
  };

  return (
    <li
      key={project.projectId}
      style={{ backgroundColor: showItemMenu && "#f5f5f5" }}
    >
      <Link href={`/application/project/${project.projectId}`}>
        <Icon type="hashtag" />
        {showedName}
      </Link>
      <div className={styles.menu_btn_container}>
        <span
          className={styles.project_item_menu}
          onClick={swithMenuHandler}
          style={{ opacity: showItemMenu && 1 }}
        >
          <Icon type="menu_unfill" />
        </span>
        {showItemMenu && (
          <PopupMenu
            onOverlayClick={swithMenuHandler}
            position={buttonPosition}
            levels="3"
          >
            <div className={`${styles.task_item_action_menu}`}>
              <button onClick={menuEditHandler}>
                <Icon type="edit" />
                <span>Edit</span>
              </button>
              <hr />
              <button onClick={menuArchiveHandler}>
                <Icon type={type === "active" ? "archive" : "unarchive"} />
                <span>{type === "active" ? "Archive" : "Unarchive"}</span>
              </button>
              <button onClick={menuDeleteHandler}>
                <Icon type="delete" />
                <span>Delete</span>
              </button>
            </div>
          </PopupMenu>
        )}
      </div>
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
          actionFunction={changeProjectHandler}
          name={project.name}
          content1={contents.content1}
          content2={contents.content2}
          type={actionType}
        />
      )}
    </li>
  );
}

export default MyProjectItem;
