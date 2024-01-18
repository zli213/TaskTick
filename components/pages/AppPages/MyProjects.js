"use client";

import styles from "../../../styles/scss/application.module.scss";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "../../application/widgets/Icon";
import NewProject, {useProject} from "../../application/widgets/NewProject";
import MyProjectItem from "../../application/widgets/MyProjectItem";

export default function MyProjects(props) {
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  
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
              <Icon type="setting" />
              <span>Setting</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.content_box}>
        <div className={styles.searchArea_projects}>
          <Icon type="search" />
          <input placeholder="Search projects"></input>
        </div>

        <div className={styles.btn_projects}>
          <div className={styles.active_btn_projects}>Active projects</div>
          <div className={styles.add_btn_projects} onClick={showProjectCardHandler}>
            <Icon type="add" />
            <span>Add project</span>
          </div>
        </div>
        <h4>{props.data.length} projects</h4>
      </div>

      <div className={styles.content_box}>
        <ul className={styles.project_list}>
          {props.data.map((project) => (
            <MyProjectItem project={project} key={project.projectId} />
          ))}
        </ul>
      </div>
      {showAddProjectCard && <NewProject closeHandler={showProjectCardHandler} />}
    </>
  );
}
