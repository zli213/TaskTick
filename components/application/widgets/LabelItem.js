import React from "react";
import { useState } from "react";
import Link from "next/link";
import styles from "../../../styles/scss/application.module.scss";
import Icon from "./Icon";
import PopupMenu, { useMenu } from "./PopupMenu";
import NewLabel, { useLabel } from "./NewLabel";
import DeleteConfirmCard, { useDelete } from "./DeleteConfirmCard";
import { DeleteTag } from "../../../public/CommonFunctions";
import { useDispatch } from "react-redux";
import { deleteOneTagAction } from "../../../store/labels";

function LabelItem({ label, num }) {
  const dispacth = useDispatch();
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();
  const { showAddCard, showCardHandler } = useLabel();
  const { showDeleteCard, showDeleteCardHandler } = useDelete();
  const [showLabel, setShowLabel] = useState(label);

  const menuEditHandler = (event) => {
    swithMenuHandler(event);
    showCardHandler();
  };

  const menuDeleteHandler = (event) => {
    swithMenuHandler(event);
    showDeleteCardHandler();
  };

  const deleteTagHandler = () => {
    const result = DeleteTag(label);
    result && dispacth(deleteOneTagAction(label));
  };

  return (
    <div className={styles.labels_item_container} id="label_item">
      <li>
        <Link href={`/application/label/${showLabel}`}>
          <Icon type="hashtag_big" className={styles.tag_box2} />
          <span className={`${styles.labels_item_content} ${styles.tag_box1}`}>
            <span className={styles.tag_box1}>{showLabel}</span>
            <div className={styles.tag_box2}>{num}</div>
          </span>
        </Link>
        <div
          className={styles.right_menu}
          style={{ opacity: showItemMenu && 1 }}
          id="right_menu"
        >
          <span onClick={showCardHandler} className={styles.right_menu_btn}>
            <Icon type="edit" />
          </span>
          <div className={styles.menu_btn_container}>
            <button
              onClick={swithMenuHandler}
              className={styles.right_menu_btn}
              style={{
                backgroundColor: showItemMenu && "#eeeeee",
                paddingLeft: "4px",
              }}
            >
              <Icon type="menu_filled" />
            </button>
            {showItemMenu && (
              <PopupMenu
                onOverlayClick={swithMenuHandler}
                position={buttonPosition}
                levels="2"
              >
                <div className={styles.task_item_action_menu}>
                  <button onClick={menuEditHandler}>
                    <Icon type="edit" id="icon"/>
                    <span>Edit label</span>
                  </button>
                  <hr />
                  <button onClick={menuDeleteHandler}>
                    <Icon type="delete" id="icon"/>
                    <span>Delete label</span>
                  </button>
                </div>
              </PopupMenu>
            )}
          </div>
        </div>
      </li>
      {showAddCard && (
        <NewLabel
          closeHandler={showCardHandler}
          label={label}
          changeShowHandler={setShowLabel}
        />
      )}
      {showDeleteCard && (
        <DeleteConfirmCard
          closeHandler={showDeleteCardHandler}
          actionFunction={deleteTagHandler}
          name={label}
          type="Delete"
        />
      )}
    </div>
  );
}

export default LabelItem;
