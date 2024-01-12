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

function TaskEditor({
  formType,
  taskData,
  tagList,
  cancelCallBack,
  submitCallBack,
}) {
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
      tags: ["Reading1", "Daily"],
    };
  }
  if (tagList == null) {
    tagList = ["Reading1", "Reading2", "Daily", "Weekly"];
  }
  if (cancelCallBack == null) {
    cancelCallBack = () => {};
  }
  if (submitCallBack == null) {
    submitCallBack = () => {};
  }

  const taskNameInputRef = useRef(null);

  /** record the editing task */
  let newTaskData = useRef({
    _id: taskData._id == null ? "" : taskData._id,
    selectedDate: taskData.selectedDate == null ? "" : taskData.selectedDate,
    priority: taskData.priority == null ? 4 : taskData.priority,
    taskName: taskData.taskName == null ? "" : taskData.taskName,
    taskContent: taskData.taskContent == null ? "" : taskData.taskContent,
    tags: taskData.tags == null ? ["Reading1", "Daily"] : taskData.tags,
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
                tags={taskData.tags}
                taskName={taskData.taskName}
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
              ></div>
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
            <button
              type="button"
              onClick={() => {
                console.log(newTaskData);
              }}
            >
              test
            </button>
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
                onClick={submitCallBack}
              >
                Add
              </button>
            ) : null}
            {formType === "edit" ? (
              <button
                className={styles.task_footer_submit}
                type="button"
                onClick={submitCallBack}
              >
                Save
              </button>
            ) : null}
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
    </>
  );
}

export default TaskEditor;
