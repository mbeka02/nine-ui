import React from "react";
import { Stack } from "expo-router";
// import { TouchableOpacity, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Log in",
          /* headerLeft: () => (
            <TouchableOpacity
              className="mr-5 rounded-3xl bg-white p-1.5"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
          ),*/
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: "Reset Password",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default AuthLayout;
