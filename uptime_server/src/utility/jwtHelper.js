import jwt from "jsonwebtoken"
import { jwt_secret } from "../config.js"
export const generateToken = (user) => {
    return jwt.sign({id:user._id},jwt_secret,{
        expiresIn: "2h"
    });
};
export const verifyToken = (token) => {
    return jwt.verify(token, jwt_secret);
};