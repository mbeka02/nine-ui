import { FormInput } from "@/components/form/FormInput";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { FormButton } from "@/components/form/FormButton";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import userWallet from "@/lib/userWallet";
import { toast } from "sonner-native";
const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
  });

  const checkBiometricSetup = async () => {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    const biometricSetupDone = await SecureStore.getItemAsync(
      "biometricSetupDone"
    );

    if (!isBiometricEnrolled && !biometricSetupDone) {
      router.replace("/biometric-setup");
    } else if (biometricSetupDone) {
      router.replace("/");
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    if (!form.emailAddress || !form.password) {
      toast.error("enter your email and password", {
        style: {
          borderColor: "red",
        },
      });
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: form.emailAddress,
        password: form.password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });

      // Load wallet details
      await userWallet.init();
      // Check if biometric setup is done
      await checkBiometricSetup();
    } catch (err: any) {
      toast.error("sign in failed", {
        style: {
          borderColor: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      <FormInput
        placeholder="example@gmail.com"
        title="Email"
        value={form.emailAddress}
        className="mt-12"
        handleChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setForm({ ...form, emailAddress: e.nativeEvent.text })
        }
        props={{ autoCapitalize: "none" }}
      />

      <FormInput
        placeholder="Password"
        title="Password"
        value={form.password}
        className="mt-12"
        handleChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setForm({ ...form, password: e.nativeEvent.text })
        }
      />
      <FormButton
        title="Log in"
        handlePress={onSignInPress}
        isLoading={loading}
        containerStyles="mt-7"
      />

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text className="text-customGreen underline">Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text className=" text-white underline">Create Account</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  button: {
    margin: 8,
    marginTop: 20,
    alignItems: "center",
  },
});

export default Login;
