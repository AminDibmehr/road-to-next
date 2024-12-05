import { prisma } from "@/lib/prisma";
import { Ticket } from "../types";

export async function getTicket(ticketId: string) {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
}
