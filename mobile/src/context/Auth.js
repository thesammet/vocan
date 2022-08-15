import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenControl = async () => {
            try {
                const token = await AsyncStorage.getItem('token');

                if (token) {
                    setToken(token);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        tokenControl();
    }, []);

    const addToken = async value => {
        setToken(value);
        try {
            await AsyncStorage.setItem('token', value);
        } catch (error) {
            console.warn(error);
        }
    };

    const removeToken = async () => {
        setToken(null);
        try {
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                addToken,
                removeToken
            }}>
            {children}
        </AuthContext.Provider>
    );
};
