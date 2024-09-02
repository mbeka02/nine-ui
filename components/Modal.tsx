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
      <View className=" flex-1   justify-center items-center ">{children}</View>
    </RNModal>
  );
};

export { Modal };
