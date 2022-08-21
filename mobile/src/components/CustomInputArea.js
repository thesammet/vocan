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

export const InputArea = (props) => {
    const [borderColor, setBorderColor] = useState(COLORS.inputBorder)
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={[styles.parent, { borderColor: borderColor, backgroundColor: COLORS.inputBg }]}>
            <TextInput
                {...props}
                style={[TYPOGRAPHY.H4Regular, styles.textInput, { height: windowHeight / 5 }]}
                autoCapitalize={'sentences'}
                onFocus={() => setBorderColor(COLORS.mainBlue)}
                onBlur={() => setBorderColor(COLORS.inputBorder)}
                placeholderTextColor={COLORS.inputHintText}
                multiline

                value={props.text}
            />
            {props.edit ? <View style={{ justifyContent: 'space-between', marginRight: 16, marginVertical: 16 }}>
                {
                    props.text ?
                        <TouchableOpacity
                            onPress={() => {
                                console.log("value null: " + props.text)
                                props.clearText()
                            }
                            }>
                            <Cross width={24} height={24} />
                        </TouchableOpacity> : <View />}
                {/* {<TouchableOpacity
                    onPress={() => { props.clearText(); console.log("fav ekle") }}>
                    <Heart width={24} height={24} />
                </TouchableOpacity>} */}
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


