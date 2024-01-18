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

  const content1 = "Are you sure you want to delete ";
  const content2 = "?";
  const content3 = 'This will permanently delete "';
  const content4 = "\" and all of its tasks. This can't be undone.";

  const deleteHandler = async () => {
    switch (props.type) {
      case "label":
        await DeleteTag(props.name) && props.closeHandler();
        break;
      case "project":
        await DeleteProject(props.projectId) && props.closeHandler();
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
              {props.type != "project" ? content1 : content3}
              <span className={styles.name}>{props.name}</span>
              {props.type != "project" ? content2 : content4}
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


//Delete functions

async function DeleteTag(tag) {
  try {
    const res = await fetch("/api/deletetag", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tag }),
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}

async function DeleteProject(projectId) {
  try {
    const res = await fetch("/api/deleteproject", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    });

    if (res.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occured: ", error);
  }
}