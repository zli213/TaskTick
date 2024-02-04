"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../../../styles/scss/application.module.scss";
import Leftbar from "../../application/leftbar/Leftbar";
import Topbar from "../../application/topbar/Topbar";
import { initialAllState } from "../../../store/tasks";

export default function ClientLayout(props) {
  const [showLeftBar, setShowLeftBar] = useState(false);
  const dispatch = useDispatch();

  dispatch(
    initialAllState(
      JSON.stringify(props.tasks),
      props.projects,
      props.inboxNum,
      props.todayNum,
      props.allTags,
      JSON.stringify(props.completedTasks)
    )
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
