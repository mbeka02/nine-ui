import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

interface PendingCardProps {
  amount: string;
  payee_address: string;
  reason: string;
  requestedDate: string;
}

export function PendingCard({
  amount,
  payee_address,
  reason,
  requestedDate,
}: PendingCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/pay/[pay]", params: { pay: "1" } })
      }
    >
      <View style={styles.card}>
        <View style={styles.top}>
          <ThemedText style={{ color: "white" }}>{payee_address}</ThemedText>
          <ThemedText style={{ color: "white" }}>{requestedDate}</ThemedText>
        </View>
        <View style={styles.bottom}>
          <ThemedText style={{ color: "white" }}>{reason}</ThemedText>
          <ThemedText style={{ color: "#9EDA6F" }}>{amount} APT</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
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
    fontWeight: "600",
  },
});
