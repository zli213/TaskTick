/**
 * Check a tag if exist
 *
 * Method: POST
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

  try {
    const user = await User.find({ email: session.user.email });
    if (user[0].tags.includes(param.tag)) {
      return NextResponse.json( { status: 400 });
    } else {
      return NextResponse.json( { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
