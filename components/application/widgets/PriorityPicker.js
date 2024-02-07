/**
 * @description
 * This component is used to select priority of a task
 * @param
 * onPrioritySelect: A callback function called on selete a priority.
 *
 */

import styles from "../../../styles/scss/components/application/widgets/taskEditor.module.scss";
import Icon from "./Icon";

function PriorityPicker({ data, onPrioritySelect, onOverlayClick }) {
  const priorities = [{ p: 1 }, { p: 2 }, { p: 3 }, { p: 4 }];

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

  return (
    <>
      <div className={styles.popup_overlay} onClick={onOverlayClick}></div>
      <div className={styles.priority_picker}>
        {priorities.map((item) => (
          <button
            key={item.p}
            className={styles.priority_picker_button}
            onClick={() => onPrioritySelect(item.p)}
          >
            <Icon
              type={item.p == 4 ? "flag_big" : "flag_filled"}
              className={priorityColor(item.p)}
            />
            Priority&nbsp;{item.p} 
          </button>
        ))}
      </div>
    </>
  );
}
export default PriorityPicker;
