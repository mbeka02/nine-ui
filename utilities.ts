import { useContext } from "react";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";

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
