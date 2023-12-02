"use client";

import TodoList from "../../application/widgets/TodoList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Today(props) {
  const router = useRouter();
  localStorage.setItem("lastPage", "today");

  //use timestamp to compare if the item dueDate is todya
  const todayTasks = props.data.filter((task) => {
    return task.dueDate.getTime() == new Date().getTime();
  });

  // console.log(props.data[0].dueDate.getTime());
  // console.log(new Date("2023-11-30 13:00").getTime());
  // console.log("test");
  // console.log(todayTasks);

  useEffect(() => {
    if ("settingMenu" in props) {
      router.push(`/application/setting/${props.settingMenu}`);
    }
  }, []);

  return (
    <>
      <h1>Today</h1>
      <TodoList tasks={todayTasks} />
    </>
  );
}

export default Today;
