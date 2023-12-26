import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import bcrypt from "bcrypt";

export const DELETE = async(req) => {
    await connect();

    const usr = await User.findOne({ username: 'johndoe123'});
    const result = await req.json();

    const isPasswordValid = await bcrypt.compare(result.password, usr.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'The password you entered is incorrect. Fail to delete. '}, {status: 401});
    }

    try {
        await User.deleteOne({ username: 'johndoe123'});//wait for modification
        return NextResponse.json({ message: 'Succeed. '}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: 'Fail to delete account. '}, {status: 500});
    }
}