import { FormInput } from "@/components/form/FormInput";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Button, Pressable, Text, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import { FormButton } from "@/components/form/FormButton";
const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    emailAddress: "",
    password: "",
  });

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    if (!form.emailAddress || !form.password) {
      Alert.alert("Error", "Enter your email address and password");
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
    } catch (err: any) {
      alert(err.errors[0].message);
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
