import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Auth NextJS Boilerplate",
    description: "A NextJS Auth boilerplate developed by Mohd Ramzan Shareef",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className} >
                <ToastContainer />
                {children}
            </body>
        </html>
    );
}