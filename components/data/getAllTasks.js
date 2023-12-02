import { MongoClient } from "mongodb";

export default async function getAllTasks(){
    const client = await MongoClient.connect(
      "mongodb+srv://todo123:Z7xs799sOdztS5PU@tododata.ud04wyd.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("todo-database");
  
    const tasksCollections = db.collection("tasks");
  
    const tasks = await tasksCollections
      .find({ username: "johndoe123" })   //need edit
      .toArray();
    client.close();
  
    const tasks2 = tasks.map((task) => {
      return {
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        tags: task.tags,
        projectId: task.projectId ? task.projectId.toString() : "",
        projectName: task.projectName,
        board: task.board,
        priority: task.priority,
        dueDate: task.dueDate,
        time: task.time,
        userId: task.userId.toString(),
        username: task.username,
        completed: task.completed,
      };
    });
    return tasks2;
  }