import { StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants/Icons";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
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
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 500 }
    );
  }, [scale, isFocused]);
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return { transform: [{ scale: scaleValue }], top };
  });
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {
          //@ts-ignore
          icon[routeName]({
            color: isFocused ? "black" : "white",
          })
        }
      </Animated.View>
      <Animated.Text
        style={[
          { color: color, fontSize: 13, fontWeight: "500" },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    //gap: 3,
    fontWeight: "400",
  },
});
export default TabBarButton;
