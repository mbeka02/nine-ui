import 'react-native-get-random-values'
import nacl from 'tweetnacl'
import * as Linking from 'expo-linking'
import { add, initial, isNull } from 'lodash'
const PETRA_APP_LINK = "https://petra.app/api/v1"
import { Buffer } from 'buffer'
import { Effect } from 'effect'
import { NoPrivateKey, NoPrivateKeyError, PetraConnectionRejected, UnableToDeserializePetraResponse, UnableToGeneratePetraSharedSecret, UnableToStorePetraSharedSecret } from './errors'
import * as SecureStore from 'expo-secure-store'
import { MODULE_ENTRY_FUNCTIONS } from './module'
interface TransactionPayload {
    amount: number,
    request_id: string,
    payee_address: string
}

interface signAndSubmitData {
    appInfo: {
        domain: string,
        name?: string
    },
    payload: string,
    dappEncryptionPublicKey: string
    redirectLink: string
    nonce: string
}


interface PetraRequestedInfo {
    appInfo: {
        domain: string
    },
    redirectLink: string,
    dappEncryptionPublicKey: string
}

interface PetraConnectionResponse {
    data: string
    response: 'approved' | 'rejected'
}

interface PetraConnectionData {
    address: string
    publicKey: string
    petraPublicEncryptedKey: string
}

class PetraWallet {
    latestKeyPair: nacl.BoxKeyPair | null = null

    get sharedSecret() {
        const data = SecureStore.getItem("petra_data")
        if (isNull(data)) {
            return null
        }
        try {
            console.log("data type", typeof data)
            const parsed = JSON.parse(data) as {
                secret: string
                address: string
                user_public_key: string
                petra_public_key: string
            }

            return {
                secret: Buffer.from(parsed.secret, 'hex'),
                address: parsed.address,
                user_public_key: parsed.user_public_key,
                petra_public_key: parsed.petra_public_key
            }
        }
        catch (e) {
            console.log("Something went wrong", e, "  Parsing::", data)
            return null
        }
    }

    constructor() {

    }

    async getKeys() {
        try {

            const petra_keypair = await SecureStore.getItemAsync("petra_keypair")
            if (isNull(petra_keypair)) {
                const keys = nacl.box.keyPair()
                this.latestKeyPair = keys
                const hexPublicKey = Buffer.from(keys.publicKey).toString('hex')
                const hexPrivateKey = Buffer.from(keys.secretKey).toString('hex')
                SecureStore.setItem("petra_keypair", JSON.stringify({
                    publicKey: hexPublicKey,
                    secretKey: hexPrivateKey
                }))

            } else {
                const keys = JSON.parse(petra_keypair) as {
                    publicKey: string,
                    secretKey: string
                }

                const publicKey = Buffer.from(keys.publicKey, 'hex')
                const secretKey = Buffer.from(keys.secretKey, 'hex')

                this.latestKeyPair = {
                    publicKey,
                    secretKey
                }
            }

        }
        catch (e) {
            console.log("SOmething went wrong", e)
        }
    }

    generateSharedSecret(params: PetraConnectionResponse) {

        const keyPair = this.latestKeyPair

        const APP_SECRET = this.latestKeyPair?.secretKey

        const task = Effect.try({
            try: () => {
                if (params.response === 'rejected') {
                    throw new Error("Connection Rejected")
                }
            },
            catch(error) {
                return new PetraConnectionRejected({
                    initialError: error
                })
            },
        }).pipe(
            Effect.flatMap(() => {
                return Effect.try({
                    try() {
                        if (isNull(keyPair)) throw new Error("No key pair found")
                    },
                    catch(error) {
                        return new NoPrivateKey({
                            initialError: error
                        })
                    },
                })
            }),
            Effect.flatMap(() => {
                return Effect.try({
                    try() {
                        const decodedResponse = Buffer.from(params.data, 'base64').toString()
                        console.log("decodedResponse", decodedResponse)
                        const data = JSON.parse(decodedResponse) as PetraConnectionData
                        return data
                    },
                    catch(error) {
                        return new UnableToDeserializePetraResponse({
                            initialError: error
                        })
                    },
                })
            }),
            Effect.flatMap((data) => {
                return Effect.try({
                    try() {
                        console.log(Buffer.from(APP_SECRET!)?.toString('hex'))
                        const petraSharedSecret = nacl.box.before(
                            Buffer.from(data.petraPublicEncryptedKey?.slice(2), 'hex'),
                            keyPair?.secretKey!
                        )

                        const hex_string = Buffer.from(petraSharedSecret).toString('hex')
                        return {
                            secret: hex_string,
                            address: data.address,
                            user_public_key: data.publicKey,
                            petra_public_key: data.petraPublicEncryptedKey
                        }
                    },
                    catch(error) {
                        console.log("Something went wrong", error)
                        return new UnableToGeneratePetraSharedSecret({
                            initialError: error
                        })
                    },
                })
            }),
            Effect.flatMap((data) => {
                return Effect.try({
                    try() {
                        SecureStore.setItem("petra_data", JSON.stringify(data))

                        return data
                    },
                    catch(error) {
                        return new UnableToStorePetraSharedSecret({
                            initialError: error
                        })
                    },
                })
            })
        )

        return Effect.either(task)

    }

