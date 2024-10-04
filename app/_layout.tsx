import "../global";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Stack, useRouter, useSegments } from "expo-router";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useBiometrics } from "@/hooks/useBiometrics";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { isBiometricSetup } = useBiometrics();
  const [initialAuthCheckComplete, setInitialAuthCheckComplete] =
    useState(false);
  useEffect(() => {
    const handleAuthRedirects = async () => {
      if (!isLoaded) return;
      try {
        const inTabsGroup = segments[0] === "(tabs)" || segments[0] === "pay";
        const inAuthGroup = segments[0] === "(public)";
        const biometricSetupDone = await isBiometricSetup();
        const inSetupFlow =
          segments[0] === "biometric-setup" || segments[0] === "setup-passcode";
        const passcodeSetupComplete = await SecureStore.getItemAsync(
          "passcodeSetupComplete"
        );
        const remindMeLater = await SecureStore.getItemAsync("remindMeLater");
        // Check if reminder has expired (if it exists)
        let reminderExpired = false;
        if (remindMeLater) {
          const reminderTime = parseInt(remindMeLater, 10);
          reminderExpired = Date.now() > reminderTime;

          // Clear expired reminder
          if (reminderExpired) {
            await SecureStore.deleteItemAsync("remindMeLater");
          }
        }
        console.log({
          isSignedIn,
          inTabsGroup,
          inAuthGroup,
          biometricSetupDone,
          passcodeSetupComplete,
          currentSegment: segments[0],
          remindMeLater,
          reminderExpired,
        });
        //USER IS AUTHED
        if (isSignedIn) {
          const hasSecuritySetup = biometricSetupDone || passcodeSetupComplete;
          const skipSecuritySetup = remindMeLater && !reminderExpired;
          // Security setup flow
          if (!hasSecuritySetup && !skipSecuritySetup) {
            // User needs security setup and hasn't opted out
            if (!inSetupFlow) {
              router.replace("/biometric-setup");
            }
          } else if (hasSecuritySetup) {
            // User has security setup, handle lock screen
            if (!inTabsGroup && segments[0] !== "lock-screen") {
              router.replace("/lock-screen");
            }
          } else if (skipSecuritySetup) {
            // User has opted out temporarily and reminder hasn't expired
            if (!inTabsGroup) {
              router.replace("/(tabs)");
            }
          }
        } else {
          // User is not authenticated
          if (!inAuthGroup) {
            router.replace("/home");
          }
        }
      } catch (error) {
        console.error("redirect failed");
      } finally {
        setInitialAuthCheckComplete(true);
      }
    };
    handleAuthRedirects();
  }, [isLoaded, isSignedIn, segments]);

  //old auth redirect logic
  /*useEffect(() => {
    const checkNavigation = async () => {
      if (!isLoaded) return;

      const inTabsGroup = segments[0] === "(tabs)";
      const biometricSetupDone = await isBiometricSetup();
      const passcodeSetupDone = await SecureStore.getItemAsync("userPasscode");

      console.log("Biometric Setup Done:", biometricSetupDone); // Debugging line
      console.log("passcodeSetupDone:", passcodeSetupDone);
      if (isSignedIn) {
        if (!biometricSetupDone && !passcodeSetupDone) {
          router.replace("/biometric-setup");
        } else if (
          (!inTabsGroup && biometricSetupDone) ||
          (!inTabsGroup && passcodeSetupDone)
        ) {
          router.replace("/lock-screen");
        }
      } else if (segments[0] !== "home") {
        router.replace("/home");
      }
    };

    checkNavigation();
  }, [isLoaded, isSignedIn]);
*/
  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="biometric-setup" options={{ headerShown: false }} />
      <Stack.Screen name="setup-passcode" options={{ headerShown: false }} />
      <Stack.Screen name="lock-screen" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ThemeProvider value={DarkTheme}>
          <InitialLayout />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
