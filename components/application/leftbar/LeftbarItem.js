import Link from "next/link";

const LeftbarItem = ({ label, link }) => {
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

export default LeftbarItem;
