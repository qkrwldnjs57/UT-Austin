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
    const courseName = req.query.courseName;
    const professorName = req.query.professorName;
    //find record in the course_professor collection
    let result = await database.collection("course_semester").findOne({
      courseName: { $regex: new RegExp(courseName), $options: "i" },
      professorName: { $regex: new RegExp(professorName), $options: "i" },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  // finally {
  //   await client.close();
  // }
}
