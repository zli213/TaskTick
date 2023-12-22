import { NextResponse } from 'next/server';
import connect from "../../../src/utils/data/db";
import User from "../../../src/models/User";
import hashPassword from '../../../src/utils/data/hashPassword';

export const DELETE = async(req) => {
    await connect();

    const usr = await User.findOne({ username: 'Spidy'});
    const result = await req.json();
    const password = result.password;
    console.log("Get password: ", password);

    if (usr.password !== hashPassword(password)) {
        return NextResponse.json({ message: 'The password you entered is incorrect. Fail to delete. ', status: 401});
    }

    await User.deleteOne({ username: 'Spidy'});//wait for modification

    try {
        return NextResponse.json({ message: 'Succeed. ', status: 201});
    } catch (error) {
        return NextResponse.json({ message: 'Fail to delete account. ', status: 500});
    }
}