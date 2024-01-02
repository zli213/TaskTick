import React from "react";
import styles from "../../../styles/scss/application.module.scss";
import { useState } from "react";


function LabelItem() {
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
          <button className="label_edit_btn">
            <Icon type="menu_filled" />
          </button>
        </Link>
      </li>
    </div>
  );
}

export default LabelItem;
