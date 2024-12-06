"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function deleteTicket(id: string) {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  redirect(ticketsPath());
}
