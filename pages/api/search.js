/*jiwon code*/
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const query = req.query.myQuery;

  try {
    const db = (await connectDB).db("AAAA");

    // 집계 파이프라인을 사용하여 일치하는 course와 professor에 대한 평균 평점과 리뷰 개수를 계산합니다.
    const aggregationResult = await db.collection("post").aggregate([
      {
        $match: {
          $or: [
            { course: { $regex: new RegExp(query, "i") } },
            { professor: { $regex: new RegExp(query, "i") } },
          ]
        }
      },
      {
        $group: {
          _id: { course: "$course", professor: "$professor" },
          averageRating: { $avg: { $toDouble: "$rating" } },
          reviewCount: { $sum: 1 }
        }
      }
    ]).toArray();

    // 집계 결과를 새로운 형식으로 매핑합니다.
    const result = aggregationResult.map(item => ({
      course: item._id.course,
      professor: item._id.professor,
      averageRating: typeof item.averageRating === 'number'
        ? item.averageRating.toFixed(1)
        : null, // or any other fallback value such as "N/A"
      reviewCount: item.reviewCount
    }));
    console.log('jiwon 0525');
    console.log(aggregationResult);
    console.log(result);


    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching from database");
  }
}
