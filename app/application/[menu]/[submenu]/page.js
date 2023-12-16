import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";
import getOneUserTasks from "../../../../src/utils/data/getOneUserTasks";
import checkTaskExist from "../../../../src/utils/data/checkTaskExist";
import TaskNotFound from "../../../../components/pages/NotFound/TaskNotFound";

export default async function SubAppPages({ params }) {
  //Check if Task exist
  var ifTaskExist = await checkTaskExist(params.submenu);
  if (params.menu == "task" && !ifTaskExist) {
    return <TaskNotFound />;
  }
  const tasks = await getOneUserTasks();

  switch (params.menu) {
    case "project":
      return <Project data={tasks} projectId={params.submenu} />;
    case "setting":
      return <Today data={tasks} settingMenu={params.submenu} />;
    case "task":
      return <Today data={tasks} taskId={params.submenu} />;
    default:
      notFound();
  }
}
