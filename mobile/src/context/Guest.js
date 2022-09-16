import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
    const [guest, setGuest] = useState(null);

    useEffect(() => {
        const guestControl = async () => {
            try {
                const guest = await AsyncStorage.getItem('guest');

                if (guest) {
                    setGuest(guest);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        guestControl();
    }, []);

    const addGuest = async value => {
        setGuest(value);
        try {
            await AsyncStorage.setItem('guest', value);
        } catch (error) {
            console.warn(error);
        }
    };

    const removeGuest = async () => {
        setGuest(null);
        try {
            await AsyncStorage.removeItem('guest');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GuestContext.Provider
            value={{
                guest,
                addGuest,
                removeGuest
            }}>
            {children}
        </GuestContext.Provider>
    );
};
