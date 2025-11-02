'use client';

import { logoutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { refreshTokenAction } from "@/actions/auth";

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    useEffect(() => {
        fetch("/api/user")
        .then(res => res.json())
        .then(data => {
            if (!data?.email) {
                router.push("/");
            }
            else { 
                setUser(data);
            }
        });

        const interval = setInterval(() => {
            refreshTokenAction();
        }, 20000);

        return () => clearInterval(interval);
    }, [router])
    
    return (
        <section className="w-screen h-screen flex items-center justify-center">
            <section className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-black dark:bg-black p-6 rounded-md">
                <p className="text-white text-center mb-2 lg:mb-5 text-md md:text-xl font-bold">Hi, {user?.name}</p>
                <h1 className="w-full text-white text-center text-2xl lg:text-5xl font-bold mb-3 lg:mb-5">Welcome to The Rebellion</h1>
                <button onClick={async() => {
                    await logoutAction()
                    router.replace('/')
                }}
                className="bg-white px-4 py-1 block mx-auto rounded-md cursor-pointer hover:bg-gray-200"
                >
                    Logout
                </button>
            </section>
        </section>
    )
}