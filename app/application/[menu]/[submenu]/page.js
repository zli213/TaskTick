import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import MyProjects from "../../../../components/pages/AppPages/MyProjects";
import TaskNotFound from "../../../../components/pages/NotFound/TaskNotFound";
import LabelPage from "../../../../components/pages/AppPages/Labels";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";
import getOneUserTasks from "../../../../src/utils/data/getOneUserTasks";
import checkTaskExist from "../../../../src/utils/data/checkTaskExist";
import getProjects from "../../../../src/utils/data/getProjects";
import getLabelTasks from "../../../../src/utils/data/getLabelTasks";
import getSingleProject from "../../../../src/utils/data/getSingleProject";

export default async function SubAppPages({ params }) {
  const session = await getServerSession(options);
  if (session == null) {
    redirect("/auth/signin");
  }

  //Check if Task exist
  if (params.menu == "task") {
    let ifTaskExist = await checkTaskExist(params.submenu);
    if (!ifTaskExist) {
      return <TaskNotFound />;
    }
  }
  let tasks = await getOneUserTasks(session.user.userId);
  tasks = tasks.filter((task) => task.archived !== true);

  switch (params.menu) {
    case "project":
      const project = await getSingleProject(
        session.user.userId,
        params.submenu
      );

      const projectTasks = tasks.filter((task) => {
        return task.projectId == params.submenu;
      });
      return (
        <Project
          projectId={params.submenu}
          projectName={project.name}
          tasks={projectTasks}
          boards={project.boards}
          archived={project.archived}
        />
      );

    case "projects":
      var projects = await getProjects(session.user.userId);
      projects = JSON.parse(JSON.stringify(projects));
      return <MyProjects data={projects} type={params.submenu} />;

    case "setting":
      return <Today data={tasks} settingMenu={params.submenu} />;
    case "task":
      return <Today data={tasks} taskId={params.submenu} />;

    case "label":
      console.log(params.submenu);
      const labelTasks = await getLabelTasks(
        session.user.userId,
        decodeURIComponent(params.submenu)
      );
      return (
        <LabelPage
          tasks={labelTasks}
          label={decodeURIComponent(params.submenu)}
        />
      );

    default:
      notFound();
  }
}
