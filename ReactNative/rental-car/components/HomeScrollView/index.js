import { View, Text, ScrollView } from 'react-native'
import Vehiculo from '../Vehiculo'


const HomeScrollView = ({ vehiculos }) => {
    console.log(vehiculos)
    return (
        <ScrollView>
            
            {vehiculos.map(vehiculo => (
                <Vehiculo key={vehiculo.id} vehiculo={vehiculo} />
            ))}
        </ScrollView>
    )
}

export default HomeScrollView