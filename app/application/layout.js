// "use client";

// import { useState } from "react";
import styles from "../../styles/scss/application.module.scss";
import Leftbar from "../../components/application/leftbar/Leftbar";
import Topbar from "../../components/application/topbar/Topbar";
import getProjects from "../../src/utils/data/getProjects";
import getTodayNum from "../../src/utils/data/getTodayNum";
import getInboxNum from "../../src/utils/data/getInboxNum";
import getProjectNum from "../../src/utils/data/getProjectNum";

export default async function AppLayout(props) {
  // const [showLeftBar, setShowLeftBar] = useState(false);

  // const switchLeftBar = () => {
  //   setShowLeftBar((prevState) => !prevState);
  // };

  var projects = await getProjects("johndoe123");
  projects = await updateInfo(projects);
  const inboxNum = await getInboxNum("johndoe123");
  const todayNum = await getTodayNum("johndoe123");

  return (
    <>
      <Topbar /*switchHandler={switchLeftBar} */ />
      <div id="app-holder" className={styles.app_holder}>
        <Leftbar projects={projects} inboxNum={inboxNum} todayNum={todayNum} />
        <div className={styles.content_holder}>{props.children}</div>
      </div>
      <div id="modal_box">{props.settingModal}</div>
      <div id="task_modal_box">{props.taskModal}</div>
    </>
  );
}

async function updateInfo(list) {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    const number = await getProjectNum(list[i].projectId);

    newList[i] = {
      projectId: list[i].projectId,
      name: list[i].name,
      num: number,
    };
  }
  return newList;
}
