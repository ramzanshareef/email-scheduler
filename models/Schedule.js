const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    titleOfMail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    cronJobID: {
        type: String,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    emailStatus: {
        type: String,
        default: "scheduled"
    },
});

export default mongoose.models.schedule || mongoose.model("schedule", scheduleSchema);