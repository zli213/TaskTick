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
  //connect to the DB
  // await connect();

  try {
    //find the tasks
    const existingTasks = await Tasks.find({ username: "johndoe123" }); //need edit
    // console.log(existingTasks);

    //transfor the ObjectID to String
    const tasks2 = existingTasks.map((task) => {
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
  } catch (error) {
    throw new Error("Error getting tasks");
  }
}
