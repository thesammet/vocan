import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Codesandbox, Search, Settings } from '../components/icons'
import Home from '../screens/Home'
import SettingsScreen from '../screens/Settings'
import Wordbox from '../screens/Wordbox'
import { COLORS } from '../utils/colors'

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    height: 62,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 1,
                },
                tabBarLabel: () => {
                    return null;
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <Search width={24} height={24} color={'red'} />
                        ) : (
                            <View style={{ opacity: 0.5 }}>
                                <Search width={24} height={24} color={'red'} />
                            </View>
                        );
                    },
                    tabBarActiveTintColor: '#00BC6B',
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontFamily: 'Montserrat-Medium',
                    },
                }}
            />
            <Tab.Screen
                name="WordBox"
                component={Wordbox}
                options={{
                    title: 'Word Box',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <Codesandbox width={24} height={24} color={'red'} />
                        ) : (
                            <View style={{ opacity: 0.5 }}>
                                <Codesandbox width={24} height={24} color={'red'} />
                            </View>
                        );
                    },
                    tabBarItemStyle: {},

                    tabBarActiveTintColor: '#00BC6B',
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontFamily: 'Montserrat-Medium',
                    },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <Settings width={24} height={24} color={'red'} />
                        ) : (
                            <View style={{ opacity: 0.5 }}>
                                <Settings width={24} height={24} color={'red'} />
                            </View>
                        );
                    },
                    tabBarItemStyle: {},
                    tabBarActiveTintColor: '#00BC6B',
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontFamily: 'Montserrat-Medium',
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs