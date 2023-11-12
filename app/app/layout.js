"use client";

import "./app.scss";
import { ListNav } from "../../components/layout/ListNav";
import Link from "next/link";
import { useState } from "react";
import { PageContextProvider } from "../../components/context/page-context";

export default function ListLayout({ children }) {
  const [showLeftNav, setShowLeftNav] = useState(true);
  const switchLeftNav = () => {
    setShowLeftNav((prevState) => !prevState);
  };

  return (
    <>
      <ListNav switchHandler={switchLeftNav} />
      <div id="content-wrapper" className="list_content">
        {showLeftNav && (
          <div id="left-sidebar" className="list_sidebar">
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
        )}
        <main className="main_content">
          <PageContextProvider>{children}</PageContextProvider>
        </main>
      </div>
    </>
  );
}
