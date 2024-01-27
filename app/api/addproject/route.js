/**
 * Route of add new project
 *
 * Method: POST
 *
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (req) => {
  await connect();
  const session = await getServerSession(options);
  const param = await req.json();

  try {
    const user = await User.find({ email: session.user.email });
    const newProject = {
      projectId: new ObjectId(),
      name: param.name,
      boards: [],
      archived: false,
    };

    const newProjects = [...user[0].projects, newProject];

    user[0].projects = newProjects;
    await user[0].save();

    return NextResponse.json({ body: newProject }, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
