import Link from "next/link";
import styles from "./ListGroup.module.css";

export default function ListGroup({
  courseName,
  professorName,
  reviewContent,
  averageRating,
  reviewCount,
  courseInfo,
}) {
  return (
    <div className={styles["list-box"]}>
      <div className={styles["text-container"]}>
        <Link
          href={`/jiwonPostList?courseName=${encodeURIComponent(
            courseName
          )}&professorName=${encodeURIComponent(professorName)}`}
        >
          <div className={styles["course-name"]}>{courseName}</div>
        </Link>

        <div className={styles["professor-name"]}>{professorName}</div>

        <div className={styles["latest-review"]}>
          <span>Latest review :</span>
          <p> {reviewContent}</p>
        </div>
      </div>

      <div className={styles["rating-container"]}>
        <Link
          href={"course?name=" + courseName + "&professor=" + professorName}
        >
          <div className={styles["button-for-ray"]}>{courseInfo}</div>
        </Link>
        <div className={styles["average-rating"]}>{averageRating}</div>
        {/* <div className={styles["based-on"]}>Based on</div> */}
        <div className={styles["review-count"]}>{reviewCount} reviews</div>
      </div>
    </div>
  );
}
