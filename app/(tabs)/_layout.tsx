import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TabBar } from "@/components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from ".";
import HistoryScreen from "./history";
import ProfileScreen from "./profile";
// ...

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,

        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        /* options={{
          title: "Home",
        }}*/
        component={HomeScreen}
      />
      <Tab.Screen
        name="History"
        /* options={{
          title: "History",
        }}*/
        component={HistoryScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
