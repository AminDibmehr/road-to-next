"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({
  placeholder,
  onChange,
  value,
}: SearchInputProps) {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
    />
  );
}
