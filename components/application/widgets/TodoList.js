// TodoList.js
// "use client";

import { SingleItems } from "./SingleItem";
import styles from "../../../styles/scss/todoList.module.scss";

function TodoList({ tasks }) {
  return (
    <div className={styles.section}>
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
    </div>
  );
}

export default TodoList;
