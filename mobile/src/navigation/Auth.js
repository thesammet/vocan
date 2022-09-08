import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import PrivacyTerms from '../screens/PrivacyTerms';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

const Auth = () => {
    return (
        <>
            <FlashMessage position="bottom" floating={true} />
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="PrivacyTerms"
                    component={PrivacyTerms}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </>
    );
};

export default Auth;
