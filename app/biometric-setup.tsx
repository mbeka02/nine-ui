import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image, Pressable } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { setRemindMeLater } from "@/utilities";

const BiometricSetup = () => {
  const router = useRouter();
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [authTypes, setAuthTypes] = useState<string[]>([]);
  const handleRemindLater = async () => {
    Alert.alert(
      "Skip Security Setup",
      "You can set up additional security later. Would you like to be reminded:",
      [
        {
          text: "In 24 hours",
          onPress: async () => {
            await setRemindMeLater(24);
            router.replace("/(tabs)");
          },
        },
        {
          text: "In 48 hours",
          onPress: async () => {
            await setRemindMeLater(48);
            router.replace("/(tabs)");
          },
        },
        {
          text: "In 1 week",
          onPress: async () => {
            await setRemindMeLater(168); // 7 days * 24 hours
            router.replace("/(tabs)");
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      console.log("Biometric hardware support:", compatible);
      console.log("Biometrics enrolled:", enrolled);
      console.log("Supported authentication types:", supportedTypes);

      if (compatible && enrolled && supportedTypes.length > 0) {
        setIsSupported(true);
        const types = supportedTypes.map((type) => {
          if (type === LocalAuthentication.AuthenticationType.FINGERPRINT)
            return "Fingerprint";
          if (
            type === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
          )
            return "Facial Recognition";
          if (type === LocalAuthentication.AuthenticationType.IRIS)
            return "Iris Recognition";
        });
        setAuthTypes(types);
      } else {
        setIsSupported(false);
      }
    };

    checkBiometricSupport();
  }, []);

  const setupBiometric = async () => {
    // First authentication
    const firstAttempt = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Use Passcode",
    });

    if (firstAttempt.success) {
      // Second authentication for confirmation
      const secondAttempt = await LocalAuthentication.authenticateAsync({
        promptMessage: "Please Confirm Your Fingerprint",
        fallbackLabel: "Use Passcode",
      });

      if (secondAttempt.success) {
        await storeData("biometricSetupDone", "true");
        Alert.alert("Success", "Biometric authentication set up successfully!");
        router.replace("/");
      } else {
        Alert.alert(
          "Failed",
          `Biometric authentication setup failed during confirmation.`
        );
      }
    } else {
      Alert.alert(
        "Failed",
        `Biometric authentication setup failed during initial attempt.`
      );
    }
  };

  const storeData = async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Data stored: ${key} = ${value}`);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/print1.png")}
          style={styles.logo}
        />
        <Text style={styles.bannerText}>
          Use biometrics to quickly and securely log in, approve transactions,
          and unlock this app. Or set a passcode for unlocking this app.
        </Text>
      </View>
      {isSupported ? (
        <>
          <Pressable
            style={({ pressed }) => [
              styles.button3,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={setupBiometric}
          >
            <Text style={styles.buttonText}>Set up biometrics</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => router.push("/setup-passcode")}
          >
            <Text style={styles.buttonText1}>Set passcode</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button2,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleRemindLater}
          >
            <Text style={styles.buttonText}>Remind me later</Text>
          </Pressable>

          {/* {authTypes.length > 0 && (
              <Text style={styles.info}>Supported types: {authTypes.join(', ')}</Text>
            )} */}
        </>
      ) : (
        <>
          <Text style={styles.error}>
            Either biometric authentication is not supported on this device or
            has not been setup in your Security Settings
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => router.push("/setup-passcode")}
          >
            <Text style={styles.buttonText1}>Set passcode</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button2,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.buttonText}>Remind me later</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // the banner text was overlapping with the buttons
    // justifyContent: "center",
    padding: 20,
    marginTop: 10,
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: -40,
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "rgba(158, 218, 111, 0.5)",
    position: "absolute",
    bottom: 115,
    left: 0,
    right: 0,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  button2: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 45,
    left: 0,
    right: 0,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  button3: {
    backgroundColor: "#9EDA6F",
    position: "absolute",
    bottom: 185,
    left: 0,
    right: 0,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonText1: {
    color: "#9EDA6F",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  info: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default BiometricSetup;
