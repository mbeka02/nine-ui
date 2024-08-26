import { Feather } from "@expo/vector-icons";
export const icon = {
  index: (props: any) => <Feather name="home" size={24} {...props} />,
  pending: (props: any) => <Feather name="clock" size={24} {...props} />,
  profile: (props: any) => <Feather name="user" size={24} {...props} />,
  logout: (props: any) => <Feather name="log-out" size={24} {...props} />,
};
