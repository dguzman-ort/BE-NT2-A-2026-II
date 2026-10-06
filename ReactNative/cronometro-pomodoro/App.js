import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { vibrate } from './utils';

import Constants from 'expo-constants';
import Cronometro from './components/Cronometro';
import Control from './components/Control';
import { CronometroProvider } from './hooks/useCronometro';

// console.log(Constants);

export default function App() {
  return (
    <View style={styles.container}>
        
        <CronometroProvider>
          <Cronometro />
          <Control />
        </CronometroProvider>
        
        <StatusBar style="auto" />
    </View>
    

    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});
