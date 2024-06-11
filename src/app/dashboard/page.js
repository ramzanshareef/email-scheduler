import { getSession } from "@/lib/session";
import SchedulerForm from "@/components/user/SchedulerForm";
import { LogoutButton } from "@/components/user/LogoutButton";
import { Suspense } from "react";
import { SchedulesCardsServer } from "@/components/user/schedulesTable/component";
import { SchedulesCardsSkeleton } from "@/components/user/schedulesTable/skeleton";

export default async function dashboardPage() {
    const session = await getSession();

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl font-bold text-center mt-10">Dashboard</h1>
                <p className="text-xl text-center">Welcome to your dashboard <b>{session?.user?.name}</b></p>
                <SchedulerForm />
                <Suspense fallback={<SchedulesCardsSkeleton />} >
                    <SchedulesCardsServer />
                </Suspense>
                <LogoutButton />
            </div>
        </>
    );
}