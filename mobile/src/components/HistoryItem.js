import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'

const HistoryItem = (props) => {
    return (
        <View style={styles.wordView}>
            <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>{props.title}</Text>
            <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.inputHintText }]}>Favorite</Text>
            <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, marginTop: 4 }]}>English-Turkish</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wordView: {
        marginVertical: 16,
        marginHorizontal: 48
    }
})
export default HistoryItem