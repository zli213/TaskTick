/**
 * Get tags of an user
 *
 * param: username
 *
 */

import connect from "./db";
import User from "../../models/User";

export default async function getUserTags(userId) {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ _id: userId });
    const tags = user[0].tags;

    return tags;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
