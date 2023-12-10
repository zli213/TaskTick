import { NextResponse} from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";

//retrieve user info
export const GET = async () => {
    await connect();

    //wait for modification. Auth?
    const user = await User.find({username: "johndoe123"});
    console.log("Found: ",user);

    try {
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
  }
}
