"use client";

import styles from "../../../styles/scss/application.module.scss";
import React, { useEffect } from "react";
import Link from "next/link";
import Icon from "../../application/widgets/Icon";
import NewProject, { useProject } from "../../application/widgets/NewProject";
import MyProjectItem from "../../application/widgets/MyProjectItem";
import { notFound } from "next/navigation";
import PopupMenu, { useMenu } from "../../application/widgets/PopupMenu";
import { useSelector } from "react-redux";

export default function MyProjects(props) {
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  const { showItemMenu, buttonPosition, swithMenuHandler } = useMenu();

  let projects = useSelector((state) => state.tasks.projects);
  projects = projects.filter((project) => project.state !== "deleted");
  if (props.type === "active") {
    projects = projects.filter(
      (project) => project.archived !== true || project.archived === undefined
    );
  } else if (props.type === "archived") {
    projects = projects.filter(
      (project) => project.archived === true && project.archived !== undefined
    );
  } else {
    notFound();
  }

  useEffect(() => {
    document.title = "My Projects - Todo";
    localStorage.setItem("lastPage", `projects/active`);
  }, []);

  return (
    <>
      <div className={styles.view_header} id="viewHeader">
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
          <div className={styles.menu_btn_container}>
            <div
              className={`${styles.active_btn_projects} ${styles.project_btn}`}
              onClick={swithMenuHandler}
            >
              {props.type === "active"
                ? "Active projects"
                : "Archived projects"}{" "}
              <Icon type="down_arrow_small"/>
            </div>
            {showItemMenu && (
              <PopupMenu
                onOverlayClick={swithMenuHandler}
                position={buttonPosition}
                levels="3"
              >
                <div className={`${styles.task_item_action_menu}`}>
                  <h4>Project type</h4>
                  <Link href="/application/projects/active" id="option_link">
                    <div>
                      <Icon type="list" />
                      <span>Active project</span>
                    </div>
                    {props.type === "active" && <Icon type="check" />}
                  </Link>
                  <Link href="/application/projects/archived" id="option_link">
                    <div>
                      <Icon type="archive" />
                      <span>Archived project</span>
                    </div>
                    {props.type === "archived" && <Icon type="check" />}
                  </Link>
                </div>
              </PopupMenu>
            )}
          </div>
          <div
            className={`${styles.add_btn_projects} ${styles.project_btn}`}
            onClick={showProjectCardHandler}
            id="add_btn"
          >
            <Icon type="add" />
            <span>Add project</span>
          </div>
        </div>
        <h4>{projects.length} projects</h4>
      </div>

      <div className={styles.content_box}>
        <ul className={styles.project_list}>
          {projects.map((project) => (
            <MyProjectItem
              project={project}
              key={project.projectId}
              type={props.type}
            />
          ))}
        </ul>
      </div>

      {showAddProjectCard && (
        <NewProject closeHandler={showProjectCardHandler} />
      )}
    </>
  );
}
