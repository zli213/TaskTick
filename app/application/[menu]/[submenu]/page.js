import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";
import getOneUserTasks from "../../../../src/utils/data/getOneUserTasks";

export default async function SubAppPages({ params }) {
  const tasks = await getOneUserTasks();

  switch (params.menu) {
    case "project":
      return <Project data={tasks} projectId={params.submenu} />;
    case "setting":
      return <Today data={tasks} settingMenu={params.submenu} />;
    default:
      notFound();
  }
}
