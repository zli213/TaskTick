"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../../styles/scss/application.module.scss";
import Leftbar from "../../application/leftbar/Leftbar";
import Topbar from "../../application/topbar/Topbar";
import { initialTasksState } from "../../../store/tasks";
import { initialInfo } from "../../../store/userInfo";

export default function ClientLayout(props) {
  const [showLeftBar, setShowLeftBar] = useState(false);

  const dispatch = useDispatch();

  dispatch(
    initialTasksState({
      tasks: JSON.stringify(props.tasks),
      inboxNum: props.inboxNum,
      todayNum: props.todayNum,
      projects: props.projects,
      tags: props.allTags,
    })
  );

  const switchLeftBar = () => {
    setShowLeftBar((prevState) => !prevState);
  };

  return (
    <div className={styles.app_layout}>
      <Topbar switchHandler={switchLeftBar} />
      <div id="app-holder" className={styles.app_holder}>
        <Leftbar showClass={showLeftBar} />
        <div className={styles.content_holder}>{props.children}</div>
      </div>
    </div>
  );
}
