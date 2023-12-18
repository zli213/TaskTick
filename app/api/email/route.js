import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";

export const POST = async (req) => {
    await connect();

    const result = await req.json();
    const newEmail = result.confirmEmail;
    console.log("New Email: ", newEmail);

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