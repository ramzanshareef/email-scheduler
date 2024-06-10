"use client";

import { userLogout } from "../../../actions/user/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const LogoutButton = () => {
    const router = useRouter();
    return (
        <button
            className="bg-indigo-500 m-6 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            onClick={async (e) => {
                e.preventDefault();
                await userLogout();
                toast.success("Logged out", {
                    position: "top-right",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        router.replace("/login");
                    },
                });
            }}
        >
            Logout
        </button>
    );
};