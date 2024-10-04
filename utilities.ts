import { useContext } from "react";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
export function useBottomTabBarHeight() {
  const height = useContext(BottomTabBarHeightContext);

  if (height === undefined) return 0;

  return height;
}

export function truncateWalletAddress(walletAddress: string) {
  const maxLength = 8;
  if (walletAddress.length > maxLength)
    return walletAddress.slice(0, maxLength) + "...";
}

// Helper function to set reminder for later
export const setRemindMeLater = async (hours = 24) => {
  try {
    const reminderTime = Date.now() + hours * 60 * 60 * 1000;
    await SecureStore.setItemAsync("remindMeLater", reminderTime.toString());
    console.log(`Reminder set for ${hours} hours from now`);
    return true;
  } catch (error) {
    console.error("Failed to set reminder:", error);
    return false;
  }
};

// Helper function to clear reminder
export const clearReminder = async () => {
  try {
    await SecureStore.deleteItemAsync("remindMeLater");
    console.log("Reminder cleared");
    return true;
  } catch (error) {
    console.error("Failed to clear reminder:", error);
    return false;
  }
};
