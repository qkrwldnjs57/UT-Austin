/*jiwon code*/
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = (await connectDB).db("AAAA");
      const groupList = await db.collection("GroupList").find().toArray();
      // return data to client
      res.status(200).json(groupList);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    // if not GET request
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
