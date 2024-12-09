import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

export function FieldError({ actionState, name }: FieldErrorProps) {
  const message = actionState.fieldErrors[name]?.[0];

  if (message == null) return null;

  return <span className="text-xs text-red-500">{message}</span>;
}
