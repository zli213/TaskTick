/**
 * Get list of Project information
 * 
 * param: username
 * 
 */

import connect from "./db";
import User from "../../models/User";

export default async function getProjects(username) {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ username: username }); //need edit
    return user[0].projects;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
