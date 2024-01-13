"use client";

import { useState, useEffect, use } from "react";
import styles from "../../../styles/scss/leftbar.module.scss";
import LeftItem from "../widgets/LeftItem";
import Link from "next/link";
import NewProject from "../widgets/NewProject";
import Icon from "../widgets/Icon";

function Leftbar({ showClass, projects, inboxNum, todayNum }) {
  const [selectedItemType, setSeletedItemType] = useState("");
  const [showList, setShowList] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);

  const showCardHandler = () => {
    setShowAddCard((preState) => !preState);
  };

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
    <div className={`${styles.list_sidebar}  ${showClass && styles.hide_left}`}>
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
            <button onClick={showCardHandler}>
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
      {showAddCard && <NewProject closeHandler={showCardHandler} />}
    </div>
  );
}

export default Leftbar;
