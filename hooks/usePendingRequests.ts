import { useState, useEffect, useCallback } from "react";
import { GetRequestData, getPendingRequests } from "@/services/requests";

export const usePendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState<GetRequestData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingRequests();
      setPendingRequests(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "error : unable to get pending payment requests"
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { pendingRequests, loading, error, refetchData };
};
