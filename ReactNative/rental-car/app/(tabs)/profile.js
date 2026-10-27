import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
    const { setAuth } = useAuth();
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button title="Cerrar sesión" onPress={() => {
                setAuth(null);
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