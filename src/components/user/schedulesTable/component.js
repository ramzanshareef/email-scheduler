import moment from "moment";
import { getUserSchedules } from "../../../../actions/user/data";

export const SchedulesCardsServer = async () => {
    const { schedules } = await getUserSchedules();
    const truncateMessage = (message, length) => {
        return message.length > length ? `${message.substring(0, length)}...` : message;
    };
    return <>
        <div className="mx-auto w-3/5">
            <h1 className="text-[#21243D] text-2xl sm:text-3xl font-semibold text-center my-4">
                Your Past Emails
            </h1>
            {schedules && schedules.length === 0 &&
                <div className="text-center text-gray-500">
                    <p className="text-sm">No emails scheduled yet 😞 </p>
                </div>
            }
            {schedules === undefined && <div className="text-center text-gray-500">
                <p className="text-sm">
                    Please login to view your scheduled emails
                </p>
            </div>}
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {schedules && schedules.map((schedule, index) => (
                    <div key={index} className="bg-gray-100 shadow-xl rounded-lg overflow-hidden transition-transform transform flex flex-col justify-between">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#21243D] mb-2">
                                {schedule.titleOfMail}
                            </h2>
                            <div className="flex items-center text-[#4B5563] mb-4">
                                <span className="text-sm mr-2">📧</span>
                                <p className="text-sm italic">{schedule.email}</p>
                            </div>
                            <div className="border border-gray-300 rounded p-2 bg-white mt-2 shadow-sm break-words whitespace-normal">
                                <p className="text-sm text-gray-700">
                                    {truncateMessage(schedule.message, 60)}
                                </p>
                            </div>
                        </div>
                        <div className={`text-white p-4 text-center
                                ${schedule.emailStatus === "sent" ? "bg-green-500" : schedule.emailStatus === "scheduled" ? "bg-yellow-500" : "bg-red-500"}
                                `}>
                            <p className="text-sm font-medium">
                                {schedule.emailStatus === "sent"
                                    ? "😃 Completed"
                                    : schedule.emailStatus === "scheduled"
                                        ? "🕒 Scheduled"
                                        : "😞 Failed"}{" "}
                                at {moment(schedule.date).format("DD MMM YYYY, hh:mm a")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>;
};