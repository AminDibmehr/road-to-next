import { initialTickets } from "@/data";

export type Ticket = (typeof initialTickets)[number];

export type TicketStatus = Ticket["status"];
