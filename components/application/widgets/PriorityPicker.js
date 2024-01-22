/**
 * @description
 * This component is used to select priority of a task
 * @param
 * onPrioritySelect: A callback function called on selete a priority.
 *
 */

import styles from "../../../styles/scss/components/application/widgets/taskEditor.module.scss";

function PriorityPicker({ data, onPrioritySelect, onOverlayClick }) {
  const priorities = [{ p: 1 }, { p: 2 }, { p: 3 }, { p: 4 }];
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
            Priority &nbsp; {item.p}
          </button>
        ))}
      </div>
    </>
  );
}
export default PriorityPicker;
