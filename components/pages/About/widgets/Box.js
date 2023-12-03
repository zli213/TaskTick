import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../../styles/scss/box.module.scss";

function Box({ id, imageUrl, name, onMouseEnter, onMouseLeave, onClick }) {
  const boxClass = styles[`box-${id}`] || styles.box;

  return (
    <div
      className={boxClass}
      data-text={name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Link key={id} href={`/about/teammembers/${id}`}>
        <Image alt={name} src={imageUrl} height={500} width={500} />
      </Link>
    </div>
  );
}

export default Box;
