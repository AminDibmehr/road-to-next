import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = { actionState: ActionState };

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(
    function () {
      if (!isUpdate) return;

      if (actionState.status === "SUCCESS") {
        options.onSuccess?.({ actionState });
      }
      if (actionState.status === "ERROR") {
        options.onError?.({ actionState });
      }

      prevTimestamp.current = actionState.timestamp;
    },
    [actionState, options, isUpdate],
  );
}