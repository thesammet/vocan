import React from 'react'
import { View, Dimensions } from 'react-native'
import { VocanIconTextGroup, } from './icons'

const VocanGroup = () => {
    return (
        <View style={{ flex: 1, width: Dimensions.get('window').width / 2, alignSelf: 'center' }}>
            <VocanIconTextGroup />
        </View>
    )
}

export default VocanGroup