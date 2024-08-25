import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Image,
  TouchableOpacity,
} from "react-native";
import { icons } from "../../constants";
interface InputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  className: string;
  props?: TextInputProps;
}

const FormInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  className,
  props,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-1 ${className}`}>
      <Text className="text-sm text-white font-bold mt-2  ">{title}</Text>

      <View className="w-full h-16 px-4 text-black  border border-gray-100 rounded-2xl  focus:border-custom flex flex-row items-center">
        <TextInput
          className="flex-1 text-black placeholder:text-gray-100/80 placeholder:font-medium placeholder:text-sm font-semibold text-base"
          value={value}
          placeholder={placeholder}
          onChange={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export { FormInput };
