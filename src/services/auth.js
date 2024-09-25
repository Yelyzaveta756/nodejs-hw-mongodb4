import { UserCollection } from "../db/models/auth.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
    const { email } = payload
    const user = await UserCollection.findOne({email});

    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    const data = await UserCollection.create({
        ...payload,
        password: encryptedPassword});
    delete data._doc.password;
    return data._doc;
};
