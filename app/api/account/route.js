import { NextResponse } from "next/server";
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import Tasks from "../../../src/models/Tasks";

import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

//retrieve user info
export const GET = async () => {
  await connect();
  const session = await getServerSession(options);

  try {
    const user = await User.findOne({ email: session.user.email });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

//save new username
export const POST = async (req) => {
  await connect();
  const session = await getServerSession(options);

  const result = await req.json();
  const newUsername = result.inputValue;

  const filter = { email: session.user.email };
  const update = { username: newUsername };

  try {
    await User.updateOne(filter, update);
    await Tasks.updateMany(filter, update);
    return NextResponse.json({ message: "Succeed. ", status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
};
