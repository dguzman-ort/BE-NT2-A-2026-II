import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const COLORS = {
    surface: '#F8FAFC',        // Neutral de la paleta (fondo de barra / tarjetas)
    active: '#0F1E36',         // Primary de la paleta (tab activo en el diseño)
    secondary: '#FF6B00',      // Secondary (acento naranja)
    tertiary: '#38BDF8',       // Tertiary (celeste)
    inactive: '#64748B',       // Gris medio de la escala Neutral (íconos inactivos)
    outlineVariant: '#E2E8F0', // Gris claro de la escala Neutral (bordes / separadores)
}

const getIcon = (routeName, color, size) => {
    switch (routeName) {
        case 'index':
            return <Ionicons name="home" color={color} size={size} />;
        case 'bookings':
            return <Ionicons name="calendar-outline" size={size} color={color} />;
        case 'favorites':
            return <Ionicons name="heart-outline" size={size} color={color} />;
        case 'profile':
            return <Ionicons name="person-outline" size={size} color={color} />;
    }
    return <Ionicons name="home" color={color} size={size} />;
}

export default function TabsLayout() {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: COLORS.inactive,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 10,
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.outlineVariant,
                    borderTopWidth: 1,
                    shadowColor: COLORS.active,
                    shadowOpacity: 0.1,
                    shadowRadius: 0.05,
                    elevation: 8
                },
                tabBarIcon: ({ color, size }) => getIcon(route.name, color, size)
            })}
        >
            <Tabs.Screen name="index" options={{ title: 'Home' }}  />
            <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
            <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    )
}