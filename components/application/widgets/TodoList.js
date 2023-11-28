// TodoList.js
// "use client";

import { SingleItems } from "./SingleItem";
import styles from "../../../styles/scss/todoList.module.scss";

function TodoList({ datas }) {
  return (
    <div className={styles.list_editor}>
      <section className={styles.section}>
        <div>
          {datas
            .filter((data) => data.completed == false)
            .map((data) => (
              <SingleItems
                key={data._id}
                _id={data._id}
                title={data.title}
                dueDate={data.dueDate}
                description={data.description}
                projectName={data.projectName}
                board={data.board}
                tags={data.tags}
                priority={data.priority}
                completed={data.completed}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default TodoList;
