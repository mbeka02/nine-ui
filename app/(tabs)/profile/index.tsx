import ParallaxScrollView from "@/components/ParallaxScrollView";
import { StyleSheet, Image, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { FormButton } from "@/components/form/FormButton";
import { useState } from "react";
import { FormInput } from "@/components/form/FormInput";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Alert } from "react-native";
export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user, isSignedIn, isLoaded } = useUser();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
  });

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const logOut = () => {
    signOut();
  };

  const onSubmit = async () => {
    try {
      user.update({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
      });
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      console.log(error.errors[0]);
      Alert.alert("Error", "Failed to update profile");
    }
  };
  /*const handleInputChange = (field: string) => (text: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: text }));
  };*/
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Edit Profile</ThemedText>
      </ThemedView>
      <Image
        source={
          user?.imageUrl
            ? { uri: user?.imageUrl }
            : require("@/assets/images/default-profile-pic.png")
        }
        className="w-20 h-20 mx-auto rounded-full border-solid border-2 border-custom"
      />
      <FormInput
        placeholder="Harry"
        title="firstname"
        value={form.firstName}
        className="mt-8"
        handleChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setForm({ ...form, firstName: e.nativeEvent.text })
        }
      />
      <FormInput
        placeholder="Dubois"
        title="lastname"
        value={form.lastName}
        className="mt-8"
        handleChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setForm({ ...form, lastName: e.nativeEvent.text })
        }
      />
      <FormInput
        placeholder="eg. gary02"
        title="username"
        value={form.username}
        className="mt-8"
        handleChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setForm({ ...form, username: e.nativeEvent.text })
        }
      />
      <View className="w-full mt-2 flex flex-row items-center">
        <FormButton
          title="update"
          handlePress={onSubmit}
          containerStyles="w-24 mr-4"
        />

        <FormButton
          title="logout"
          handlePress={logOut}
          containerStyles="w-24"
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
