"use server";

import { getSession } from "@/lib/session";
import connectDB from "../connectDB";
import Schedule from "../../models/Schedule";

export const getUserSchedules = async () => {
    const session = await getSession();
    if (session.isAuth) {
        const userID = session.user.id;
        try {
            await connectDB();
            let schedules = await Schedule.find({ userID: userID }).select("-userID -__v -_id").lean();
            return { status: 200, schedules: schedules };
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
    else {
        return { status: 401, message: "Unauthorized" };
    }
};