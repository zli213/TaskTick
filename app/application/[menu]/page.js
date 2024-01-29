import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";
import MyProjects from "../../../components/pages/AppPages/MyProjects";

import { notFound } from "next/navigation";

export default async function AppPage({ params }) {

  switch (params.menu) {
    case "inbox":
      return <Inbox />;

    case "today":
      return <Today />;

    case "upcoming":
      return <Upcoming />;

    case "filters-labels":
      return <FilterPage />;

    case "projects":
      return <MyProjects />;

    case "setting":
      return <Today settingMenu={"account"} />;

    default:
      notFound();
  }
}
