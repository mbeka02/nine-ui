import {AptosAccount, HexString} from "aptos";
import {Account, Ed25519PrivateKey} from "@aptos-labs/ts-sdk";
import * as SecureStore from "expo-secure-store";
import { DERIVATION_PATH, USERS_PRIVATE_KEY, USER_ACCOUNT_MNEMONIC } from "./constants";
import 'react-native-get-random-values';
import * as bip39 from "bip39";

class UserWallet {
    privateKey: string | null = null;
    account: AptosAccount | null = null;
    signer: Account| null = null;

    constructor() {}

    async getMnemonic(): Promise<string> {
        try {   
            const savedMnemonic = await SecureStore.getItemAsync(USER_ACCOUNT_MNEMONIC);

            if(savedMnemonic) {
                return savedMnemonic;
            }

            const mnemonic = bip39.generateMnemonic();
            await SecureStore.setItemAsync(USER_ACCOUNT_MNEMONIC, mnemonic);
            return mnemonic;
        } catch(err) {
            console.log(err, "Could Not Get Mnemonic");
            throw "Could Not Get Mnemonic";
        }
    }

    // Create an account 
    async init() {
        try {
            let pk = await SecureStore.getItemAsync(USERS_PRIVATE_KEY)
            if(pk) {
                console.log("Account Already Created");
                return;
            }

            // Generating mnemonic
            let mnemonic = await this.getMnemonic();
            console.log("Mnemonic => ", mnemonic);

            // Create account from derivation path
            let account = AptosAccount.fromDerivePath(DERIVATION_PATH, mnemonic);
            this.account = account;


            // Set private key
            this.privateKey = account.toPrivateKeyObject().privateKeyHex;
            this.signer = Account.fromPrivateKey({
                privateKey: new Ed25519PrivateKey(new HexString(this.privateKey).toUint8Array())
            });
            console.log("Private Key => ", this.privateKey);
            await SecureStore.setItemAsync(USERS_PRIVATE_KEY, this.privateKey);
        } catch(err) {
            console.log("Error initing user wallet", err);
            throw "Error Initing User Wallet";
        }
    }
}

export default new UserWallet();
