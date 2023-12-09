"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import AddTask from "../../application/widgets/AddTask";
import { useEffect } from "react";

function Today(props) {
  const router = useRouter();
  localStorage.setItem("lastPage", "today");

  //use timestamp to compare if the item dueDate is today
  const todayTasks = props.data.filter((task) => {
    return task.dueDate.getTime() == new Date().getTime();
  });

  useEffect(() => {
    if ("settingMenu" in props) {
      router.push(`/application/setting/${props.settingMenu}`);
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
