
import styles from "./profile.module.css";
import { useSession } from "next-auth/react";
import { connectDB } from "@/util/database";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    // 현재 세션 정보를 가져옵니다.
    const session = await getSession({ req: context.req });

    // 로그인하지 않은 경우 페이지에 표시할 내용이 없습니다.
    if (!session) {
        return {
            props: {
                myPostLists: [],
                session: null
            }
        };
    }

    // 데이터베이스에서 현재 사용자의 게시물을 검색합니다.
    const db = (await connectDB).db("AAAA");
    const myPostLists = await db.collection("post").find({ userEmail: session.user.email }).toArray();

    return {
        props: {
            myPostLists: JSON.parse(JSON.stringify(myPostLists)),
            session
        }
    };
}



const Profile = ({ myPostLists, session }) => {
    // 로그인하지 않은 경우 메시지 표시
    if (!session) {
        return <p>Please log in to view this page.</p>;
    }

    // 로그인한 사용자의 정보와 게시물 목록을 표시
    return (
        <div className={styles.profile}>
            <h1>Profile Page</h1>
            <p>User: {session.user.name}</p>
            <p>Email : {session.user.email}</p>
            <div className={styles.nicknameLine}>
                <p>Nickname : {session.user.nickname}</p>
            </div>
            {/* 게시물 목록을 표시 */}
            <ul className={styles.postList}>
                {myPostLists.map((post) => (
                    <li key={post._id} className={styles.postItem}>
                        <p>{post.course}</p>
                        {/* 제목을 클릭하면 해당 게시물 페이지로 리다이렉트 */}
                        <a href={`/jiwonread?_id=${post._id}`} className={styles.postTitle}>{post.title}</a>
                        <p>{post.submitTime}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;