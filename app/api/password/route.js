import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import hashPassword from '../../../src/utils/data/hashPassword';

export const POST = async (req) => {
    await connect();

    const usr = await User.findOne({ username: 'Spidy'});
    const result = await req.json();
    const currentPassword = result.currentPassword;
    const newPassword = result.confirmPassword;
    let hashedPassword;

    hashedPassword = await hashPassword(currentPassword);
    if (usr.password !== hashedPassword) {
        return NextResponse.json({ message: 'The old password you entered is incorrect. Fail to edit. ', status: 500});
    }

    //wait for modificatin. Auth?
    hashedPassword = await hashPassword(newPassword);
    const filter = { username: 'Spidy' };
    const update = { password: hashedPassword };
    await User.updateOne(filter, update);

    try {
        return NextResponse.json({ message: 'Succeed. ', status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 500});
    }
}