import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import Tasks from "../../../src/models/Tasks";

//retrieve user info
export const GET = async () => {
    await connect();

    //wait for modification. Auth?
    const user = await User.findOne({ username: 'Spidy' });
    //console.log("Found: ",user);

    try {
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
  }
}

//save new username
export const POST = async (req) => {
    await connect();

    const result = await req.json();
    const newUsername = result.inputValue;
    console.log("Get New: ", newUsername);

    //wait for modification. Auth?
    const filter = { username: 'Spidy' };
    const update = { username: newUsername };
    await User.updateOne(filter, update);
    await Tasks.updateMany(filter, update);

    try {
        return NextResponse.json({ message: 'Succeed. ', status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error, status: 500});
    }
}
