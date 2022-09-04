import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { Swap, Heart, HeartFill, Cross } from "./icons";
import { COLORS } from "../utils/colors";
import TYPOGRAPHY from "../utils/typography"

export const SearchInputView = (props) => {
    const [borderColor, setBorderColor] = useState(COLORS.inputBorder)
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={[styles.parent, { borderColor: borderColor, backgroundColor: 'transparent' }]}>
            <TextInput
                {...props}
                style={[TYPOGRAPHY.H4Regular, styles.textInput]}
                autoCapitalize={'sentences'}
                onFocus={() => setBorderColor(COLORS.mainBlue)}
                onBlur={() => setBorderColor(COLORS.inputBorder)}
                placeholderTextColor={COLORS.white}
                value={props.text}
            />
            {props.edit ? <View style={{ justifyContent: 'space-between', marginRight: 16, marginVertical: 16 }}>
                {
                    props.text ?
                        <TouchableOpacity
                            onPress={() => {
                                props.clearText()
                            }
                            }>
                            <Cross width={24} height={24} />
                        </TouchableOpacity> : <View />}
            </View> : <View />
            }
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    parent: {
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textInput: {
        width: "90%",
        padding: 16,
        textAlignVertical: 'top',
        color: COLORS.white,
    },
});


