"use server";

import { getSession } from "@/lib/session";
import Schedule from "../../models/Schedule";
import connectDB from "../connectDB";
import { revalidatePath } from "next/cache";

let cornJobSchedulerURL = process.env.CRON_JOB_SCHEDULER_URL;
let SERVER_URL = process.env.SERVER_URL;

export async function scheduleEmail(currentState, formData) {
    let titleOfMail = formData.get("titleOfMail");
    let message = formData.get("message");
    let date = formData.get("date");
    let email = formData.get("email");
    if (titleOfMail === "" || message === "" || date === "" || email === "") {
        return { status: 400, message: "All fields are required" };
    }
    let emailDomain = email.split("@")[1];
    const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
    if (!allowedDomains.includes(emailDomain)) {
        return {
            status: 400,
            message: "Only Gmail, Yahoo, and Hotmail are allowed",
        };
    }
    else {
        try {
            await connectDB();
            const session = await getSession();
            let newSchedule = await Schedule.create({
                email: email,
                titleOfMail: titleOfMail,
                message: message,
                date: date,
                userID: session.user.id,
            });
            await newSchedule.save();

            const scheduleDate = dateStringConverter(newSchedule.date);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + process.env.CRON_JOB_SCHEDULER_TOKEN);

            const raw = JSON.stringify({
                "job": {
                    "url": SERVER_URL + "/api/sendEmail?scheduleId=" + newSchedule._id,
                    "enabled": "true",
                    "schedule": {
                        "timezone": "Asia/Kolkata",
                        "expiresAt": 0,
                        "hours": [scheduleDate.hours],
                        "mdays": [scheduleDate.mdays],
                        "minutes": [scheduleDate.minutes],
                        "months": [scheduleDate.months],
                        "wdays": [-1]
                    }
                }
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            let responseData = await fetch(cornJobSchedulerURL + "/jobs", requestOptions);
            let response = await responseData.json();
            if (responseData.status !== 200) {
                return { status: 500, message: "Internal server error" };
            }
            else {
                await Schedule.findByIdAndUpdate(newSchedule._id, { cronJobID: response.jobId });
                revalidatePath("/dashboard");
                return { status: 200, message: "Email scheduled successfully" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

function dateStringConverter(dateString) {
    const hours = dateString.substring(11, 13);
    const mdays = dateString.substring(8, 10);
    const minutes = dateString.substring(14, 16);
    const months = dateString.substring(5, 7);
    return { hours, mdays, minutes, months };
}