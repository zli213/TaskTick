"use client";

import { useState, useEffect, use } from "react";
import styles from "../../../styles/scss/leftbar.module.scss";
import LeftItem from "../widgets/LeftItem";
import Link from "next/link";
import NewProject, { useProject } from "../widgets/NewProject";
import Icon from "../widgets/Icon";
import { useSelector } from "react-redux";

function Leftbar({ showClass }) {
  let projects = useSelector((state) => state.tasks.projects);
  projects = projects
    .filter((project) => project.archived !== true)
    .filter((project) => project.state !== "deleted");
  const inboxNum = useSelector((state) => state.tasks.inboxNum);
  const todayNum = useSelector((state) => state.tasks.todayNum);

  const [selectedItemType, setSeletedItemType] = useState("");
  const { showAddProjectCard, showProjectCardHandler } = useProject();
  const [showList, setShowList] = useState(true);

  const handleItemClick = (type) => {
    setSeletedItemType(type);
  };

  const clickListHandler = () => {
    setShowList((preState) => !preState);
  };

  useEffect(() => {
    const current = localStorage.getItem("lastPage");
    setSeletedItemType(current);
  }, []);

  return (
    <div className={`${styles.list_sidebar}  ${showClass && styles.hide_left}`} id="leftbar">
      <div>
        <LeftItem
          label="Inbox"
          link="/application/inbox"
          type="inbox"
          num={inboxNum}
          onClickHandler={() => handleItemClick("inbox")}
          isSelected={selectedItemType === "inbox"}
        />
        <LeftItem
          label="Today"
          link="/application/today"
          type="today"
          num={todayNum}
          onClickHandler={() => handleItemClick("today")}
          isSelected={selectedItemType === "today"}
        />
        <LeftItem
          label="Upcoming"
          link="/application/upcoming"
          type="upcoming"
          onClickHandler={() => handleItemClick("upcoming")}
          isSelected={selectedItemType === "upcoming"}
        />
        <LeftItem
          label="Filter&Labels"
          link="/application/filters-labels"
          type="filters-labels"
          onClickHandler={() => handleItemClick("filters")}
          isSelected={selectedItemType === "filters"}
        />
      </div>

      {/* Projects */}
      <div>
        <div
          className={`${styles.project_title} ${
            selectedItemType === "projects/active" ? styles.selected_item : ""
          }`}
        >
          <Link
            href="/application/projects/active"
            onClick={() => handleItemClick("projects/active")}
          >
            <h4 className={styles.leftbar_project_header}>My Projects</h4>
          </Link>
          <div className={styles.leftbar_btn}>
            <button onClick={showProjectCardHandler}>
              <Icon type="add" />
            </button>
            <button
              onClick={clickListHandler}
              className={showList ? "" : styles.show_project_icon}
            >
              <Icon type="down_arrow" />
            </button>
          </div>
        </div>

        <div
          className={`${styles.project_list} ${
            !showList && styles.project_list_hide
          }`}
        >
          {projects.map((project) => (
            <LeftItem
              key={project.projectId}
              label={project.name}
              link={`/application/project/${project.projectId}`}
              projectId={project.projectId}
              type="project"
              num={project.num}
              onClickHandler={() =>
                handleItemClick(`project/${project.projectId}`)
              }
              isSelected={selectedItemType === `project/${project.projectId}`}
            />
          ))}
        </div>
      </div>
      {showAddProjectCard && (
        <NewProject closeHandler={showProjectCardHandler} />
      )}
    </div>
  );
}

export default Leftbar;
