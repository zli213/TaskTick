export function SingleItems({
  title,
  _id,
  dueDate,
  description,
  projectName,
  board,
  tags,
  priority,
  completed,
}) {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{dueDate}</div>
    </div>
  );
}
