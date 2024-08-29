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
        <ThemedText style={{ color: "white" }}>0x0123456</ThemedText>
        <ThemedText style={{ color: "white" }}>12th July, 2024</ThemedText>
      </View>
      <View style={styles.bottom}>
        <ThemedText style={{ color: "white" }}>Jumia...</ThemedText>
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
    backgroundColor: "black",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    shadowOpacity: 0.1,

    // opacity: 0.5
  },
  amount: {
    color: "#723FEB",
    fontWeight: "600",
  },
});
