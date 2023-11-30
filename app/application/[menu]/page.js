"use client";

import { useState, useEffect } from "react";
import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";
import { useRouter } from "next/navigation";

import { notFound } from "next/navigation";

export default function AppPage({ params }) {
  const router = useRouter();
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    if (params.menu != "setting") {
      localStorage.setItem("lastPage", params.menu);
    }

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
      case "setting":
        setActivePage(<Today />);
        router.push(`/application/setting/account`);
        break;

      default:
        notFound();
    }
  }, [params]);

  return <div>{activePage}</div>;
}
