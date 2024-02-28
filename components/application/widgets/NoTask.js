import React from "react";
import styles from "../../../styles/scss/application.module.scss";
import AddTask from "./AddTask";

const NoTask = (props) => {
  var content = "";
  var image = "";
  var title = "";

  switch (props.page) {
    case "today":
      content =
        "You're all done for today, Enjoy the rest of your day and don't forget to share your #TodoistZero awesomeness";
      image = "/images/notask.jpg";
      title = "You're all done for today,";
      break;
    case "inbox":
      content = " All your team's tasks are organized in the right place.";
      image = "/images/notask-inbox.jpg";
      title = "Well done!";
      break;
    case "project":
      content =
        "Track tasks, follow progress, and discuss details in one central, shared project.";
      image = "/images/startNewTask.jpg";
      title = "Start small (or dream big)...";
      break;
    case "label":
      content =
        "Click the + to add a task and it’ll automatically get the label!";
      image = "/images/notask-label.png";
      title = "Try adding this label to some tasks…";
      break;
  }

  return (
    <div className={styles.list_box} id="list_box">
      <AddTask
        allTags={props.allTags}
        allProjects={props.allProjects}
        fromProject={props.fromProject}
        fromBoard={props.fromBoard}
        fromDate={props.fromDate}
      />
      <div className={styles.no_tasks}>
        <img src={image} />
        <h4>{title}</h4>
        <div className={styles.no_tasks_content}>{content}</div>
      </div>
    </div>
  );
};

export default NoTask;
