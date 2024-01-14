/**
 * Get list of labels
 *
 * param: username
 *
 */

import connect from "./db";
import User from "../../models/User";

export default async function getLabels(userId) {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ _id: userId }); //need edit
    return user[0].tags;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
