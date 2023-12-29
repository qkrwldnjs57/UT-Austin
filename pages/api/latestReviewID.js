import { connectDB } from "@/util/database";

export default async function latestReviewHandler(req, res) {
  if (req.method === "GET") {
    const db = (await connectDB).db("AAAA");
    const collection = db.collection("post");

    // Fetch the most recent 3 posts from descending order
    const latestReviews = await collection
      .find()
      .sort({ submitTime: -1 })
      .limit(3)
      .toArray();

    //checks if the length of the latestPost array is zero(no element in it)
    if (latestReviews.length === 0) {
      res.status(404).json({ message: "No posts found" });
      //return specific ID for rendering purpose
    } else {
      const reviewsWithIdAsString = latestReviews.map((review) => ({
        ...review,
        _id: review._id.toString(),
      }));
      res.status(200).json(reviewsWithIdAsString);
    }
  }
}
