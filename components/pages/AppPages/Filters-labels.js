"use client";

import TodoList from "../../application/widgets/TodoList";

function FilterPage(props) {
  localStorage.setItem("lastPage", "filters-labels");

  return (
    <>
      <h1>Filter Page</h1>
      <TodoList tasks={props.data} />;
    </>
  );
}

export default FilterPage;
