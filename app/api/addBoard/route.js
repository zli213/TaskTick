/**
 * Route of add new Board in a project
 *
 * Method: POST
 *
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (req) => {
  await connect();
  const session = await getServerSession(options);
  const param = await req.json();
  console.log('1',param)

  try {
    const user = await User.find({ email: session.user.email });

    let newProject = user[0].projects.find(
      (project) => project.projectId == param.projectId
    );

    if (param.fromBoard == null || param.fromBoard == "") {
      newProject.boards = [param.board, ...newProject.boards];
    } else {
      console.log('2',newProject.boards.indexOf(param.board))
      if (newProject.boards.indexOf(param.board) > -1) {
        console.log('3','exist')
        return NextResponse.json({body: 'exist'},{ status: 200 });
      }
      console.log('4','not exist')
      const preIndex = newProject.boards.indexOf(param.fromBoard);
      newProject.boards.splice(preIndex + 1, 0, param.board);
    }

    const projectIndex = user[0].projects.findIndex(
      (project) => project.projectId == param.projectId
    );
    user[0].projects[projectIndex] = newProject;
    await user[0].save();

    return NextResponse.json({body: 'success'},{ status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
