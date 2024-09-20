import {AptosConfig, Network, Aptos} from "@aptos-labs/ts-sdk";

const config = new AptosConfig({network: Network.TESTNET})
export const aptos = new Aptos(config);

