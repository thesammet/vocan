import React from 'react'
import {
    Text, View, StyleSheet
} from 'react-native';
import { Slash } from '../components/icons'
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import { strings } from '../utils/localization'

const NoWordView = (props) => {
    return (
        <View style={styles.emptyView}>
            <Slash width={100} height={100} color={COLORS.paleBlue}></Slash>
            <Text style={[TYPOGRAPHY.H3Bold, { color: COLORS.inputHintText, alignSelf: 'center', marginTop: 8 }]}>{strings.noWord}{props.subject}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyView: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 36,

    }
})

export default NoWordView