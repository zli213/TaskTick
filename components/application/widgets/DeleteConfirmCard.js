/**
 * Delete confirm popup card.
 * Author: Ryan
 */

"use client";

import React, { useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/deleteConfirmCard.module.scss";
import Modal from "./Modal";
import Icon from "./Icon";
import { useRouter } from "next/navigation";

//Custom React hook -> useLabel
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

  const deleteHandler = async () => {
    switch (props.type) {
      case "label":
        (await DeleteTag(props.name)) && props.closeHandler();
        break;
    }
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
              Are you sure you want to delete{" "}
              <span className={styles.name}>{props.name}</span>?
            </p>
          </div>
          <footer className={styles.footer_btn}>
            <button onClick={props.closeHandler} className={styles.btn_cancel}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.btn_delete}
              onClick={deleteHandler}
            >
              Delete
            </button>
          </footer>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteConfirmCard;

async function DeleteTag(tag) {
  try {
    const res = await fetch("/api/deletetag", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });
    const result = await res.json();
    console.log(result);

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}
