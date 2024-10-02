import { View, Text, Alert, StyleSheet, Image } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import userWallet from "@/lib/userWallet";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { getClerkInstance } from "@clerk/clerk-expo";
import { FALSE, HAS_SYNCED_USER_DETAILS, TRUE } from "@/lib/constants";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect } from "react";
import { PendingCard } from "@/components/Screens/PendingCard";
import { usePendingRequests } from "@/hooks/usePendingRequests";
import { ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { useBottomTabBarHeight } from "@/utilities";
//import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
export default function HomeScreen() {
  // const { user } = useUser();
  const { pendingRequests, refetchData, loading, error } = usePendingRequests();

  const tabBarHeight = useBottomTabBarHeight();
  console.log(tabBarHeight);
  const handleWalletInitialization = useCallback(async () => {
    await userWallet.init();
    const hasUserSynced = await SecureStore.getItemAsync(
      HAS_SYNCED_USER_DETAILS
    );

    if (hasUserSynced === FALSE) {
      // Sync details to backend
      // Getting push token
      console.log("Syncing user details");
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });

      // Getting session token to authenticate request to server
      const clerkInstance = getClerkInstance({
        publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!,
      });
      const sessionToken = await clerkInstance.session?.getToken();

      // Sending push token and user wallet address
      console.log("Sync Details => ", {
        expoToken: token.data,
        address: userWallet.account?.address()["hexString"],
      });

      await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expoToken: token.data,
          address: userWallet.account?.address()["hexString"],
        }),
      });

      await SecureStore.setItemAsync(HAS_SYNCED_USER_DETAILS, TRUE);
    } else {
      console.log("Already Synced", hasUserSynced);
    }

    console.log("Done");
  }, []);
  useEffect(() => {
    handleWalletInitialization();
  }, [handleWalletInitialization]);

  const Content = () => {
    if (error) {
      return (
        <Text className="text-red-200 m-auto text-lg font-semibold">
          {error}
        </Text>
      );
    }

    if (loading) {
      return (
        <ActivityIndicator color="#9EDA6F" size="large" className="m-auto" />
      );
    }
    return (
      <ScrollView
        className="mx-6  h-60 my-12"
        refreshControl={
          <RefreshControl
            onRefresh={refetchData}
            refreshing={loading}
            colors={["#9EDA6F"]}
            progressBackgroundColor="#202020"
          />
        }
      >
        {/* <View className="max-w-sm leading-4 tracking-wide  ">
          <Text className="text-4xl text-white font-bold">
            Welcome Back,
            <Text className=" text-customGreen"> {user?.username}!</Text>
          </Text>
        </View>
      */}
        <Text className="hidden last:flex w-full m-auto text-white font-semibold  text-lg  ">
          No pending requests at the moment
        </Text>
        {pendingRequests.map((request) => (
          <PendingCard
            key={request.requestID}
            amount={request.amount}
            payeeAddress={request.payee_address}
            reason={request.reason}
            requestedDate={request.requestedDate}
            requestID={request.requestID}
          />
        ))}
      </ScrollView>
    );
  };
  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/ninepay.png")}
          style={styles.logo}
        />

        <Pressable
          onPress={() => Alert.alert("Notifications clicked")}
          style={styles.notifications}
        >
           <Pressable onPress={testSendTransaction}>
          <Ionicons name="notifications-outline" size={24} color={"white"} />
        </Pressable>
        </Pressable>
      </View>
      <View style={styles.line} />

      <Content />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 28,
    paddingBottom: 0,
  },
  logo: {
    width: 110,
    height: 50,
    objectFit: "contain",
  },
  notifications: {
    paddingRight: 19,
  },
  line: {
    height: 1,
    backgroundColor: "#E5E4E2",
    marginHorizontal: 10,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 8,
    margin: 5,
    backgroundColor: "#E5E4E2",
  },
  passcodeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    zIndex: 1000, // Ensure it appears on top of other components
  },
  passcodeInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 20,
    width: 200,
    textAlign: "center",
  },
  submitButton: {
    color: "#9EDA6F",
    fontSize: 18,
  },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
  },
  checkmark: {
    width: 100,
    height: 100,
    tintColor: "#9EDA6F", // Green color for success
  },
  successText: {
    color: "#9EDA6F",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#9EDA6F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 36,
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center",
  },
});
