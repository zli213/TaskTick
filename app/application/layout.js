import getProjects from "../../src/utils/data/getProjects";
import getTodayNum from "../../src/utils/data/getTodayNum";
import getInboxNum from "../../src/utils/data/getInboxNum";
import getProjectNum from "../../src/utils/data/getProjectNum";
import ClientLayout from "../../components/pages/AppPages/ClientLayout";
import "../../styles/scss/globals.scss";
import { ThemeProvider } from "../../components/application/widgets/ThemeProvider";

export default async function AppLayout(props) {
  var projects = await getProjects("johndoe123");
  projects = JSON.parse(JSON.stringify(await updateInfo(projects)));
  const inboxNum = await getInboxNum("johndoe123");
  const todayNum = await getTodayNum("johndoe123");

  return (
    <>
    <ThemeProvider>
            <ClientLayout projects={projects} inboxNum={inboxNum} todayNum={todayNum}>
        {props.children}
      </ClientLayout>
      <div id="modal_box">{props.settingModal}</div>
      <div id="task_modal_box">{props.taskModal}</div>

    </ThemeProvider>
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
