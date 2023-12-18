import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import hashPassword from '../../../src/utils/data/hashPassword';

export const POST = async (req) => {
    await connect();
    const usr = await User.findOne({ username: 'johndoe123'});

    const result = await req.json();
    const password = result.password;
    const newEmail = result.confirmEmail;
    console.log("New Email: ", newEmail);

    if (usr.password !== hashPassword(password)) {
        return NextResponse.json({ message: 'The old password you entered is incorrect. Fail to edit. ', status: 422});
    }

    //wait for modificatin. Auth?
    const filter = { username: 'johndoe123' };
    const update = { emial: newEmail };
    await User.updateOne(filter, update);

    try {
        return NextResponse.json({ message: 'Succeed. ', status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 500});
    }
}