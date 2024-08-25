import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Text, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { FormButton } from "@/components/form/FormButton";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  const logOut = () => {
    signOut();
  };
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>

      <Text>profile</Text>
      <FormButton title="logout" handlePress={logOut} containerStyles="mt-7" />
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
