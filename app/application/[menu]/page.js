import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";
import MyProjects from "../../../components/pages/AppPages/MyProjects";
import getAllTasks from "../../../src/utils/data/getOneUserTasks";
import getProjects from "../../../src/utils/data/getProjects";
import getLabels from "../../../src/utils/data/getLabels";
import getTodayNum from "../../../src/utils/data/getTodayNum";

import { notFound } from "next/navigation";

export default async function AppPage({ params }) {
  const tasks = await getAllTasks();

  switch (params.menu) {
    case "inbox":
      return <Inbox data={tasks} />;

    case "today":
      const todayNum = await getTodayNum("johndoe123");
      return <Today data={tasks} num={todayNum} />;

    case "upcoming":
      return <Upcoming data={tasks} />;

    case "filters-labels":
      var labels = await getLabels("johndoe123");
      return <FilterPage labels={labels} />; //need edit

    case "projects":
      var projects = await getProjects("johndoe123");
      projects = JSON.parse(JSON.stringify(projects));
      return <MyProjects data={projects} />;

    case "setting":
      return <Today data={tasks} settingMenu={"account"} />;

    default:
      notFound();
  }
}
