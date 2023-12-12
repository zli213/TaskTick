import Link from "next/link";
import Hashtag from "../../../../public/icon/hashtag.svg";

const MyprojectsItem = ({ label, link }) => {
  return (
    <li >
      <Link href={link}>
        <div>
          <span>
            <Hashtag />
          </span>
          {label}
        </div>
        <div></div>
      </Link>
    </li>
  );
};

export default MyprojectsItem;
