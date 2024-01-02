/**
 * Route of add new project(not finish yet)
 *
 * Method: post
 * 
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";

export const POST = async () => {
  await connect();

  const user = await User.find({ username: "johndoe123" });   //param need edit

//   console.log(existingTasks);
  // return NextResponse.json(existingTasks);

  try {
    return NextResponse.json(existingTasks);
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
