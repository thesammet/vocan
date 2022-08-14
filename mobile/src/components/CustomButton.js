import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'

const CustomButton = (props) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor:
                    !props.disabled ?
                        pressed
                            ? COLORS.paleBlue
                            : COLORS.mainBlue
                        : COLORS.disabledButton
            },
            styles.button
        ]}
            disabled={props.disabled}
            onPress={props.onPress}>
            <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.white }]}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 32,
    }
});

export default CustomButton