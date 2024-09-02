import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { FormButton } from "./form/FormButton";
const Logout = () => {
  const { signOut } = useAuth();
  return (
    <View className="shadow-lg bg-gray-800 rounded px-4 h-1/2 w-3/4">
      <FormButton handlePress={() => signOut} title="Log out" />
      <Button onPress={}></Button>
    </View>
  );
};

export { Logout };
