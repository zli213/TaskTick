import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import hashPassword from '../../../src/utils/data/hashPassword';
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (req) => {
    await connect();
    const session = await getServerSession(options);
    const result = await req.json();

    try {
        const user = await User.findOne({ email: session.user.email });
        const isPasswordValid = await bcrypt.compare(result.currentPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'The password you entered is incorrect. Fail to edit. '},
                {status: 401 }
            );
        } else {
            const hashedPassword = await hashPassword(result.confirmPassword);
            const filter = { email: session.user.email };
            const update = { password: hashedPassword };
            await User.updateOne(filter, update);
            return NextResponse.json({ message: 'Succeed. '}, { status: 200 });
        } 
    } catch(error) {
        return NextResponse.json({ message: 'Fail to edit. ' }, {status: 500});
    }    
}