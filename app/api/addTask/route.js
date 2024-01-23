import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import Tasks from "../../../src/models/Tasks";
import { ObjectId } from "mongodb";

export const POST = async (req) => {
  await connect();
  const param = await req.json();

  const newtask = await new Tasks({
    _id: new ObjectId(),
    title: param.taskName,
    description: param.taskContent,
    priority: "P" + param.priority,
    tags: param.tags,
    dueDate:
      param.selectedDate === (null || "") ? null : new Date(param.selectedDate),
    projectId: param.projectId === "" ? null : param.projectId,
    projectName: param.projectName,
    board: param.board,
    userId: param.userId,
    username: param.username,
    completed: false,
  });

  try {
    const res = await newtask.save();
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
