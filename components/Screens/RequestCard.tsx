import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import {Link, router} from "expo-router";

type Props = {
  payeeAddress: string;
  amount: number;
  date: string;
  requestID: string;
  reason: string;
};

export function RequestCard(args: Props) {
  return (
    <Link push href={{
        pathname: "/pay",
        params: {
          payee_address: args.payeeAddress,
          amount: args.amount.toString(),
          requestID: args.requestID,
          reason: args.reason,
          requestedDate: args.date 
        }
        }}>
        <View style={styles.card}>
            <View style={styles.top}>
                <ThemedText style={{ color: "white" }}>{args.payeeAddress}</ThemedText>
                <ThemedText style={{ color: "white" }}>{args.date}</ThemedText>
            </View>
            <View style={styles.bottom}>
                <ThemedText style={{ color: "white" }}>{args.reason}</ThemedText>
                <ThemedText style={styles.amount}>{`${args.amount} APT`}</ThemedText>
            </View>
        </View>
    </Link> 
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
    marginBottom: 5,
    backgroundColor: "#202020",
    borderColor: "rgba(158, 218, 111, 0.4)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderWidth: 1,
    

    // opacity: 0.5
  },
  amount: {
    color: "#9EDA6F",
    fontWeight: "600",
  },
});
