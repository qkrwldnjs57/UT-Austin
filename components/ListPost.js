import styles from "./ListPost.module.css";
import Link from "next/link";

export default function ListPost({
    postId,
    postTitle,
    username,
    rating,
    content
    // ,likeCount
}) {

    // content의 첫 30글자를 가져오는 함수
    const getFirstSentence = (text) => {
        return text.substring(0, 30) + (text.length > 30 ? "..." : ""); // 30글자 이후에는 "..."을 추가함
    };

    // content에서 첫 30글자를 추출
    const firstSentence = getFirstSentence(content);

    return (
        <div className={styles.listBox}>
            <div className={styles.ratingContainer}>
                <div className={styles.rating}>
                    {rating}
                </div>
                {/* <div className={styles.reviewCount}>{likeCount} likes</div> */}
            </div>
            <div className={styles.textContainer}>
                <Link href={`/jiwonread?_id=${postId}`}> {/* 상세 페이지 경로 설정 */}
                    <div className={styles.postTitle}>{postTitle}</div>
                </Link>
                <div className={styles.username}>{username}</div>
                <div className={styles.firstSentence}>
                    <p>{firstSentence}</p>
                </div>
            </div>

        </div>
    );
}

