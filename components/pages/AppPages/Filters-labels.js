"use client";

import styles from "../../../styles/scss/application.module.scss";
import { useEffect, useState } from "react";
import Icon from "../../application/widgets/Icon";
import Link from "next/link";
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
      <div className={styles.view_header}>
        <div
          className={`${styles.view_header_content} ${styles.no_bottom_border}`}
        >
          <h1>Filter Page</h1>
        </div>
      </div>

      <div className={styles.list_box}>
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
          </header>

          <ul>
            {showList &&
              props.labels.map((label) => (
                <LabelItem label={label} />
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default FilterPage;
