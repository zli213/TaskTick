"use client";

import React, { useState, useEffect, useContext } from "react";
import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import Inbox from "../../../../components/pages/AppPages/Inbox";
import SettingsCard from "../../../../components/layout/Settings";
import PageContext from "../../../../components/context/page-context";
import { useRouter } from "next/navigation";

export default function SubAppPages({ params }) {
  const [activePage, setActivePage] = useState(null);
  const [isSetting, setIsSetting] = useState(false);
  const pagectx = useContext(PageContext);
  const router = useRouter();

  const openSettingHandler = () => {
    setIsSetting(true);
  };

  const closeSettingHandler = () => {
    // setIsSetting(false);
    const param2 =
      pagectx.currentPage[1] == undefined ? "" : pagectx.currentPage[1];

    router.push(`/app/${pagectx.currentPage[0]}/${param2}`);
  };

  useEffect(() => {
    if (params.list != "settings" && params.list != "task") {
      pagectx.updatePage(params.list, params.sublist);
    }
    console.log(pagectx.currentPage);

    if (params.list == "project") {
      setActivePage(<Project projectId={params.sublist} />);
    }

    if (params.list == "settings") {
      openSettingHandler();

      switch (pagectx.currentPage[0]) {
        case "inbox":
          setActivePage(<Inbox />);
          break;
        case "today":
          setActivePage(<Today />);
          break;
        case "project":
          setActivePage(<Project projectId={pagectx.currentPage[1]} />);

          break;
      }
    }

    console.log(isSetting);
  }, [params]);

  return (
    <div>
      {activePage}
      {isSetting && (
        <SettingsCard
          subMenu={params.sublist}
          closeHandler={closeSettingHandler}
        />
      )}
    </div>
  );
}
