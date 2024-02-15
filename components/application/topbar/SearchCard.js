import React, { useState } from "react";
import styles from "../../../styles/scss/searchCard.module.scss";
import Icon from "../widgets/Icon";
import { useDispatch, useSelector } from "react-redux";
import { SingleItems } from "./../widgets/SingleItem";
import TodoList from "./../widgets/TodoList";

const SearchCard = ({ closeCardHandler }) => {
  const dispatch = useDispatch();
  let tasks = Object.values(useSelector((state) => state.tasks));
  tasks = Array.isArray(tasks) ? tasks : [];
  console.log(tasks);
  const [searchResult, setSearchResult] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const searchHandler = (event) => {
    if (event.key === "Enter") {
      const keyword = event.target.value;
      console.log(keyword);
      const result = tasks.filter((task) => {
        return (
          (task.title && task.title.includes(keyword)) ||
          (task.tags && task.tags.includes(keyword)) ||
          (task.projectName && task.projectName.includes(keyword)) ||
          (task.description && task.description.includes(keyword))
        );
      });
      console.log(result);
      setSearchResult(result);
      setShowAllResults(false);
    }
  };
  const displayedResults = showAllResults
    ? searchResult
    : searchResult.slice(0, 5);
  const haveTasks = displayedResults.length > 0;
  console.log("haveTasks", haveTasks);
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
            onKeyDown={searchHandler}
          />
          <button className={styles.close_btn}>
            <Icon type="close" fill="#000" />
          </button>
        </div>
        <div className={styles.search_card_body}>
          {!haveTasks && (
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
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
