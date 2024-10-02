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
  value: string | null;
  placeholder: string;
  handleChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  className: string;
  props?: TextInputProps;
  //onChangeText: (text: string) => void;
}

const FormInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  className,
  props,
}: // onChangeText,
  InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputText = value ?? "";
  return (
    <View className={`space-y-1  ${className}`}>
      <Text className="text-base text-white font-medium mt-2   ">{title}</Text>

      <View className="w-full  h-12 px-4 text-black border border-customBorderwhite rounded-xl  focus:border-customGreen flex flex-row items-center">
        <TextInput
          className="flex-1  text-black  placeholder:text-gray-100/80 placeholder:font-medium placeholder:text-sm font-semibold text-base"
          value={inputText}
          placeholder={placeholder}
          onChange={handleChangeText}
          //    onChangeText={onChangeText}
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
