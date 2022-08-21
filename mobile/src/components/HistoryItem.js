import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import { Capitalize } from '../utils/helper_functions';
import { Heart, HeartFill } from './icons';

const HistoryItem = (props) => {
    return (
        <View style={styles.wordView}>
            <View>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>{Capitalize(props.item.main)}</Text>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.inputHintText }]}>{Capitalize(props.item.mean)}</Text>
                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, marginTop: 4 }]}>{props.item.translated.toUpperCase()}</Text>
            </View>
            <TouchableOpacity activeOpacity={.5} onPress={props.fav}>
                {props.item.fav ?
                    <HeartFill width={20} height={20} style={{ marginRight: 16, marginTop: 4, }} />
                    :
                    <Heart width={20} height={20} style={{ marginRight: 16, marginTop: 4, }} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wordView: {
        marginVertical: 16,
        marginHorizontal: 48,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
export default HistoryItem