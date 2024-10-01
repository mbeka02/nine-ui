import "../global";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
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

  useEffect(() => {
    const checkNavigation = async () => {
      if (!isLoaded) return;

      const inTabsGroup = segments[0] === "(tabs)";
      const biometricSetupDone = await isBiometricSetup();
      const passcodeSetupDone = await SecureStore.getItemAsync("userPasscode");

      console.log("Biometric Setup Done:", biometricSetupDone); // Debugging line

      if (isSignedIn) {
        if (!biometricSetupDone && !passcodeSetupDone) {
          router.replace("/biometric-setup");
        } else if (!inTabsGroup) {
          router.replace("/lock-screen");
        }
      } else if (segments[0] !== "home") {
        router.replace("/home");
      }
    };

    checkNavigation();
  }, [isLoaded, isSignedIn]);

  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Screen name="biometric-setup" options={{ headerShown: false }} />
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
