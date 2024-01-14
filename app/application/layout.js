import ClientLayout from "../../components/pages/AppPages/ClientLayout";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import getProjects from "../../src/utils/data/getProjects";
import getTodayNum from "../../src/utils/data/getTodayNum";
import getInboxNum from "../../src/utils/data/getInboxNum";
import getProjectNum from "../../src/utils/data/getProjectNum";
import { redirect } from "next/navigation";


export default async function AppLayout(props) {
  const session = await getServerSession(options);  
  if(session == null){
    redirect('/auth/signin');
  }

  var projects = await getProjects(session.user.userId);
  projects = JSON.parse(JSON.stringify(await updateInfo(projects)));
  const inboxNum = await getInboxNum(session.user.userId);
  const todayNum = await getTodayNum(session.user.userId);

  return (
    <>
      <ClientLayout projects={projects} inboxNum={inboxNum} todayNum={todayNum}>
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
      projectId: list[i].projectId,
      name: list[i].name,
      num: number,
    };
  }
  return newList;
}
