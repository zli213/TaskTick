/**
 * Get a specific task according taskID
 *
 * param: taskId
 */

import connect from "./db";
import Tasks from "../../models/Tasks";
import { TransferTask } from "./getOneUserTasks";

export default async function getOneTask(taskId) {
  //Connect to the DB
  await connect();

  try {
    //Find the tasks
    const task = await Tasks.findOne({ _id: taskId });

    if (!task) {
      console.log(`No task found with id: ${taskId}`);
      throw new Error("Task not found");
    }

    return TransferTask(task);
  } catch (error) {
    throw new Error("Error getting tasks");
  }
}
