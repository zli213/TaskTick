import Project from "../../../../components/pages/AppPages/Project";
import Today from "../../../../components/pages/AppPages/Today";
import MyProjects from "../../../../components/pages/AppPages/MyProjects";
import TaskNotFound from "../../../../components/pages/NotFound/TaskNotFound";
import LabelPage from "../../../../components/pages/AppPages/Labels";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../../../api/auth/[...nextauth]/options";

import checkTaskExist from "../../../../src/utils/data/checkTaskExist";
import checkProjectExist from "../../../../src/utils/data/checkProjectExist";

export default async function SubAppPages({ params }) {
  const session = await getServerSession(options);

  //Check if Task exist
  if (params.menu === "task") {
    let ifTaskExist = await checkTaskExist(params.submenu);
    if (!ifTaskExist) {
      return <TaskNotFound title="Task" />;
    }
  }

  //Check if project exist
  if (params.menu === "project") {
    let ifProjectExist = await checkProjectExist(session.user.userId, params.submenu);
    if (!ifProjectExist) {
      return <TaskNotFound title="Project" />;
    }
  }

  switch (params.menu) {
    case "project":
      return <Project projectId={params.submenu} />;

    case "projects":
      return <MyProjects type={params.submenu} />;

    case "setting":
      return <Today settingMenu={params.submenu} />;
    case "task":
      return <Today taskId={params.submenu} />;

    case "label":
      return <LabelPage label={decodeURIComponent(params.submenu)} />;

    default:
      notFound();
  }
}
