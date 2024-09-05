import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasscodeKeypad = ({ onKeyPress, onDelete }) => {
    const rows = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["", "0", "delete"]
    ];

    return (
        <View style={styles.keypadContainer}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keypadRow}>
                    {row.map((key, index) => (
                        <Pressable
                            key={index}
                            style={styles.key}
                            onPress={() => {
                                if (key === "delete") {
                                    onDelete();
                                } else {
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
    keypadContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    keypadRow: {
        flexDirection: "row",
    },
    key: {
        backgroundColor: "#222",
        borderRadius: 10,
        padding: 20,
        margin: 5,
        width: 80,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    keyText: {
        color: "#fff",
        fontSize: 24,
    },
});

export default PasscodeKeypad;
