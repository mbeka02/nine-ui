import { View, StyleSheet, Button, Pressable, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

import "../../global";
import makePayment from "@/lib/make-payment";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function Pay() {
  const { amount, requestID, requestedDate, payeeAddress, reason } =
    useLocalSearchParams();
  const navigation = useNavigation();
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pay Request</ThemedText>
      </ThemedView>
      <View>
        <ThemedText>{payeeAddress}</ThemedText>
        <ThemedText>Reason: {reason}</ThemedText>
        <ThemedText>Amount: {amount}</ThemedText>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() =>
            makePayment(
              1,
              "0xce4b4fd35d341391d50c332c2b8aeab3b2aa8b14243d13095be3ce2ef7d47e8d",
              "TestID"
            )
          }
        >
          <Text style={styles.text}> Pay</Text>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",

    fontWeight: "semibold",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#9EDA6F",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "semibold",
    letterSpacing: 0.25,
    color: "black",
  },
});
