import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/Spinner";
import { getAuth } from "@/features/auth/actions/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  const { user } = await getAuth();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="My Tickets" description="All your tickets at one place" />
      <CardCompact
        title="Create Ticket"
        description="A new ticket will be Created"
        content={<TicketUpsertForm />}
        className="w-full max-w-[420px] self-center"
      />
      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={user?.id}
          searchParams={searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
}