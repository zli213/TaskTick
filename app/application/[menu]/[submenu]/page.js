"use client";

import React, { useState, useEffect } from "react";
import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";

export default function SubAppPages({ params }) {
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    if (params.menu != "setting") {
      localStorage.setItem("lastPage", `${params.menu}/${params.submenu}`);
    }

    switch (params.menu) {
      case "project":
        setActivePage(<Project projectId={params.submenu} />);
        break;
      case "setting":
        localStorage.setItem("lastPage", `today`);
        setActivePage(<Today settingMenu={params.submenu} />);
        break;
      default:
        notFound();
    }
  }, [params]);

  return <div>{activePage}</div>;
}
