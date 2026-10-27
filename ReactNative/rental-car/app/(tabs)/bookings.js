import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Reservas from '../../components/Reservas';

export default function Bookings() {
    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <Reservas />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F7F9FB',
    },
});
