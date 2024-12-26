"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  // paginatedTicketMetadata: {
  //   count: number;
  //   hasNextPage: boolean;
  // };
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

export function TicketPagination({
  paginatedTicketMetadata,
}: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(
    function () {
      if (search === prevSearch.current) return;
      prevSearch.current = search;

      setPagination({ ...pagination, page: 0 });
    },
    // add more reactive effects here once needed...
    [pagination, search, setPagination],
  );

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
}
