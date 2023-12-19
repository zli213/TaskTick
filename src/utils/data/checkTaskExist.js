/**
 * Check if a task is existed and reture result
 *
 * param: taskId
 */

import connect from "./db";
import Tasks from "../../models/Tasks";

export default async function checkTaskExist(taskId) {
  //Connect to the DB
  await connect();

  try {
    //Find the tasks
    const task = await Tasks.findOne({ _id: taskId });

    if (!task) {
      console.log(`No task found with id: ${taskId}`);
      return false;
    }
    return true;

  } catch (error) {
    return false;
  }
}
