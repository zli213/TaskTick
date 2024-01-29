"use client";

import styles from "../../../styles/scss/application.module.scss";
import { useEffect, useState } from "react";
import Icon from "../../application/widgets/Icon";
import LabelItem from "../../application/widgets/LabelItem";
import NewLabel, { useLabel } from "../../application/widgets/NewLabel";
import { useSelector } from "react-redux";

function FilterPage() {
  const tags = useSelector((state) => state.tasks.tags);
  let tasks = useSelector((state) => state.tasks.tasks);
  tasks = tasks.filter((task) => task.completed !== true);
  let labels = [];

  for (const tag of tags) {
    const tasksWithTag = tasks.filter((task) => {
      return task.tags.includes(tag);
    });

    labels.push({ tag: tag, taskNum: tasksWithTag.length });
  }

  const [showList, setShowList] = useState(true);
  const { showAddCard, showCardHandler } = useLabel();

  const switchListHandler = () => {
    setShowList((preState) => !preState);
  };

  useEffect(() => {
    document.title = "Filters & Labels - Todo";
    localStorage.setItem("lastPage", "filters-labels");
  }, []);

  return (
    <>
      <div className={styles.view_header} id="viewHeader">
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <h1>Filters & Labels</h1>
        </div>
      </div>

      <div className={styles.list_box} id="listBox">
        <section>
          <header className={styles.filters_header}>
            <div
              className={`${styles.content_wrapper} ${
                !showList && styles.content_wrapper_rotate
              }`}
              onClick={switchListHandler}
            >
              <Icon type="down_arrow_small" />
            </div>
            <h4>Labels</h4>
            <button onClick={showCardHandler}>
              <Icon type="add" />
            </button>
          </header>

          <ul>
            {showList &&
              labels.map((label) => (
                <LabelItem
                  label={label.tag}
                  num={label.taskNum}
                  key={label.tag}
                />
              ))}
          </ul>
        </section>
      </div>
      {showAddCard && <NewLabel closeHandler={showCardHandler} />}
    </>
  );
}

export default FilterPage;
