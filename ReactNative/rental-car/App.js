import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { getVehiculos } from './services/vehiculos';
import HomeScrollView from './components/HomeScrollView';
import HomeFlatList from './components/HomeFlatList';
import Constants from 'expo-constants';
import FormReserva from './components/Reserva';

export default function App() {
  const [vehiculos, setVehiculos] = useState([]);
  useEffect(() => {
    getVehiculos().then(vehiculos => {
      setVehiculos(vehiculos)
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* Ejemplo con ScrollView */}
      {/* <HomeScrollView vehiculos={vehiculos} /> */}
      
      {/* Ejemplo con FlatList */}
      {/* <HomeFlatList vehiculos={vehiculos} /> */}

      {vehiculos.length > 0 && (
        <FormReserva vehiculo={vehiculos[0]} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});
