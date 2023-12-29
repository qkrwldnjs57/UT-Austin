/*jiwon code*/
import styles from "./jiwonread.module.css";
import { connectDB } from "@/util/database";
import toTitleCase from "@/util/utilFunctions";
import { ObjectId } from 'mongodb';


export async function getServerSideProps({ query }) {
    // 데이터베이스 연결
    const db = (await connectDB).db("AAAA");

    // 쿼리 스트링에서 _id 가져오기
    const { _id } = query;
    console.log('_id is ...', _id)

    // _id에 해당하는 단일 게시물 가져오기
    const post = await db.collection('post').findOne({ _id: new ObjectId(_id) });

    // 게시물이 없다면 null을 반환
    if (!post) {
        console.log('it is not found');
        return {
            notFound: true,
        };
    }

    return {
        props: {
            myPost: JSON.parse(JSON.stringify(post)),
        },
    };
}


export default function ReadPage({ myPost }) {
    // 단일 게시물 표시를 위한 JSX
    return (
        <div className={styles['writing-page']}>
            <div className={styles['postDetails']}>
                <span>Course : {myPost.course}</span>
                <span>Professor : {myPost.professor}</span>
                <span>Rating : {myPost.rating}</span>
            </div>
            <div className={styles["user-info"]}>
                <span className={styles['writerInfo']}>
                    <span className={styles['writerLabel']}>writer : </span>
                    <span className={styles['nickname']}>{myPost.userNickname}</span>
                </span>
                <span className={styles['submitTime']}> {myPost.submitTime}</span>
            </div>
            <h1 className={styles['form-title']}>{myPost.title}</h1>

            <div className={styles['post']}>
                <p className={styles['postContent']}>{myPost.content}</p>
            </div>
        </div>
    );
}
