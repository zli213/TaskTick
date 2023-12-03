import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";
import getAllTasks from "../../../src/utils/data/getOneUserTasks";

import { notFound } from "next/navigation";

export default async function AppPage({ params }) {
  const tasks = await getAllTasks();

  switch (params.menu) {
    case "inbox":
      return <Inbox data={tasks} />;

    case "today":
      return <Today data={tasks} />;

    case "upcoming":
      return <Upcoming data={tasks} />;

    case "filters-labels":
      return <FilterPage data={tasks} />; //need edit

    case "setting":
      return <Today data={tasks} settingMenu={"account"} />;
    default:
      notFound();
  }
}
