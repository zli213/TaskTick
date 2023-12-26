/**
 * Get name of a Project
 *
 * param: projectId
 *
 */

import connect from "./db";
import User from "../../models/User";

export default async function getProjectNum(projectId) {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ username: "johndoe123" });
    const project = user[0].projects.filter(
      (item) => item.projectId.toString() == projectId
    );

    return project[0].name;
  } catch (error) {
    return null;
  }
}
