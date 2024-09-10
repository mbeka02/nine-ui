import { View, StyleSheet, Button, Pressable, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import petra from "@/components/wallet/petra";
import {useGlobalSearchParams} from "expo-router";
import "../../global"

export default function Pay() {
    let local: {
        payee_address: string;
        amount: string;
        requestID: string;
        reason: string;
        requestedDate: string;
    } = useGlobalSearchParams();

    const payee_address = local.payee_address; 
    const amount = Number.parseFloat(local.amount); 
    const request_id = local.requestID; 
    const reason = local.reason;
    const requestedDate = local.requestedDate;

    function handlePay() {
        petra.signAndSumbitTransaction({ payee_address: payee_address, amount: amount, request_id: request_id })
    }
    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Pay Request</ThemedText>
            </ThemedView>
            <View>
                <ThemedText>{`Payee Address: ${payee_address}`}</ThemedText>
                <ThemedText>{`Reason: ${reason}`}</ThemedText>
                <ThemedText>{`Requesed Date: ${requestedDate}`}</ThemedText>
                <ThemedText>{`Amount: ${amount} APT`}</ThemedText>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => { }}>
                    <Text style={styles.text}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => handlePay()}>
                    <Text style={styles.text}> Pay</Text>
                </Pressable>

            </View>
        </ParallaxScrollView>
    )
}
const styles = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0ABAB5',

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
