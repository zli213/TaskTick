import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";
import getOneUserTasks from "../../../../src/utils/data/getOneUserTasks";
import checkTaskExist from "../../../../src/utils/data/checkTaskExist";
import TaskNotFound from "../../../../components/pages/NotFound/TaskNotFound";
import MyProjects from "../../../../components/pages/AppPages/MyProjects";
import getProjects from "../../../../src/utils/data/getProjects";
import getProjectName from "../../../../src/utils/data/getProjectName";
import getBoards from "../../../../src/utils/data/getBoards";

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
      const projectName = await getProjectName(params.submenu);
      const boards = await getBoards("johndoe123", params.submenu);
      const projectTasks = tasks.filter((task) => {
        return task.projectId == params.submenu;
      });
      return (
        <Project
          projectId={params.submenu}
          projectName={projectName}
          tasks={projectTasks}
          boards={boards}
        />
      );

    case "projects":
      var projects = await getProjects("johndoe123");
      projects = JSON.parse(JSON.stringify(projects));
      return <MyProjects data={projects} />;

    case "setting":
      return <Today data={tasks} settingMenu={params.submenu} />;
    case "task":
      return <Today data={tasks} taskId={params.submenu} />;
    default:
      notFound();
  }
}
