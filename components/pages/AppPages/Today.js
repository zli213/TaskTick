// "use client";

import TodoList from "../../application/widgets/TodoList";
import { DUMMY_TASKS } from "../../../public/dummy-data";
import { useEffect } from "react";
import { redirect } from "next/navigation";

function Today(props, req) {
  //fetch today's job

  useEffect(() => {
    if ("settingMenu" in props) {
      redirect("/application/setting/account", "replace");
      // router.push('/application/setting/account');
    }
  }, [props.settingMenu]);

  return (
    <>
      <h1>Today</h1>

      <TodoList datas={DUMMY_TASKS} />
    </>
  );
}

export default Today;
