import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import Tasks from "../../../src/models/Tasks";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";


export const DELETE = async(req) => {
    await connect();
    const session = await getServerSession(options);
    const result = await req.json();
    const inputPassword = result.password;
    
    try {
        const user = await User.findOne({ email: session.user.email });
        const isPasswordValid = await bcrypt.compare(inputPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {message: 'The password you entered is incorrect. Fail to delete. '},
                {status: 401}
            )
        };

        await User.deleteOne({ email: session.user.email });
        await Tasks.deleteMany({ userId: session.user._id });
        return NextResponse.json({message: 'Succeed. '}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: 'Fail to delete account. '}, {status: 500});
    }
}