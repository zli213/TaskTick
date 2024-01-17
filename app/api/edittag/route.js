/**
 * Route of edit tag
 *
 * Method: POST
 */

import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import User from "../../../src/models/User";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import getLabelTasks from "../../../src/utils/data/getLabelTasks";
import Tasks from "../../../src/models/Tasks";

export const POST = async (req) => {
  await connect();
  const session = await getServerSession(options);
  const param = await req.json();

  try {
    //update tag in user info
    const user = await User.find({ email: session.user.email });
    
    const newTags = user[0].tags.map((tag) => (tag === param.oldTag ? param.tag : tag));
    await User.updateOne({ email: session.user.email }, { tags: newTags });

    //update tag in tasks
    const tasks = await getLabelTasks(user[0]._id, param.oldTag);
    for(const task of tasks) {
        const newTaskTags = task.tags.map((tag) => (tag === param.oldTag ? param.tag : tag));
        await Tasks.updateOne({ _id: task._id }, { tags: newTaskTags });
    }

    return NextResponse.json({ status: 200 });

  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};

