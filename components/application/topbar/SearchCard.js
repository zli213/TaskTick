import React from "react";
import styles from "../../../styles/scss/searchCard.module.scss";

const SearchCard = ({ closeCardHandler }) => {
  const containerClickHandler = (event) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.click_close_cover} onClick={closeCardHandler}>
      <div className={styles.search_card} onClick={containerClickHandler}>
        <input
          type="text"
          placeholder="Search"
          className={styles.search_input}
        />
      </div>
    </div>
  );
};

export default SearchCard;
