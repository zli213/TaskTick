import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import hashPassword from '../../../src/utils/data/hashPassword';
import bcrypt from "bcrypt";

export const POST = async (req) => {
    await connect();
    const usr = await User.findOne({ username: 'Spidy'});

    const result = await req.json();
    const password = hashPassword(result.password) + "";
    const newEmail = result.confirmEmail;
    const isPasswordValid = bcrypt.compare(usr.password + "", password);

    if (!isPasswordValid) {
        // console.log("Not valid!");
        return NextResponse.json({ message: 'The password you entered is incorrect. Fail to edit. '}, { status: 401 });
    } else {
        // console.log("Valid!");
        try {
            //wait for modificatin. Auth?
            const filter = { username: 'Spidy' };
            const update = { email: newEmail };
            await User.updateOne(filter, update);
            // not working
            return NextResponse.redirect(new URL('/application/setting/account', req.url));
        } catch (error) {
            return NextResponse.json({ message: "Fail to edit"}, {status: 500});
        }
    }

    

    
}