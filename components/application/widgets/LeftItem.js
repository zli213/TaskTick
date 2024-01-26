import Link from "next/link";
import styles from "../../../styles/scss/leftbar.module.scss";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import NewProject, { useProject } from "./NewProject";
import { useState } from "react";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";
import { ArchiveProject, DeleteProject } from "../../../public/CommonFunctions";
import { useProjectMenu } from "./MyProjectItem";
import { useRouter } from "next/navigation";

const LeftbarItem = ({
  label,
  link,
  type,
  num,
  onClickHandler,
  isSelected,
  projectId,
}) => {
  const router = useRouter();

  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  const { showDeleteCard, showDeleteCardHandler } = useDelete();
  const { contents, actionType, setDeleteHandler, setArchiveHandler } =
    useProjectMenu();

  const [showedName, setShowedName] = useState(label);

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
    setArchiveHandler();
    showDeleteCardHandler();
  };

  const changeProjectHandler = () => {
    if (actionType === "Delete") {
      DeleteProject(projectId);
    } else {
      ArchiveProject(projectId);
    }
    const lastPage = localStorage.getItem("lastPage");
    lastPage.includes(projectId) && router.push("/application/inbox");
    router.refresh();
  };

  const clickHandler = (e) => {
    e.preventDefault();
    onClickHandler();
  };

  const isProject = type == "project";
  var icon = null;
  switch (type) {
    case "inbox":
      icon = isSelected ? (
        <Icon type="inbox_selected" />
      ) : (
        <Icon type="inbox" />
      );
      break;
    case "today":
      icon = isSelected ? (
        <Icon type="today_selected" />
      ) : (
        <Icon type="today" />
      );
      break;
    case "upcoming":
      icon = isSelected ? (
        <Icon type="upcoming_selected" />
      ) : (
        <Icon type="upcoming" />
      );
      break;
    case "filters-labels":
      icon = isSelected ? (
        <Icon type="filter_selected" />
      ) : (
        <Icon type="filter" />
      );
      break;
    case "project":
      icon = <Icon type="hashtag" />;
      break;

    default:
      <Icon type="inbox" />;
  }

  return (
    <li
      className={`${isSelected ? styles.selected_item : ""} ${
        showItemMenu && styles.li_hover
      }`}
    >
      <div className={styles.list_item_box} onClick={clickHandler}>
        <Link href={link} passHref>
          <span id="icon">{icon}</span>
          <span className={styles.list_item_content}>{showedName}</span>
        </Link>
      </div>
      <div className={styles.item_btn}>
        <span
          className={`${isProject ? styles.item_btn_number : ""} ${
            showItemMenu && styles.item_btn_number_hover
          }`}
        >
          {num ? num : ""}
        </span>
        {isProject && (
          <div>
            {/* button */}
            <button
              type="button"
              className={`${styles.more_project_action_btn} ${
                showItemMenu && styles.more_project_action_btn_hover
              } `}
              onClick={swithMenuHandler}
            >
              <span>
                <Icon type="menu_filled" />
              </span>
            </button>
          </div>
        )}
        {showItemMenu && (
          <PopupMenu
            onOverlayClick={swithMenuHandler}
            position={buttonPosition}
            levels="3"
          >
            <ul>
              <li
                className={styles.action_btn_menu_item}
                onClick={menuEditHandler}
              >
                <span>
                  <Icon type="edit" />
                </span>
                Edit
              </li>
              <li
                className={styles.action_btn_menu_item}
                onClick={menuArchiveHandler}
              >
                <span>
                  <Icon type="archive" />
                </span>
                Archive
              </li>
              <li
                className={styles.action_btn_menu_item}
                onClick={menuDeleteHandler}
              >
                <span>
                  <Icon type="delete" />
                </span>
                Delete
              </li>
            </ul>
          </PopupMenu>
        )}
      </div>
      {showAddProjectCard && (
        <NewProject
          name={label}
          projectId={projectId}
          closeHandler={showProjectCardHandler}
          showNameHandler={setShowedName}
        />
      )}
      {showDeleteCard && (
        <DeleteConfirmCard
          closeHandler={showDeleteCardHandler}
          actionFunction={changeProjectHandler}
          name={label}
          content1={contents.content1}
          content2={contents.content2}
          type={actionType}
        />
      )}
    </li>
  );
};

export default LeftbarItem;
