import { View, StyleSheet, Button, Pressable, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
export default function Pay() {
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
        <Pressable style={styles.button} onPress={() => { }}>
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
    borderRadius: 24,
    elevation: 3,
    backgroundColor: "#9EDA6F",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "black",
  },
});
