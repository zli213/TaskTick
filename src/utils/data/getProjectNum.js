/**
 * Get number of uncomplete tasks of One Project
 * 
 * param: username
 * 
 */

import connect from "./db";
import Tasks from "../../models/Tasks";

export default async function getProjectNum(projectId) {
  //Connect to the DB
  await connect();

  try {
    const tasks = await Tasks.find({ projectId: projectId , completed: false }); 
    console.log()
    return  tasks.length;
    
  } catch (error) {
    throw new Error("Error get Num");
  }
}
