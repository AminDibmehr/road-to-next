"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/lucia";
import { signInPath } from "@/paths";
import { getAuth } from "./get-auth";

export async function signOut() {
  const { session } = await getAuth();

  if (session == null) {
    redirect(signInPath());
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect(signInPath());
}