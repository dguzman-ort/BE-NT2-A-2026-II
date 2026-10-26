import { Stack } from 'expo-router';

export default function Navigation() {
    const auth = false;
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="reservar/[id]" options={{ headerShown: false }} />

            
            {/* <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="perfil" options={{ headerShown: true, title: 'Perfil' }} /> */}
        </Stack>
    )
}