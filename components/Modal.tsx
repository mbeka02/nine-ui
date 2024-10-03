import { Modal as RNModal, ModalProps, View } from "react-native";

type Props = ModalProps & {
  isOpen: boolean;
};

const Modal = ({ isOpen, children, ...rest }: Props) => {
  return (
    <RNModal
      visible={isOpen}
      statusBarTranslucent
      animationType="slide"
      transparent
      {...rest}
    >
      <View className=" flex-1   justify-center items-center ">
        <View className=" relative shadow-2xl space-y-4 justify-center bg-customBackground border-customBorder/20 border-[1px]  rounded-xl px-4 h-1/4 w-11/12">
          {children}
        </View>
      </View>
    </RNModal>
  );
};

export { Modal };
