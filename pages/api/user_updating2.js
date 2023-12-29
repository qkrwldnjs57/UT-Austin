import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uteid, username } = req.body;

    // Connect to MongoDB
    const db = (await connectDB).db("AAAA");
    const collection = db.collection("users");

    // Update the user with the new username
    const updateResult = await collection.updateOne(
      { uteid },
      { $set: { username } }
    );

    if (updateResult.modifiedCount === 1) {
      res.status(200).json({
        message: "Username updated successfully",
        username: username,
      }); ////////////
    } else {
      res.status(400).json({ message: "Failed to update username" });
    }
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
