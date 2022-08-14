import React, { useState } from 'react';
import { TextInput, Keyboard } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'

const CustomTextInput = (props) => {
    return (
        <TextInput
            {...props}
            editable
        />
    );
}

const CustomTextInputMultiline = (props) => {
    const [borderColor, setBorderColor] = useState(COLORS.inputBorder)
    return (
        <CustomTextInput
            {...props}
            multiline={props.multiline}
            maxLength={props.maxLength}
            value={props.value}
            onFocus={() => setBorderColor(COLORS.mainBlue)}
            onBlur={() => setBorderColor(COLORS.inputBorder)}
            onSubmitEditing={() => {
                Keyboard.dismiss
            }
            }
            backgroundColor={COLORS.inputBg}
            placeholderTextColor={COLORS.inputHintText}
            placeholder={props.placeholder}
            style={[TYPOGRAPHY.H4Regular, {
                borderColor: borderColor,
                borderWidth: 1,
                borderRadius: 20,
                paddingLeft: 20,
                paddingVertical: 20,
                marginBottom: 12,
                color: COLORS.white,
            }]}
        />
    );
}

export default CustomTextInputMultiline;