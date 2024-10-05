import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
  Keyboard,
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
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { signOut } = useAuth();
  const [dimensions, setDimensions] = useState({ height: 20, width: 20 });
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>();

  const doLogout = async () => {
    // DON'T DELETE THE DETAILS
    //await SecureStore.deleteItemAsync("biometricSetupDone"); //add log to see if it is deleted
    //await SecureStore.deleteItemAsync("userPasscode"); //add log to see if it is deleted
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
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <Modal isOpen={isOpen}>
        <Pressable
          onPress={doLogout}
          className=" bg-customGreen min-h-[50px] flex flex-row justify-center items-center    rounded-3xl "
        >
          <Text className={`text-black font-semibold text-lg `}>Log Out</Text>
        </Pressable>

        <Pressable
          onPress={() => setIsOpen(false)}
          className="border-solid border-2 border-customBorder min-h-[50px]  flex flex-row justify-center items-center mt-4   rounded-3xl "
        >
          <Text className={`text-customGreen font-semibold text-lg `}>
            Cancel
          </Text>
        </Pressable>
      </Modal>

      <View
        onLayout={onTabbarLayout}
        style={[styles.tabbar, keyboardStatus ? styles.hideNavigation : null]}
      >
        {
          <Animated.View
            style={[
              animatedStyle,
              {
                position: "absolute",
                backgroundColor: "rgba(158, 218, 111, 0.9)",
                borderRadius: 30,

                height: dimensions.height,
                width: buttonWidth,
              },
            ]}
          />
        }
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
              duration: 1000,
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
            label="Logout"
          />
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  /* tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 14,
    paddingVertical: 14,

    borderRadius: 8,
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderTopWidth: 1,
    backgroundColor: "#202020",
    borderColor: "rgba(158, 218, 111, 0.4)",
  },*/
  tabbar: {
    position: "absolute",
    //  bottom: 0,
    //height: 80,
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#202020", //"#151718",
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    //borderColor: "rgba(158, 218, 111, 0.4)",
    //borderWidth: 1,
  },
  hideNavigation: {
    display: "none",
  },
});
