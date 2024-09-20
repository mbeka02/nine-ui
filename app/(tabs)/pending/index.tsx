import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PendingCard } from "@/components/Screens/PendingCard";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePendingRequests } from "@/hooks/usePendingRequests";

export default function PendingScreen() {
  const { pendingRequests, loading, error } = usePendingRequests();
  if (error) {
    return <Text className="text-red-200">{error}</Text>;
  }

  if (loading) {
    return (
      <ActivityIndicator color="#9EDA6F" size="large" className="m-auto" />
    );
  }

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pending Requests</ThemedText>
      </ThemedView>
      <Text className="hidden last:flex w-full m-auto text-white font-semibold  text-lg  ">
        no pending requests at the moment
      </Text>
      {pendingRequests.map((request) => (
        <PendingCard
          key={request.requestID}
          amount={request.amount}
          payee_address={request.payee_address}
          reason={request.reason}
          requestedDate={request.requestedDate}
        />
      ))}
    </ParallaxScrollView>
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
