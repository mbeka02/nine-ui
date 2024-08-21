import { View, Text, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
type Props = {
  payeeAddress: string;
  amount: number;
  date: string;
  reason: string;
};

export function RequestCard() {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <ThemedText style={{ color: "#36383F" }}>0x0123456</ThemedText>
        <ThemedText style={{ color: "#36383F" }}>12th July, 2024</ThemedText>
      </View>
      <View style={styles.bottom}>
        <ThemedText style={{ color: "#36383F" }}>Jumia...</ThemedText>
        <ThemedText style={styles.amount}>0.458 APT</ThemedText>
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
    backgroundColor: "#C0C2C9",
    elevation: 5,
    // opacity: 0.5
  },
  amount: {
    color: "green",
  },
});
