import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";

export async function TicketList() {
  const tickets = await getTickets();

  return (
    <div className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
