"use client";

import TodoList from "../../application/widgets/TodoList";
import styles from "../../../styles/scss/application.module.scss";
import { useEffect } from "react";

function FilterPage(props) {

  
  useEffect(() => {
    document.title = 'Filters & Labels - Todo';
    localStorage.setItem("lastPage", "filters-labels");

  }, []);

  return (
    <>
      <div className={styles.view_header}>
        <div className={styles.view_header_content}>
          <h1>Filter Page</h1>
          <div>buttons</div>
        </div>
      </div>
      <div className={styles.list_box}>
        <TodoList tasks={props.data} />
      </div>
    </>
  );
}

export default FilterPage;
