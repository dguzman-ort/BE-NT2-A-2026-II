import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
    const { handleLogout } = useAuth();
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button title="Cerrar sesión" onPress={() => {
                handleLogout();
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});