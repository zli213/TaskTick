import React from "react";
import styles from "../../../styles/scss/searchCard.module.scss";
import Icon from "../widgets/Icon";

const SearchCard = ({ closeCardHandler }) => {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.click_close_cover} onClick={closeCardHandler}>
      <div className={styles.search_card} onClick={containerClickHandler}>
        <div className={styles.search_card_header}>
          <Icon type="search" />
          <input
            type="text"
            placeholder="Search"
            className={styles.search_input}
          />
          <button className={styles.close_btn}>
            <Icon type="close" fill="#000" />
          </button>
        </div>
        <div className={styles.search_card_body}>
          <div className={styles.emptyResult}>
            <Icon type="search_color" />
            <p>No results found</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
