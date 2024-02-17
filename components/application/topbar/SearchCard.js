import React, { useState, useEffect, use } from "react";
import styles from "../../../styles/scss/searchCard.module.scss";
import Icon from "../widgets/Icon";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./../widgets/TodoList";
import { set } from "mongoose";

const SearchCard = ({ closeCardHandler }) => {
  const dispatch = useDispatch();
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = Array.isArray(tasks) ? tasks : [];
  const [inialBody, setInitialBody] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const [haveTasks, setHaveTasks] = useState(false);
  const searchHandler = (event) => {
    const keyword = event.target.value.trim();
    setInitialBody(!keyword); // if keyword is empty, setInitialBody to true
    if (keyword) {
      const result = tasks.filter((task) => {
        return (
          (task.title && task.title.includes(keyword)) ||
          (task.tags && task.tags.includes(keyword)) ||
          (task.projectName && task.projectName.includes(keyword)) ||
          (task.description && task.description.includes(keyword))
        );
      });
      setSearchResult(result);
      setShowAllResults(false);
    } else {
      setSearchResult([]);
    }
  };
  useEffect(() => {
    setHaveTasks(searchResult.length > 0);
  }, [searchResult]);
  // If the search result is more than 5, the user can only see the first 5 results.
  const displayedResults = showAllResults
    ? searchResult
    : searchResult.slice(0, 5);

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
            placeholder=" Search"
            className={styles.search_input}
            onChange={searchHandler}
          />
          <button className={styles.close_btn} onClick={closeCardHandler}>
            <Icon type="close" fill="#000" />
          </button>
        </div>
        <div className={styles.search_card_body}>
          {inialBody && (
            <div className={styles.emptyResult}>
              <Icon type="search_color" />
              <p>Search Tasks, Tags, and Projects.</p>
            </div>
          )}
          {haveTasks && (
            <div className={styles.searchResult}>
              <TodoList tasks={displayedResults} showAddTask={false} />
              {searchResult.length > 5 && !showAllResults && (
                <button
                  className={styles.showAllBtn}
                  onClick={() => setShowAllResults(true)}
                >
                  Show All
                </button>
              )}
            </div>
          )}
          {!haveTasks && !inialBody && (
            <div className={styles.emptyResult}>
              <Icon type="search_color" />
              <p>No result found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
