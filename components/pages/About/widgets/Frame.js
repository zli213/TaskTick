import Image from "next/image";
import styles from "../../../../styles/scss/frame.module.scss";
export default function Frame({ imageUrl, name, description }) {
  return (
    <div className={styles.frame}>
      <div className={styles.frame_image}>
        <Image
          alt={name}
          src={imageUrl}
          height={500}
          width={500}
          className={styles.image}
        />
      </div>
      <div className={styles.frame_text}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
