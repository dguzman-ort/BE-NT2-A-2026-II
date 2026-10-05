import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { vibrate } from './utils';


export default function App() {

  const [seconds, setSeconds] = useState(25 * 60);
  const [isWork, setIsWork] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const handleIsRunningChange = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(isWork ? 25 * 60 : 5 * 60);
  };
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {

        if (prevSeconds === 1) {
          console.log("¡Terminó!");
          vibrate();
          setIsWork((prevIsWork) => !prevIsWork);
          return isWork ? 5 * 60 : 25 * 60;
        }

        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isWork, isRunning]);

  return (
    <View style={styles.container}>

      <Text style={styles.timer}>
        {minutes}:{remainingSeconds.toString().padStart(2, '0')}
      </Text>

      <Text style={styles.mode}>
        {isWork ? "Trabajo" : "Descanso"}
      </Text>

      <View style={styles.button}>
        <Button
          title={isRunning ? "Pausar" : "Iniciar"}
          onPress={handleIsRunningChange}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Reset"
          onPress={handleReset}
        />
      </View>

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
  timer: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  mode: {
    fontSize: 24,
  },
  button: {
    marginTop: 10,
  },
});
