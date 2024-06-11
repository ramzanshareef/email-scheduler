import { Resend } from "resend";
import connectDB from "../../../actions/connectDB";
import Schedule from "../../../models/Schedule";

const resend = new Resend(process.env.RESEND_API_KEY);
let cornJobSchedulerURL = process.env.CRON_JOB_SCHEDULER_URL;

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(400).json({ message: "Invalid request" });
        }
        const scheduleId = req.query.scheduleId;
        if (!scheduleId) {
            return res.status(400).json({ message: "Invalid request" });
        }
        await connectDB();
        const schedulerDocument = await Schedule.findById(scheduleId);
        if (!schedulerDocument) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        const { email, titleOfMail, message, cronJobID, date } = schedulerDocument;
        console.log(new Date(date), new Date());
        if (new Date(date) > new Date()) {
            return res.status(400).json({ message: "Cannot send email before scheduled time" });
        }

        const { error } = await resend.emails.create({
            from: "Remainders <remainders@ramzanshareef.me>",
            to: email,
            subject: titleOfMail,
            html: EmailTemplate(message),
        });
        if (error) {
            return res.status(500).json({ message: "Error sending email" });
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + process.env.CRON_JOB_SCHEDULER_TOKEN);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
        };

        let response = await fetch(cornJobSchedulerURL + "/jobs/" + cronJobID, requestOptions);
        if (response.status !== 200) {
            return res.status(500).json({ message: "Internal server error" });
        }
        await Schedule.findByIdAndDelete(scheduleId);

        return res.status(200).json({ message: "Email sent successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const EmailTemplate = (message) => {
    return `<html>
            <head></head>
            <body style="font-family: Arial, sans-serif; padding: 0; margin: 0;">
                <div style="padding: 20px; margin: 0 auto; max-width: 600px; background-color: #f0f8ff; border: 1px solid #ccc; border-radius: 8px;">
                    <div style="background-color: #4CAF50; padding: 10px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                        <h1 style="color: white; margin: 0;">Remainders</h1>
                    </div>
                    <div style="padding: 20px; background-color: white;">
                        <p style="font-size: 16px; color: #333;">${message}</p>
                    </div>
                    <div style="background-color: #4CAF50; padding: 10px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                        <p style="color: white; margin: 0;">&copy; 2024 Remainders</p>
                    </div>
                </div>
            </body>
        </html>`;
};
