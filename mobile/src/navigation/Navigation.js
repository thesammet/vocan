import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './Tabs'
import Auth from './Auth'
import { AuthContext } from '../context/Auth';
import { GuestContext } from '../context/Guest'


const Navigation = () => {
    let { token } = useContext(AuthContext)
    let { guest } = useContext(GuestContext)

    return (
        <NavigationContainer>
            {guest || token ? <Tabs /> : <Auth />}
        </NavigationContainer >
    );
}

export default Navigation