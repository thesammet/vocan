import React, { useState } from 'react';
import CustomTextInputMultiline from '../../components/CustomInputText';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    View,
    Text
} from 'react-native';
import { COLORS } from '../../utils/colors'
import TYPOGRAPHY from '../../utils/typography'
import { VocanIcon } from '../../components/icons';
import CustomButton from '../../components/CustomButton';

const Register = () => {
    const [username, onChangeUsername] = useState(null)
    const [password, onChangePassword] = useState(null)
    return (
        <View style={styles.mainContainer}>

            <TouchableOpacity
                onPress={Keyboard.dismiss}
                style={styles.innerContainer}
                activeOpacity={1}>
                <View style={{ alignSelf: 'center' }}>
                    <VocanIcon style={{ height: 50 }} />
                    <Text style={styles.registerText}>Register</Text>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.inputGroup}>
                        <CustomTextInputMultiline
                            placeholder={"Username"}
                            maxLength={30}
                            onChangeText={username => onChangeUsername(username)}
                            value={username} />
                        <CustomTextInputMultiline
                            placeholder={"Password"}
                            maxLength={40}
                            onChangeText={password => onChangePassword(password)}
                            value={password} />
                    </View>
                </KeyboardAvoidingView >
                <CustomButton
                    title={"Continue"}
                    onPress={() => {
                        console.log(username + " " + password)
                    }}
                    disabled={!username || !password} />

                <View style={styles.dontHaveAnAccount}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText }]}>I already have an account</Text>
                    <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, marginLeft: 8 }]}>Login</Text>
                </View>


            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        alignSelf: 'center',
        width: '100%',
        marginTop: 72,
        marginBottom: 36
    },
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginHorizontal: 44,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    registerText: {
        fontSize: 48,
        fontWeight: '400',
        fontFamily: 'DMSerifDisplay-Regular',
        color: COLORS.white
    },
    dontHaveAnAccount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginLeft: 8,
        marginBottom: 72,
    }
})

export default Register