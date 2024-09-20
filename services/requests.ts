export interface GetRequestData {
  payee_address: string;
  amount: string;
  requestID: string;
  reason: string;
  requestedDate: string;
}

export const getPendingRequests = async (): Promise<GetRequestData[]> => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/request`
  );
  const data = await response.json();
  return data;
};
