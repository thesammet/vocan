import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [mainLanguage, setMainLanguage] = useState({ name: 'Auto-detect', code: 'auto-detect' });
    const [translatedLanguage, setTranslatedLanguage] = useState({ name: 'English', code: 'en' });
    useEffect(() => {
        const lanugageControl = async () => {
            try {
                const mainLanguage = await AsyncStorage.getItem('mainLanguage');
                const translatedLanguage = await AsyncStorage.getItem('translatedLanguage');
                if (mainLanguage || translatedLanguage) {
                    setMainLanguage(JSON.parse(mainLanguage));
                    setTranslatedLanguage(JSON.parse(translatedLanguage));
                }

            } catch (error) {
                console.warn(error);
            }
        };
        lanugageControl();
    }, []);

    const addMainLanguage = async value => {
        setMainLanguage(value);
        try {
            await AsyncStorage.setItem('mainLanguage', JSON.stringify(value));
        } catch (error) {
            console.warn(error);
        }
    };
    const addTranslatedLanguage = async value => {
        setTranslatedLanguage(value);
        try {
            await AsyncStorage.setItem('translatedLanguage', JSON.stringify(value));
        } catch (error) {
            console.warn(error);
        }
    };

    const removeMainLanguage = async () => {
        setMainLanguage(null);
        try {
            await AsyncStorage.removeItem('mainLanguage');
        } catch (error) {
            console.warn(error);
        }
    };

    const removeTranslatedLanguage = async () => {
        setTranslatedLanguage(null);
        try {
            await AsyncStorage.removeItem('translatedLanguage');
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <LanguageContext.Provider
            value={{
                mainLanguage,
                translatedLanguage,
                addMainLanguage,
                addTranslatedLanguage,
                removeMainLanguage,
                removeTranslatedLanguage
            }}>
            {children}
        </LanguageContext.Provider>
    );
};
