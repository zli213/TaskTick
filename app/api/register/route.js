import User from "../../(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req) {
  // console.log("inside ");
  // if (req.method === "POST") {
  //   console.log(req.body); // 输出接收到的数据
  //   res.status(200).json({ message: "success" });
  // } else {
  //   // 处理其他 HTTP 方法
  //   res.setHeader("Allow", ["POST"]);
  //   res.status(405).end(`Method ${req.method} Not Allowed`);
  // }
  try {
    const body = await req.json();
    console.log("Received body:", body);
    const userData = body.formData;
    console.log("Email:", userData.email);
    console.log("Password:", userData.password);
    //Confirm data exists
    if (!userData?.email || !userData.password) {
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

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
