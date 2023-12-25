import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    await connect();
    const usr = await User.findOne({ username: 'Peter Paker'});
    const result = await req.json();   
    const newEmail = result.confirmEmail;
    const isPasswordValid = await bcrypt.compare(result.password, usr.password);

    if (!isPasswordValid) {
        console.log("Not valid!");
        return NextResponse.json({ message: 'The password you entered is incorrect. Fail to edit. '}, { status: 401 });
    } else {
        console.log("Valid!");
        try {
            //wait for modificatin. Auth?
            const filter = { username: 'Peter Paker' };
            const update = { email: newEmail };
            await User.updateOne(filter, update);
            return NextResponse.json({ message: "Succeed. "}, {status: 201});
        } catch (error) {
            return NextResponse.json({ message: "Fail to edit"}, {status: 500});
        }
    }

    

    
}