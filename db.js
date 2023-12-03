import { MongoClient } from "mongodb";

const URI = "mongodb+srv://todo123:Z7xs799sOdztS5PU@tododata.ud04wyd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(URI);

async function connectDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export { connectDatabase };
