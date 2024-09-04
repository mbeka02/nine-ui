import { Feather } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Button,
  Pressable,
} from "react-native";
import TabBarButton from "./TabBarButton";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Modal } from "./Modal";
import { FormButton } from "./form/FormButton";
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { signOut } = useAuth();
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const [isOpen, setIsOpen] = useState(false);
  const doLogout = () => {
    signOut();
  };
  const buttonWidth = dimensions.width / 4;
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const tabPosition = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPosition.value }],
    };
  });
  return (
    <>
      <Modal isOpen={isOpen}>
        <View className="shadow-lg space-y-4 justify-center bg-black   rounded-xl px-4 h-1/4 w-4/5">
          <Pressable
            onPress={doLogout}
            className=" bg-customGreen min-h-[50px] flex flex-row justify-center items-center    rounded-3xl "
          >
            <Text className={`text-black font-semibold text-lg `}>Log Out</Text>
          </Pressable>

          <Pressable
            onPress={() => setIsOpen(false)}
            className="border-solid border-2 border-customGreen min-h-[50px]  flex flex-row justify-center items-center mt-4   rounded-3xl "
          >
            <Text className={`text-customGreen font-semibold text-lg `}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>

      <View onLayout={onTabbarLayout} style={styles.tabbar}>
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              backgroundColor: "#9EDA6F",
              borderRadius: 999,
              //marginHorizontal: 12,
              height: dimensions.height - 10,
              width: buttonWidth,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            tabPosition.value = withSpring(buttonWidth * index, {
              duration: 1500,
            });
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? "black" : "white"}
              label={label}
            />
          );
        })}
        {
          <TabBarButton
            key={"logout"}
            onPress={() => setIsOpen(true)}
            onLongPress={() => setIsOpen(true)}
            isFocused={false}
            routeName="logout"
            color="white"
            label="Log-out"
          />
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black", //"#151718",
    marginHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
