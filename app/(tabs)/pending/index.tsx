import { Button, StyleSheet, Text } from "react-native";
import { PendingCard } from "@/components/Screens/PendingCard";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { usePendingRequests } from "@/hooks/usePendingRequests";

export default function PendingScreen() {
  const { refetchData, pendingRequests, loading, error } = usePendingRequests();
  if (loading) {
    return <Text className="text-white text-lg m-auto">...loading</Text>;
  }
  console.log(pendingRequests);
  if (error) {
    console.log(error);
    // return <Text className="text-red-200">{error}</Text>;
  }
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Previous Signed Requests</ThemedText>
        <Button onPress={refetchData} title="REFETCH" />
      </ThemedView>
      <PendingCard />
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
