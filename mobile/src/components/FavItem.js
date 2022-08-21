import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import { Heart, HeartFill } from './icons';
import { Capitalize } from '../utils/helper_functions';

const FavItem = (props) => {

    return (
        <View style={styles.wordView}>
            <TouchableOpacity activeOpacity={.5} onPress={props.fav}>
                <HeartFill width={20} height={20} style={{ marginRight: 16, marginTop: 4, }} />
            </TouchableOpacity>
            <View >
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>{Capitalize(props.item.main)}</Text>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.inputHintText }]}>{Capitalize(props.item.mean)}</Text>
                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, marginTop: 4 }]}>{props.item.translated.toUpperCase()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wordView: {
        marginVertical: 16,
        marginLeft: 34,
        marginRight: 24,
        flexDirection: 'row',
    }
})
export default FavItem