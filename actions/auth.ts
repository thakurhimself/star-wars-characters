"use server";

import { cookies } from "next/headers";
import { createToken, verifyToken } from "../lib/auth";
import { LoginStateType } from "@/types/types";

const MOCK_USER = {
  email: "mando@example.com",
  name: 'Mandalorian',
  password: "password123",
  username: "mando123",
};

export async function loginAction(prevData: LoginStateType , formData: FormData):Promise<LoginStateType> {
  const email = formData.get("username");
  const password = formData.get("password");

  if (email !== MOCK_USER.username || password !== MOCK_USER.password) {
    return { success: false, message: "Invalid credentials" };
  }

  // This token expires in 30 seconds
  const token = createToken({ email, name: MOCK_USER.name }, 30);
  (await cookies()).set("token", token, { httpOnly: true });
  return { success: true };
}

export async function logoutAction() {
  (await cookies()).delete("token");
}

export async function refreshTokenAction() {
  const token = (await cookies()).get("token")?.value;

  if (!token) { 
    return null; 
  }

  const payload = verifyToken(token);
  if (!payload) { 
    return null;
  }

  const newToken = createToken({ email: payload.email, name: payload.name }, 30);
  (await cookies()).set("token", newToken, { httpOnly: true });
  return newToken;
}

export async function getUserAction() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  return payload ? { email: payload.email, name: payload.name } : null;
}
