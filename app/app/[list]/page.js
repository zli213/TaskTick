"use client";

import React, { useState, useEffect, useContext } from "react";
import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import PageContext from "../../../components/context/page-context";

export default function AppPages({ params }) {
  const [activePage, setActivePage] = useState(null);
  const pagextx = useContext(PageContext);

  useEffect(() => {
    pagextx.updatePage(params.list);
    console.log(pagextx.currentPage);
    switch (params.list) {
      case "inbox":
        setActivePage(<Inbox />);
        break;
      case "today":
        setActivePage(<Today />);
        break;
    }
  }, [params]);

  return <div>{activePage}</div>;
}
