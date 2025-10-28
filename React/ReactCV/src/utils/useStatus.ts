import { useCallback, useState } from "react";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export function useStatus(initial: AsyncStatus = "idle") {
  const [status, setStatus] = useState<AsyncStatus>(initial);
  const setLoading = useCallback(() => setStatus("loading"), [setStatus]);
  const setSuccess = useCallback(() => setStatus("success"), [setStatus]);
  const setError = useCallback(() => setStatus("error"), [setStatus]);

  return { status, setStatus, setLoading, setSuccess, setError };
}
