"use client";

import { toast } from "react-toastify";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { scheduleEmail } from "../../../actions/user/scheduler";

const SchedulerForm = () => {
    const [state, submitAction] = useFormState(scheduleEmail, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.status !== 200) {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("subscribeForm").reset();
                },
            });
        }
        else if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("subscribeForm").reset();
                    router.replace("/login");
                },
            });
        }
    }, [router, state]);

    return (
        <>
            <div className="w-3/5 mx-auto">
                <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="min-w-full">
                        <form action={submitAction} className="space-y-6" id="subscribeForm">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email To Schedule
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="titleOfMail"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Enter Title of Mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="titleOfMail"
                                        name="titleOfMail"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Enter Message
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        minLength={10}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50 h-32"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Select Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <SubmitButton title="Schedule" size="fit"
                                    icon={<SchedulerIcon />}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchedulerForm;

const SchedulerIcon = () => {
    return (
        <RiCalendarScheduleLine className="w-6 h-6" />
    );
};