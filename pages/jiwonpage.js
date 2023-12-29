import Image from "next/image";
import styles from "./jiwonpage.module.css";
import Searchbox from "@/components/Search/searchBox";
import ListGroup from "@/components/Search/ListGroup";
import Link from "next/link";
import FilterCombo from "./customFilter.js";
import React, { useState, useEffect } from "react";
import { connectDB } from "@/util/database";
import toTitleCase from "@/util/utilFunctions";
import Head from 'next/head';

// extract filter options for FilterCombo component
function extractAndStructureFilterOptions(searchResults, field) {
  //extract options
  const options = new Set(searchResults.map((result) => result[field]));
  const optionsArray = Array.from(options); // to Set

  // change structure
  const structuredOptions = optionsArray.map((option) => {
    const acronym = option
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase()) // to upper case
      .join("");
    return {
      //value: acronym,
      value: option,
      label: option,
    };
  });
  return structuredOptions;
}

// temporate Data for group-list
const defaultGroupData = {
  _id: "1",
  course: "Introduction to Informatics",
  professor: "Philip Doty",
  latestReview: "This is default content value",
  averageRating: 4.5,
  reviewCount: 20,
  courseInfo : "course info"
};

// get course from DB before Home render starts
export async function getServerSideProps() {
  const db = (await connectDB).db("AAAA");
  
  // GroupList 컬렉션에서 courses 데이터를 가져옵니다.
  const coursesData = await db.collection("GroupList").find({}).toArray();
  
  // post 컬렉션에서 각 course와 professor에 대한 평균 평점과 리뷰 개수를 계산합니다.
  const reviewsAggregate = await db.collection("post").aggregate([
    {
      $addFields: {
        // 문자열 'rating' 필드를 정수로 변환합니다.
        // 변환할 수 없는 값은 기본값으로 처리됩니다.
        numericRating: { 
          $convert: {
            input: "$rating",
            to: "int",
            onError: "Error", // 변환에 실패했을 때 반환할 값
            onNull: "No rating" // 'rating' 필드가 null일 때 반환할 값
          }
        }
      }
    },
    {
      $group: {
        _id: { course: "$course", professor: "$professor" },
        averageRating: { $avg: "$numericRating" }, // 변환된 정수 'rating'을 사용합니다.
        reviewCount: { $sum: 1 }
      }
    },
    // 'numericRating' 필드가 변환에 실패하지 않은 문서들만 필터링합니다.
    // 이는 'onError'에서 정의한 값으로 필터링할 수 있습니다.
    {
      $match: {
        numericRating: { $ne: "Error" }
      }
    }
  ]).toArray();

  console.log('Aggregation results:', reviewsAggregate);

  // coursesData에 평균 평점과 리뷰 개수 정보를 추가합니다.
  const courses = coursesData.map((course) => {
    const reviewData = reviewsAggregate.find((item) => 
      item._id.course.toUpperCase() === course.course.toUpperCase() && item._id.professor.toUpperCase() === course.professor.toUpperCase()
    ) || { averageRating: 0, reviewCount: 0 }; // 리뷰 데이터가 없는 경우 기본값을 설정합니다.

    return {
      ...course,
      averageRating: reviewData.averageRating ? reviewData.averageRating.toFixed(1) : "N/A", // 소수점 한 자리로 평균 평점을 고정합니다.
      reviewCount: reviewData.reviewCount
    };
  });

  console.log('final courses data : ', courses);
  
  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses))
    }
  };
}


