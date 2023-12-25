import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import hashPassword from '../../../src/utils/data/hashPassword';
import bcrypt from "bcrypt";

export const POST = async (req) => {
    await connect();

    const usr = await User.findOne({ username: 'Peter Paker'});
    console.log("User: ", usr.password);
    const result = await req.json();
    console.log("Current: ", result.currentPassword);
    console.log("Confirm: ", result.confirmPassword);

    //wait for modificatin. Auth?
    const isPasswordValid = await bcrypt.compare(result.currentPassword, usr.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
        console.log("Not valid!");
        return NextResponse.json({ message: 'The password you entered is incorrect. Fail to edit. '}, {status: 401 });
    } else {
        console.log("Valid!");
        try {
            const hashedPassword = await hashPassword(result.confirmPassword);
            const filter = { username: 'Peter Paker' };
            const update = { password: hashedPassword };
            await User.updateOne(filter, update);
            return NextResponse.json({ message: 'Succeed. '}, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Fail to edit. '}, {status: 500});
        }
    }  
}