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
            <section>
                <h1>Welcome to Dashboard</h1>
                <p>{user?.name}</p>
                <button onClick={async() => {
                    await logoutAction()
                    router.replace('/')
                }}>
                    Logout
                </button>
            </section>
        </section>
    )
}