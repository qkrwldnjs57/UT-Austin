/*jiwon code*/
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userEmail,
      userNickname,
      // username,
      // uteid,
      // password,
      course,
      professor,
      title,
      content,
      rating,
      submitTime,
    } = req.body;

    // 현재 날짜와 시간을 'Nov 13 2023 01:23:23' 형식으로 포맷
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const timeString = now.toTimeString().split(' ')[0]; // '01:23:23'
    const newFormatSubmitTime = `${month} ${day} ${year} ${timeString}`;

    // MongoDB에 연결
    const db = (await connectDB).db("AAAA");
    const collection = db.collection("post");

    // 데이터 저장
    const result = await collection.insertOne({
      userEmail,
      userNickname,
      // username,
      // uteid,
      // password,
      course,
      professor,
      title,
      content,
      rating,
      submitTime: newFormatSubmitTime,
    });

    const stringId = result.insertedId.toString();

    res.status(200).json({ message: "Post saved", _id: stringId });
  }
}
