"use client";

import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

import styles from "../../../styles/scss/application.module.scss";
import Leftbar from "../../application/leftbar/Leftbar";
import Topbar from "../../application/topbar/Topbar";
import { initialAllState } from "../../../store/tasks";
import { ToastContainer } from "react-toastify";
import MyThemeContext from "../../application/widgets/MyThemeContext";
import { getCookie } from "cookies-next";

export default function ClientLayout(props) {
  const { setThemeName } = useContext(MyThemeContext);
  const [showLeftBar, setShowLeftBar] = useState(true);
  const [pageWidth, setPageWidth] = useState(1000);

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

  //to initial themeName and apply themes
  useEffect(() => {
    const theme = getCookie("themeName");
    setThemeName(theme);
  }, [setThemeName])

  const updatePageWidth = () => {
    const newWidth = window.innerWidth;
    setPageWidth(newWidth);

    if (newWidth < 600) {
      setShowLeftBar(false);
    } else {
      setShowLeftBar(true);
    }
  };

  useEffect(() => {
    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);

    return () => {
      window.removeEventListener('resize', updatePageWidth);
    };

  }, []);

  return (
    <div className={styles.app_layout}>
      <Topbar switchHandler={switchLeftBar} />
      <div id="app-holder" className={styles.app_holder}>
        <Leftbar showClass={showLeftBar} className={styles.leftbar} switchHandler={switchLeftBar} />
        <div className={styles.content_holder} id="content_holder2">{props.children}</div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        style={{ width: "auto" }}
        theme="dark"
        icon={false}
        hideProgressBar
        limit={1}
      />
    </div>
  );
}
