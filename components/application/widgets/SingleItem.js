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
  const formattedDate = new Date(dueDate).toLocaleDateString();
  return (
    <div>
      <div>
        <li>
          <div>tuodong</div>
          <button>check</button>
          <div>
            <div>{title}</div>
            <div>{description}</div>
            <div>{formattedDate}</div>
          </div>
          <div>right side function</div>
        </li>
      </div>
    </div>
  );
}
