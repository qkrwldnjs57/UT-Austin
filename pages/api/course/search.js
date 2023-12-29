// import { connectDB } from "@/util/database";
import client from "@/util/database_ray";
import { ObjectId } from "mongodb";

//convert season string to integer for comparison
const season_to_integer = (season) => {
  if (season === "Spring") {
    return 1;
  }
  if (season === "Fall") {
    return 3;
  }
};

//use 6541c2671eb991e009302df0 as example
export default async function handler(req, res) {
  console.log(req.method);
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    // await client.connect();
    //access database
    const database = await client.db("AAAA");
    //get the query id
    const course_professor_id = req.query.id;
    //find record in the course_professor collection
    let result = await database
      .collection("course_professor")
      .findOne({ _id: new ObjectId(course_professor_id) });

    let course_id = result.course_id;
    //get course information
    let course_info = await database
      .collection("Course")
      .findOne({ _id: new ObjectId(course_id) });

    result.course_info = course_info;
    //get all course_professor records that have the same coure_id
    let all_course_professor = await database
      .collection("course_professor")
      .find({ course_id: course_id })
      .toArray();
    //in each course_professor,find and insert the professor info and semester info
    for (let item of all_course_professor) {
      item.professor = await database
        .collection("Professor")
        .findOne({ _id: new ObjectId(item.professor_id) });
      console.log(item._id.toString());
      item.semesters = await database
        .collection("course_semester")
        .find({
          course_professor_id: item._id.toString(),
        })
        .toArray();

      //sort the semester according season and year
      item.semesters.sort((a, b) => {
        let a_season = a.semester.split(" ")[0];
        let a_year = a.semester.split(" ")[1];
        let b_season = b.semester.split(" ")[0];
        let b_year = b.semester.split(" ")[1];
        console.log(a_year, b_year, a_year > b_year);
        if (a_year > b_year) {
          return -1;
        }
        if (a_year === b_year) {
          return season_to_integer(b_season) - season_to_integer(a_season);
        }
        if (a_year < b_year) {
          return 1;
        }
      });
      // console.log(item.semesters);
    }
    console.log(all_course_professor);
    //set all_course_professor information into result
    result.all_course_professor = all_course_professor;
    //return result and set the status to be 200(OK)
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  // finally {
  //   await client.close();
  // }
}
