import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/Spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />
      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={searchParamsCache.parse(searchParams)} />
      </Suspense>
    </div>
  );
}
