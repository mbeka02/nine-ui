import { Image, StyleSheet, Platform, Pressable, Text } from 'react-native';
import '../../global'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RequestCard } from '@/components/Screens/RequestCard';
import petra from '@/components/wallet/petra';
export default function HomeScreen() {
    return (
        <ParallaxScrollView
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Home</ThemedText>
                <Pressable style={styles.button} onPress={() => petra.connect()}>
                    <Text style={styles.text}> Connect</Text>
                </Pressable>
            </ThemedView>
            <RequestCard />

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    }, button: {
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
    }

});