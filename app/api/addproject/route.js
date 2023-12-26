/**
 * Route of add new project(not finish yet)
 *
 * Method: POST
 *
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";
import { ObjectId } from "mongodb";

export const POST = async () => {
  await connect();

  try {
    const user = await User.find({ username: "johndoe123" }); //param need edit

    const newProjects = [...user[0].projects , {
      projectId: new ObjectId(),
      name: 'test',
    } ]

    const response = await User.findOneAndUpdate({ username: "johndoe123" }, {projects: newProjects});
    console.log(response);


    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
