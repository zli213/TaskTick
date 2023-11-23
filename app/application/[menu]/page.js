"use client";

import { useState, useEffect } from "react";
import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";

import { notFound } from "next/navigation";

export default function AppPage({ params }) {
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    switch (params.menu) {
      case "inbox":
        setActivePage(<Inbox />);
        break;
      case "today":
        setActivePage(<Today />);
        break;
      case "upcoming":
        setActivePage(<Upcoming />); 
        break;
      case "filters-labels":
        setActivePage(<FilterPage />); //need edit
        break;

      default:
        notFound();
    }
  }, [params]);

  return <div>{activePage}</div>;
}
