//import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { FormButton } from "@/components/form/FormButton";
import { useCallback, useEffect, useState } from "react";
import { FormInput } from "@/components/form/FormInput";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import * as expoImagePicker from "expo-image-picker";
import "../../../global";
import userWallet from "@/lib/userWallet";
import { useBottomTabBarHeight } from "@/utilities";
import { Modal } from "@/components/Modal";
import { toast } from "sonner-native";
export default function ProfileScreen() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [mnemonic, setMnemonic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const bottomTabBarHeight = useBottomTabBarHeight();
  // Initialize form with user data when available
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
      });
    }
  }, [user]);
  const getMnemonic = useCallback(async () => {
    try {
      const mnemonic = await userWallet.getMnemonic();
      setMnemonic(mnemonic);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (isLoaded && isSignedIn) getMnemonic();
  }, [isLoaded, isSignedIn, getMnemonic]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const onSubmit = async () => {
    //prevent multiple submissions
    if (isUpdating) return;
    try {
      setIsUpdating(true);
      await user.update({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
      });
      await user.reload();
      toast.success("profile updated");
      //Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      console.log(error.errors[0]);
      toast.error("unable to update your profile", {
        style: {
          borderColor: "red",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };
  const onPickImage = async () => {
    try {
      /* const { status } =
        await expoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        toast.warning(
          "Permission Required , please grant access to your media gallery"
        );
      }*/
      let result = await expoImagePicker.launchImageLibraryAsync({
        mediaTypes: expoImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.canceled && result.assets[0].base64) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;
        const image = `data:${mimeType};base64,${base64}`;
        await user.setProfileImage({ file: image });
        await user.reload();
        toast.success("profile picture saved");
      }
    } catch (error: any) {
      //console.log(error.errors[0]);
      console.log(error);
      toast.error("unable to update your profile picture", {
        style: {
          borderColor: "red",
        },
      });
    }
  };
  return (
    <View style={{ marginBottom: bottomTabBarHeight }}>
      <Modal isOpen={isOpen}>
        <Pressable
          onPress={() => setIsOpen(false)}
          className="h-6 w-6 absolute right-3 top-3 bg-customGreen rounded-full  flex items-center justify-center"
        >
          <Feather name="x" size={13} />
        </Pressable>

        <Text className="flex text-lg font-semibold flex-wrap text-white w-full px-4">
          {mnemonic}
        </Text>
      </Modal>

      <ScrollView className="mx-6 my-12">
        <View className="relative  w-36 h-36 mx-auto">
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
            <Feather name="edit-2" size={20} />
          </Pressable>
        </View>
        <FormInput
          placeholder="Harry"
          title="Firstname"
          value={form.firstName}
          className="mt-6"
          handleChangeText={(
            e: NativeSyntheticEvent<TextInputChangeEventData>
          ) => setForm({ ...form, firstName: e.nativeEvent.text })}
        />
        <FormInput
          placeholder="Du Bois"
          title="Lastname"
          value={form.lastName}
          className="mt-6"
          handleChangeText={(
            e: NativeSyntheticEvent<TextInputChangeEventData>
          ) => setForm({ ...form, lastName: e.nativeEvent.text })}
        />
        <FormInput
          placeholder="eg. gary02"
          title="Username"
          value={form.username}
          className="mt-6"
          handleChangeText={(
            e: NativeSyntheticEvent<TextInputChangeEventData>
          ) => setForm({ ...form, username: e.nativeEvent.text })}
        />

        <FormButton
          containerStyles="mt-6"
          title={isUpdating ? "Updating" : "Update"}
          handlePress={onSubmit}
          isLoading={isUpdating}
        />

        <TouchableOpacity
          className="bg-customGreen mt-6  rounded-xl min-h-[50px] flex flex-row justify-center items-center "
          onPress={() => setIsOpen(true)}
        >
          <Text className="text-black font-semibold text-lg ">
            View Mnemonic
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
