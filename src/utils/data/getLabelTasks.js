/**
 * Get list of labels of one tag
 *
 * param: tag
 *
 */

import connect from "./db";
import User from "../../models/User";
import getOneUserTasks from "./getOneUserTasks";

export default async function getLabelTasks(userId, tag) {
  //Connect to the DB
  await connect();

  try {
    const tasks = await getOneUserTasks(userId);
    const tasksWithTag = tasks.filter((task) => {
      return task.tags.includes(tag);
    });

    return tasksWithTag;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
