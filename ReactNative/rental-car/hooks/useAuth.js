import { createContext, useContext, useState, useEffect } from 'react';
import { storeData, clearData, getData } from '../services/asyncStorage';
import { AUTH_KEY } from '../services/authentication';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    
    useEffect(() => {
        getData(AUTH_KEY).then((data) => {
            setAuth(data);
        });
    }, []);
    
    useEffect(() => {
        console.log('auth', auth);

        if (auth) {
            storeData(AUTH_KEY, auth);
        } else {
            clearData(AUTH_KEY);
        }
    }, [auth]);

    const handleLogout = () => {
        setAuth(null);
    }

    const handleLogin = (data) => {
        setAuth(data);
    }
    return (
        <authContext.Provider value={{ auth, handleLogin, handleLogout }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}