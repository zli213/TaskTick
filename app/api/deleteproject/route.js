/**
 * Route of delete project
 *
 * Method: POST
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import getProjectTasks from "../../../src/utils/data/getProjectTasks";
import Tasks from "../../../src/models/Tasks";

export const DELETE = async (req) => {
  await connect();
  const session = await getServerSession(options);
  const param = await req.json();
  console.log("1", param);

  try {
    //update tag in user info
    const user = await User.find({ email: session.user.email });

    const newProjects = user[0].projects.filter(
      (project) => project.projectId.toString() !== param.projectId
    );
    await User.updateOne(
      { email: session.user.email },
      { projects: newProjects }
    );

    // delete related tasks
    const tasks = await getProjectTasks(user[0]._id, param.projectId);
    for(const task of tasks) {
        await Tasks.findOneAndDelete({ _id: task._id });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
