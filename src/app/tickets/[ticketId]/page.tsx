import { notFound } from "next/navigation";
import { initialTickets } from "@/data";

type TicketPageProps = {
  params: { ticketId: string };
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find(ticket => ticket.id === ticketId);

  if (ticket == null) return <div>Ticket not found</div>;

  return (
    <div>
      <h2 className="">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
}
