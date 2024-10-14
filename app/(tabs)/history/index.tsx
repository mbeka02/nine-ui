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
// import { useAllRequests } from "@/hooks/useAllRequests";
import { RequestCard } from "@/components/Screens/RequestCard";
import { useBottomTabBarHeight } from "@/utilities";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllRequests } from "@/services/requests";
export default function HistoryScreen() {
  //const { allRequests, refetchData, loading, error } = useAllRequests();
  const client = useQueryClient();
  const {
    data: allRequests,
    isLoading,
    error,
    isError,
  } = useQuery({ queryKey: ["allRequests"], queryFn: getAllRequests });
  const bottomTabBarHeight = useBottomTabBarHeight();
  if (isError) {
    return (
      <Text className="text-red-200 m-auto text-lg font-semibold">
        {error.message}
      </Text>
    );
  }

  if (isLoading) {
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
            onRefresh={() =>
              client.invalidateQueries({ queryKey: ["allRequests"] })
            }
            refreshing={isLoading}
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
        {allRequests?.map((request) => (
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
