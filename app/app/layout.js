"use client";

import styles from  "../../styles/scss/app.module.scss";
import AppNav from "../../components/layout/AppNav";
import Link from "next/link";
import { useState } from "react";

export default function ListLayout({ children }) {
  const [showLeftNav, setShowLeftNav] = useState(true);
  const switchLeftNav = () => {
    setShowLeftNav((prevState) => !prevState);
  };

  return (
    <>
      <AppNav switchHandler={switchLeftNav} />
      <div id="content-wrapper" className={styles.list_content}>
        {/* {showLeftNav && ( */}
        <div
          id="left-sidebar"
          className={`${styles.list_sidebar}  ${showLeftNav ? "" : styles.list_sidebar_hide }`}
        >
          <div id="top">
            <ul>
              <Link href="/app/inbox">
                <li>
                  <span>🫡 Indox</span>
                  <span>3</span>{" "}
                </li>
              </Link>
              <Link href="/app/today">
                <li>
                  <span>🫡 Today</span>
                  <span>4</span>
                </li>
              </Link>
              <Link href="/app/upcoming">
                <li>
                  <span>🫡 Preview</span>
                </li>
              </Link>
              <Link href="/app/filters-labels">
                <li>
                  <span>🫡 Filter&Labels</span>
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <div>Project</div>
            <div>
              <ul>
                <Link href="/app/project/123">
                  <li>
                    <span>My Work</span>
                  </li>
                </Link>
                <Link href="/app/project/234">
                  <li>
                    <span>Family</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {/* )} */}
        <main className={styles.main_content}>{children}</main>
      </div>
    </>
  );
}
