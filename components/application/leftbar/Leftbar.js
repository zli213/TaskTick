"use client";

import { useState, useEffect } from "react";
import styles from "../../../styles/scss/leftbar.module.scss";
import LeftItem from "../widgets/LeftItem";

async function Leftbar({ classes, projects, inboxNum, todayNum }) {
  const [selectedItemType, setSeletedItemType] = useState("");

  //Question: Will cause whole page refresh
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
          label="upcoming"
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
        <div>
          <h4 className={styles.leftbar_prject_header}>My Projects</h4>
        </div>
        {projects.map((project) => (
          <LeftItem
            key={project.projectId}
            label={project.name}
            link={`/application/project/${project.projectId}`}
            type="project"
            num={project.num}
            onClickHandler={() => handleItemClick(project.projectId)}
            isSelected={selectedItemType === project.projectId}
          />
        ))}
      </div>
    </div>
  );
}

export default Leftbar;