export default function Home({ courses }) {
  
  const [originalResults, setOriginalResults] = useState(courses || []); //original save for cancelling filter option
  const [searchResults, setSearchResults] = useState(courses || []); // search Result
  const [courseOptions, setCourseOptions] = useState([]); // course lists for FilterCombo
  const [professorOptions, setProfessorOptions] = useState([]); //professor lists for FilterCombo

  //filter state
  const [selectedCourse, setSelectedCourse] = useState(null); //selected course in Filter
  const [selectedProfessor, setSelectedProfessor] = useState(null); //selected course in Professor

  // return filter results
  const getFilteredResults = () => {
    const newFilteredResults = searchResults.filter((result) => {
      return (
        (selectedCourse ? result.course === selectedCourse : true) &&
        (selectedProfessor ? result.professor === selectedProfessor : true)
      );
    });
  };

  //selecting filter
  const handleCourseFilterChange = (course) => {
    setSelectedCourse(course);
    console.log(course);

    //before rendering, it doesn't change. Async update
    //console.log('[jiwonpage.js][handleCourseFilterChange] selected course : ', selectedCourse);

    const newFilteredResults = originalResults.filter((result) => {
      return (
        (!course || result.course === course) &&
        (!selectedProfessor || result.professor === selectedProfessor)
      );
    });
    setSearchResults(newFilteredResults); // 필터링된 결과로 상태 업데이트
  };
  const handleProfessorFilterChange = (professor) => {
    setSelectedProfessor(professor);
    console.log(professor);

    const newFilteredResults = originalResults.filter((result) => {
      return (
        (!selectedCourse || result.course === selectedCourse) &&
        (!professor || result.professor === professor)
      );
    });
    setSearchResults(newFilteredResults); // 필터링된 결과로 상태 업데이트
  };

  // when course/prof is selected in filter, console.log each value
  useEffect(() => {
    console.log(
      "[jiwonpage.js][handleCourseFilterChange] selected course : ",
      selectedCourse
    );
    console.log(
      "[jiwonpage.js][handleCourseFilterChange] selected professor : ",
      selectedProfessor
    );
  }, [selectedCourse]);

  useEffect(() => {
    console.log(
      "[jiwonpage.js][handleCourseFilterChange] selected course : ",
      selectedCourse
    );
    console.log(
      "[jiwonpage.js][handleProfessorFilterChange] elected professor : ",
      selectedProfessor
    );
  }, [selectedProfessor]);

  // render by filter results
  const filteredResults = getFilteredResults();

  //default filter state
  useEffect(() => {
    const courseOptions = extractAndStructureFilterOptions(courses, "course");
    setCourseOptions(courseOptions);

    const professorOptions = extractAndStructureFilterOptions(
      courses,
      "professor"
    );
    setProfessorOptions(professorOptions);

    setSelectedCourse(null);
    setSelectedProfessor(null);
  }, [courses]);

  const handleSearchResults = (results) => {
    // set search Result
    setOriginalResults(results);
    setSearchResults(results);
    console.log("results = " + JSON.stringify(results, null, 2));

    // extract and change structure
    const courseOptions = extractAndStructureFilterOptions(results, "course");
    setCourseOptions(courseOptions);
    console.log("courseOptions : " + JSON.stringify(courseOptions, null, 2));

    // prof
    const professorOptions = extractAndStructureFilterOptions(
      results,
      "professor"
    );
    setProfessorOptions(professorOptions);
    console.log(
      "professorOptions : " + JSON.stringify(professorOptions, null, 2)
    );

    // Reset filter values when new search is performed
    setSelectedCourse(null);
    setSelectedProfessor(null);
  };

  const filterResults = () => {
    const newFilteredResults = originalResults.filter((result) => {
      return (
        (!selectedCourse || result.course === selectedCourse) &&
        (!selectedProfessor || result.professor === selectedProfessor)
      );
    });
    setSearchResults(newFilteredResults); // 필터링된 결과로 상태 업데이트
  };

  // filter state change -> execute filterResults
  useEffect(() => {
    filterResults();
  }, [selectedCourse, selectedProfessor]);

  // filter cancle -> retrieve original data
  const handleResetFilters = () => {
    setSelectedCourse(null);
    setSelectedProfessor(null);
    setSearchResults(originalResults); // 원본 데이터로 상태를 리셋합니다.
  };

  useEffect(() => {
    // if course filter selected, extract professor option from original
    if (selectedCourse) {
      const newProfessorOptions = extractAndStructureFilterOptions(
        originalResults.filter((result) => result.course === selectedCourse),
        "professor"
      );
      setProfessorOptions(newProfessorOptions);
    } else {
      // if not selected, pull all professor from original
      const newProfessorOptions = extractAndStructureFilterOptions(
        originalResults,
        "professor"
      );
      setProfessorOptions(newProfessorOptions);
    }
  }, [selectedCourse, originalResults]);

  useEffect(() => {
    // if professor selected, extract course option from original
    if (selectedProfessor) {
      const newCourseOptions = extractAndStructureFilterOptions(
        originalResults.filter(
          (result) => result.professor === selectedProfessor
        ),
        "course"
      );
      setCourseOptions(newCourseOptions);
    } else {
      // if not selected, all course options from original
      const newCourseOptions = extractAndStructureFilterOptions(
        originalResults,
        "course"
      );
      setCourseOptions(newCourseOptions);
    }
  }, [selectedProfessor, originalResults]);

  //render home page

  return (
    
    <div className={styles["search-list"]}>
      <Head>
        <title>UT Austin Course Search</title>
      </Head>
      <div className={styles["ut-logo"]}>
        <Image
          src="/UT_logo.svg"
          alt="UT Logo SVG"
          width={841}
          height={65}
          priority
        />
      </div>
      <Searchbox onSearchResult={handleSearchResults} />

      <div className={styles["filter"]}>
        <h1 className={styles["filter-title"]}>Filter by ...</h1>
        <div className={styles["filters-row"]}>
          <FilterCombo
            items={courseOptions}
            placeholder="Course"
            onSelect={handleCourseFilterChange}
            selectedValue={selectedCourse}
          />
          <FilterCombo
            items={professorOptions}
            placeholder="Professor"
            onSelect={handleProfessorFilterChange}
            selectedValue={selectedProfessor}
          />
        </div>
      </div>

      <div className={styles["grouped-list"]}>
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => {
            const courseName = toTitleCase(result.course);
            const professorName = toTitleCase(result.professor);
            const reviewContent = defaultGroupData.latestReview;
            const averageRating = result.averageRating;
            const reviewCount = result.reviewCount;
            const courseInfo = defaultGroupData.courseInfo;

            return (
              <ListGroup
                key={result._id || index}
                courseName={courseName}
                professorName={professorName}
                reviewContent={reviewContent}
                averageRating={averageRating}
                reviewCount={reviewCount}
                courseInfo={courseInfo}
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