    encryptMessage(message: string) {
        if (isNull(this.sharedSecret)) {
            throw new Error("No shared secret found")
        }
        const sharedSecret = this.sharedSecret?.secret
        const encoded = Buffer.from(btoa(message))

        const nonce = nacl.randomBytes(nacl.secretbox.nonceLength)


        const encrypted = nacl.box.after(
            encoded,
            nonce,
            sharedSecret
        )
        return {
            encrypted: Buffer.from(encrypted).toString('hex'),
            nonce: Buffer.from(nonce).toString('hex')
        }
    }

    decryptMessage(encryptedMessage: string) {
        console.log("encryptedMessage", encryptedMessage)
        if (isNull(this.sharedSecret)) {
            throw new Error("No shared secret found")
        }
        const sharedSecret = this.sharedSecret?.secret
        const decoded = Buffer.from(encryptedMessage, 'base64')
        const nonce = decoded.subarray(0, nacl.secretbox.nonceLength)
        const ciphertext = decoded.subarray(nacl.secretbox.nonceLength)

        const decrypted = nacl.secretbox.open(ciphertext, nonce, sharedSecret)
        if (isNull(decrypted)) {
            throw new Error("Failed to decrypt message")
        }

        const data = Buffer.from(decrypted).toString('utf-8')

        console.log("Decrypted data", data)

        return data
    }


    async connect(current_location?: string) {

        if (!this.latestKeyPair) {
            await this.getKeys()
        }

        if (isNull(this.latestKeyPair)) {
            throw new Error("Failed to generate key pair")
        }

        const payload: PetraRequestedInfo = {
            appInfo: {
                domain: __DEV__ ?
                    "host.exp.exponent" :
                    "com.nine.nine_app"
            },
            redirectLink: `${Linking.createURL(current_location ?? "/")}`,
            dappEncryptionPublicKey: Buffer.from(this.latestKeyPair.publicKey).toString('hex')
        }

        const encoded = Buffer.from(JSON.stringify(payload)).toString('base64')

        const url = `${PETRA_APP_LINK}/connect?data=${encoded}`

        await Linking.openURL(url)
    }

    async disconnect() {

    }

    async signAndSumbitTransaction(payload: TransactionPayload, location?: string) {
        if (!this.latestKeyPair) {
            await this.getKeys()
        }

        if (isNull(this.latestKeyPair)) {
            throw new Error("Failed to generate key pair")
        }

        const { amount, payee_address, request_id } = payload
        console.log(amount, payee_address, request_id);
        const data = {
            arguments: [
                amount, payee_address, request_id
            ],
            function: MODULE_ENTRY_FUNCTIONS.make_payment,

        }
        // const data = {
        //     arguments: [
        //         '0x0000000000000000000000000000000000000000000000000000000000000001',
        //         10000000, // 0.1 APT
        //       ],
        //       function: '0x1::coin::transfer',
        //       type: 'entry_function_payload',
        //       type_arguments: ['0x1::aptos_coin::AptosCoin']
        // }

        console.log("data here incoming", data)
        console.log("Stringified", JSON.stringify(data));
        const hexString = Buffer.from(this.latestKeyPair?.publicKey).toString('hex')

        console.log("Public key hexString", hexString)

        const encrypted = this.encryptMessage(JSON.stringify(data))
        console.log("Didn't reach here", encrypted);
        const payloadData: signAndSubmitData = {
            appInfo: {
                domain: __DEV__ ?
                    "host.exp.exponent" :
                    "com.nine.nine_app"
            },
            payload: encrypted.encrypted,
            dappEncryptionPublicKey: hexString,
            redirectLink: `${Linking.createURL(location ?? "/")}`,
            nonce: encrypted.nonce
        }

        const encoded = Buffer.from(JSON.stringify(payloadData)).toString('base64')
        console.log("encoded", encoded)
        const url = `${PETRA_APP_LINK}/signAndSubmit?data=${encoded}`

        await Linking.openURL(url)

    }

    parseResponseToData<T = any>(response: string) {
        const decoded = Buffer.from(response, 'base64').toString()
        try {
            console.log("The returned stuff", JSON.parse(decoded));
            return JSON.parse(decoded) as T
        }
        catch (e) {
            return null
        }

    }


    // !! IMPORTANT: This will delete all keys and data - only use on logout
    async RESTRICTED_resetKeys() {
        console.log("Resetting keys")
        await SecureStore.deleteItemAsync("petra_keypair")
        await SecureStore.deleteItemAsync("petra_data")
    }

}

const petra = new PetraWallet() // Singleton

export default petra
