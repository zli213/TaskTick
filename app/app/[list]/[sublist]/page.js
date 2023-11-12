"use client";

import React, { useState, useEffect } from "react";
import Project from "../../../../components/pages/AppPages/Project";

export default function SubAppPages({ params }) {
  console.log(params.sublist);
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    switch (params.list) {
      case "project":
        setActivePage(<Project projectId={params.sublist}  />);
        break;
      case "today":
        setActivePage(<Today />);
        break;
    }
  }, [params]);

  return <div>{activePage}</div>;
}
