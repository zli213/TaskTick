"use client";

import TodoList from "../../application/widgets/TodoList";
import { useEffect } from "react";

function FilterPage(props) {
  useEffect(() => {
    localStorage.setItem("lastPage", "filters-labels");
  }, []);

  return (
    <div>
      <h1>Filter Page</h1>
      <TodoList tasks={props.data} />;
    </div>
  );
}

export default FilterPage;
