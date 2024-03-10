import connect from "../../../src/utils/data/db";
import { NextResponse } from "next/server";
import Tasks from "../../../src/models/Tasks";

export const POST = async (req) => {
  await connect();
  const param = await req.json();
  console.log(param);
  try {
    const res = await Tasks.deleteOne({ _id: param._id });
    return NextResponse.json({ body: res }, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
