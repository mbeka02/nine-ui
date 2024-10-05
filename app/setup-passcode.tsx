// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
// import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import { Ionicons } from "@expo/vector-icons";
//
// const Keypad = ({ onKeyPress, onDelete }) => {
//   const rows = [
//     ["1", "2", "3"],
//     ["4", "5", "6"],
//     ["7", "8", "9"],
//     ["", "0", "delete"],
//   ];
//
//   return (
//     <View style={styles.keypadContainer}>
//       {rows.map((row, rowIndex) => (
//         <View key={rowIndex} style={styles.keypadRow}>
//           {row.map((key, index) => (
//             <Pressable
//               key={index}
//               style={styles.key}
//               onPress={() => {
//                 if (key === "delete") {
//                   onDelete();
//                 } else {
//                   onKeyPress(key);
//                 }
//               }}
//             >
//               {key === "delete" ? (
//                 <Ionicons name="backspace" size={24} color="#fff" />
//               ) : (
//                 <Text style={styles.keyText}>{key}</Text>
//               )}
//             </Pressable>
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };
//
// const SetupPasscode = () => {
//   const [passcode, setPasscode] = useState("");
//   const [confirmPasscode, setConfirmPasscode] = useState("");
//   const [isConfirming, setIsConfirming] = useState(false);
//   const router = useRouter();
//
//   const handleKeyPress = (key) => {
//     if (passcode.length < 6) {
//       setPasscode(passcode + key);
//     }
//   };
//
//   const handleConfirmKeyPress = (key) => {
//     if (confirmPasscode.length < 6) {
//       setConfirmPasscode(confirmPasscode + key);
//     }
//   };
//
//   const handleDelete = () => {
//     if (isConfirming) {
//       setConfirmPasscode(confirmPasscode.slice(0, -1));
//     } else {
//       setPasscode(passcode.slice(0, -1));
//     }
//   };
//
//   const handlePasscodeSubmit = async () => {
//     if (isConfirming) {
//       if (passcode !== confirmPasscode) {
//         Alert.alert("Error", "Passcodes do not match. Please try again.");
//         return;
//       }
//
//       await storeData("userPasscode", passcode);
//       await storeData("biometricSetupDone", "true");
//       Alert.alert("Success", "Passcode set up successfully!"); router.replace("/"); } else { setIsConfirming(true); setConfirmPasscode(""); // Clear confirm passcode field } }; const storeData = async (key, value) => { try { await SecureStore.setItemAsync(key, value); console.log(`Data stored: ${key} = ${value}`); } catch (error) { console.error("Error storing data:", error); } }; const renderCircles = (length) => { return Array.from({ length: 6 }, (_, index) => ( <View key={index} style={[ styles.circle, { backgroundColor: index < length ? "#9EDA6F" : "#808080" }, ]} />)); }; return ( <View style={styles.container}> <Text style={styles.title}> {isConfirming ? "Confirm Passcode" : "Set Up Passcode"} </Text> <View style={styles.circlesContainer}> {renderCircles(isConfirming ? confirmPasscode.length : passcode.length)} </View> <Keypad onKeyPress={isConfirming ? handleConfirmKeyPress : handleKeyPress} onDelete={handleDelete} /> <Pressable style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]} onPress={handlePasscodeSubmit} > <Text style={styles.buttonText}> {isConfirming ? "Confirm Passcode" : "Next"} </Text> </Pressable> </View>); }; const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#000", }, title: { color: "#fff", fontSize: 24, textAlign: "center", marginBottom: 20, }, passcode: { color: "#fff", fontSize: 24, textAlign: "center", }, circlesContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 20, }, circle: { width: 17, height: 17, borderRadius: 8, margin: 5, backgroundColor: "#E5E4E2", }, keypadContainer: { flexDirection: "column", justifyContent: "center", alignItems: "center", }, keypadRow: { flexDirection: "row", }, key: { backgroundColor: "#222", borderRadius: 10, padding: 20, margin: 5, width: 90, height: 80, alignItems: "center", justifyContent: "center",
//   },
//   keyText: {
//     color: "#fff",
//     fontSize: 24,
//   },
//   button: {
//     backgroundColor: "#9EDA6F",
//     paddingVertical: 10,
//     borderRadius: 36,
//     marginHorizontal: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#000",
//     fontSize: 19,
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });
//
// export default SetupPasscode;
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

