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
import { useSelector } from "react-redux";

function TaskEditor({
  formType,
  taskData,
  fromProject,
  fromBoard,
  fromTag,
  cancelCallBack,
  submitCallBack,
}) {
  let tagList = useSelector((state) => state.tasks.tags);
  let allProjects = useSelector((state) => state.tasks.projects);
  allProjects = allProjects
    .filter((project) => project.archived !== true)
    .filter((project) => project.state !== "deleted");

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
    selectedDate: taskData.selectedDate == null ? "" : taskData.selectedDate,
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
  console.log(newTaskData.current);

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
  const changeSelectedDate = (date) => {
    setSelectedDate(date.dateStr);
    setNewTaskData("selectedDate", date.dateStr);
  };

  const [selectedPriority, setSelectedPriority] = useState(
    newTaskData.current.priority
  );
  const changeSelectedPriority = (pri) => {
    setSelectedPriority(pri);
    setNewTaskData("priority", pri);
  };

  const [allTags, setAllTags] = useState([...tagList]);
  const updateAllTags = (taglist) => {
    setAllTags(taglist);
  };

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

  const projSelectHandler = (projId, projName, board) => {
    changeDispProjectId(projId);
    changeDispProjectName(projName);
    changeDispBoard(board);
    hideProjectSel();
    //console.log({ id: projId, name: projName, board: board });
  };

  // Show/Hide Scheduler
  const [isShowScheduler, setIsShowScheduler] = useState(false);
  const showScheduler = () => {
    setIsShowScheduler(true);
  };
  const hideScheduler = () => {
    setIsShowScheduler(false);
  };

  // Show/Hide PriorityPicker
  const [isShowPriority, setIsShowPriority] = useState(false);
  const showPriority = () => {
    setIsShowPriority(true);
  };
  const hidePriority = () => {
    setIsShowPriority(false);
  };

  // Show/Hide TaskTagCheckList
  const [isShowTagCheck, setIsShowTagCheck] = useState(false);
  const showTagCheck = () => {
    setIsShowTagCheck(true);
  };
  const hideTagCheck = () => {
    setIsShowTagCheck(false);
  };

  // Show/Hide ProjectSelector
  const [isShowProjectSel, setIsShowProjectSel] = useState(false);
  const showProjectSel = () => {
    setIsShowProjectSel(true);
  };
  const hideProjectSel = () => {
    setIsShowProjectSel(false);
  };

  const recordTaskContent = () => {
    setNewTaskData(
      "taskContent",
      document.getElementById("taskContent").textContent
    );
  };
  const recordTaskName = (name) => {
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
              <button type="button" onClick={showScheduler}>
                {convertDate(selectedDate)}
              </button>
              <button type="button" onClick={showPriority}>
                Priority&nbsp;{selectedPriority}
              </button>
              <button type="button" onClick={showTagCheck}>
                Tags
              </button>
            </div>
          </div>
          <div className={styles.task_footer}>
            {/* project / board */}
            <div className={styles.project_board} onClick={showProjectSel}>
              {dispProjectId === "" ? "Inbox" : dispProjectName}
              {dispBoard === "" ? null : "\u00a0/\u00a0" + dispBoard}
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
                  className={styles.task_footer_submit}
                  type="button"
                  onClick={() => {
                    submitCallBack(newTaskData.current);
                  }}
                >
                  Add
                </button>
              ) : null}
              {formType === "edit" ? (
                <button
                  className={styles.task_footer_submit}
                  type="button"
                  onClick={() => {
                    submitCallBack(newTaskData.current);
                  }}
                >
                  Save
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
      {isShowScheduler ? (
        <Scheduler
          data={{ selectedDate: selectedDate }}
          onChangeDate={(dateJson) => {
            changeSelectedDate(dateJson);
            hideScheduler();
          }}
          onOverlayClick={hideScheduler}
        />
      ) : null}
      {isShowPriority ? (
        <PriorityPicker
          onPrioritySelect={(pri) => {
            changeSelectedPriority(pri);
            hidePriority();
          }}
          onOverlayClick={hidePriority}
        />
      ) : null}
      {isShowTagCheck ? (
        <TaskTagCheckList
          allTags={allTags}
          checkedTags={newTaskData.current.tags}
          onTagCheckClick={(tags) => {
            //updateCheckTags(tags);
            setNewTaskData("tags", tags);
            taskNameInputRef.current.checkTags(tags);
          }}
          onOverlayClick={hideTagCheck}
        />
      ) : null}
      {isShowProjectSel ? (
        <ProjectSelector
          allProjects={allProjects}
          onProjSelect={projSelectHandler}
          onOverlayClick={hideProjectSel}
        />
      ) : null}
    </>
  );
}

export default TaskEditor;
