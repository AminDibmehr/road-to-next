"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function deleteTicket(id: string) {
  const { user } = await getAuthOrRedirect();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },
  });

  if (!ticket || !isOwner(user, ticket)) {
    return toActionState("Not authorized", "ERROR");
  }

  try {
    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
}
