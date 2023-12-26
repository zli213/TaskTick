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

export const POST = async (req) => {
  await connect();

  const param = await req.json();
  const newId = new ObjectId();

  try {
    const user = await User.find({ username: "johndoe123" }); //param need edit

    const newProjects = [
      ...user[0].projects,
      {
        projectId: newId,
        name: param.name,
      },
    ];

    await User.updateOne(
      { username: "johndoe123" },
      { projects: newProjects }
    );

    return NextResponse.json({body: {projectId: newId}},{status:200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
