import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) {
  const search = (await searchParams).search;
  const sortKey = (await searchParams).sortKey;
  const sortValue = (await searchParams).sortValue;

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      [sortKey]: sortValue,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
