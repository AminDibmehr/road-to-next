"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signInSchema = z.object({
  email: z.string().email().min(1, { message: "Is required" }).max(191),
  password: z.string().min(6).max(191),
});

export async function signIn(_actionState: ActionState, formData: FormData) {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user == null) {
      return toActionState("Invalid email or password", "ERROR", formData);
    }

    const validPassword = await verify(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("Invalid email or password", "ERROR", formData);
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
}
