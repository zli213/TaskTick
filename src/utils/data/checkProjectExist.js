/**
 * Check if a project is existed and reture result
 *
 * param: userId, projectId
 */

import connect from "./db";
import User from "../../models/User";

export default async function checkProjectExist(userId, projectId) {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ _id: userId });
    const project = user[0].projects.filter((project) => project.projectId.toString() === projectId);

    if (project.length === 0) {
      console.log(`No project found with id: ${projectId}`);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
