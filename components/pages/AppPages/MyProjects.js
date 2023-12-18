"use client";

import styles from "../../../styles/scss/application.module.scss";
import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import SettingIcon from "../../../public/icon/setting.svg";
import HashtagIcon from "../../../public/icon/hashtag.svg";
import SearchIcon from "../../../public/icon/search.svg";
import AddIcon from "../../../public/icon/add.svg";

export default function MyProjects(props) {
  useEffect(() => {
    document.title = "My Projects - Todo";
    localStorage.setItem("lastPage", `projects/active`);
  }, []);

  return (
    <>
      <div className={styles.view_header}>
        <div
          className={`${styles.view_header_content} ${styles.view_header_project}`}
        >
          <h1>My Projects</h1>
          <div>
            <Link href="/application/setting/account" scroll={false}>
              <SettingIcon />
              <span>Setting</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.content_box}>
        <div className={styles.searchArea_projects}>
          <SearchIcon />
          <input placeholder="Search projects"></input>
        </div>

        <div className={styles.btn_projects}>
          <div className={styles.active_btn_projects}>Active projects</div>
          <div className={styles.add_btn_projects}>
            <AddIcon />
            <span>Add project</span>
          </div>
        </div>
        <h4>{props.data.length} projects</h4>
      </div>

      <div className={styles.content_box}>
        <ul className={styles.project_list}>
          {props.data.map((project) => (
            <li key={project.projectId}>
              <Link href={`/application/project/${project.projectId}`}>
                <HashtagIcon />
                {project.name}
              </Link>
              <div>button</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
