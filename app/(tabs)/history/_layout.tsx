import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
export default function _layout() {
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
      }}
      edges={Platform.select({
        ios: ["top", "right", "left"],
        android: undefined,
      })}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </SafeAreaView>
  );
}
