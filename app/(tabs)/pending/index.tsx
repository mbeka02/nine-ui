import { StyleSheet } from "react-native";
import { PendingCard } from "@/components/Screens/PendingCard";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
export default function PendingScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Previous Signed Requests</ThemedText>
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
