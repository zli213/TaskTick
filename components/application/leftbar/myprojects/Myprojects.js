import MyprojectsItem from "./MyprojectsItem";

function Myprojects({ projectList }) {

  return (
    <div>
      <div>Project</div>
      {projectList.map((project) => (
        <MyprojectsItem
          key={project.projectId}
          label={project.name}
          link={`/application/project/${project.projectId}`}
        />
      ))}
    </div>
  );
}

export default Myprojects;
