import connect from "./db";
import User from "../../models/User";

export default async function saveTheme(userId, prop) {
    await connect();

    try {
        const filter = { _id: userId };
        const update = {themes: [prop]};
        await User.updateOne(filter, update);
    } catch (error) {
        throw new Error("Update themes error. ");
    }
}