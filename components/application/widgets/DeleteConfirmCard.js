/**
 * Delete confirmation popup card, with archive project comfirmation.
 * Author: Ryan
 */

"use client";

import React, { useState } from "react";
import styles from "../../../styles/scss/components/application/widgets/deleteConfirmCard.module.scss";
import Modal from "./Modal";
import Icon from "./Icon";
import { useRouter } from "next/navigation";

import { DeleteTag, DeleteProject, ArchiveProject,} from "../../../public/CommonFunctions";

//Custom React hook -> useDelete
export const useDelete = () => {
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [ifArchive, setIfArchive] = useState(false);

  const showDeleteCardHandler = () => {
    setIfArchive(false);
    setShowDeleteCard((preState) => !preState);
  };

  const showArchiveCardHandler = () => {
    setIfArchive(true);
    setShowDeleteCard((preState) => !preState);
  };

  return {
    ifArchive,
    showDeleteCard,
    showDeleteCardHandler,
    showArchiveCardHandler,
  };
};

//Delete confirm card
function DeleteConfirmCard(props) {
  const router = useRouter();

  const content1 = "Are you sure you want to delete ";
  const content2 = "?";
  const content3 = props.ifArchive
    ? "Are you sure you want to archive "
    : 'This will permanently delete "';
  const content4 = props.ifArchive
    ? "?"
    : "\" and all of its tasks. This can't be undone.";

  const deleteHandler = async () => {
    switch (props.type) {
      case "label":
        (await DeleteTag(props.name)) && props.closeHandler();
        break;
      case "project":
        if (props.ifArchive) {
          (await ArchiveProject(props.projectId)) && props.closeHandler();
          const lastPage = localStorage.getItem("lastPage");
          lastPage.includes(props.projectId) && router.push("/application/inbox");
        } else {
          await DeleteProject(props.projectId);
          const lastPage = localStorage.getItem("lastPage");
          lastPage.includes(props.projectId) && router.push("/application/inbox");
        }
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
              {props.ifArchive ? "Archive" : "Delete"}
            </button>
          </footer>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteConfirmCard;
