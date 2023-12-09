import { NextResponse} from 'next/server';
import { connectDatabase } from '../../../db';
import connect from "../../../src/utils/data/db";
//retrieve user info
export async function GET() {
    
    try {
        const db = await connectDatabase("todo-database");
        const collection = db.collection('users');
        //wait for modification. Auth?
        const user = await collection.find({username: "johndoe123"});
        console.log("Found: ",user);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, {status: 400});
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
  }
}
