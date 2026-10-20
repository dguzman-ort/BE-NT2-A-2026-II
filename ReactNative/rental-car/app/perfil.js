import { View, Text, StyleSheet } from 'react-native';
const Perfil = () => {
    return (
        <View style={styles.container}>
            <Text>Perfil</Text>
        </View>
    );
};

export default Perfil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});