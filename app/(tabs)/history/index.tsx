import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAllRequests } from "@/hooks/useAllRequests";
import { RequestCard } from "@/components/Screens/RequestCard";
import { useBottomTabBarHeight } from "@/utilities";
export default function HistoryScreen() {
  const { allRequests, refetchData, loading, error } = useAllRequests();
  const bottomTabBarHeight = useBottomTabBarHeight();
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
    <View style={{ marginBottom: bottomTabBarHeight }}>
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
          <ThemedText type="title" className="mb-8">
            Payment Request History
          </ThemedText>
        </ThemedView>
        <Text className="hidden last:flex w-full m-auto text-white font-semibold  text-lg  ">
          No pending requests at the moment
        </Text>
        {allRequests.map((request) => (
          <RequestCard
            key={request.requestID}
            amount={request.amount}
            payeeAddress={request.payee_address}
            reason={request.reason}
            requestedDate={request.requestedDate}
          />
        ))}
      </ScrollView>
    </View>
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
