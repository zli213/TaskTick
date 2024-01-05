import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";
import MyProjects from "../../../components/pages/AppPages/MyProjects";
import getAllTasks from "../../../src/utils/data/getOneUserTasks";
import getProjects from "../../../src/utils/data/getProjects";

import { notFound } from "next/navigation";

export default async function AppPage({ params }) {
  const tasks = await getAllTasks();
  console.log(tasks);
  var projects = await getProjects("johndoe123");
  projects = JSON.parse(JSON.stringify(projects));

  switch (params.menu) {
    case "inbox":
      return <Inbox data={tasks} />;

    case "today":
      return <Today data={tasks} />;

    case "upcoming":
      return <Upcoming data={tasks} />;

    case "filters-labels":
      return <FilterPage data={tasks} />; //need edit

    case "projects":
      return <MyProjects data={projects} />;

    case "setting":
      return <Today data={tasks} settingMenu={"account"} />;
    default:
      notFound();
  }
}
