import { Feather } from "@expo/vector-icons";
export const icon = {
  Home: (props: any) => <Feather name="home" size={28} {...props} />,
  History: (props: any) => <Feather name="clock" size={28} {...props} />,
  Profile: (props: any) => <Feather name="user" size={28} {...props} />,
  logout: (props: any) => <Feather name="log-out" size={28} {...props} />,
};
