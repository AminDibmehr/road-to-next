"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import React, { useImperativeHandle, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

export type ImperativeHandleFromDatePicker = {
  reset: () => void;
};

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker>;
};

export function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );
  const [open, setOpen] = useState(false);

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }));

  const formattedStringDate = date ? format(date, "yyy-MM-dd") : "";

  function handleSelect(selectedDate: Date | undefined) {
    setDate(selectedDate);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id} className="w-full">
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          {formattedStringDate}
          <Input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
