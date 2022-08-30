import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'
import { strings } from '../utils/localization';

const CustomButton = (props) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor:
                    props.title == strings.deleteAccount ?
                        COLORS.pickedFavHisColor :
                        props.title == strings.edit || props.title == strings.signOut || props.title == strings.cancel ?
                            COLORS.disabledButton :
                            !props.disabled ?
                                pressed
                                    ? COLORS.paleBlue
                                    : COLORS.mainBlue
                                : COLORS.disabledButton,
                paddingVertical: props.verticalPadding,
            },
            styles.button
        ]}
            disabled={props.disabled}
            onPress={props.onPress}>
            <Text style={[TYPOGRAPHY.H4Semibold, { color: props.title == strings.edit ? COLORS.switchInactiveCircleColor : COLORS.white }]}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
    }
});

export default CustomButton