const Keypad = ({ onKeyPress, onDelete }) => {
  const rows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "delete"],
  ];

  return (
    <View style={styles.keypadContainer}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.keypadRow}>
          {row.map((key, index) => (
            <Pressable
              key={index}
              style={[styles.key, !key && styles.emptyKey]}
              onPress={() => {
                if (key === "delete") {
                  onDelete();
                } else if (key) {
                  onKeyPress(key);
                }
              }}
            >
              {key === "delete" ? (
                <Ionicons name="backspace" size={24} color="#fff" />
              ) : (
                <Text style={styles.keyText}>{key}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const SetupPasscode = () => {
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleKeyPress = (key) => {
    const currentPasscode = isConfirming ? confirmPasscode : passcode;
    if (currentPasscode.length < 6) {
      if (isConfirming) {
        setConfirmPasscode(confirmPasscode + key);
      } else {
        setPasscode(passcode + key);
      }
    }
  };

  const handleDelete = () => {
    if (isConfirming) {
      setConfirmPasscode(confirmPasscode.slice(0, -1));
    } else {
      setPasscode(passcode.slice(0, -1));
    }
  };

  const resetPasscodes = () => {
    setPasscode("");
    setConfirmPasscode("");
    setIsConfirming(false);
  };

  const storePasscode = async (passcode: string) => {
    try {
      // Store the passcode
      await SecureStore.setItemAsync("userPasscode", passcode);

      // Verify the passcode was stored
      const storedPasscode = await SecureStore.getItemAsync("userPasscode");
      if (!storedPasscode) {
        throw new Error("Failed to verify stored passcode");
      }

      // Set the setup flag
      await SecureStore.setItemAsync("passcodeSetupComplete", "true");

      console.log("Passcode successfully stored and verified");
      return true;
    } catch (error) {
      console.error("Error storing passcode:", error);
      throw error;
    }
  };

  const handlePasscodeSubmit = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      if (isConfirming) {
        if (passcode !== confirmPasscode) {
          Alert.alert("Passcodes Don't Match", "Please try again.", [
            { text: "OK", onPress: resetPasscodes },
          ]);
          return;
        }

        if (passcode.length !== 6) {
          Alert.alert("Invalid Passcode", "Passcode must be 6 digits.", [
            { text: "OK", onPress: resetPasscodes },
          ]);
          return;
        }

        await storePasscode(passcode);

        Alert.alert("Success", "Passcode set up successfully!", [
          { text: "OK", onPress: () => router.replace("/(tabs)") },
        ]);
      } else {
        if (passcode.length === 6) {
          setIsConfirming(true);
        } else {
          Alert.alert("Invalid Passcode", "Please enter a 6-digit passcode.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save passcode. Please try again.", [
        { text: "OK", onPress: resetPasscodes },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderCircles = (length) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isConfirming ? "Confirm Passcode" : "Set Up Passcode"}
      </Text>
      <View style={styles.circlesContainer}>
        {renderCircles(isConfirming ? confirmPasscode.length : passcode.length)}
      </View>
      <Keypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed || isProcessing ? 0.7 : 1 },
        ]}
        onPress={handlePasscodeSubmit}
        disabled={isProcessing}
      >
        <Text style={styles.buttonText}>
          {isProcessing
            ? "Processing..."
            : isConfirming
              ? "Confirm Passcode"
              : "Next"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 30,
  },
  circlesContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  keypadContainer: {
    width: "100%",
    maxWidth: 300,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  key: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#333",
  },
  emptyKey: {
    backgroundColor: "transparent",
  },
  keyText: {
    fontSize: 28,
    color: "#fff",
  },
  button: {
    backgroundColor: "#9EDA6F",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SetupPasscode;
