import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";
import getOneUserTasks from "../../../../src/utils/data/getOneUserTasks";
import checkTaskExist from "../../../../src/utils/data/checkTaskExist";
import TaskNotFound from "../../../../components/pages/NotFound/TaskNotFound";
import MyProjects from "../../../../components/pages/AppPages/MyProjects";

export default async function SubAppPages({ params }) {
  //Check if Task exist
  if (params.menu == "task") {
    var ifTaskExist = await checkTaskExist(params.submenu);
    if (!ifTaskExist) {
      return <TaskNotFound />;
    }
  }
  const tasks = await getOneUserTasks();

  switch (params.menu) {
    case "project":
      return <Project data={tasks} projectId={params.submenu} />;
    case "projects":
      return <MyProjects data={tasks} />;
    case "setting":
      return <Today data={tasks} settingMenu={params.submenu} />;
    case "task":
      return <Today data={tasks} taskId={params.submenu} />;
    default:
      notFound();
  }
}
