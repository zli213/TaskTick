import Image from "next/image";
import { photo } from "../../../../public/images/members";

export default function Frame({ imageUrl, name, description }) {
  return (
    <div className="frame">
      <div className="frame__image">
        <Image alt={name} src={imageUrl} height={500} width={500} />
      </div>
      <div className="frame__text">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
