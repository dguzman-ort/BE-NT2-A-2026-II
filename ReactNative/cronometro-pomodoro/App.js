import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { vibrate } from './utils';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola, prueba para vibrar!</Text>
      <Button title="Vibrate" onPress={() => vibrate()} />
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
  },
});
