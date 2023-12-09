"use client";

import React from "react";
import TodoList from "../../application/widgets/TodoList";
import { useEffect } from "react";

function Upcoming(props) {
  useEffect(() => {
    localStorage.setItem("lastPage", "upcoming");
  }, []);

  return (
    <>
      <h1>Upcoming</h1>
      <TodoList tasks={props.data} />;
    </>
  );
}

export default Upcoming;
