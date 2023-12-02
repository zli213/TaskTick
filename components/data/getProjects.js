import { MongoClient } from "mongodb";

export async function getProjects() {
  const client = await MongoClient.connect(
    "mongodb+srv://todo123:Z7xs799sOdztS5PU@tododata.ud04wyd.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("todo-database");

  const tasksCollections = db.collection("users");

  const user = await tasksCollections
    .find({ username: "johndoe123" }) //need edit
    .toArray();
  client.close();

//   console.log(user);

  return user[0].projects;
}
