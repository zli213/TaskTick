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
  const dataToUpdate = {
    title: param.taskName,
    description: param.taskContent,
    priority: param.priority == null ? param.priority : "P" + param.priority,
    tags: param.tags,
    dueDate:
      param.selectedDate === undefined
        ? undefined
        : param.selectedDate === (null || "")
        ? null
        : new Date(param.selectedDate),
    projectId: param.projectId === "" ? null : param.projectId,
    projectName: param.projectName,
    board: param.board,
  };
  //console.log(dataToUpdate);
  try {
    const res = await Tasks.findOneAndUpdate({ _id: param._id }, dataToUpdate, {
      new: true,
      omitUndefined: true,
    });
    //   .then((savedData) => {
    //     console.log("Success", savedData);
    //   })
    //   .catch((error) => {
    //     console.error("Fail", error);
    //   });
    return NextResponse.json({ body: res }, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
