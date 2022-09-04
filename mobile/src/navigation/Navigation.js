import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './Tabs'
import Auth from './Auth'
import { AuthContext } from '../context/Auth';


const Navigation = () => {
    let { token } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>{token ? <Tabs /> : <Auth />}</View>
        </NavigationContainer >
    );
}

export default Navigation