import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../screens/SettingScreens/Settings'
import Password from '../screens/SettingScreens/Password'
import UserInfo from '../screens/SettingScreens/UserInfo'
import UnauthorizedSettings from '../screens/SettingScreens/UnauthorizedSettings';
import Auth from '../navigation/Auth'
import { AuthContext } from '../context/Auth';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    const { token } = useContext(AuthContext)
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
                    component={token ? Settings : UnauthorizedSettings}
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
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </>
    );
};

export default SettingsStack;
