export interface GetRequestData {
  payee_address: string;
  amount: string;
  requestID: string;
  reason: string;
  requestedDate: string;
}
console.log(process.env.EXPO_PUBLIC_BACKEND_URL);
export const getPendingRequests = async (): Promise<GetRequestData[]> => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/request`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error occured while getting all pending requests", error);

    throw new Error("something went wrong");
  }
};

export const getAllRequests = async (): Promise<GetRequestData[]> => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/request/all`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error occured while getting all requests", error);
    throw new Error("something went wrong ");
  }
};
