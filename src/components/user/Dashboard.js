import { getSession } from "@/lib/session";
import { LogoutButton } from "./LogoutButton";

const Dashboard = async () => {
    const session = await getSession();

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl font-bold text-center mt-10">Dashboard</h1>
                <p className="text-xl text-center">Welcome to your dashboard <b>{session?.user?.name}</b></p>
                <LogoutButton />
            </div>

        </>
    );
};

export default Dashboard;