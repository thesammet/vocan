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
                rightIcon={<Text style={{ color: 'white' }}>shoo</Text>}
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
            {/* <Pressable onPress={handlePasswordVisibility}>
                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.white, marginRight: 16, marginBottom: 16, alignSelf: 'flex-end' }]}>{passwordVisibility ? 'Show Password' : 'Hide Password'}</Text>
            </Pressable>
 */}
        </View >
    );
}