import React, { useState, useContext } from 'react';
import { CustomTextInputMultiline, CustomTextInputPassword } from '../../components/CustomInputText';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    View,
    Text,
} from 'react-native';
import { COLORS } from '../../utils/colors'
import TYPOGRAPHY from '../../utils/typography'
import { VocanIcon } from '../../components/icons';
import CustomButton from '../../components/CustomButton';
import { registerUser } from '../../api/user';
import { AuthContext } from '../../context/Auth';

const Register = ({ navigation }) => {
    const [username, onChangeUsername] = useState(null)
    const [email, onChangeEmail] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [passwordAgain, onChangePasswordAgain] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const { addToken } = useContext(AuthContext)

    const register = async () => {
        setIsLoading(true);
        let response = await registerUser(username, email, password);
        console.log(response)
        setIsLoading(false);

        if (response.error) {
            setIsLoading(false);
            customFailMessage(
                "Could not register."
            );
        } else {
            console.log(JSON.stringify(response))
            addToken(response.token);
        }
    };
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
                    {pageNumber == 1 ? <View style={styles.inputGroup}>
                        <CustomTextInputMultiline
                            placeholder={"Create Username"}
                            maxLength={30}
                            onChangeText={username => onChangeUsername(username)}
                            value={username} />
                        <CustomTextInputMultiline
                            placeholder={"Enter your email"}
                            maxLength={40}
                            onChangeText={email => onChangeEmail(email)}
                            value={email} />
                    </View>
                        :

                        <View style={styles.inputGroup}>
                            <CustomTextInputPassword
                                placeholder={"Create Password"}
                                maxLength={30}
                                onChangeText={password => onChangePassword(password)}
                                value={password} />
                            <CustomTextInputPassword
                                placeholder={"Enter your password again"}
                                maxLength={40}
                                onChangeText={passwordAgain => onChangePasswordAgain(passwordAgain)}
                                value={passwordAgain} />
                        </View>}
                </KeyboardAvoidingView >
                <View>
                    <View style={styles.circleGroup}>
                        <View style={[styles.circle, { backgroundColor: pageNumber == 1 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                        <View style={[styles.circle, { backgroundColor: pageNumber == 2 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                    </View>

                    {isLoading ?
                        <Text style={[TYPOGRAPHY.H3Bold, { color: COLORS.mainBlue, alignSelf: 'center' }]}>Account is being creating...</Text>
                        : <CustomButton
                            verticalPadding={20}
                            title={pageNumber == 2 ? "Complete" : "Continue"}
                            onPress={() => {
                                pageNumber != 2 ?
                                    setPageNumber(pageNumber + 1) : register()
                            }}
                            disabled={pageNumber == 1 ? !username || !email : pageNumber == 2 && !password || !passwordAgain || password != passwordAgain} />}
                    <View style={styles.dontHaveAnAccount}>
                        <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText }]}>I already have an account</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.5}>
                            <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, marginLeft: 8 }]}>Login</Text>
                        </TouchableOpacity>

                    </View>

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
    },
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginHorizontal: 44,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 72,
        marginBottom: 36
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
        marginVertical: 36,
        alignSelf: 'center',
    },
    circle: {
        width: 11,
        height: 11,
        borderRadius: 11 / 2,
        marginBottom: 16,
        marginHorizontal: 2
    },
    circleGroup: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    countryPickerView: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 24
    }
})

export default Register