import React from "react";
import styles from "../../../styles/scss/application.module.scss";
import PopupMenu, {useMenu} from "./PopupMenu";
import Link from "next/link";
import Icon from "./Icon";

function LabelItem({label}) {
  const {showItemMenu, buttonPosition, swithMenuHandler} = useMenu();

  return (
    <div className={styles.labels_item_container}>
      <li key={label}>
        <Link href="#">
          <Icon type="hashtag_big" />
          <span className={styles.labels_item_content}>
            <span>{label}</span>
            <div>num</div>
          </span>
          <span className="label_edit_btn">
            <Icon type="edit" />
          </span>
          <button className="label_edit_btn" onClick={swithMenuHandler}>
            <Icon type="menu_filled" />
          </button>
        </Link>
        {showItemMenu && (
        <PopupMenu onOverlayClick={swithMenuHandler} position={buttonPosition} levels="2">
          <div className={`${styles.task_item_action_menu}`}>
            <button>
              <Icon type="edit" />
              <span>Edit label</span>
            </button>
            <hr />
            <button>
              <Icon type="delete" />
              <span>Delete label</span>
            </button>
          </div>
        </PopupMenu>
      )}
      </li>
    </div>
  );
}

export default LabelItem;
