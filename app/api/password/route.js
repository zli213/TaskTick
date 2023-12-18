import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import bcrypt from 'bcrypt';

export const POST = async (req) => {
    await connect();

    const result = await req.json();
    const newPassword = result.confirmPassword;

    const saltAround = 1;
    let hashedPassword;

    bcrypt.hash(newPassword, saltAround)
    .then(hash => {
        hashedPassword = hash;
    }).catch(err => {
        console.error('Error hashing password:', err);
    });

    //wait for modificatin. Auth?
    const filter = { username: 'johndoe123' };
    const update = { password: hashedPassword };
    await User.updateOne(filter, update);

    try {
        return NextResponse.json({ message: 'Succeed. ', status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 500});
    }
}