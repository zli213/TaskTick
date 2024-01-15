/**
 * Get list of labels
 *
 * param: username
 *
 */

import connect from "./db";
import User from "../../models/User";
import getLabelTasks from "./getLabelTasks";

export default async function getLabels(userId) {
  //Connect to the DB
  await connect();
  var labels = [];

  try {
    const user = await User.find({ _id: userId }); //need edit
    const tags = user[0].tags;

    for (let i = 0; i < tags.length; i++) {
      const tasksWithTag = await getLabelTasks(userId, tags[i]);
      labels[i] = { tag: tags[i], taskNum: tasksWithTag.length };
    }

    return labels;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
