import LeftbarItem from "./LeftbarItem";
import Myprojects from "./myprojects/Myprojects";
import styles from "../../../styles/scss/leftbar.module.scss";
import { getProjects } from "../../../src/utils/data/getProjects";

async function Leftbar({ classes }) {
  const projects = await getProjects();

  return (
    <div className={`${styles.list_sidebar} ${classes}`}>
      <div>
        <LeftbarItem label="Inbox" link="/application/inbox" />
        <LeftbarItem label="Today" link="/application/today" />
        <LeftbarItem label="upcoming" link="/application/upcoming" />
        <LeftbarItem label="Filter&Labels" link="/application/filters-labels" />
      </div>
      <Myprojects projectList={projects} />
    </div>
  );
}

export default Leftbar;
