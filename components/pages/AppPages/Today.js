"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import AddTask from "../../application/widgets/AddTask";
import { useEffect } from "react";

function Today(props) {
  const router = useRouter();

  //use timestamp to compare if the item dueDate is today
  const todayTasks = props.data.filter((task) => {
    return task.dueDate.getTime() == new Date().getTime();
  });

  useEffect(() => {
    localStorage.setItem("lastPage", "today");

    if ("settingMenu" in props) {
      router.push(`/application/setting/${props.settingMenu}`);
    }

    if ("taskId" in props) {
      router.push(`/application/task/${props.taskId}`);
    }
  }, []);

  return (
    <>
      <h1>Today</h1>
      <AddTask />
      <TodoList tasks={todayTasks} />
    </>
  );
}

export default Today;
