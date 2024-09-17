import { aptos } from "./aptos"
import userWallet from "./userWallet";
export default async function testSendTransaction() {
    try {
        console.log("Start");
        const txn = await aptos.transaction.build.simple({
            sender: userWallet.signer?.accountAddress!,
            data: {
                function: "0x1::aptos_account::transfer",
                functionArguments: [userWallet.signer?.accountAddress, 10]
            }
        });
        console.log("1");

        const senderAuthenticator = aptos.transaction.sign({
            signer: userWallet.signer!,
            transaction: txn
        });
        console.log("2");

        const commitedTransaction = await aptos.transaction.submit.simple({
            transaction: txn,
            senderAuthenticator
        });
        console.log("3");

        console.log("Transaction Hash => ", commitedTransaction.hash);
        const executedTransaction = await aptos.waitForTransaction({transactionHash: commitedTransaction.hash});
    } catch(err) {
        console.log("Error =>", err);
        throw "Error Sending Transaction";
    }
}
