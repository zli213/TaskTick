"use client";

import React from "react";
import TodoList from "../../application/widgets/TodoList";

function Upcoming(props) {
  localStorage.setItem("lastPage", "upcoming");

  return (
    <>
      <h1>Upcoming</h1>
      <TodoList tasks={props.data} />;
    </>
  );
}

export default Upcoming;
