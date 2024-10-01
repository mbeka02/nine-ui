import { useState, useEffect, useCallback } from "react";
import { GetRequestData, getPendingRequests } from "@/services/requests";

export const useAllRequests = () => {
  const [allRequests, setAllRequests] = useState<GetRequestData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPendingRequests();
      setAllRequests(data);
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

  return { allRequests, loading, error, refetchData };
};
