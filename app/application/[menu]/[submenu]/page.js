import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";
import getOneUserTasks from "../../../../src/utils/data/getOneUserTasks";
import checkTaskExist from "../../../../src/utils/data/checkTaskExist";
import TaskNotFound from "../../../../components/pages/NotFound/TaskNotFound";
import MyProjects from "../../../../components/pages/AppPages/MyProjects";
import getProjects from "../../../../src/utils/data/getProjects";
import getProjectName from "../../../../src/utils/data/getProjectName";
import getBoards from "../../../../src/utils/data/getBoards";

export default async function SubAppPages({ params }) {
  const session = await getServerSession(options);

  //Check if Task exist
  if (params.menu == "task") {
    var ifTaskExist = await checkTaskExist(params.submenu);
    if (!ifTaskExist) {
      return <TaskNotFound />;
    }
  }
  const tasks = await getOneUserTasks(session.user.userId);

  switch (params.menu) {
    case "project":
      const projectName = await getProjectName(
        session.user.userId,
        params.submenu
      );
      const boards = await getBoards(session.user.userId , params.submenu);
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
      var projects = await getProjects(session.user.userId);
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
