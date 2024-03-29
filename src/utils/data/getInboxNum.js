/**
 * Get number of uncomplete tasks of Inbox
 */

import connect from "./db";
import Tasks from "../../models/Tasks";

export default async function getInboxNum(userId) {
  //Connect to the DB
  await connect();

  try {
    const tasks = await Tasks.find({
      userId: userId,
      completed: false,
      projectId: null,
    });
    return tasks.length;
  } catch (error) {
    throw new Error("Error get Num");
  }
}
