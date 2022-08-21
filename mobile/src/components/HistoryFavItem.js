import React, { useState } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import { Heart, HeartFill } from './icons';
import { Capitalize } from '../utils/helper_functions';

const HistoryFavItem = (props) => {
    const [heartIcon, setHearthIcon] = useState(props.item.fav)
    return (
        <View style={styles.wordView}>
            <TouchableOpacity activeOpacity={.5} onPress={() => {
                props.fav();
                setHearthIcon(!heartIcon)
            }}>
                {heartIcon ?
                    <HeartFill width={20} height={20} style={{ marginRight: 16, marginTop: 4, }} />
                    :
                    <Heart width={20} height={20} style={{ marginRight: 16, marginTop: 4, }} />}
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
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
        paddingLeft: 34,
        paddingRight: 24,
        flexDirection: 'row',
        flex: 1,
    }
})
export default HistoryFavItem