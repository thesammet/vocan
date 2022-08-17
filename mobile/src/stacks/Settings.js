import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/Settings/Settings'
import Password from '../screens/Settings/Password'
import UserInfo from '../screens/Settings/UserInfo'

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Settings"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                }}>
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Password"
                    component={Password}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="UserInfo"
                    component={UserInfo}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </>
    );
};

export default SettingsStack;
