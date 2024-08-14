import { View, Text, StyleSheet } from "react-native"
import { ThemedText } from "../ThemedText"
type Props = {
    payeeAddress: string;
    amount: number;
    date: string;
    reason: string;
}
export function RequestCard({ }) {
    return (
        <View>
            <MyCard />
        </View>
    )
}
function MyCard() {
    return (
        <View style={styles.card}>
            <View style={styles.top}>
                <ThemedText >0x0123456</ThemedText>
                <ThemedText>12th July, 2024</ThemedText>
            </View>
            <View style={styles.bottom}>
                <ThemedText>Jumia...</ThemedText>
                <ThemedText>5 APT</ThemedText>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        padding: 15,
        borderRadius: 20,
        backgroundColor: '#808080',
        shadowColor: '#000',
        elevation: 5,

    }
})