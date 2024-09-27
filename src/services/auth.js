import { UserCollection } from "../db/models/auth.js";
import { SessionsCollection } from "../db/models/session.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import { randomBytes } from "crypto";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/auth.js";

const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
    const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
      };
};

export const registerUser = async (payload) => {
    const { email } = payload;
    const user = await UserCollection.findOne({email});

    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    const data = await UserCollection.create({
        ...payload,
        password: encryptedPassword});
    delete data._doc.password;
    return data._doc;
};

export const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await UserCollection.findOne({email});

    if (!user) {
        throw createHttpError(404, 'User not found');
      };

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual)
        throw createHttpError(401, 'Unauthorized');

    await SessionsCollection.deleteOne({userId: user._id});

    const sessionData = createSession();

    const userSession = await SessionsCollection.create({
        userId: user._id,
        ...sessionData
    });

    return userSession;

};

  export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
  };
