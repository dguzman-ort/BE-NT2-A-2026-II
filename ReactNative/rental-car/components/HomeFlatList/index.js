import { FlatList } from 'react-native';
import Vehiculo from '../Vehiculo';

const HomeFlatList = ({ vehiculos }) => {
    return (
        <FlatList 
        data={vehiculos} 
        renderItem={({ item }) => <Vehiculo vehiculo={item} />} 
        keyExtractor={item => item.id.toString()}
        />
    )
}

export default HomeFlatList;