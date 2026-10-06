import { View, Button, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useCronometro } from '../../hooks/useCronometro';

const Control = () => {
    const { isRunning, toggleRunning } = useCronometro();
    return (
        <>
            <View style={styles.buttonsContainer}>
                <Button title={isRunning ? 'Stop' : 'Start'} onPress={toggleRunning} />
                <Button title="Reset" />
            </View>
        </>
        
    );
};

export default Control;