// "use client";

// import { useState } from "react";
import styles from "../../styles/scss/application.module.scss";
import Leftbar from "../../components/application/leftbar/Leftbar";
import Topbar from "../../components/application/topbar/Topbar";

export default function AppLayout(props) {
  // const [showLeftBar, setShowLeftBar] = useState(false);

  // const switchLeftBar = () => {
  //   setShowLeftBar((prevState) => !prevState);
  // };

  return (
    <>
      <Topbar /*switchHandler={switchLeftBar} */ />
      <div id="app-holder" className={styles.app_holder}>
        <Leftbar /*classes={showLeftBar ? styles.list_sidebar_hide : ""} */ />
        <div className={styles.content_holder}>{props.children}</div>
      </div>
      <div id="modal_box">{props.settingModal}</div>
      <div id="task_modal_box">{props.taskModal}</div>
    </>
  );
}
