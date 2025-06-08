// Server action
"use server";

import { cookies } from "next/headers";

export type TinybirdCredentials = {
  url: string;
  token: string;
};

const COOKIE_NAME = "tinybird-credentials";

export async function setCredentials(credentials: TinybirdCredentials) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(credentials), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return { success: true };
}

// Server-side cookie helpers
export async function getAuthCookie(): Promise<TinybirdCredentials | null> {
  const cookieStore = await cookies();
  const credentialsCookie = cookieStore.get(COOKIE_NAME);

  if (!credentialsCookie) {
    return null;
  }

  try {
    return JSON.parse(credentialsCookie.value);
  } catch {
    return null;
  }
}

export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
