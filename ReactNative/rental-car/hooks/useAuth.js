import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    return (
        <authContext.Provider value={{ auth, setAuth }}>
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