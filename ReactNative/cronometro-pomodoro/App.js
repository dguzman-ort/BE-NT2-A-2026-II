import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Vibration,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const formatTime = (total) => {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export default function App() {
  const [workMinutes, setWorkMinutes] = useState("25");
  const [breakMinutes, setBreakMinutes] = useState("5");
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);

  // Convierte el texto a segundos (si es inválido, usa el valor por defecto)
  const toSeconds = (text, fallbackMin) => {
    const n = Number(text);
    return (n > 0 ? n : fallbackMin) * 60;
  };

  // Cuenta regresiva
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // Cuando llega a 0: vibrar y cambiar de modo automáticamente
  useEffect(() => {
    if (secondsLeft > 0) return;
    Vibration.vibrate([0, 500, 200, 500]);
    const next = mode === "work" ? "break" : "work";
    setMode(next);
    setSecondsLeft(
      next === "work" ? toSeconds(workMinutes, WORK_DEFAULT) : toSeconds(breakMinutes, BREAK_DEFAULT),
    );
  }, [secondsLeft]);

  const reset = () => {
    setRunning(false);
    setMode("work");
    setSecondsLeft(toSeconds(workMinutes, WORK_DEFAULT));
  };

  const apply = () => {
    Keyboard.dismiss();
    reset();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, mode === "break" && styles.breakBg]}>
        <Text style={styles.mode}>
          {mode === "work" ? "Trabajo" : "Descanso"}
        </Text>
        <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>
        <View style={styles.buttons}>
          <Button
            title={running ? "Pausar" : "Iniciar"}
            onPress={() => setRunning((r) => !r)}
          />
          <Button title="Reiniciar" onPress={reset} />
        </View>
        <TextInput
          style={styles.input}
          value={workMinutes}
          onChangeText={setWorkMinutes}
          keyboardType="numeric"
          placeholder="Minutos de trabajo"
        />
        <TextInput
          style={styles.input}
          value={breakMinutes}
          onChangeText={setBreakMinutes}
          keyboardType="numeric"
          placeholder="Minutos de descanso"
        />
        <Button title="Aplicar" onPress={apply} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  breakBg: {
    backgroundColor: "#e0f7e9",
  },
  mode: {
    fontSize: 28,
    marginBottom: 10,
  },
  timer: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 8,
    width: 160,
    marginBottom: 10,
    textAlign: "center",
  },
});
