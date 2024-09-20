import { aptos } from "./aptos";
import userWallet from "./userWallet";

export default async function makePayment(amount: number, receiver: string, requestID: string) {
    try {
        const balance = await aptos.getAccountAPTAmount({accountAddress: userWallet.signer!.accountAddress});
        console.log("APT Balance =>", balance);
        const txn = await aptos.transaction.build.simple({
            sender: userWallet.signer?.accountAddress!,
            data: {
                function: `${process.env.EXPO_PUBLIC_SMART_CONTRACT_ADDRESS}::nine::make_payment2`,
                functionArguments: [amount, receiver, requestID]
            }
        });

        const senderAuthenticator = aptos.transaction.sign({
            signer: userWallet.signer!,
            transaction: txn
        });
        console.log("2");

        const [userTransactionResponse] = await aptos.transaction.simulate.simple({
            signerPublicKey: userWallet.signer!.publicKey,
            transaction: txn,
        });
        console.log("Estimated Fee =>", userTransactionResponse);

        const commitedTransaction = await aptos.transaction.submit.simple({
            transaction: txn,
            senderAuthenticator
        });
        console.log("3");

        console.log("Transaction Hash => ", commitedTransaction.hash);
        const executedTransaction = await aptos.waitForTransaction({ transactionHash: commitedTransaction.hash });
        console.log("Done")
    } catch (err) {
        console.log("Error Making Payment =>", err);
        throw "Error Making Payment";
    }
}