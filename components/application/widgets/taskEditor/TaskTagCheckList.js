/**
 * @description
 * The drop down list when click tags btn. Set task tags by checkbox.
 *
 * @param
 * allTags: user tag list
 * checkedTags: tags of this task
 * updateCheckTags: fn for checked tags change
 *
 */

import { useRef } from "react";
import styles from "../../../../styles/scss/components/application/widgets/taskEditor.module.scss";

function TaskTagCheckList({
  allTags,
  checkedTags,
  onTagCheckClick,
  onOverlayClick,
}) {
  let newCheckedTags = useRef([...checkedTags]);
  const updateNewCheckedTags = (tag, ele) => {
    // change the checkbox to checked/unchecked
    const ele_i = ele.target.getElementsByTagName("i")[0];
    if (ele_i.classList.contains(styles.tag_checkbox_on)) {
      ele_i.classList.remove(styles.tag_checkbox_on);
    } else {
      ele_i.classList.add(styles.tag_checkbox_on);
    }

    const idx = newCheckedTags.current.indexOf(tag);
    // if include, delete
    if (idx !== -1) {
      newCheckedTags.current.splice(idx, 1);
    } else {
      // if not include, add
      newCheckedTags.current.push(tag);
    }
  };
  return (
    <>
      <div
        className={styles.popup_overlay}
        onClick={() => {
          onOverlayClick();
        }}
      ></div>
      <div id="tagCheckList" className={styles.tag_check_list_dropdown}>
        {allTags.map((item) => (
          <div
            className={styles.tag_check_list_dropdown_btn}
            onClick={(e) => {
              updateNewCheckedTags(item, e);
              onTagCheckClick(newCheckedTags.current);
            }}
          >
            {item}
            <i
              className={
                styles.tag_checkbox +
                (checkedTags.includes(item) ? " " + styles.tag_checkbox_on : "")
              }
            ></i>
          </div>
        ))}
      </div>
    </>
  );
}
export default TaskTagCheckList;
