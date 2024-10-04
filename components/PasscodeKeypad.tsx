import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasscodeKeypad = ({ onKeyPress, onDelete }) => {
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
});

export default PasscodeKeypad;
