// TodoList.js
// "use client";

import { SingleItems } from "./SingleItem";
import styles from "../../../styles/scss/todoList.module.scss";
import AddTask from "./AddTask";
import Icon from "./Icon";

function TodoList({ tasks, title }) {
  return (
    <section className={styles.section}>
      {title != "" && title != null ?  (
        <header className={styles.todolist_header}>
          <div className={styles.content_wrapper}>
            <Icon type="down_arrow_small" />
          </div>
          <h4>{title}</h4>
        </header>
      ) : ""}

      <div>
        {tasks
          .filter((data) => data.completed == false)
          .map((data) => (
            <SingleItems
              key={data._id}
              _id={data._id}
              title={data.title}
              dueDate={data.dueDate}
              description={data.description}
              projectName={data.projectName}
              projectId={data.projectId}
              board={data.board}
              tags={data.tags}
              priority={data.priority}
              completed={data.completed}
            />
          ))}
      </div>
      {tasks == "" ? <AddTask /> : ""}
    </section>
  );
}

export default TodoList;
