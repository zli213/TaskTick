import { MongoClient } from "mongodb";
import connect from "./db";
import User from "../../models/User";

export async function getProjects() {
  //connect to the DB
  await connect();

  try {
    const user = await User.find({ username: "johndoe123" }); //need edit
    //  console.log(user[0].projects);

    return user[0].projects;
  } catch (error) {
    throw new Error("Error get Projects");
  }

  //find the tasks
}
