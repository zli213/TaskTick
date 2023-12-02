import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";
import getAllTasks from "../../../../components/data/getAllTasks";

export default async function SubAppPages({ params }) {
  const tasks = await getAllTasks();

  switch (params.menu) {
    case "project":
      return <Project data={tasks} projectId={params.submenu} />;
    case "setting":
      return <Today data={tasks} settingMenu={params.submenu} />;
    default:
      notFound();
  }
}
