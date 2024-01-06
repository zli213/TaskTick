/**
 * component of TaskNameInput
 * used for selecting a tag when input @.
 */

import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "../../../../styles/scss/components/application/widgets/taskEditor.module.scss";

function TaskTagDropDown(
  { tags, onTagSelect, showCreateTag, matchingValue, createNewTag },
  ref
) {
  /** change the selected btn using upArrow and downArrow */
  const [onIndex, setOnIndex] = useState(0);
  // up
  const reduceOnIndex = () => {
    if (onIndex > 0) {
      setOnIndex(onIndex - 1);
    }
  };
  // down
  const increaseOnIndex = () => {
    if (onIndex < tags.length) {
      setOnIndex(onIndex + 1);
    }
  };

  const selectTag = () => {
    document
      .getElementById("tagDropDown")
      .getElementsByClassName(styles.task_name_tag_selector_button_on)[0]
      .click();
  };

  // For the parent component to call
  useImperativeHandle(ref, () => ({
    reduceOnIndex: reduceOnIndex,
    increaseOnIndex: increaseOnIndex,
    selectTag: selectTag,
  }));

  return (
    <div id="tagDropDown" className={styles.task_name_tag_selector}>
      {tags.map((item, index) => (
        <button
          key={"item_" + item}
          type="button"
          onClick={() => {
            onTagSelect(item);
          }}
          className={
            index === onIndex ? styles.task_name_tag_selector_button_on : ""
          }
        >
          {item}
        </button>
      ))}
      {showCreateTag ? (
        <button
          type="button"
          className={
            onIndex === tags.length
              ? styles.task_name_tag_selector_button_on
              : ""
          }
          onClick={() => {
            createNewTag(matchingValue);
          }}
        >
          create tag <b>{matchingValue}</b>
        </button>
      ) : null}
    </div>
  );
}

export default forwardRef(TaskTagDropDown);
