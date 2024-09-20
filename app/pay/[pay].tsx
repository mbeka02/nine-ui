import { View, StyleSheet, Button, Pressable, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import petra from "@/components/wallet/petra";

import "../../global";

export default function Pay() {
  function handlePay() {
    const payee_address =
      "0x1dc1d5999fc92580f0324e270318ce6465a428d30e2d488b0471fd764aad39cc";
    const amount = 1000000;
    const request_id = "This is the request id";
    petra.signAndSumbitTransaction({
      payee_address: payee_address,
      amount: amount,
      request_id: request_id,
    });
  }
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pay Request</ThemedText>
      </ThemedView>
      <View>
        <ThemedText>0x0123456...</ThemedText>
        <ThemedText>Reason: Jumia....</ThemedText>
        <ThemedText>Amount: 5APT</ThemedText>
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={() => { }}>
          <Text style={styles.text}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handlePay()}>
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
