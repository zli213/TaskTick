import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import Tasks from "../../../src/models/Tasks";
import bcrypt from "bcrypt";

export const DELETE = async(req) => {
    await connect();

    const usr = await User.findOne({ username: 'johndoe123'});
    const result = await req.json();
    const inputPassword = result.password;

    const isPasswordValid = await bcrypt.compare(inputPassword, usr.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'The password you entered is incorrect. Fail to delete. '}, {status: 401});
    }
    
    try {
        await User.deleteOne({ username: 'johndoe123'});
        await Tasks.deleteMany({ username: 'johndoe123' });
        return NextResponse.json({ message: 'Succeed. '}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: 'Fail to delete account. '}, {status: 500});
    }
}