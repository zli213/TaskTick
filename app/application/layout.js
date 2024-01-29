import ClientLayout from "../../components/pages/AppPages/ClientLayout";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import getProjects from "../../src/utils/data/getProjects";
import getTodayNum from "../../src/utils/data/getTodayNum";
import getInboxNum from "../../src/utils/data/getInboxNum";
import getProjectNum from "../../src/utils/data/getProjectNum";
import getUserTags from "../../src/utils/data/getUserTags";
import getOneUserTasks from "../../src/utils/data/getOneUserTasks";
import { redirect } from "next/navigation";

export default async function AppLayout(props) {
  const session = await getServerSession(options);
  if (session == null) {
    redirect("/auth/signin");
  }

  let tasks = await getOneUserTasks(session.user.userId);
  tasks = tasks.filter((task) => task.archived !== true);

  let projects = await getProjects(session.user.userId);
  projects = await updateInfo(projects);

  const inboxNum = await getInboxNum(session.user.userId);
  const todayNum = await getTodayNum(session.user.userId);
  let tags = await getUserTags(session.user.userId);
  
  return (
    <>
      <ClientLayout
        tasks={tasks}
        projects={projects}
        inboxNum={inboxNum}
        todayNum={todayNum}
        allTags={tags}
      >
        {props.children}
      </ClientLayout>
      <div id="modal_box">{props.settingModal}</div>
      <div id="task_modal_box">{props.taskModal}</div>

    </>
  );
}

async function updateInfo(list) {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    const number = await getProjectNum(list[i].projectId);

    newList[i] = {
      projectId: list[i].projectId.toString(),
      name: list[i].name,
      boards: list[i].boards,
      archived: list[i].archived,
      num: number,
    };
  }
  return newList;
}
