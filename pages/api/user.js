/*yiwei code*/
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uteid, password } = req.body;

    // MongoDB
    const db = (await connectDB).db("AAAA");
    const collection = db.collection("user");

    // Check if the user already exists
    const existingUser = await collection.findOne({ uteid }); ////////////

    if (existingUser) {
      if (existingUser.password === password) {
        if (existingUser.username) {
          res.status(200).json({
            message: "User exists, redirect to homepage",
            username: existingUser.username,
          }); //////////
        } else {
          res.status(200).json({
            message:
              "User exists, but without username, redirect to create username",
          });
        }
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      // User does not exist, add them to the database
      const result = await collection.insertOne({ uteid, password });

      // Redirect user to create username page
      res
        .status(200)
        .json({ message: "New user, redirect to create username", result });
    }
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
