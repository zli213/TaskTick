"use client";

import { useState } from "react";

import styles from "../../../styles/scss/application.module.scss";
import Leftbar from "../../application/leftbar/Leftbar";
import Topbar from "../../application/topbar/Topbar";
import { ToastContainer } from "react-toastify";

export default function ClientLayout(props) {
  const [showLeftBar, setShowLeftBar] = useState(false);

  const switchLeftBar = () => {
    setShowLeftBar((prevState) => !prevState);
  };

  return (
    <div className={styles.app_layout}>
      <Topbar switchHandler={switchLeftBar} />
      <div id="app-holder" className={styles.app_holder}>
        <Leftbar
          showClass={showLeftBar}
          projects={props.projects}
          inboxNum={props.inboxNum}
          todayNum={props.todayNum}
        />
        <div className={styles.content_holder}>{props.children}</div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </div>
  );
}
