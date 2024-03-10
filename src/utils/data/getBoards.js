/**
 * Get boards of One project
 *
 * param: username, projectId
 *
 */

import connect from "./db";
import User from "../../models/User";

export default async function getBoards(userId, projectId) {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ _id: userId });
    const project = user[0].projects.filter(
      (item) => item.projectId.toString() == projectId
    );

    return project[0].boards;
  } catch (error) {
    throw new Error("Error get boards");
  }
}
