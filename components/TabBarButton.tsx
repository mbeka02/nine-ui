import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { icon } from "@/constants/Icons";
interface Props {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      {
        //@ts-ignore
        icon[routeName]({
          color: isFocused ? "#673ab7" : "white",
        })
      }

      <Text style={{ color: color }}>{label}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    fontWeight: "semibold",
  },
});
export default TabBarButton;
