/**
 * Delete confirmation popup card, with archive project comfirmation.
 * Author: Ryan
 *
 * @param
 * - closeHandler
 * - actionFunction
 * - name
 * - type
 * - content1 (optional)
 * - content2 (optional)
 *
 * @Usage
 * Like this:
 *     const { showDeleteCard, showDeleteCardHandler } = useDelete();
 *
 *  {showDeleteCard && (
 *     <DeleteConfirmCard
 *           closeHandler={showDeleteCardHandler}
 *           actionFunction={deleteTagHandler}
 *           name={label}
 *           type="Delete"
 *     />
 *   )}
 * If you want to change the content, use fields pass it in the compoment. Example is MyProjectItem.js
 * If you don't need to change the content, example is LabelItem.js
 */

"use client";

import React, { useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/deleteConfirmCard.module.scss";
import Modal from "./Modal";
import Icon from "./Icon";
import { useRouter } from "next/navigation";

//Custom React hook -> useDelete
export const useDelete = () => {
  const [showDeleteCard, setShowDeleteCard] = useState(false);

  const showDeleteCardHandler = () => {
    setShowDeleteCard((preState) => !preState);
  };

  return {
    showDeleteCard,
    showDeleteCardHandler,
  };
};

//Delete confirm card
function DeleteConfirmCard(props) {
  const router = useRouter();

  const content1 = props.content1
    ? props.content1
    : "Are you sure you want to delete ";
  const content2 = props.content2 ? props.content2 : "?";

  const actionHandler = () => {
    props.actionFunction();
    router.refresh();
  };

  return (
    <div onClick={props.closeHandler}>
      <Modal>
        <div className={styles.delete_container}>
          <div className={styles.header}>
            <Icon type="info" />
            <Icon
              className={styles.close}
              onClick={props.closeHandler}
              type="close"
            />
          </div>
          <div className={styles.content_holder}>
            <p>
              {content1}
              <span className={styles.name}>{props.name}</span>
              {content2}
            </p>
          </div>
          <footer className={styles.footer_btn}>
            <button onClick={props.closeHandler} className={styles.btn_cancel}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.btn_delete}
              onClick={actionHandler}
            >
              {props.type}
            </button>
          </footer>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteConfirmCard;
