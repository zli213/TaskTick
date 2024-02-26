/**
 * @param
 * formType: ["add", "edit"]
 * taskData: {
 *      selectedDate: "2023-12-04",
 *      priority: 4,
 *      taskName: "task name",
 *      taskContent: "task content",
 *      tags: ["tag1", "tag2"]
 * }
 * tagList: All user tags. Use state in parent component to update the list in case of create a new tag
 * cancelCallBack: A function to be executed after the cancel btn is clicked
 * submitCallBack: A function to be executed after the add/save btn is clicked
 * @usage
 * <TaskEditor formType="edit" taskData={...} cancelCallBack={callBackFn} submitCallBack = {callBackFn}/>
 * @todo
 * 1. How to submit the form
 * 2. Show date when type='edit'
 * ...
 */

import { useRef, useState } from "react";
import styles from "../../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import Scheduler, { convertDate } from "../Scheduler";
import PriorityPicker from "../PriorityPicker";
import TaskNameInput from "./TaskNameInput";
import TaskTagCheckList from "./TaskTagCheckList";
import ProjectSelector from "./ProjectSelector";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import { addToastId } from "../../../../store/toastIds";
import Icon from "../Icon";
import PopupMenu, { useMenu } from "../PopupMenu";

function TaskEditor({
  formType,
  taskData,
  fromProject,
  fromBoard,
  fromTag,
  fromDate,
  cancelCallBack,
  submitCallBack,
}) {
  let tagList = useSelector((state) => state.labels.tags);
  let allProjects = Object.values(useSelector((state) => state.projects));
  allProjects = allProjects
    .filter((project) => project.archived !== true)
    .filter((project) => project.isDeleted !== true);
  let dispatch = useDispatch();
  // Default values
  if (formType == null) {
    formType = "add";
  }
  if (taskData == null) {
    taskData = {
      _id: "",
      selectedDate: "",
      priority: 4,
      taskName: "",
      taskContent: "",
      tags: [],
      projectId: "",
      projectName: "",
      board: "",
    };
  }
  if (tagList == null) {
    tagList = [];
  }
  if (fromProject == null) {
    fromProject = { projectId: "", projectName: "" };
  }
  if (fromBoard == null) {
    fromBoard = "";
  }
  if (cancelCallBack == null) {
    cancelCallBack = () => {};
  }
  if (submitCallBack == null) {
    submitCallBack = (arg) => {};
  }

  const taskNameInputRef = useRef(null);

  /** record the editing task */
  let newTaskData = useRef({
    _id: taskData._id == null ? "" : taskData._id,
    selectedDate:
      formType === "add"
        ? fromDate == null
          ? ""
          : fromDate
        : taskData.selectedDate == null
        ? ""
        : taskData.selectedDate,
    priority: taskData.priority == null ? 4 : taskData.priority,
    taskName: taskData.taskName == null ? "" : taskData.taskName,
    taskContent: taskData.taskContent == null ? "" : taskData.taskContent,
    tags:
      formType === "add"
        ? fromTag == null
          ? []
          : [fromTag]
        : taskData.tags == null
        ? []
        : taskData.tags,
    projectId:
      formType === "add"
        ? fromProject.projectId
        : taskData.projectId == null
        ? ""
        : taskData.projectId,
    projectName:
      formType === "add"
        ? fromProject.projectName
        : taskData.projectName == null
        ? ""
        : taskData.projectName,
    board:
      formType === "add"
        ? fromBoard
        : taskData.board == null
        ? ""
        : taskData.board,
  });

  /** update newTaskData */
  const setNewTaskData = (key, value) => {
    if (key in newTaskData.current) {
      newTaskData.current[key] = value;
    }
  };
  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(
    newTaskData.current.selectedDate
  );
  const [originalDate, setOriginalDate] = useState(
    newTaskData.current.selectedDate
  );
  const changeSelectedDate = (date) => {
    setSelectedDate(date.dateStr);
    setNewTaskData("selectedDate", date.dateStr);
    setOriginalDate(date.dateStr);
  };

  const [selectedPriority, setSelectedPriority] = useState(
    newTaskData.current.priority
  );
  const changeSelectedPriority = (pri) => {
    setSelectedPriority(pri);
    setNewTaskData("priority", pri);
  };

  const [allTags, setAllTags] = useState([...tagList]);

  const [dispProjectId, setDispProjectId] = useState(
    newTaskData.current.projectId
  );
  const changeDispProjectId = (id) => {
    setDispProjectId(id);
    setNewTaskData("projectId", id);
  };

  const [dispProjectName, setDispProjectName] = useState(
    newTaskData.current.projectName
  );
  const changeDispProjectName = (name) => {
    setDispProjectName(name);
    setNewTaskData("projectName", name);
  };

  const [dispBoard, setDispBoard] = useState(newTaskData.current.board);
  const changeDispBoard = (name) => {
    setDispBoard(name);
    setNewTaskData("board", name);
  };

  // Show/Hide Scheduler
  const {
    showItemMenu: showSchedulerMenu,
    buttonPosition: schedulerPosition,
    swithMenuHandler: swichSchedulerHandler,
  } = useMenu();

  // Show/Hide PriorityPicker
  const {
    showItemMenu: showPriorityMenu,
    buttonPosition: priorityPosition,
    swithMenuHandler: swichPriorityHandler,
  } = useMenu();

  // Show/Hide TaskTagCheckList
  const {
    showItemMenu: showTagMenu,
    buttonPosition: tagPosition,
    swithMenuHandler: swichTagHandler,
  } = useMenu();

  // Show/Hide ProjectSelector
  const {
    showItemMenu: showProjectMenu,
    buttonPosition: projectPosition,
    swithMenuHandler: swichProjectHandler,
  } = useMenu();

  const projSelectHandler = (projId, projName, board) => {
    changeDispProjectId(projId);
    changeDispProjectName(projName);
    changeDispBoard(board);
    swichProjectHandler();
    //console.log({ id: projId, name: projName, board: board });
  };

  const recordTaskContent = () => {
    setNewTaskData(
      "taskContent",
      document.getElementById("taskContent").textContent
    );
  };
  const recordTaskName = (name) => {
    if (name === "") {
      setNotAllowSubmit(true);
    } else {
      setNotAllowSubmit(false);
    }
    setNewTaskData("taskName", name);
  };
  const recordTaskTags = (tags) => {
    setNewTaskData("tags", tags);
  };

  const createNewTag = (newTag) => {
    console.log("create tag " + newTag);
    /**@todo create new tag in database, update newTagList
     * updateAllTags(newAllTags)
     */
  };

  // handle submit
  const handleSubmit = () => {
    let routePath = "";
    let projectName = "Inbox";
    if (newTaskData.current.projectId === "") {
      routePath = "/application/inbox";
    } else {
      // project
      routePath = "/application/project/" + newTaskData.current.projectId;
      projectName = newTaskData.current.projectName;
    }

    if (formType === "add") {
      const newToastId = toast.info(
        <div>
          <p className={styles.notification_card}>
            Task has been added to{"\u00a0"}
            <Link href={routePath}>
              <u>{projectName}</u>
            </Link>
          </p>
        </div>,
        { pauseOnHover: false }
      );
      dispatch(addToastId(newToastId));
    }
  };

  //content check
  const [notAllowSubmit, setNotAllowSubmit] = useState(taskData.taskName == "");

  const preSubmitCheck = () => {
    submitCallBack(newTaskData.current);
    handleSubmit();
  };

  return (
    <>
      <div className={styles.task_edit_form}>
        <form>
          <div className={styles.task_edit_area}>
            <div className="task_edit_inputs">
              <TaskNameInput
                tags={newTaskData.current.tags}
                taskName={newTaskData.current.taskName}
                allTags={tagList}
                createNewTag={(newTag) => {
                  createNewTag(newTag);
                }}
                recordTaskName={(name) => {
                  recordTaskName(name);
                }}
                recordTaskTags={(tags) => {
                  recordTaskTags(tags);
                }}
                onRef={taskNameInputRef}
              />
              <div
                id="taskContent"
                className={styles.task_content}
                contentEditable="true"
                placeholder="Task Content"
                onInput={recordTaskContent}
              >
                {newTaskData.current.taskContent}
              </div>
            </div>
            <div className={styles.task_edit_buttons}>
              <span className={styles.btn_menu}>
                <button type="button" onClick={swichSchedulerHandler}>
                  {convertDate(selectedDate)}
                </button>
                {showSchedulerMenu && (
                  <PopupMenu
                    onOverlayClick={swichSchedulerHandler}
                    position={schedulerPosition}
                    levels={10.4}
                    menuWidth="230"
                  >
                    <Scheduler
                      data={{ selectedDate: selectedDate }}
                      onChangeDate={(dateJson) => {
                        changeSelectedDate(dateJson);
                        swichSchedulerHandler();
                      }}
                      isEdit={true}
                    />
                  </PopupMenu>
                )}
              </span>
              <span className={styles.btn_menu}>
                <button
                  type="button"
                  onClick={swichPriorityHandler}
                  style={{ backgroundColor: showPriorityMenu && "#f5f5f5" }}
                >
                  <Icon
                    type={selectedPriority == 4 ? "flag_big" : "flag_filled"}
                    className={priorityColor(selectedPriority)}
                  />
                  Priority&nbsp;{selectedPriority}
                </button>
                {showPriorityMenu && (
                  <PopupMenu
                    onOverlayClick={swichPriorityHandler}
                    position={priorityPosition}
                    levels={4}
                    menuWidth="120"
                  >
                    <PriorityPicker
                      onPrioritySelect={(pri) => {
                        changeSelectedPriority(pri);
                        swichPriorityHandler();
                      }}
                      onOverlayClick={swichPriorityHandler}
                    />
                  </PopupMenu>
                )}
              </span>
              <span className={styles.btn_menu}>
                <button
                  type="button"
                  onClick={swichTagHandler}
                  style={{ backgroundColor: showTagMenu && "#f5f5f5" }}
                >
                  Tags
                </button>
                {showTagMenu && (
                  <PopupMenu
                    onOverlayClick={swichTagHandler}
                    position={tagPosition}
                    levels={allTags.length <= 7 ? allTags.length * 0.75 : 5.4}
                    menuWidth="401"
                  >
                    <TaskTagCheckList
                      allTags={allTags}
                      checkedTags={newTaskData.current.tags}
                      onTagCheckClick={(tags) => {
                        //updateCheckTags(tags);
                        setNewTaskData("tags", tags);
                        taskNameInputRef.current.checkTags(tags);
                      }}
                      onOverlayClick={swichTagHandler}
                    />
                  </PopupMenu>
                )}
              </span>
            </div>
          </div>
          <div className={styles.task_footer}>
            {/* project / board */}
            <div className={styles.btn_menu}>
              <div
                className={styles.project_board}
                onClick={swichProjectHandler}
                style={{ backgroundColor: showProjectMenu && "#f5f5f5" }}
              >
                <span className={styles.tag_box2}>
                  {dispProjectId === "" ? "Inbox" : dispProjectName}
                </span>
                <span className={styles.tag_box}>
                  {dispBoard === "" ? null : "\u00a0/\u00a0" + dispBoard}
                </span>
              </div>
              {showProjectMenu && (
                <PopupMenu
                  onOverlayClick={swichProjectHandler}
                  position={projectPosition}
                  levels={
                    boardNum(allProjects) <= 9
                      ? boardNum(allProjects) * 0.87
                      : 8.22
                  }
                  menuWidth="300"
                >
                  <ProjectSelector
                    allProjects={allProjects}
                    onProjSelect={projSelectHandler}
                    onOverlayClick={swichProjectHandler}
                  />
                </PopupMenu>
              )}
            </div>
            <div className={styles.task_footer_btns}>
              <button
                className={styles.task_footer_cancel}
                type="button"
                onClick={cancelCallBack}
              >
                Cancel
              </button>
              {formType === "add" ? (
                <button
                  disabled={notAllowSubmit}
                  className={styles.task_footer_submit}
                  type="button"
                  onClick={preSubmitCheck}
                  style={{
                    backgroundColor: notAllowSubmit && "#e56c61",
                    cursor: notAllowSubmit && "not-allowed",
                  }}
                >
                  Add
                </button>
              ) : null}
              {formType === "edit" ? (
                <button
                  disabled={notAllowSubmit}
                  className={styles.task_footer_submit}
                  type="button"
                  onClick={preSubmitCheck}
                  style={{
                    backgroundColor: notAllowSubmit && "#e56c61",
                    cursor: notAllowSubmit && "not-allowed",
                  }}
                >
                  Save
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskEditor;

const priorityColor = (p) => {
  switch (p) {
    case 1:
      return styles.button_red;
    case 2:
      return styles.button_yellow;
    case 3:
      return styles.button_blue;
  }
};

const boardNum = (allProjects) => {
  if (allProjects.length === 0) return 1;

  let num = 0;
  allProjects.forEach((proj) => {
    num += proj.boards.length + 1;
  });
  return num + 2;
};
