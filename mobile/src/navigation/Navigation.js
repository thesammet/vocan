import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './Tabs'
import Login from '../screens/Login/Login'
import Register from '../screens/Register/Register'

const Navigation = () => {
    return (
        <NavigationContainer>
            <Login />
        </NavigationContainer >
    );
}

export default Navigation