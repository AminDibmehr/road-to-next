"use client";

import { Ticket } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";
import { toast } from "sonner";
import { FieldError } from "@/components/form/field-error";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        name="title"
        id="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError name="title" actionState={actionState} />

      <Label htmlFor="content">Content</Label>
      <Textarea
        name="content"
        id="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError name="content" actionState={actionState} />

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </form>
  );
}
