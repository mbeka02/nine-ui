import { Image, StyleSheet, Platform, Pressable, Text } from 'react-native';
import '../../global'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RequestCard } from '@/components/Screens/RequestCard';
import petra from '@/components/wallet/petra';
import { Link, useGlobalSearchParams, usePathname, useRouter } from 'expo-router'
import { useEffect } from 'react';
import { Effect, Either } from 'effect';
export default function HomeScreen() {
    const globalParams = useGlobalSearchParams<{
        data: string,
        response: 'approved' | 'rejected' | 'dismissed'
    }>()
    console.log("Global Params::", globalParams)
    useEffect(() => {
        const subscription = async () => {
            if (globalParams.data && globalParams.response) {
                if (globalParams.response === 'dismissed') {
                    console.log("You have dismissed the connection request");
                    return
                }
                const task = petra.generateSharedSecret({
                    data: globalParams.data,
                    response: globalParams.response
                }).pipe(Effect.runSync)

                await Either.match(task, {
                    onLeft(left) {
                        console.log("Some error occured");
                    },
                    async onRight(right) {
                        console.log("right. Everything's good", right)

                    },
                })
            }
        }

        subscription()

    }, [globalParams.data, globalParams.response])
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