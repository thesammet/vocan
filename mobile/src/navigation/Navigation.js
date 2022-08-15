import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './Tabs'
import Auth from './Auth'
import { AuthContext } from '../context/Auth';


const Navigation = () => {
    let { token } = useContext(AuthContext)

    useEffect(() => {
        console.log(token)

    }, []);
    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>{true ? <Tabs /> : <Auth />}</View>
        </NavigationContainer >
    );
}

export default Navigation