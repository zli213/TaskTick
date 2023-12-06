import Link from "next/link";

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
            <Link href={`/application/task/${_id}`} scroll={false}>{title}</Link>
           
            <div>{description}</div>
            <div>{formattedDate}</div>
          </div>
          <div>right side function</div>
        </li>
      </div>
    </div>
  );
}
