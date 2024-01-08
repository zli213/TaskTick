/**
 * Get tasks of one user from DB
 *
 * param: userId    //need update
 *
 *
 */

import connect from "./db";
import Tasks from "../../models/Tasks";

export default async function getOneUserTasks(userId) {
  //Connect to the DB
  await connect();

  try {
    //Find the tasks
    const existingTasks = await Tasks.find({ username: "johndoe123" }); //need edit

    //Transfor the ObjectID to String
    const tasks2 = existingTasks.map((task) => {
      return transferTask(task);
    });

    return tasks2;
  } catch (error) {
    throw new Error("Error getting tasks");
  }
}


//convert ObjectId to String
export function transferTask(task){
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
}