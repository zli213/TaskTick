import Link from "next/link";
import styles from "../../../styles/scss/leftbar.module.scss";

//Icons
import InboxIcon from "../../../public/icon/inbox.svg";
import InboxSelected from "../../../public/icon/inbox_selected.svg";
import TodayIcon from "../../../public/icon/today";
import TodayIconSelected from "../../../public/icon/today_selected";
import HashtagIcon from "../../../public/icon/hashtag.svg";
import UpcomingIcon from "../../../public/icon/upcoming.svg";
import UpcomingSelected from "../../../public/icon/upcoming_selected.svg";
import FilterIcon from "../../../public/icon/filter.svg";
import FilterSelected from "../../../public/icon/filter_selected.svg";
import MenuIcon from "../../../public/icon/three_point.svg";
import { useRouter } from "next/navigation";

const LeftbarItem = ({
  label,
  link,
  type,
  num,
  onClickHandler,
  isSelected,
}) => {
  const router = useRouter();

  const clickHandler = (e) => {
    e.preventDefault();
    onClickHandler();
  };

  const isProject = type == "project";

  var icon = null;
  switch (type) {
    case "inbox":
      icon = isSelected ? <InboxSelected /> : <InboxIcon />;
      break;
    case "today":
      icon = isSelected ? (
        <TodayIconSelected day={new Date().getDate()} />
      ) : (
        <TodayIcon day={new Date().getDate()} />
      );
      break;
    case "upcoming":
      icon = isSelected ? <UpcomingSelected /> : <UpcomingIcon />;
      break;
    case "filters-labels":
      icon = isSelected ? <FilterSelected /> : <FilterIcon />;
      break;
    case "project":
      icon = <HashtagIcon />;
      break;
  }

  return (
    <li
      onClick={clickHandler}
      className={isSelected ? styles.selected_item : ""}
    >
      <div className={styles.list_item_box}>
        <Link href={link} passHref>
          <span>{icon}</span>
          <span className={styles.list_item_content}>{label}</span>
        </Link>
      </div>
      <div className={styles.item_btn}>
        <span className={isProject ? styles.item_btn_number : ""}>
          {num ? num : ""}
        </span>
        {isProject && (
          <button type="button" className={styles.more_project_action_btn}>
            <span>
              <MenuIcon />
            </span>
          </button>
        )}
      </div>
    </li>
  );
};

export default LeftbarItem;
