import { View, StyleSheet, Alert } from "react-native";
import { getClerkInstance, useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import userWallet from "@/lib/userWallet";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useAuth } from "@clerk/clerk-expo";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const {getToken} = useAuth();

  const [form, setForm] = useState({
    emailAddress: "",
    username: "",
    password: "",
  });

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    if (!form.username || !form.emailAddress || !form.password) {
      Alert.alert("Error", "Ensure that you have filled in all the fields");
      return;
    }
    setLoading(true);

    try {
      // Creating user account
      userWallet.init()

      // Create the user on Clerk
      let user = await signUp.create({
        emailAddress: form.emailAddress,
        password: form.password,
        username: form.username,
      });

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // change the UI to verify the email address
      setPendingVerification(true);

      const clerkInstance = getClerkInstance({ publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY })
      const sessionToken = await clerkInstance.session?.getToken();
      console.log("Anthony Bust => ", sessionToken)

      await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
            expoToken: token.data,
            address: userWallet.account?.pubKey()['hexString'],
        })
      }); 
      console.log("Done");
    } catch (err: any) {
      // console.log(err.errors);
      console.log(err);
      // alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    if (!code) {
      Alert.alert("Error", "Enter the verification code");
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <FormInput
            placeholder="enter your username"
            title="Username"
            value={form.username}
            className="mt-12"
            handleChangeText={(
              e: NativeSyntheticEvent<TextInputChangeEventData>,
            ) => setForm({ ...form, username: e.nativeEvent.text })}
          />

          <FormInput
            placeholder="enter your email address"
            title="Email"
            value={form.emailAddress}
            className="mt-12"
            handleChangeText={(
              e: NativeSyntheticEvent<TextInputChangeEventData>,
            ) => setForm({ ...form, emailAddress: e.nativeEvent.text })}
            props={{ autoCapitalize: "none" }}
          />

          <FormInput
            placeholder="password"
            title="Password"
            value={form.password}
            className="mt-12"
            handleChangeText={(
              e: NativeSyntheticEvent<TextInputChangeEventData>,
            ) => setForm({ ...form, password: e.nativeEvent.text })}
          />
          <FormButton
            title="Sign Up"
            handlePress={onSignUpPress}
            isLoading={loading}
            containerStyles="mt-7"
          />
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <FormInput
              placeholder="Code..."
              title="Verification Code"
              value={code}
              className="mt-12"
              handleChangeText={(
                e: NativeSyntheticEvent<TextInputChangeEventData>,
              ) => setCode(e.nativeEvent.text)}
              props={{ autoCapitalize: "none" }}
            />
          </View>
          <FormButton
            title="Verify Email"
            handlePress={onPressVerify}
            isLoading={loading}
            containerStyles="mt-7"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default Register;
