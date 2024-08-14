import { StyleSheet, Image, Platform } from 'react-native';
import { PendingCard } from '@/components/Screens/PendingCard';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Pending</ThemedText>
            </ThemedView>
            <PendingCard />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
