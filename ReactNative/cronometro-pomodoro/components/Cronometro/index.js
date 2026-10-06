import { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';

import { useCronometro } from '../../hooks/useCronometro';

import styles from './styles';
import constants from './constants';
import { vibrate } from '../../utils';


const minToSec = (min) => min * 60;
const padZero = (num) => num < 10 ? `0${num}` : num;


const Cronometro = () => {
    const { isRunning, isWorking, toggleWorking } = useCronometro();
    const [remainingTime, setRemainingTime] = useState(minToSec(constants.WORK_TIME));

    const interval = useRef(null);

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                setRemainingTime(prev => prev - 1);
            }, 1000);


            return () => clearInterval(interval.current);
        } else {
            clearInterval(interval.current);
        }
    }, [isRunning]);

    useEffect(() => {
        if(remainingTime <= 0) {
            vibrate();
            console.log('llegamos a cero', isWorking);
            setRemainingTime(isWorking ? minToSec(constants.BREAK_TIME) : minToSec(constants.WORK_TIME));
            toggleWorking();
            
        }
    }, 
    [remainingTime]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
        <>
            <Text style={styles.title}>{isWorking ? 'Tiempo de Trabajo' : 'Tiempo de Descanso'}</Text>
            <View>
                <Text style={styles.timerText}>{padZero(minutes)}:{padZero(seconds)}</Text>
            </View>
        </>
        
    );
};

export default Cronometro;