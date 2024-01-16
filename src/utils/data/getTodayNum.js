/**
 * Get number of uncomplete tasks of Today
 * include overdue tasks
 * 
 * param: userId
 * 
 */

import connect from "./db";
import Tasks from "../../models/Tasks";

export default async function getTodayNum(userId) {
  //Connect to the DB
  await connect();

  try {
    const tasks = await Tasks.find({ userId: userId , completed: false, dueDate: { $lt: new Date()} }); 
    return  tasks.length;
    
  } catch (error) {
    throw new Error("Error get Num");
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                