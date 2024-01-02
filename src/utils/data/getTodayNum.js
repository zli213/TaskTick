/**
 * Get number of uncomplete tasks of Today
 * include overdue tasks
 * 
 * param: username
 * 
 */

import connect from "./db";
import Tasks from "../../models/Tasks";

export default async function getTodayNum(username) {
  //Connect to the DB
  await connect();

  try {
    const tasks = await Tasks.find({ username: username , completed: false, dueDate: { $lt: new Date()} }); 
    return  tasks.length;
    
  } catch (error) {
    throw new Error("Error get Num");
  }
}
