import { MongoClient } from "mongodb";
import Inbox from "../../../components/pages/AppPages/Inbox";
import Today from "../../../components/pages/AppPages/Today";
import Upcoming from "../../../components/pages/AppPages/Upcoming";
import FilterPage from "../../../components/pages/AppPages/Filters-labels";

import { notFound } from "next/navigation";

export default async function AppPage({ params }) {
  const client = await MongoClient.connect(
    "mongodb+srv://todo123:Z7xs799sOdztS5PU@tododata.ud04wyd.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("todo-database");

  const tasksCollections = db.collection("tasks");

  const tasks = await tasksCollections
    .find({ username: "johndoe123" })
    .toArray();
  client.close;

  const tasks2 = tasks.map((task) => {
    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      tags: task.tags,
      projectId: task.projectId ? task.projectId.toString() : "",
      projectName: task.projectName,
      board: task.board,
      priority: task.priority,
      dueDate: task.dueDate,
      time: task.time,
      userId: task.userId.toString(),
      username: task.username,
      completed: task.completed,
    };
  });
  // console.log(tasks2);

  switch (params.menu) {
    case "inbox":
      return <Inbox data={tasks2} />

    case "today":
      return <Today data={tasks2} />;

    case "upcoming":
      return <Upcoming data={tasks2} />;

    case "filters-labels":
      return <FilterPage data={tasks2} />; //need edit
      
    case "setting":
      return <Today data={tasks2} settingMenu={"account"} />;

    default:
      notFound();
  }
}
