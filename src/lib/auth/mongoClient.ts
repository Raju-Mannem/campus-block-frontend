import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // @ts-expect-error mongodb development client type ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    // @ts-expect-error mongodb development client connect ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-expect-error mongodb globalclient client ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
