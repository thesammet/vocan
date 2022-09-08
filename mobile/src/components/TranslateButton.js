import React from 'react'
import { Text, StyleSheet, Pressable, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'
import { strings } from '../utils/localization';

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
            <View style={styles.loadingView}>
                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.white }]}>{props.loading ? strings.loading : props.title}</Text>
                {props.loading && <ActivityIndicator color={COLORS.white} style={{ marginLeft: 8 }}></ActivityIndicator>}
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        borderWidth: 1
    },
    loadingView: {
        flexDirection: 'row'
    }
});

export default TranslateButton