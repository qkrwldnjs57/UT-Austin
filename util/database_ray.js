import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://rayvec:rayvec@cluster0.e6oynif.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
await client.connect();
// if (process.env.NODE_ENV === "development") {
//   if (!global._mongo) {
//     global._mongo = new MongoClient(url, options).connect();
//   }
//   connectDB = global._mongo;
// } else {
//   connectDB = new MongoClient(url, options).connect();
// }

export default client;
