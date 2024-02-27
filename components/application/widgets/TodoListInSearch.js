import { useState } from "react";
import { SingleItemsInSearch } from "./SingleItemsInSearch";
import styles from "../../../styles/scss/todoListInSearch.module.scss";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import { useDispatch } from "react-redux";
import { useBoard } from "./AddBoard";

function TodoListInSearch({
  tasks,
  title,
  showProject,
  allTags,
  allProjects,
  fromProject,
  fromBoard,
  fromTag,
  fromDate,
  isCompleted,
}) {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(true);
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  //   const { showDeleteCard, showDeleteCardHandler } = useDelete();
  const {
    sectionInputRef,
    showAddSection,
    sectionName,
    placeholder,
    switchAddSectionHandler,
    failHandler,
    nameChangeHandler,
  } = useBoard();
  const {
    sectionInputRef: sectionEditRef,
    showAddSection: showEditSection,
    sectionName: sectionName2,
    placeholder: placeholder2,
    switchAddSectionHandler: switchEditSectionHandler,
    failHandler: failEditHandler,
    nameChangeHandler: nameEditHandler,
    setSectionName: setEditSectionName,
  } = useBoard();

  if (fromProject == null) {
    fromProject = { projectId: "", projectName: "" };
  }
  if (fromBoard == null) {
    fromBoard = "";
  }
  if (isCompleted == null) {
    isCompleted = false;
  }

  const haveTasks = tasks !== "" && tasks !== "undefined" && tasks != null;
  const haveTitle = title !== "" && title !== "undefined" && title != null;

  const switchListHandler = () => {
    setShowList((preState) => !preState);
  };

  const menuDeleteHandler = (event) => {
    swithMenuHandler(event);
    showDeleteCardHandler();
  };

  const menuEditHandler = (event) => {
    swithMenuHandler(event);
    setEditSectionName(title);
    switchEditSectionHandler();
  };

  const addBoardformHandler = async (event) => {
    event.preventDefault();
    const board = sectionInputRef.current.value.trim();

    try {
      const res = await fetch("/api/addBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board,
          projectId: fromProject.projectId,
          fromBoard,
        }),
      });
      const result = await res.json();

      if (result.body === "success") {
        dispatch(
          addBoard({ projectId: fromProject.projectId, board, fromBoard })
        );
        switchAddSectionHandler();
      } else if (result.body === "exist") {
        failHandler();
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteBoardHandler = async () => {
    const board = title;

    try {
      const res = await fetch("/api/deleteBoard", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board,
          projectId: fromProject.projectId,
        }),
      });
      const result = await res.json();

      if (result.body === "success") {
        dispatch(deleteBoardAction(fromProject.projectId, board));
        showDeleteCardHandler(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const editBoardHandler = async (event) => {
    event.preventDefault();
    const board = sectionEditRef.current.value.trim();

    if (board === title) {
      switchEditSectionHandler();
      return;
    }

    try {
      const res = await fetch("/api/editBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board,
          projectId: fromProject.projectId,
          oldBoard: title,
        }),
      });
      const result = await res.json();

      if (result.body === "success") {
        dispatch(editBoardAction(fromProject.projectId, board, title));
        switchEditSectionHandler();
      } else if (result.body === "exist") {
        failEditHandler();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <section
        className={styles.section}
        id={title}
        style={{ marginTop: isCompleted && 0 }}
      >
        {!showEditSection && haveTitle && (
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
            {title !== "Today" && (
              <div className={styles.menu_btn_container}>
                <button
                  onClick={swithMenuHandler}
                  className={styles.menu_btn}
                  style={{ backgroundColor: showItemMenu && "#eeeeee" }}
                >
                  <Icon type="menu_unfill" />
                </button>
                {showItemMenu && (
                  <PopupMenu
                    onOverlayClick={swithMenuHandler}
                    position={buttonPosition}
                    levels="2"
                  >
                    <div className={styles.task_item_action_menu}>
                      <button onClick={menuEditHandler}>
                        <Icon type="edit" />
                        <span>Edit</span>
                      </button>
                      <hr />
                      <button onClick={menuDeleteHandler}>
                        <Icon type="delete" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </PopupMenu>
                )}
              </div>
            )}
          </header>
        )}

        {showList && (
          <div>
            {haveTasks &&
              tasks.map((data) => (
                <SingleItemsInSearch
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
                  showProject={showProject}
                  allTags={allTags}
                  allProjects={allProjects}
                />
              ))}
          </div>
        )}
      </section>
      {fromProject.projectId !== "" && (
        <button
          className={styles.add_section_btn}
          onClick={switchAddSectionHandler}
          style={{
            opacity: showAddSection && 0,
            cursor: showAddSection && "auto",
          }}
          disabled={showAddSection}
        >
          <span className={styles.line} />
          <span>Add Section</span>
          <span className={styles.line} />
        </button>
      )}
    </>
  );
}

export default TodoListInSearch;
