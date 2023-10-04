// TodoList.js
"use client";

import React, { useState } from "react";
import "./index.scss"

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  return (
    <div>
      <header className="view_header" >
        <div className="view_header_content">
          <h1>
            <span>Today</span>
            <small>10.05</small>
          </h1>
          <div>
            <button className="check_button">
              <div>icon</div>
              <span>check</span>
            </button>
          </div>
        </div>
      </header>
      <div className="view_content">
        <section>
            <header>
                <div>icon</div>
                <h2>Overdue</h2>
                <div>Action</div>
            </header>
            <div>lists</div>
        </section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
        <section>today</section>
      </div>
    </div>
  );
}

export default TodoList;
