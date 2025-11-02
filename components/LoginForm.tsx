"use client";

import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

export default function LoginForm() {

    const router = useRouter()

    const [state, formAction, pending] = useActionState(loginAction, {success: false})
    const [creds, setCreds] = useState<{username: string, password: string}>({username: '', password: ''})
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCreds(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (state.success) {
            router.replace('/dashboard')
        }
    }, [state, router])

    return (
        <form action={formAction} className="p-6 border w-full md:w-3/4 lg:w-2/3 xl:w-1/4 bg-gray-900 rounded-lg">
            <h1 className="text-2xl text-center font-bold text-white dark:text-white mb-5">Star Wars</h1>   
            <label className="flex flex-col gap-2 mb-5">
                <span className="text-white dark:text-white font-bold">Username</span>
                <input 
                type="text" 
                name="username" 
                value={creds.username} 
                onChange={changeHandler}
                placeholder="Enter Username" 
                className="bg-white dark:bg-white dark:text-black p-2"
                />
            </label>
            <label className="flex flex-col gap-2 mb-5">
                <span className="text-white dark:text-white font-bold">Password</span>
                <input 
                type="password" 
                name="password" 
                value={creds.password} 
                onChange={changeHandler}
                placeholder="Enter Username" 
                className="bg-white dark:text-black dark:bg-white p-2"
                />
            </label>
            {
                (!state.success && state.message) &&
                <p className="w-full my-3 p-3 rounded-md bg-red-300 dark:bg-slate-200">{state.message}</p>
            }
            <button className="block w-fit mx-auto bg-red-200 dark:text-black px-5 py-1 cursor-pointer hover:bg-red-400">
                {pending ? 'Signing in...' : 'Sign in' }
            </button>
        </form>
    )
}