import Link from "next/link";
import styles from "../../../styles/scss/leftbar.module.scss";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import PopupMenu from "./PopupMenu";
import Icon from "./Icon";

const LeftbarItem = ({
  label,
  link,
  type,
  num,
  onClickHandler,
  isSelected,
}) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    onClickHandler();
  };

  const swithMenuHandler = () => {
    setShowMenu((preState) => !preState);
  };

  const isProject = type == "project";
  var icon = null;
  switch (type) {
    case "inbox":
      icon = isSelected ? <Icon type="inbox_selected" /> : <Icon type="inbox" />;
      break;
    case "today":
      icon = isSelected ? (
        <Icon type="today_selected" day={new Date().getDate()} />
      ) : (
        <Icon type="today" day={new Date().getDate()} />
      );
      break;
    case "upcoming":
      icon = isSelected ? <Icon type="upcoming_selected" /> : <Icon type="upcoming" />;
      break;
    case "filters-labels":
      icon = isSelected ? <Icon type="filter_selected" /> : <Icon type="filter" />;
      break;
    case "project":
      icon = <Icon type="hashtag" />;
      break;
  }

  return (
    <li
      className={`${isSelected ? styles.selected_item : ""} ${
        showMenu && styles.li_hover
      }`}
    >
      <div className={styles.list_item_box} onClick={clickHandler}>
        <Link href={link} passHref>
          <span>{icon}</span>
          <span className={styles.list_item_content}>{label}</span>
        </Link>
      </div>
      <div className={styles.item_btn}>
        <span
          className={`${isProject ? styles.item_btn_number : ""} ${
            showMenu && styles.item_btn_number_hover
          }`}
        >
          {num ? num : ""}
        </span>
        {isProject && (
          <div>
            {/* button */}
            <button
              type="button"
              className={`${styles.more_project_action_btn} ${
                showMenu && styles.more_project_action_btn_hover
              } `}
              onClick={swithMenuHandler}
            >
              <span>
                <Icon type="menu_filled" />
              </span>
            </button>
          </div>
        )}
        {showMenu && (
          <PopupMenu onOverlayClick={swithMenuHandler}>
            <ul>
              <li className={styles.action_btn_menu_item}>
                <span>
                  <Icon type="edit" />
                </span>
                Edit
              </li>
              <li className={styles.action_btn_menu_item}>
                <span>
                  <Icon type="delete" />
                </span>
                Delete
              </li>
            </ul>
          </PopupMenu>
        )}
      </div>
    </li>
  );
};

export default LeftbarItem;
