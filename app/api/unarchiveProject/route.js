/**
 * Route of unarchive project
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

export const PUT = async (req) => {
  await connect();
  const session = await getServerSession(options);
  const param = await req.json();

  try {
    const user = await User.find({ email: session.user.email });

    // Update project status
    var projects = user[0].projects;
    for (var project of projects) {
      if (project.projectId.toString() == param.projectId) {
        project.archived = false;
      }
    }
    user[0].projects = projects;
    await user[0].save();

    //Update tasks
    const tasks = await getProjectTasks(user[0]._id, param.projectId);
    for (const task of tasks) {
      await Tasks.updateOne({ _id: task._id }, { archived: false });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
