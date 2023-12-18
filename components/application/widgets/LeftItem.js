import Link from "next/link";
import styles from "../../../styles/scss/leftbar.module.scss";

//Icons
import InboxIcon from "../../../public/icon/inbox.svg";
import InboxSelected from "../../../public/icon/inbox_selected.svg";
import TodayIcon from "../../../public/icon/today";
import TodayIconSelected from "../../../public/icon/today_selected";
import HashtagIcon from "../../../public/icon/hashtag.svg";
import CalenderIcon from "../../../public/icon/upcoming.svg";
import FilterIcon from "../../../public/icon/filter.svg";
import { useRouter } from "next/navigation";


const LeftbarItem = ({ label, link, type, num , onClick, isSelected}) => {
  const router = useRouter();

  const clickHandler = (e) => {
    e.preventDefault();
    onClick();
    router.push(link);
  }


  var icon = null;
  switch (type) {
    case "inbox":
      icon = <InboxIcon />;
      break;
    case "today":
      icon = <TodayIcon day={new Date().getDate()} />;
      break;
    case "upcoming":
      icon = <CalenderIcon />;
      break;
    case "filters-labels":
      icon = <FilterIcon />;
      break;
    case "project":
      icon = <HashtagIcon />;
      break;
  }

  return (
    <li className={ isSelected? styles.selected_item : ''}>
      <div className={styles.list_item_box}>
        <Link href={link} onClick={clickHandler}>
          <span>{icon}</span>
          <span className={styles.list_item_content}>{label}</span>
        </Link>
      </div>
      <div>{num}</div>
    </li>
  );
};

export default LeftbarItem;
