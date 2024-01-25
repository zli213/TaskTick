import { useState, useRef } from "react";
import { SingleItems } from "./SingleItem";
import styles from "../../../styles/scss/todoList.module.scss";
import AddTask from "./AddTask";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import { useDispatch } from "react-redux";
import { addBoardAction, deleteBoardAction } from "../../../store/tasks";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";

function TodoList({
  tasks,
  title,
  showProject,
  allTags,
  allProjects,
  fromProject,
  fromBoard,
  fromTag,
}) {
  const dispatch = useDispatch();
  if (fromProject == null) {
    fromProject = { projectId: "", projectName: "" };
  }

  if (fromBoard == null) {
    fromBoard = "";
  }
  const [showList, setShowList] = useState(true);
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  const [showAddSection, setShowAddSection] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [placeholder, setPlaceholder] = useState("Name this section");
  const sectionInputRef = useRef();
  const { showDeleteCard, showDeleteCardHandler } = useDelete();

  const haveTasks = tasks !== "" && tasks !== "undefined" && tasks != null;
  const haveTitle = title !== "" && title !== "undefined" && title != null;

  const switchListHandler = () => {
    setShowList((preState) => !preState);
  };

  const switchAddSectionHandler = () => {
    setShowAddSection((preState) => {
      if (preState) {
        setSectionName("");
        setPlaceholder("Name this section");
      }
      return !preState;
    });
  };

  const nameChangeHandler = (event) => {
    setSectionName(event.target.value);
  };

  const menuDeleteHandler = (event) => {
    swithMenuHandler(event);
    showDeleteCardHandler();
  };

  const addBoardformHandler = async (event) => {
    event.preventDefault();
    const board = sectionInputRef.current.value;

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
          addBoardAction({ board, projectId: fromProject.projectId, fromBoard })
        );
        setSectionName("");
        setShowAddSection(false);
      } else if (result.body === "exist") {
        setSectionName("");
        setPlaceholder("This board already exists, please try another name");
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
        dispatch(
          deleteBoardAction({ board, projectId: fromProject.projectId })
        );
        showDeleteCardHandler(false);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <section className={styles.section} id={title}>
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
                      <button>
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
                  showProject={showProject}
                  allTags={allTags}
                  allProjects={allProjects}
                />
              ))}
          </div>
        )}
        {title !== "Overdue" && (
          <AddTask
            allTags={allTags}
            allProjects={allProjects}
            fromProject={fromProject}
            fromBoard={fromBoard}
            fromTag={fromTag}
          />
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
      {showAddSection && (
        <form
          className={styles.add_section_form}
          onSubmit={addBoardformHandler}
        >
          <input
            type="text"
            placeholder={placeholder}
            ref={sectionInputRef}
            value={sectionName}
            onChange={nameChangeHandler}
          />
          <div>
            <button
              type="submit"
              className={`${styles.add_btn}  ${sectionName && styles.valid}`}
              disabled={!sectionName}
              style={{ cursor: sectionName && "pointer" }}
            >
              Add section
            </button>
            <button
              type="button"
              className={styles.cancel_btn}
              onClick={switchAddSectionHandler}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {showDeleteCard && (
        <DeleteConfirmCard
          closeHandler={showDeleteCardHandler}
          actionFunction={deleteBoardHandler}
          content2={" with its " + tasks.length + " tasks?"}
          name={title}
          type="Delete"
        />
      )}
    </>
  );
}

export default TodoList;
