import { SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getVehiculos } from '../../services/vehiculos';
import HomeFlatList from '../../components/HomeFlatList';

const Index = () => {
    const [vehiculos, setVehiculos] = useState([]);
    useEffect(() => {
        getVehiculos().then(vehiculos => {
            setVehiculos(vehiculos)
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <HomeFlatList vehiculos={vehiculos} />
        </SafeAreaView>
    )
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})