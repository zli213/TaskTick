"use client";

import styles from "../../../styles/scss/application.module.scss";
import { useEffect, useState } from "react";
import Icon from "../../application/widgets/Icon";
import Link from "next/link";

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
                <div className={styles.labels_item_container}>
                  <li key={label}>
                    <Link href="#">
                      <Icon type="hashtag_big" />
                      <span className={styles.labels_item_content}>
                        <span>{label}</span>
                        <div>num</div>
                      </span>
                      <span className="label_edit_btn">
                        <Icon type="edit" />
                      </span>
                      <button className="label_edit_btn">
                        <Icon type="menu_filled" />
                      </button>
                    </Link>
                  </li>
                </div>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default FilterPage;
