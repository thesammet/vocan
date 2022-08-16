import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'

const TranslateButton = (props) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                borderColor: 'red',
                backgroundColor:
                    !props.disabled ?
                        pressed
                            ? COLORS.paleBlue
                            : COLORS.mainBlue
                        : COLORS.black,
                paddingVertical: props.verticalPadding,
                borderColor: COLORS.inputBorder,
            },
            styles.button
        ]}
            disabled={props.disabled}
            onPress={props.onPress}>
            <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.white }]}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1
    }
});

export default TranslateButton