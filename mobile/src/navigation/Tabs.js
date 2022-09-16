import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Codesandbox, Search, Settings, Fav, Globe, SearchBold } from '../components/icons'
import Home from '../screens/Home'
import SettingsStack from '../stacks/Settings'
import HistoryFav from '../screens/HistoryFav'
import { COLORS } from '../utils/colors'
import FlashMessage from 'react-native-flash-message';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <>
            <FlashMessage position="bottom" floating={true} />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: COLORS.black,
                        height: 70,
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
                        tabBarIcon: ({ focused }) => {
                            return focused ? (
                                <Globe width={32} height={32} />
                            ) : (
                                <View style={{ opacity: 0.5 }}>
                                    <Globe width={32} height={32} />
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
                    name="HistoryFav"
                    component={HistoryFav}
                    options={{
                        title: 'Word Box',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return focused ? (
                                <Fav width={32} height={32} />
                            ) : (
                                <View style={{ opacity: 0.5 }}>
                                    <Fav width={32} height={32} />
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
                    name="SettingsStack"
                    component={SettingsStack}
                    options={{
                        title: 'Settings',
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return focused ? (
                                <Settings width={32} height={32} />
                            ) : (
                                <View style={{ opacity: 0.5 }}>
                                    <Settings width={32} height={32} />
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
            </Tab.Navigator>
        </>
    )
}

export default Tabs