export default function AboutLayout(props) {
  return (
    <div className="aboutLayout">
      {props.children}
      {props.memberModal}
    </div>
  );
}
