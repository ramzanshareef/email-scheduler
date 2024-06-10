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
        type: Date,
        required: true,
    },
    cronJobID: {
        type: String,
    },
});

export default mongoose.models.schedule || mongoose.model("schedule", scheduleSchema);