"use client";

import styles from "../../../styles/scss/application.module.scss";
import React from "react";
import Link from "next/link";
import { useEffect } from "react";

export default function MyProjects(props) {
  useEffect(() => {
    document.title = "My Projects - Todo";
    localStorage.setItem("lastPage", `projects/active`);
  }, []);

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>My Projects</h1>
          <div>
            <Link href="/application/setting/account" scroll={false}>
              <span>Setting</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.content_box}>
        <div>
          <input></input>
        </div>
        <div>add project</div>
        <div>2 prjects</div>
      </div>

      <div className={styles.content_box}>
        <ul>
          <li>dfdfdf</li>
        </ul>
      </div>
    </>
  );
}
