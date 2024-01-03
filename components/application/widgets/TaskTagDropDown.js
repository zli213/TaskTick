import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/taskEditor.module.scss";

function TaskTagDropDown(
  { tags, onTagSelect, showCreateTag, matchingValue, createNewTag },
  ref
) {
  const [onIndex, setOnIndex] = useState(0);
  const reduceOnIndex = () => {
    if (onIndex > 0) {
      setOnIndex(onIndex - 1);
    }
  };
  const increaseOnIndex = () => {
    if (onIndex < tags.length) {
      setOnIndex(onIndex + 1);
    }
  };

  const selectTag = () => {
    //console.log(document.getElementById("tagDropDown"));
    document
      .getElementById("tagDropDown")
      .getElementsByClassName(styles.task_name_tag_selector_button_on)[0]
      .click();
  };

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
