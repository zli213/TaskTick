import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";
import MyProjects from "../../../components/pages/AppPages/MyProjects";

import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import getOneUserTasks from "/src/utils/data/getOneUserTasks";
import getProjects from "../../../src/utils/data/getProjects";
import getLabels from "../../../src/utils/data/getLabels";
import getTodayNum from "../../../src/utils/data/getTodayNum";
import getUserTags from "../../../src/utils/data/getUserTags";

import { notFound } from "next/navigation";

export default async function AppPage({ params }) {
  const session = await getServerSession(options);
  const tasks = await getOneUserTasks(session.user.userId);

  let tags = await getUserTags(session.user.userId);

  switch (params.menu) {
    case "inbox":
      return <Inbox data={tasks} alltags={tags} />;

    case "today":
      const todayNum = await getTodayNum(session.user.userId);
      return <Today data={tasks} num={todayNum} alltags={tags} />;

    case "upcoming":
      return <Upcoming data={tasks} alltags={tags} />;

    case "filters-labels":
      var labels = await getLabels(session.user.userId);
      return <FilterPage labels={labels} />; //need edit

    case "projects":
      var projects = await getProjects(session.user.userId);
      projects = JSON.parse(JSON.stringify(projects));
      return <MyProjects data={projects} />;

    case "setting":
      return <Today data={tasks} settingMenu={"account"} alltags={tags} />;

    default:
      notFound();
  }
}
