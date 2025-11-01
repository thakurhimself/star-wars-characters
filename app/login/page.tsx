"use client";

import { ChangeEvent, useState } from "react";

export default function LoginPage() {
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
    return (
        <section className="dark:bg-white w-screen h-screen m-3 flex justify-center items-center">
            <form className="p-6 border w-full md:w-3/4 lg:w-2/3 xl:w-1/4 bg-red-900 rounded-lg">
                <h1 className="text-2xl text-center font-bold text-white dark:text-white mb-5">Star Wars</h1>   
                <label className="flex flex-col gap-2 mb-5">
                    <span className="text-white dark:text-white font-bold">Username</span>
                    <input type="text" name="username" value={creds.username} 
                    onChange={changeHandler}
                    placeholder="Enter Username" 
                    className="dark:text-white bg-white p-2"
                    />
                </label>
                <label className="flex flex-col gap-2 mb-5">
                    <span className="text-white dark:text-white font-bold">Password</span>
                    <input type="text" name="password" value={creds.password} 
                    onChange={changeHandler}
                    placeholder="Enter Username" 
                    className="dark:text-white bg-white p-2"
                    />
                </label>
                <button className="block w-fit mx-auto bg-red-200 px-5 py-1 cursor-pointer hover:bg-red-400">Login</button>
            </form>
        </section>
    )
}