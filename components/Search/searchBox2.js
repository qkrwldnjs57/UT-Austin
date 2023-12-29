import styles from "./searchBox2.module.css";
import Image from "next/image";

export default function SearchBox() {
  return (
    <div className={styles["search-box"]}>
      <input
        className={styles["search-input"]}
        type="text"
        placeholder="Start searching for a course and write a review"
      ></input>
      <button className={styles["search-icon"]}>
        <Image src="/searchicon.svg" width={30} height={30} />
      </button>
    </div>
  );
}
