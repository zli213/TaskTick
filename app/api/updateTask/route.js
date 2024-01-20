/**
 * Route of update task
 *
 * Method: POST
 *
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import Tasks from "../../../src/models/Tasks";

export const POST = async (req) => {
  await connect();
  const param = await req.json();
  try {
    const res = await Tasks.findOneAndUpdate(
      { _id: param._id },
      {
        title: param.taskName,
        description: param.taskContent,
        priority: "P" + param.priority,
        tags: param.tags,
        dueDate:
          param.selectedDate == null ? null : new Date(param.selectedDate),
        projectId: param.projectId,
        projectName: param.projectName,
        board: param.board,
      },
      { new: true }
    );
    return NextResponse.json({ body: res }, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
