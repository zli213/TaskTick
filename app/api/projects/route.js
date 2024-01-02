/**
 * Route of get one user's tasks from DB
 *
 * Method: GET
 * 
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import Tasks from "../../../src/models/Tasks";

export const GET = async () => {
  await connect();

  const existingTasks = await Tasks.find({ username: "johndoe123" });   //param need edit

  console.log(existingTasks);
  // return NextResponse.json(existingTasks);

  try {
    return NextResponse.json(existingTasks);
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
