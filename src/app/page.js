import Link from "next/link";

export default function Home() {
    return (
        <>
            <div
                className="flex flex-col items-center justify-center min-h-screen py-2"
            >
                Welcome to the NextJS Auth Template <Link href="/login"
                    className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >Login</Link> or <Link href="/signup"
                    className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >Signup</Link> to get started
            </div>
        </>
    );
}