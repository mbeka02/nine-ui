import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }} >
            <Stack.Screen
                name="[pay]"      
            />
        </Stack>
    )
}

export default _layout
