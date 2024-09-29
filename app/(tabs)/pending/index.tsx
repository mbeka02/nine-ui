import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { PendingCard } from "@/components/Screens/PendingCard";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePendingRequests } from "@/hooks/usePendingRequests";
export default function PendingScreen() {
  const { pendingRequests, refetchData, loading, error } = usePendingRequests();
  if (error) {
    return (
      <Text className="text-red-200 m-auto text-lg font-semibold">{error}</Text>
    );
  }

  if (loading) {
    return (
      <ActivityIndicator color="#9EDA6F" size="large" className="m-auto" />
    );
  }

  return (
    <ScrollView
      className="mx-6 my-12"
      refreshControl={
        <RefreshControl
          onRefresh={refetchData}
          refreshing={loading}
          colors={["#9EDA6F"]}
          progressBackgroundColor="#202020"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pending Requests</ThemedText>
      </ThemedView>
      <Text className="hidden last:flex w-full m-auto text-white font-semibold  text-lg  ">
        No pending requests at the moment
      </Text>
      {pendingRequests.map((request) => (
        <PendingCard
          key={request.requestID}
          amount={request.amount}
          payeeAddress={request.payee_address}
          reason={request.reason}
          requestedDate={request.requestedDate}
          requestID={request.requestID}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 4,

    justifyContent: "center",
    alignItems: "center",
  },
});
