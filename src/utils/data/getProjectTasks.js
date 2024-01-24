/**
 * Get list of tasks of one project
 *
 * param: tag
 *
 */

import connect from "./db";
import getOneUserTasks from "./getOneUserTasks";

export default async function getProjectTasks(userId, projectId) {
  //Connect to the DB
  await connect();

  try {
    const tasks = await getOneUserTasks(userId);
    const tasksInProject = tasks.filter((task) => {
      return task.projectId.toString() === projectId;
    });

    return tasksInProject;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
