"use client";
import { useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import Scheduler, { convertDate } from "./Scheduler";

/**
 * @param
 * [Deserted]onRef(necessary): used for exposure inside functions [showMe,...] to be called outside.
 * formType: ["add", "edit"]
 * taskData: {
 *      selectedDate: "2023-12-04",
 * }
 * cancelCallBack: A function to be executed after the cancel btn is clicked
 * submitCallBack: A function to be executed after the add/save btn is clicked
 * @usage
 * <TaskEditor formType="edit" taskData={...} cancelCallBack={callBackFn} submitCallBack = {callBackFn}/>
 * @todo
 * 1. How to submit the form
 * 2. Show date when type='edit'
 */
function TaskEditor({
  //   onRef,
  formType,
  taskData,
  cancelCallBack,
  submitCallBack,
}) {
  // Default values
  if (formType == null) {
    formType = "add";
  }
  if (taskData == null) {
    taskData = { selectedDate: "" };
  }
  if (cancelCallBack == null) {
    cancelCallBack = () => {};
  }
  if (submitCallBack == null) {
    submitCallBack = () => {};
  }

  // Default selected date: from incoming parameters
  const [selectedDate, setSelectedDate] = useState(taskData.selectedDate);
  const changeSelectedDate = (date) => {
    setSelectedDate(date.dateStr);
  };

  // show/hide scheduler
  //   const schedulerRef = useRef();
  //   const showScheduler = () => {
  //     schedulerRef.current?.showMe();
  //   };
  const [isShowScheduler, setIsShowScheduler] = useState(false);
  const showScheduler = () => {
    setIsShowScheduler(true);
  };
  const hideScheduler = () => {
    setIsShowScheduler(false);
  };

  return (
    <>
      <div className={styles.task_edit_form}>
        <form>
          <div className={styles.task_edit_area}>
            <div className="task_edit_inputs">
              <input placeholder="Task Name" className={styles.task_name} />
              <textarea placeholder="Description"></textarea>
            </div>
            <div className={styles.task_edit_buttons}>
              <button type="button" onClick={showScheduler}>
                {convertDate(selectedDate)}
              </button>
              <button type="button">Priority</button>
              <button type="button">Tag</button>
            </div>
          </div>
          <div className={styles.task_footer}>
            <button
              className={styles.task_footer_cancel}
              type="button"
              onClick={cancelCallBack}
            >
              Cancel
            </button>
            {formType == "add" ? (
              <button
                className={styles.task_footer_submit}
                type="button"
                onClick={submitCallBack}
              >
                Add
              </button>
            ) : null}
            {formType == "edit" ? (
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
    </>
  );
}

export default TaskEditor;
