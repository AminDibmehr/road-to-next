export default async function TicketsEditPage({
  params,
}: {
  params: { ticketId: string };
}) {
  const { ticketId } = await params;

  return <div>Edit Ticket {ticketId}</div>;
}
