import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    }catch (error) {
        console.error('Error storing data', error);
    }
}

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch (error) {
        console.error('Error getting data', error);
    }
}

const clearData = async () => {
    try {
        await AsyncStorage.clear();
    }catch (error) {
        console.error('Error clearing data', error);
    }
}

export { storeData, getData, clearData };