import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    const userData = body.formData || body.userData;

    //Confirm data exists
    if (
      userData.role === "Email User" &&
      (!userData?.email || !userData.password)
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    // hash password for email users
    if (userData.role === "Email User") {
      const hashPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashPassword;
    }

    // default settings for new users
    userData._id = new mongoose.Types.ObjectId();
    userData.account_category = "Free";

    await User.create(userData);

    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
