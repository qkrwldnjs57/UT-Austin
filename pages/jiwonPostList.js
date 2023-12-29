import styles from "./jiwonPostList.module.css";
import ListPost from "@/components/ListPost";
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/util/database";
import { useRouter } from 'next/router';


// get course from DB before Home render starts
export async function getServerSideProps(context) {
    const { query } = context;
    const { courseName, professorName } = query;
  
    // 데이터베이스 연결 및 해당 문서의 전체 리스트 접근
    const db = (await connectDB).db("AAAA");
    let queryObject = {};
    if (courseName) queryObject.course = courseName;
    if (professorName) queryObject.professor = professorName;
  
    const postLists = await db.collection('post').find(queryObject).toArray();
    return {
      props: {
        postLists: JSON.parse(JSON.stringify(postLists)),
        // MongoDB serialization
      },
    };
  }


export default function Home({ postLists }) {
    const router = useRouter();
  const { courseName, professorName } = router.query;
    return(

    <div className={styles["post-list-page"]}>
        <div className={styles["ut-logo"]}>
        <Image
          src="/UT_logo.svg"
          alt="UT Logo SVG"
          width={841}
          height={65}
          priority
        />
        </div>
        <div className={styles["course-details"]}>
            {/* course and professor will change depends on what you click from previous page */}
            <div className={styles["title"]}><strong>Course : </strong>{courseName} </div>
    
            <div className={styles["title"]}><strong>Professor : </strong>{professorName} </div>
        </div>
        <div className={styles["post-list"]}>

            {postLists.length > 0 ? (
                postLists.map((result) => {

                    //use later
                    const postId=result._id;
                    const postTitle = result.title;
                    const username = result.username || result.userNickname;
                    const rating = result.rating;
                    const content = result.content;
                    //adding function later
                    // const likeCount = result.likeCount;

                    //currently not using
                    // const likeCount = result.likeCount;

                    return (

                        <ListPost
                            key={postId}
                            postId={postId}
                            postTitle={postTitle}
                            username={username}
                            rating={rating}
                            content = {content}
                            //adding fuction later
                            //likeCount={likeCount}
                        />
                    );
                })
            ) : (
                <div className={styles["no-results"]}>
                    <p>No results found</p>
                </div>
            )}
        </div>
    </div>
    );
}

/*repeated content -> to components
should I write this to new file..?? */

