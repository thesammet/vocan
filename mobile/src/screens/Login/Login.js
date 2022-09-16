import React, { useState, useContext, useEffect } from 'react';
import { CustomTextInputMultiline, CustomTextInputPassword } from '../../components/CustomInputText';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    View,
    Text,
    Platform
} from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
import { SOCIAL_PASSWORD } from "@env"
import { COLORS } from '../../utils/colors'
import TYPOGRAPHY from '../../utils/typography'
import CustomButton from '../../components/CustomButton';
import { VocanIconTextGroup, Icons8Google, AppleBorder } from '../../components/icons';
import { loginUser, socialLogin } from '../../api/user';
import { AuthContext } from '../../context/Auth';
import { GuestContext } from '../../context/Guest';

import { customFailMessage } from '../../utils/show_messages';
import { validateEmail } from '../../utils/helper_functions';
import { strings } from '../../utils/localization';
import { err } from 'react-native-svg/lib/typescript/xml';

const Login = ({ navigation }) => {
    const [email, onChangeEmail] = useState(null)
    const [password, onChangePassword] = useState("")
    const { addToken } = useContext(AuthContext);
    const { addGuest } = useContext(GuestContext);
    const [isLoading, setIsLoading] = useState(false);

    GoogleSignin.configure({
        webClientId: '401373324848-r9b8s81j61tid396qs117nud8rae7673.apps.googleusercontent.com'
    });

    const login = async () => {
        setIsLoading(true);
        let response = await loginUser(email, password);
        console.log(response)
        setIsLoading(false);

        if (response.error) {
            setIsLoading(false);
            customFailMessage(
                "You have entered an invalid username or password"
            );
        } else {
            addToken(response.token);
        }
    };

    const socialLoginMethod = async (email, password, username) => {
        setIsLoading(true);
        let response = await socialLogin(username, email, password);
        setIsLoading(false);

        if (response.error) {
            setIsLoading(false);
            customFailMessage(
                "Can't logging in. Email has been used before."
            );
        } else {
            addToken(response.token);
        }
    };

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            socialLoginMethod(userInfo.user.email, SOCIAL_PASSWORD, "Vocan-" + userInfo.user.familyName + "-" + userInfo.user.id.slice(4, 8))
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("SIGN_IN_CANCELLED")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("IN_PROGRESS")

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("PLAY_SERVICES_NOT_AVAILABLE")
            } else {
                console.log("Google authentication error: " + error)
                customFailMessage(
                    "Could not login with Google."
                );
            }
        }
    };

    const onAppleButtonPress = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
            });
            let appleAuthResponseDecoded = jwt_decode(appleAuthRequestResponse.identityToken)
            socialLoginMethod(appleAuthResponseDecoded.email, SOCIAL_PASSWORD, "Vocan-" + appleAuthRequestResponse.identityToken.slice(4, 8))
        } catch (error) {
            console.log("Couldnt launch with Apple.")
        }
    }

    return (
        <TouchableOpacity
            onPress={Keyboard.dismiss}
            style={styles.innerContainer}
            activeOpacity={1}>
            <VocanIconTextGroup height={80} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ marginHorizontal: 44 }}>
                <View style={styles.inputGroup}>
                    <CustomTextInputMultiline
                        placeholder={strings.email}
                        maxLength={30}
                        autoCapitalize='none'
                        onChangeText={email => onChangeEmail(email)}
                        value={email} />
                    <CustomTextInputPassword
                        placeholder={strings.password}
                        maxLength={40}
                        autoCapitalize='none'
                        onChangeText={password => onChangePassword(password)}
                        value={password}
                        secureTextEntry={false} />
                </View>
            </KeyboardAvoidingView >

            <View style={{ marginHorizontal: 44 }}>

                <CustomButton
                    verticalPadding={20}
                    title={strings.login}
                    onPress={() => {
                        login()
                    }}
                    disabled={!validateEmail(email) || password.length < 1}
                    loading={isLoading} />

                <Text style={[TYPOGRAPHY.H6Regular, { color: COLORS.white, textAlign: 'center', marginTop: 32 }]}>{strings.orSignInWith}</Text>
                <View style={styles.socialIconView}>
                    {Platform.OS == 'ios' &&
                        <TouchableOpacity onPress={() => { onAppleButtonPress() }}>
                            <View style={styles.rowContainer}>
                                <View style={styles.socialIcon}>
                                    <AppleBorder width={30} height={30}></AppleBorder>
                                    <Text style={[TYPOGRAPHY.H3Semibold, styles.socialIconText]}>{strings.loginWith} Apple </Text>
                                </View>
                            </View>
                        </TouchableOpacity>}
                    <TouchableOpacity onPress={googleSignIn}>
                        <View style={styles.rowContainer}>
                            <View style={styles.socialIcon}>
                                <Icons8Google width={30} height={30}></Icons8Google>
                                <Text style={[TYPOGRAPHY.H3Semibold, styles.socialIconText]}>{strings.loginWith} Google</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.dontHaveAnAccount}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText }]}>{strings.dontHaveAccount}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.5}>
                        <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, marginLeft: 8 }]}>{strings.register}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => addGuest('true')} activeOpacity={0.5}>
                    <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, alignSelf: 'center' }]}>{strings.continueAsGuest}</Text>
                </TouchableOpacity>

            </View>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: 'space-evenly',
        paddingVertical: 24
    },
    inputGroup: {
        paddingTop: 16,
    },
    rememberMeGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 64,
    },
    dontHaveAnAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 32
    },
    socialButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: COLORS.disabledButton,
        paddingVertical: 20
    },
    socialIconView: {
        flexDirection: 'column',

    },
    socialIcon: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        padding: 4,
        flexDirection: 'row',
        borderRadius: 12,
        width: '100%',
        justifyContent: 'center'
    },
    socialIconText: {
        color: COLORS.inputHintText,
        alignSelf: 'center',
        marginLeft: 12
    },
    rowContainer: {
        flexDirection: 'row',
        marginTop: 8
    }
})
export default Login