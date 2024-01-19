import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (req) =>  {
    await connect();
    const session = await getServerSession(options);

    try {
        const result = await req.json();
        const theme = result.cur;

        const updateTheme = await User.findOneAndUpdate({ email: session.user.email }, {themes: [theme]}, { new: true });
        console.log("Update result: ", updateTheme);
        return NextResponse.json({ message: "Succeed. "}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: "Fail to save : ", error}, {status: 500});
    }

    
}