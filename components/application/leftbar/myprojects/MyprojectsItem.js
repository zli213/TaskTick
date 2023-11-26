import Link from "next/link";

const MyprojectsItem = ({ label, link }) => {
  return (
    <li>
      <Link href={link}>
        <div>
          <span></span>
          {label}
        </div>
        <div></div>
      </Link>
    </li>
  );
};


export default MyprojectsItem;
