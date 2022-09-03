import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'
import { strings } from '../utils/localization';
import { TriDown, TriUp } from './icons';

const FilterView = (props) => {
    return (
        <View style={styles.filterView}>
            <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white, marginRight: 16 }]}>{strings.filter}</Text>
            <TouchableOpacity style={[styles.filterItem, { marginRight: 12 }]} activeOpacity={0.5} onPress={() => { props.setAlphabetic() }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.filterItemText, textAlign: 'center', }]}>{props.alphabetic ? "A-Z" : "Z-A"}</Text>
                    {props.alphabetic ? <TriUp width={24} height={24} fill={COLORS.switchInactiveCircleColor} /> : <TriDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} />}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterItem, { paddingRight: 12 }]} activeOpacity={0.5} onPress={() => { props.setDescending() }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.filterItemText, textAlign: 'left', marginRight: 12, }]}>{props.descending ? strings.ascending : strings.descending}</Text>
                    {props.descending ? <TriUp width={24} height={24} fill={COLORS.switchInactiveCircleColor} /> : <TriDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    filterView: {
        marginHorizontal: 32,
        marginBottom: 16,
        marginTop: 21,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filterItem: {
        backgroundColor: COLORS.black,
        borderWidth: 1,
        borderColor: COLORS.filterItemBorder,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10
    },
})

export default FilterView