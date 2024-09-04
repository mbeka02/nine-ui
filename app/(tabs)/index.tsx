import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RequestCard } from "@/components/Screens/RequestCard";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const promptForBiometricAuth = async () => {
    const biometricSetupDone = await SecureStore.getItemAsync("biometricSetupDone");

    if (biometricSetupDone) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Log in with your fingerprint",
        fallbackLabel: "Use Passcode",
      });

      if (!result.success) {
        Alert.alert("Authentication failed", "Unable to authenticate using biometrics.");
      } else {
        // Show the success feedback
        setShowFeedback(true);
        setTimeout(() => {
          setShowFeedback(false);
          router.replace("/");
        }, 900); // Delay navigation for 1 second
      }
    }
  };

  useEffect(() => {
  const checkRemindMeLater = async () => {
    const remindMeLater = await SecureStore.getItemAsync("remindMeLater");
    if (remindMeLater === "true") {
      router.replace("/");
    }
  };

  checkRemindMeLater();
}, []);

  // Call this function on app start or resume
  useEffect(() => {
    promptForBiometricAuth();
  }, []);

  return (
    <View style={styles.container}>
      <ParallaxScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Home</ThemedText>
        </ThemedView>
        <RequestCard />
      </ParallaxScrollView>

      {showFeedback && (
        <View style={styles.feedbackOverlay}>
          <Image source={require('@/assets/images/checkmark.png')} style={styles.checkmark} />
          <Text style={styles.successText}>Authentication Successful</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  checkmark: {
    width: 100,
    height: 100,
    tintColor: "#9EDA6F", // Green color for success
  },
  successText: {
    color: "#9EDA6F",
    fontSize: 20,
    marginTop: 20,
  },
});
