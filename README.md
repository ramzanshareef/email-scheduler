# Email Scheduler

[![Website](https://img.shields.io/website?url=https%3A%2F%2Framzan-email-scheduler.vercel.app)](https://ramzan-email-scheduler.vercel.app)

**Email Scheduler** is a cutting-edge web application designed to enhance your productivity and organization. Whether you need to remember important dates, send reminders, or share information at just the right time, Email Scheduler has you covered. 

Imagine never forgetting a birthday, meeting, or deadline again. With Email Scheduler, you can effortlessly schedule emails to be sent at a future date and time, ensuring that your messages are delivered exactly when they need to be. This makes it ideal for a variety of scenarios, such as:

- **Personal Reminders**: Set up reminders for yourself to stay on top of tasks and events.
- **Professional Communication**: Schedule emails to colleagues and clients to ensure timely follow-ups and updates.
- **Event Planning**: Send invitations and reminders for events, ensuring everyone is informed and reminded at the right time.
- **Educational Purposes**: Teachers and students can schedule emails to send assignments, project updates, and reminders.

Our intuitive interface allows users to easily log in and manage their scheduled emails. The application leverages the power of **Next.js** for smooth, server-rendered user experiences, **Resend** for reliable email delivery, **Cron Jobs** for precise scheduling, and **MongoDB** for robust data management.

## Live Demo

Check out the live demo [here](https://ramzan-email-scheduler.vercel.app).

## Features

- User authentication
- Schedule emails for future dates and times
- Manage scheduled emails
- Reliable email delivery using Resend
- Cron jobs for accurate scheduling
- MongoDB for data storage

## Technologies Used

- **Next.js**: Framework for development
- **Resend**: Service for sending emails
- **Cron Jobs**: Scheduling emails
- **MongoDB**: Database for storing user and email data

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/itisRamzan/email-scheduler.git
    cd email-scheduler
    ```

2. **Install dependencies**:
    ```sh
    yarn install
    ```

3. **Set up environment variables**:
    Create a `.env.local` file in the root directory and add your environment variables. Example:
    ```env
    SENDER_EMAIL=your_sender_email
    SERVER_URL=your_server_url
    DB_URL=your_db_url
    JWT_SECRET=your_jwt_secret
    SESSION_SECRET=your_session_secret
    CRON_JOB_SCHEDULER_URL=your_cron_job_scheduler_url
    CRON_JOB_SCHEDULER_TOKEN=your_cron_job_scheduler_token
    RESEND_API_KEY=your_resend_api_key
    ```

4. **Run the development server**:
    ```sh
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Log In**: Create an account or log in to your existing account.
2. **Schedule an Email**: Navigate to the scheduling page, fill in the recipient's email, the subject, the body, and the date and time you want the email to be sent.
3. **Manage Scheduled Emails**: View and manage your scheduled emails from your dashboard.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [itisRamzan](https://github.com/itisRamzan)
