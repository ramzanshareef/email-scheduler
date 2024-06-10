"use server";

import { getSession } from "@/lib/session";
import User from "../../models/User";
import connectDB from "../connectDB";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

export async function userSignup(currentState, formData) {
    let name = formData.get("name");
    let email = formData.get("email");
    let password = formData.get("password");
    if (name === "" || email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let user = await User.findOne({ email: email });
            if (user) {
                return { status: 400, message: "Email already taken" };
            }
            else {
                let salt = bcryptjs.genSaltSync(10);
                password = bcryptjs.hashSync(password, salt);
                let newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });
                await newUser.save();
                return { status: 200, message: "Signup Successfull, Please Login" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

export async function userLogin(currentState, formData) {
    let email = formData.get("email");
    let password = formData.get("password");
    if (email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let user = await User.findOne({ email: email });
            if (user) {
                let isMatch = bcryptjs.compareSync(password, user.password);
                if (isMatch) {
                    let token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }, jwt_secret, { expiresIn: "2d" });
                    const session = await getSession();
                    session.token = token;
                    session.isAuth = true;
                    session.user = {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    };
                    await session.save();
                    return { status: 200, token: token, message: "Login successful" };
                }
                else {
                    return { status: 400, message: "Invalid Credentials" };
                }
            }
            else {
                return { status: 400, message: "Invalid Credentials" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

export async function userLogout() {
    try {
        await connectDB();
        (await getSession()).destroy();
        return { status: 200, message: "Logged out" };
    }
    catch (err) {
        return { status: 500, message: "Internal server error" };
    }
}