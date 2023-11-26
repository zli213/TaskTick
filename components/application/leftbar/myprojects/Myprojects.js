import MyprojectsItem from "./MyprojectsItem";

const Myprojects = () => {
  return (
    <div>
      <div>Project</div>
      <MyprojectsItem label="My work" link="/application/project/123" />
      <MyprojectsItem label="Family" link="/application/project/234" />
    </div>
  );
};

export default Myprojects;
