import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { FormButton } from "@/components/form/FormButton";
import { FormInput } from "@/components/form/FormInput";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { toast } from "sonner-native";
const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a password reset code by email
  const onRequestReset = async () => {
    if (!emailAddress) {
      toast.error("kindly provide your email address", {
        style: {
          borderColor: "red",
        },
      });
      return;
    }
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    if (!code || !password) {
      toast.error("fill in all the fields", {
        style: {
          borderColor: "red",
        },
      });
      return;
    }
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      toast.success(" the password reset was successful");
      // Set the user session active, which will log in the user automatically
      // @ts-ignore
      await setActive({ session: result?.createdSessionId });
    } catch (err: any) {
      // alert(err.errors[0].message);
      toast.error("unable to reset the password", {
        style: {
          borderColor: "red",
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <FormInput
            placeholder="example@gmail.com"
            title="Email"
            value={emailAddress}
            className="mt-12"
            handleChangeText={(
              e: NativeSyntheticEvent<TextInputChangeEventData>
            ) => setEmailAddress(e.nativeEvent.text)}
            props={{ autoCapitalize: "none" }}
          />
          <FormButton
            title="Send Reset Email"
            handlePress={onRequestReset}
            containerStyles="mt-7"
          />
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <FormInput
              placeholder="Code..."
              title="Verification code"
              value={code}
              className="mt-12"
              handleChangeText={(
                e: NativeSyntheticEvent<TextInputChangeEventData>
              ) => setCode(e.nativeEvent.text)}
              props={{ autoCapitalize: "none" }}
            />
            <FormInput
              placeholder="New password"
              value={password}
              className="mt-12"
              title="Password"
              handleChangeText={(
                e: NativeSyntheticEvent<TextInputChangeEventData>
              ) => setPassword(e.nativeEvent.text)}
            />
          </View>
          <FormButton
            title="Set new Password"
            handlePress={onReset}
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
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default PwReset;
