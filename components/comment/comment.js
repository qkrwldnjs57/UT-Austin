import styles from "@/pages/course.module.css";
const Comment = () => {
  return (
    <div className={styles["div-2"]}>
      <div className={styles["frame-16"]}>
        <div className={styles["frame-17"]}>
          <div className={styles["text-wrapper-19"]}>4</div>
        </div>
        <div className={styles["frame-18"]}>
          <div className={styles["frame-19"]}>
            <div className={styles["text-wrapper-5"]}>Jason Thomas :)</div>
            <div className={styles["text-wrapper-9"]}>Aug 11, 2023</div>
          </div>
          <div className={styles["frame-20"]}>
            <div className={styles["frame-21"]}>
              <div className={styles["text-wrapper-3"]}>Difficulty</div>
              <div className={styles["text-wrapper-3"]}>8</div>
            </div>
            <div className={styles["frame-21"]}>
              <div className={styles["text-wrapper-3"]}>Grade</div>
              <div className={styles["text-wrapper-3"]}>B+</div>
            </div>
            <div className={styles["frame-21"]}>
              <div className={styles["text-wrapper-3"]}>Textbook</div>
              <div className={styles["text-wrapper-3"]}>No</div>
            </div>
            <div className={styles["frame-21"]}>
              <div className={styles["text-wrapper-3"]}>Attendance</div>
              <div className={styles["text-wrapper-3"]}>Mandatory</div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.p}>
        I liked her I went to her office hours a few times and I sat in the
        front left so the TAs were nearby if we ever had a question on the
        clicker questions. Sumner answered her emails and I honestly liked her
        though that&#39;s an unpopular opinion. She does have an accent but I
        feel she&#39;s easy to understand though her handwriting is just not
        good.
      </p>
      <div className={styles["frame-22"]}>
        <div className={styles["frame-23"]}>
          <div className={styles["text-wrapper-20"]}>Beware of Pop Quizzes</div>
        </div>
        <div className={styles["frame-23"]}>
          <div className={styles["text-wrapper-20"]}>Online Savvy</div>
        </div>
        <div className={styles["frame-23"]}>
          <div className={styles["text-wrapper-20"]}>Extra Credit</div>
        </div>
        <div className={styles["frame-23"]}>
          <div className={styles["text-wrapper-20"]}>Super Fun</div>
        </div>
        <div className={styles["frame-23"]}>
          <div className={styles["text-wrapper-20"]}>Super Fun</div>
        </div>
      </div>
      <div className={styles["frame-24"]}>
        <div className={styles["frame-5"]}>
          <img className={styles.img} alt="Vector" src="/course/vector.svg" />
          <div className={styles["text-wrapper-11"]}>1.2k</div>
        </div>
        <div className={styles["frame-5"]}>
          <img
            className={styles.img}
            alt="Vector"
            src="/course/vector-down.svg"
          />
          <div className={styles["text-wrapper-11"]}>25</div>
        </div>
        <div className={styles["frame-5"]}>
          <img className={styles.vector} alt="Vector" src="/course/reply.svg" />
          <div className={styles["text-wrapper-11"]}>37</div>
        </div>
      </div>
    </div>
  );
};
export { Comment };
