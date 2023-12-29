// pages/write.js (Frontend)
import { useState, useEffect } from "react";
import FilterCombo from "./customFilter.js";
import styles from "./jiwonwrite.module.css";
import { connectDB } from "@/util/database";
import toTitleCase from "@/util/utilFunctions";
import { useMyContext } from "@/components/context/userProvider";
import {useSession} from "next-auth/react";

//shadcnui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export async function getStaticProps() {
  // database connection, accesing full list of the document
  const db = (await connectDB).db("AAAA");
  const groupList = await db.collection("GroupList").find({}).toArray();
  return {
    props: {
      groupList: JSON.parse(JSON.stringify(groupList)),
    },
  };
}

export default function WritePage({ groupList }) {
  const {data : session} = useSession();
  //const { user, setUser } = useMyContext();

  //set message for sumbit
  const [message, setMessage] = useState("");

  //username and password
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

  const [initialCourseData, setInitialCourseData] = useState([]);
  const [initialProfessorData, setInitialProfessorData] = useState([]);

  //filter options
  const [courseData, setCourseData] = useState([]); // course lists for FilterCombo
  const [professorData, setProfessorData] = useState([]); //professor lists for FilterCombo

  // initial load data
  useEffect(() => {
    const courses = groupList.map((item) => ({
      value: toTitleCase(item.course),
      label: toTitleCase(item.course),
    }));
    const professors = groupList.map((item) => ({
      value: toTitleCase(item.professor),
      label: toTitleCase(item.professor),
    }));

    setCourseData(courses);
    setProfessorData(professors);
    setInitialCourseData(courses);
    setInitialProfessorData(professors);
  }, []);

  // filter : selected course, professor
  const [selectedCourse, setSelectedCourse] = useState(null); //selected course in Filter
  const [selectedProfessor, setSelectedProfessor] = useState(null); //selected course in Professor

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");

  //state for error
  const [courseError, setCourseError] = useState(false);
  const [professorError, setProfessorError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  // 과목 필터 변경 핸들러
  const handleCourseFilterChange = (selectedValue) => {
    setSelectedCourse(selectedValue);
    if (!selectedValue) {
      // 선택 해제된 경우, 모든 교수 데이터를 다시 로드합니다.
      setProfessorData(initialProfessorData);
    } else {
      // 선택된 과목에 따라 교수 데이터를 필터링합니다.
      const filteredProfessors = groupList
        .filter(
          (item) => toTitleCase(item.course) === toTitleCase(selectedValue)
        )
        .map((item) => ({
          value: toTitleCase(item.professor),
          label: toTitleCase(item.professor),
        }));
      setProfessorData(filteredProfessors);
    }
  };

  // 교수 필터 변경 핸들러
  const handleProfessorFilterChange = (selectedValue) => {
    setSelectedProfessor(selectedValue);
    if (!selectedValue) {
      // 선택 해제된 경우, 모든 과목 데이터를 다시 로드합니다.
      setCourseData(initialCourseData);
    } else {
      // 선택된 교수에 따라 과목 데이터를 필터링합니다.
      const filteredCourses = groupList
        .filter(
          (item) => toTitleCase(item.professor) === toTitleCase(selectedValue)
        )
        .map((item) => ({
          value: toTitleCase(item.course),
          label: toTitleCase(item.course),
        }));
      setCourseData(filteredCourses);
    }
  };
  // filter option change

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = true;
    // if (!username) {
    //   isFormValid = false;
    //   alert("please put username");
    //   return;
    // }

    // if (!password) {
    //   isFormValid = false;
    //   alert("please put passwrod");
    //   return;
    // }
    if (!selectedCourse) {
      setCourseError(true);
      isFormValid = false;
      alert("please select course");
      return;
    } else {
      setCourseError(false);
    }
    if (!selectedProfessor) {
      setProfessorError(true);
      isFormValid = false;
      alert("please select professor");
      return;
    } else {
      setProfessorError(false);
    }
    if (!title) {
      setTitleError(true);
      isFormValid = false;
      alert("please fill title");
      return;
    } else {
      setTitleError(false);
    }

    if (!content) {
      setContentError(true);
      isFormValid = false;
      alert("please fill content");
      return;
    } else {
      setContentError(false);
    }

    if (!rating) {
      setRatingError(true);
      isFormValid = false;
      alert("please select rating");
      return;
    } else {
      setRatingError(false);
    }

    if (isFormValid) {
      const userEmail = session.user.email;
      const userNickname = session.user.nickname;

      const submitTime = new Date().toISOString();
      try {
        const response = await fetch("/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            userNickname,
            // username: user.username,
            // uteid: user.uteid,
            // password: password,
            course: selectedCourse,
            professor: selectedProfessor,
            title,
            content,
            rating,
            submitTime,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage("Your review was submitted successfully");

          window.location.href = `/jiwonread?_id=${encodeURIComponent(
            data._id
          )}`;
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // success message
        setMessage("Your review was submitted successfully");
        // 추가 처리 (응답 확인, 리디렉션 등)
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    } else {
      alert("Please fill out all the fields.");
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className={styles["writing-page"]}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles["form-title"]}>Rate my professor</h1>
        {/* <div className={styles['user-container']}>
                    <input
                        className={`${styles['input-field']} ${styles['input-field-small']}`}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className={`${styles['input-field']} ${styles['input-field-small']}`}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div> */}

        <div className={styles["filter-container"]}>
          <FilterCombo
            items={courseData}
            placeholder="Course"
            onSelect={handleCourseFilterChange}
          />
          <FilterCombo
            items={professorData}
            placeholder="Professor"
            onSelect={handleProfessorFilterChange}
          />
        </div>
        <input
          className={styles["input-field"]}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className={`${styles["input-field"]} ${styles["textarea-content"]} ${
            styles[contentError ? "input-error" : ""]
          }`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <div className={`${styles["rating"]}`}>
          <div className={styles["rate-title"]}>Overall rate :</div>
          <Select onValueChange={handleRatingChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="(Rate 1-5)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={styles["button-container"]}>
          <button className={styles["submit-button"]} type="submit">
            Submit
          </button>
        </div>
      </form>
      {message && <div className={styles["message"]}>{message}</div>}
    </div>
  );
}
