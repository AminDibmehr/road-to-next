import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  DONE: "✅",
  IN_PROGRESS: "🚧",
  OPEN: "🚨",
};

export default function TicketsPage() {
  return (
    <div>
      <h1 className="text-lg">Tickets</h1>
      <ul>
        {initialTickets.map((ticket) => (
          <div key={ticket.id}>
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h2 className="text-lg">{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              view
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
