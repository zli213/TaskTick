import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const PATCH = async (req) => {
    await connect();
    const session = await getServerSession(options);
    const result = await req.json();   
    const newEmail = result.confirmEmail;

    try{
        const user = await User.findOne({ email: session.user.email });
        const isPasswordValid = await bcrypt.compare(result.password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'The password you entered is incorrect. Fail to edit. '},
                { status: 401 }
            );
        } else {
            const filter = { email: session.user.email };
            const update = { email: newEmail };
            await User.updateOne(filter, update);
            return NextResponse.json({ message: "Succeed. "}, {status: 201}, update);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Fail to edit"}, {status: 500});
    }    
}