import { View, Text, Alert, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React from "react";
import PasscodeKeypad from "@/components/PasscodeKeypad";
import { Pressable } from "react-native";

export default function LockScreen() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const promptForPasscodeAuth = async () => {
    const savedPasscode = await SecureStore.getItemAsync("userPasscode");
    if (savedPasscode) {
      setShowPasscodePrompt(true);
    }
  };

  const handleKeyPress = (key: string) => {
    if (passcode.length < 6) {
      setPasscode(passcode + key);
    }
  };

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1));
  };

  const handlePasscodeSubmit = async () => {
    const savedPasscode = await SecureStore.getItemAsync("userPasscode");

    if (passcode === savedPasscode) {
      setShowFeedback(true);
      setShowPasscodePrompt(false);
      setTimeout(() => {
        setShowFeedback(false);
        router.replace("/");
      }, 900); // Delay navigation for 1 second
    } else {
      Alert.alert("Authentication failed", "Incorrect passcode.");
    }
  };

  const promptForBiometricAuth = async () => {
    const biometricSetupDone = await SecureStore.getItemAsync(
      "biometricSetupDone"
    );

    if (biometricSetupDone) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Log in with your fingerprint",
        fallbackLabel: "Use Passcode",
      });

      if (!result.success) {
        Alert.alert(
          "Authentication failed",
          "Unable to authenticate using biometrics."
        );
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
  /*
  useEffect(() => {
    const checkRemindMeLater = async () => {
      const remindMeLater = await SecureStore.getItemAsync("remindMeLater");
      if (remindMeLater === "true") {
        router.replace("/");
      }
    };

    checkRemindMeLater();
  }, []);
*/
  const authenticateUser = async () => {
    const firstTimeLogin = await SecureStore.getItemAsync("firstTimeLogin");

    // Skip authentication if the user has just completed setup
    if (firstTimeLogin === "true") {
      // Reset the flag after the first successful login
      await SecureStore.setItemAsync("firstTimeLogin", "false");
      return;
    }
    const passcodeSetupComplete = await SecureStore.getItemAsync(
      "passcodeSetupComplete"
    );

    const biometricSetupDone = await SecureStore.getItemAsync(
      "biometricSetupDone"
    );

    if (passcodeSetupComplete) {
      await promptForPasscodeAuth();
    } else if (biometricSetupDone) {
      await promptForBiometricAuth();
    }
  };
  const renderCircles = (length: number) => {
    return Array.from({ length: 6 }, (_, index) => (
      <View
        key={index}
        style={[
          styles.circle,
          { backgroundColor: index < length ? "#9EDA6F" : "#808080" },
        ]}
      />
    ));
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <View style={styles.container}>
      {showPasscodePrompt && (
        <View style={styles.passcodeOverlay}>
          <Image
            source={require("@/assets/images/ninepay.png")}
            style={styles.logo}
          />
          <View style={styles.circlesContainer}>
            {renderCircles(
              isConfirming ? confirmPasscode.length : passcode.length
            )}
          </View>
          <PasscodeKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handlePasscodeSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      )}
      {showFeedback && (
        <View style={styles.feedbackOverlay}>
          <Image
            source={require("@/assets/images/checkmark.png")}
            style={styles.checkmark}
          />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 28,
    paddingBottom: 0,
  },
  logo: {
    width: 110,
    height: 50,
    objectFit: "contain",
  },
  notifications: {
    paddingRight: 19,
  },
  line: {
    height: 1,
    backgroundColor: "#E5E4E2",
    marginHorizontal: 10,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 8,
    margin: 5,
    backgroundColor: "#E5E4E2",
  },
  passcodeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 1000, // Ensure it appears on top of other components
  },
  passcodeInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
    width: 200,
    textAlign: "center",
  },
  submitButton: {
    color: "#9EDA6F",
    fontSize: 18,
  },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
  },
  checkmark: {
    width: 100,
    height: 100,
    tintColor: "#9EDA6F", // Green color for success
  },
  successText: {
    color: "#9EDA6F",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#9EDA6F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 36,
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
});
