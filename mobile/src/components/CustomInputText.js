import React, { useState } from 'react';
import { TextInput, Keyboard, View, Text } from 'react-native';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

const CustomTextInput = (props) => {
    return (
        <TextInput
            {...props}
            editable
        />
    );
}

export const CustomTextInputMultiline = (props) => {
    const [borderColor, setBorderColor] = useState(COLORS.inputBorder)
    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return (
        <CustomTextInput
            {...props}
            multiline={props.multiline}
            maxLength={props.maxLength}
            value={props.value}
            onFocus={() => setBorderColor(COLORS.mainBlue)}
            onBlur={() => {
                if (props.placeholder == "Email" || props.placeholder == "Enter your email") {
                    setBorderColor(COLORS.inputBorder)
                    if (!validateEmail(props.value)) {
                        console.log("not a valid email")
                        setBorderColor('red')
                    } else {
                        // valid email
                        console.log("valid email")
                        setBorderColor(COLORS.inputBorder)
                    }
                } else {
                    setBorderColor(COLORS.inputBorder)
                }
            }}
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

export const CustomTextInputPassword = (props) => {
    const [borderColor, setBorderColor] = useState(COLORS.inputBorder)
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    return (
        <View>
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
                secureTextEntry={passwordVisibility}
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
        </View >
    );
}