import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: Promise<ParsedSearchParams> | ParsedSearchParams,
) {
  const { user } = await getAuth();
  const search = (await searchParams).search;
  const sortKey = (await searchParams).sortKey;
  const sortValue = (await searchParams).sortValue;
  const page = (await searchParams).page;
  const pageSize = (await searchParams).size;

  const skip = page * pageSize;
  const take = pageSize;

  const where = {
    userId,
    title: {
      contains: search,
      mode: "insensitive" as const,
    },
  };

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
