"use client";

import { useState, useEffect } from "react";
import styles from "../../../styles/scss/leftbar.module.scss";
import LeftItem from "../widgets/LeftItem";
import Link from "next/link";

function Leftbar({ classes, projects, inboxNum, todayNum }) {
  const [selectedItemType, setSeletedItemType] = useState("");

  ////Question: Will cause whole page refresh
  const handleItemClick = (type) => {
    setSeletedItemType(type);
  };

  useEffect(() => {
    const current = localStorage.getItem("lastPage");
    setSeletedItemType(current);
  }, []);

  return (
    <div className={`${styles.list_sidebar} ${classes}`}>
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
          onClick={() => handleItemClick("projects/active")}
        >
          <Link href="/application/projects/active">
            <h4 className={styles.leftbar_project_header}>My Projects</h4>
          </Link>
          <span>buttons</span>
        </div>

        {projects.map((project) => (
          <LeftItem
            key={project.projectId}
            label={project.name}
            link={`/application/project/${project.projectId}`}
            type="project"
            num={project.num}
            onClickHandler={() => handleItemClick(`project/${project.projectId}`)}
            isSelected={selectedItemType === `project/${project.projectId}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Leftbar;
