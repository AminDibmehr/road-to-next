"use client";

import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "@/features/ticket/search-params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Option = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortSelectProps = {
  options: Option[];
};

export function SortSelect({ options }: SortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  function handleSort(sortKey: string) {
    const sortValue = options.find(
      (option) => option.sortKey === sortKey,
    )?.sortValue;

    setSort({ sortKey, sortValue });
  }

  return (
    <Select defaultValue={sort.sortKey} onValueChange={handleSort}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.sortKey} value={option.sortKey}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
