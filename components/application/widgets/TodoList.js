import { useState } from "react";
import { SingleItems } from "./SingleItem";
import styles from "../../../styles/scss/todoList.module.scss";
import AddTask from "./AddTask";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";

function TodoList({
  tasks,
  title,
  allTags,
  allProjects,
  fromProject,
  fromBoard,
  fromTag,
}) {
  if (fromProject == null) {
    fromProject = { projectId: "", projectName: "" };
  }
  if (fromBoard == null) {
    fromBoard = "";
  }
  const [showList, setShowList] = useState(true);
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();

  const haveTasks = tasks != "" && tasks != "undefined" && tasks != null;
  const haveTitle = title != "" && title != "undefined" && title != null;

  const switchListHandler = () => {
    setShowList((preState) => !preState);
  };

  return (
    <section className={styles.section}>
      {haveTitle && (
        <header className={styles.todolist_header}>
          <div
            className={`${styles.content_wrapper} ${
              !showList && styles.content_wrapper_rotate
            }`}
            onClick={switchListHandler}
          >
            <Icon type="down_arrow_small" />
          </div>
          <h4>{title}</h4>
          {title != "Today" && (
            <button onClick={swithMenuHandler}>
              <Icon type="menu_unfill" />
            </button>
          )}
        </header>
      )}

      {showList && (
        <div>
          {haveTasks &&
            tasks
              .filter((data) => data.completed == false)
              .map((data) => (
                <SingleItems
                  key={data._id}
                  _id={data._id}
                  title={data.title}
                  dueDate={data.dueDate}
                  description={data.description}
                  projectName={data.projectName}
                  projectId={data.projectId}
                  board={data.board}
                  tags={data.tags}
                  priority={data.priority}
                  completed={data.completed}
                  allTags={allTags}
                  allProjects={allProjects}
                />
              ))}
        </div>
      )}
      {title != "Overdue" && (
        <AddTask
          allTags={allTags}
          allProjects={allProjects}
          fromProject={fromProject}
          fromBoard={fromBoard}
          fromTag={fromTag}
        />
      )}
      {showItemMenu && (
        <PopupMenu
          onOverlayClick={swithMenuHandler}
          position={buttonPosition}
          levels="2"
        >
          <div className={styles.task_item_action_menu}>
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
    </section>
  );
}

export default TodoList;
