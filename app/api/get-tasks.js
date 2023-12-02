import { MongoClient } from "mongodb";

//  /api/getAllTasks
//  GET

async function handler(req, res) {
  if (req.method === "GET") {

    console.log(req.method);

    const client = await MongoClient.connect(
      "mongodb+srv://todo123:Z7xs799sOdztS5PU@tododata.ud04wyd.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("todo-database");  

    const tasksCollections = db.collection("tasks");

    const tasks = await tasksCollections
      .find({ username: "johndoe123" })
      .toArray();
    client.close;

    console.log(tasks);

    res.status(201).json({data: tasks}) ;
  }
}

export default handler;
