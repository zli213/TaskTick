"use client";

import { useState, useEffect } from "react";
import Myprojects from "./myprojects/Myprojects";
import styles from "../../../styles/scss/leftbar.module.scss";
import LeftItem from "../widgets/LeftItem";

async function Leftbar({ classes, projects, inboxNum, todayNum }) {
  const [selectedItemType, setSeletedItemType] = useState("");

  const handleItemClick = (type) => {
    setSeletedItemType(type);
  };
  
  useEffect(() => {
    const current = localStorage.getItem("lastPage");
    setSeletedItemType(current)
    console.log(current);
  }, []);
  

  return (
    <div className={`${styles.list_sidebar} ${classes}`}>
      <div>
        <LeftItem
          label="Inbox"
          link="/application/inbox"
          type="inbox"
          num={inboxNum}
          onClick={() => handleItemClick("inbox")}
          isSelected={selectedItemType === "inbox"}
        />
        <LeftItem
          label="Today"
          link="/application/today"
          type="today"
          num={todayNum}
          onClick={() => handleItemClick("today")}
          isSelected={selectedItemType === "today"}
        />
        <LeftItem
          label="upcoming"
          link="/application/upcoming"
          type="upcoming"
          onClick={() => handleItemClick("upcoming")}
          isSelected={selectedItemType === "upcoming"}
        />
        <LeftItem
          label="Filter&Labels"
          link="/application/filters-labels"
          type="filters-labels"
          onClick={() => handleItemClick("filters")}
          isSelected={selectedItemType === "filters"}
        />
      </div>
      <Myprojects projectList={projects} />
    </div>
  );
}

export default Leftbar;
