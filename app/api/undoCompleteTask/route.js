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
      { _id: param },
      { completed: false }
    );
    return NextResponse.json({ body: res, ifComplete: true }, { status: 200 });
  } catch (error) {
    return new NextResponse({ error, ifComplete: false }, { status: 500 });
  }
};
