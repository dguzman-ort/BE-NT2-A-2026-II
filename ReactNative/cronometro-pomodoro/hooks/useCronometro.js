import { createContext, useContext, useState } from 'react';

const CronometroContext = createContext();

export const CronometroProvider = ({ children }) => {

    const [isRunning, setIsRunning] = useState(false);
    const [isWorking, setIsWorking] = useState(true);


    const toggleRunning = () => {
        setIsRunning(prev => !prev);
    }

    const toggleWorking = () => {
        setIsWorking(prev => !prev);
    }


    return (
        <CronometroContext.Provider value={{
            isRunning,
            isWorking,
            toggleRunning,
            toggleWorking,
        }}>
            {children}
        </CronometroContext.Provider>
    )
}


export const useCronometro = () => {
    const useCronometro = useContext(CronometroContext);
    if (!useCronometro) {
        throw new Error('useCronometro must be used within a CronometroProvider');
    }
    return useCronometro;
};