/**
 * Route of edit a Board in a project
 *
 * Method: DELETE
 *
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";
import Tasks from "../../../src/models/Tasks";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import getProjectTasks from "../../../src/utils/data/getProjectTasks";

export const POST = async (req) => {
  await connect();
  const session = await getServerSession(options);
  const param = await req.json();

  try {
    const user = await User.find({ email: session.user.email });

    let newProject = user[0].projects.find(
      (project) => project.projectId == param.projectId
    );
    newProject.boards = newProject.boards.map((board) => {
      if (board == param.oldBoard) {
        return param.board;
      } else {
        return board;
      }
    });

    const projectIndex = user[0].projects.findIndex(
      (project) => project.projectId == param.projectId
    );
    user[0].projects[projectIndex] = newProject;
    await user[0].save();

    // update related tasks
    const tasks = await getProjectTasks(user[0]._id, param.projectId);
    for (const task of tasks) {
      if (task.board == param.oldBoard) {
        await Tasks.updateOne({ _id: task._id }, { board: param.board });
      }
    }

    return NextResponse.json({ body: "success" }, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
