"use client";

import TodoList from "../../application/widgets/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Today(props) {
  //fetch today's job
  const router = useRouter();

  if ("settingMenu" in props ) {
    router.push(`/application/setting/${props.settingMenu}`);
  }

  return (
    <>
      <h1>Today</h1>

      <TodoList datas={DUMMY_TASKS} />
    </>
  );
}

export default Today;
