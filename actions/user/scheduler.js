"use server";

import Schedule from "../../models/Schedule";
import connectDB from "../connectDB";

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
    else {
        try {
            await connectDB();
            let newSchedule = await Schedule.create({
                email: email,
                titleOfMail: titleOfMail,
                message: message,
                date: date,
            });
            await newSchedule.save();

            const expiryDate = dateConvrtorForExpiry(newSchedule.date);
            const scheduleDate = convertDateString(expiryDate);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + process.env.CRON_JOB_SCHEDULER_TOKEN);

            const raw = JSON.stringify({
                "job": {
                    "url": SERVER_URL + "/api/sendEmail?scheduleId=" + newSchedule._id,
                    "enabled": "true",
                    "schedule": {
                        "timezone": "Indian/Maldives",
                        "expiresAt": expiryDate,
                        "hours": scheduleDate.hours,
                        "mdays": scheduleDate.mdays,
                        "minutes": scheduleDate.minutes,
                        "months": scheduleDate.months,
                        "wdays": scheduleDate.wdays
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
                return { status: 200, message: "Email scheduled successfully" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

function dateConvrtorForExpiry(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function convertDateString(dateString) {
    const month = parseInt(dateString.substring(4, 6));
    const day = parseInt(dateString.substring(6, 8));
    const hour = parseInt(dateString.substring(8, 10));
    const minute = parseInt(dateString.substring(10, 12));

    const result = {
        hours: [hour],
        mdays: [day],
        minutes: [minute],
        months: [month],
        wdays: [-1]
    };

    return result;
}