import LeftbarItem from "./LeftbarItem";
import Myprojects from "./myprojects/Myprojects";
import styles from "../../../styles/scss/leftbar.module.scss";

const Leftbar = ({classes}) => {
  return (
    <div className={`${styles.list_sidebar} ${classes}`}>
      <div>
        <LeftbarItem label="Inbox" link="/application/inbox" />
        <LeftbarItem label="Today" link="/application/today" />
        <LeftbarItem label="upcoming" link="/application/upcoming" />
        <LeftbarItem label="Filter&Labels" link="/application/filters-labels" />
      </div>
      <Myprojects />
     
    </div>
  );
};

export default Leftbar;
