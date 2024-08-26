import ParallaxScrollView from "@/components/ParallaxScrollView";
import { StyleSheet, Image, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";

import { FormButton } from "@/components/form/FormButton";
import { useState } from "react";
import { FormInput } from "@/components/form/FormInput";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Alert } from "react-native";
import * as expoImagePicker from "expo-image-picker";
export default function ProfileScreen() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
  });

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const onSubmit = async () => {
    try {
      await user.update({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
      });
      await user.reload();
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      console.log(error.errors[0]);
      Alert.alert("Error", "Failed to update profile");
    }
  };
  /*const handleInputChange = (field: string) => (text: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: text }));
  };*/
  const onPickImage = async () => {
    try {
      let result = await expoImagePicker.launchImageLibraryAsync({
        mediaTypes: expoImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      console.log(result);

      if (!result.canceled && result.assets[0].base64) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;
        const image = `data:${mimeType};base64,${base64}`;
        await user.setProfileImage({ file: image });
        await user.reload();
      }
    } catch (error: any) {
      console.log(error.errors[0]);
      Alert.alert("Error", "Failed to update profile picture");
    }
  };
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Edit Profile</ThemedText>
      </ThemedView>
      <View className="relative w-24 h-24 mx-auto">
        <Image
          source={
            user?.imageUrl
              ? { uri: user?.imageUrl }
              : require("@/assets/images/default-profile-pic.png")
          }
          className="w-full h-full rounded-full border-solid border-2 border-custom"
        />
        <Pressable
          className="h-8 w-8 flex bg-white rounded-full  justify-center items-center absolute bottom-0 -right-2 "
          onPress={onPickImage}
        >
          <Feather name="edit" size={20} />
        </Pressable>
      </View>
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
        placeholder="Du Bois"
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
      <FormButton title="update" handlePress={onSubmit} />
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
