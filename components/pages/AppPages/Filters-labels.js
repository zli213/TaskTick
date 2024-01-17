"use client";

import styles from "../../../styles/scss/application.module.scss";
import { useEffect, useState } from "react";
import Icon from "../../application/widgets/Icon";
import LabelItem from "../../application/widgets/LabelItem";

function FilterPage(props) {
  const [showList, setShowList] = useState(true);

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
            <button><Icon type="add" /></button>
          </header>

          <ul>
            {showList &&
              props.labels.map((label) => (
                <LabelItem label={label.tag} num={label.taskNum} />
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default FilterPage;
