// TodoList.js
// "use client";

import { useState } from "react";
import { SingleItems } from "./SingleItem";
import styles from "../../../styles/scss/todoList.module.scss";
import AddTask from "./AddTask";
import Icon from "./Icon";

function TodoList({ tasks, title }) {
  const [showList, setShowList] = useState(true);

  const haveTitle = title != "" && title != null;

  const switchListHandler = () => {
    setShowList((preState) => !preState);
  };

  return (
    <section className={styles.section}>
      {haveTitle && (
        <header className={styles.todolist_header}>
          <div className={`${styles.content_wrapper} ${!showList && styles.content_wrapper_rotate }`} onClick={switchListHandler} >
            <Icon type="down_arrow_small" />
          </div>
          <h4>{title}</h4>
        </header>
      )}

      {showList && (
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
      )}
      {tasks == "" ? <AddTask /> : ""}
    </section>
  );
}

export default TodoList;
