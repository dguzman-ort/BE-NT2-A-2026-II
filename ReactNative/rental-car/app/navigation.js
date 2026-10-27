import { Stack } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function Navigation() {
    const { auth } = useAuth();
    const isAuthenticated = auth !== null;
    return (
        <Stack>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="reservar/[id]" options={{ headerShown: false }} />
            </Stack.Protected>
            
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack.Protected>
            
        </Stack>
    )
}