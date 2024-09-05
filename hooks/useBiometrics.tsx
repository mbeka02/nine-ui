import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

export const useBiometrics = () => {
    const setBiometricSetup = async () => {
      try {
        await SecureStore.setItemAsync("biometricSetupDone", "true");
        console.log("Biometric setup status saved.");
      } catch (error) {
        console.error("Error saving biometric setup status:", error);
      }
    };
  
    const isBiometricSetup = async () => {
      try {
        const biometricSetupDone = await SecureStore.getItemAsync("biometricSetupDone");
        console.log("Biometric setup status retrieved:", biometricSetupDone);
        return biometricSetupDone === "true";
      } catch (error) {
        console.error("Error retrieving biometric setup status:", error);
        return false;
      }
    };
  
    return {
      setBiometricSetup,
      isBiometricSetup,
    };
  };
  
