import styles from "./homepage_yiwei.module.css";
import React from "react";
import { Button, Flex } from "antd";
import Link from "next/link";
import { useMyContext } from "@/components/context/userProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

//import Searchbox from "@/components/Search/searchBox2";
//import Searchbox from "../components/search/searchBox2.js";

export default function Home() {
  const { data: session } = useSession();
  const { user, setUser } = useMyContext();
  const [latestReviewId, setLatestReviewId] = useState([]);
  const router = useRouter();

  //Fetch the latest Review ID and Navigation
  useEffect(() => {
    fetch("/api/latestReviewID")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of reviews
        setLatestReviewId(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // navigate to the review page by ID
  const navigateToReviewById = (id) => {
    router.push(`/jiwonread?_id=${id}`);
  };

  // when clicked call this function to check for the EID value if yes diret to different page
  const clickLeaveReview = () => {
    if (!session) { // check login
      // if not login, redirect to login page
      alert("You need to log in to leave a review.");
      signIn();
    } else {
      // 로그인한 사용자는 리뷰 작성 페이지로 리다이렉트합니다.
      router.push("/jiwonwrite");
    }
  };

  // Assuming latestReviews is an array with at least 3 elements
  const reviewIds = latestReviewId.map((review) => review._id);

  return (
    <div className={styles.Homepage}>
      <div className={styles["frame-1"]}>
        <img
          className={styles.UT}
          alt="UT Background"
          src="/homepage-UI/UTBackground.png"
        />
        <div className={styles["inner_wrapper"]}>
          <div className={styles["element_wrapper"]}>
            <div className={styles["Heading_wrapper"]}>
              <p className={styles["heading"]}>
                Find a course rating at <br></br>The University of Texas at
                Austin{" "}
              </p>
            </div>

            <div className={styles["button_wrapper"]}>
              <Flex gap="large" wrap="wrap">
                <Link href="/jiwonpage">
                  <Button className={styles.myCustomButton} size="large">
                    Start Searching
                  </Button>
                </Link>
                <Button
                  onClick={clickLeaveReview}
                  className={styles.myCustomButton}
                  size="large"
                >
                  Leave a Review
                </Button>
              </Flex>
            </div>
            {/*<div className={styles["searchbar_wrapper"]}>
              <Searchbox />
            </div>*/}
          </div>
        </div>
      </div>

      <div className={styles["frame-2"]}>
        <div className={styles["div-wrapper"]}>
          <p className={styles["text-wrapper"]}>Most Recent Review</p>
          <div className={styles["class-wrapper"]}>
            <div className={styles["pframe1"]}>
              <div className={styles["p1-wrapper"]}>
                <img
                  className={styles.classImage}
                  alt="Most Recent Reviews course picture"
                  src="/homepage-UI/class_intro.png"
                />
              </div>
              <p
                onClick={() => navigateToReviewById(reviewIds[0])}
                className={styles["class_title"]}
              >
                Most Recent Review
              </p>
              {/* <p className={styles["offer_semester"]}>Fall 2022</p> */}
            </div>
            <div className={styles["pframe2"]}>
              <div className={styles["p2-wrapper"]}>
                <img
                  className={styles.classImage}
                  alt="Second Most Recent Reviews course picture"
                  src="/homepage-UI/class_stats.png"
                />
              </div>
              <p
                onClick={() => navigateToReviewById(reviewIds[1])}
                className={styles["class_title"]}
              >
                Second Most Recent Review
              </p>
              {/* <p className={styles["offer_semester"]}>Fall 2021</p>*/}
            </div>
            <div className={styles["pframe3"]}>
              <div className={styles["p2-wrapper"]}>
                <img
                  className={styles.classImage}
                  alt="Third Most Recent Review course picture"
                  src="/homepage-UI/class_health.png"
                />
              </div>
              <p
                onClick={() => navigateToReviewById(reviewIds[2])}
                className={styles["class_title"]}
              >
                Third Most Recent Review
              </p>
              {/*  <p className={styles["offer_semester"]}>Spring 2022</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
