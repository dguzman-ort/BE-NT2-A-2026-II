import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert } from 'react-native';
import * as Location from 'expo-location';


const refugiosMarkers = [
    {
        coordinate: { latitude: -31.4167, longitude: -64.1833 },
        title: "Refugio Cordoba",
        description: "Refugio Cordoba is a city in Argentina.",
        pinColor: "red",
    },
    {
        coordinate: { latitude: -34.5889, longitude: -58.4306 },
        title: "Refugio Palermo",
        description: "Refugio Palermo is a city in Argentina.",
        pinColor: "green",
    },
    {
        coordinate: { latitude: -34.9333, longitude: -57.95 },
        title: "Refugio La Plata",
        description: "Refugio La Plata is a city in Argentina.",
        pinColor: "yellow",
    },
    {
        coordinate: { latitude: -38.0, longitude: -57.55 },
        title: "Refugio Mar del Plata",
        description: "Refugio Mar del Plata is a city in Argentina.",
        pinColor: "purple",
    },
];

export default function App() {


    const [location, setLocation] = useState(null);

    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log('location', location);
            setLocation(location);
        }

        getCurrentLocation();
    }, []);

    // if (!location)
    //     return (
    //         <View style={styles.container}>
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: location?.coords?.latitude || -31.4167,
                    longitude: location?.coords?.longitude || -64.1833,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
            >
                {/* <Marker 
            coordinate={{ latitude: -31.4135, longitude: -64.1810 }} 
            title="Cordoba" 
            description="Cordoba is a city in Argentina." 
            pinColor="blue"
            /> */}

                {refugiosMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        pinColor={marker.pinColor}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
