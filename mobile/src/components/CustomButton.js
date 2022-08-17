import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'

const CustomButton = (props) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor:
                    props.title == "Edit" || props.title == "Sign Out" || props.title == "Cancel" ?
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
            <Text style={[TYPOGRAPHY.H4Semibold, { color: props.title == "Edit" ? COLORS.switchInactiveCircleColor : COLORS.white }]}>{props.title}</Text>
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