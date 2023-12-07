import connect from "./db";
import User from "../../models/User";

export async function getProjects() {
  //Connect to the DB
  await connect();

  try {
    const user = await User.find({ username: "johndoe123" }); //need edit
    return user[0].projects;
  } catch (error) {
    throw new Error("Error get Projects");
  }
}
