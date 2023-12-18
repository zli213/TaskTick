import LeftItem from "../../widgets/LeftItem";
import styles from "../../../../styles/scss/leftbar.module.scss";

async function Myprojects({ projectList }) {

  return (
    <div>
      <h4 className={styles.leftbar_prject_header}>My Projects</h4>
      {projectList.map((project) => (
        <LeftItem
          key={project.projectId}
          label={project.name}
          link={`/application/project/${project.projectId}`}
          type="project"
          num={project.num}
        />
      ))}
    </div>
  );
}

export default Myprojects;

