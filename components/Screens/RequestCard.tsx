import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { truncateWalletAddress } from "@/utilities";

interface RequestCardProps {
  amount: string;
  payeeAddress: string;
  reason: string;
  requestedDate: string;
}

export function RequestCard({
  amount,
  payeeAddress,
  reason,
  requestedDate,
}: RequestCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <ThemedText style={{ color: "white" }}>
          {truncateWalletAddress(payeeAddress)}
        </ThemedText>
        <ThemedText style={{ color: "white" }}>{requestedDate}</ThemedText>
      </View>
      <View style={styles.bottom}>
        <ThemedText style={{ color: "white" }}>{reason}</ThemedText>
        <ThemedText style={{ color: "#9EDA6F" }}>{amount} APT</ThemedText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "100%",
    borderRadius: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderWidth: 1,
    backgroundColor: "#202020",
    borderColor: "rgba(158, 218, 111, 0.4)",

    // opacity: 0.5
  },
  amount: {
    color: "#9EDA6F",
    fontWeight: "black",
  },
});
