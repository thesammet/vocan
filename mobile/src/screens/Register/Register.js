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
import { validateEmail } from '../../utils/helper_functions';
import { strings } from '../../utils/localization';

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
                strings.customFailMessage3
            );
        } else {
            console.log(JSON.stringify(response))
            addToken(response.token);
        }
    };

    return (
        <TouchableOpacity
            onPress={Keyboard.dismiss}
            style={styles.innerContainer}
            activeOpacity={1}>
            <View style={{ alignSelf: 'center' }}>
                <VocanIcon style={{ height: 50 }} />
                <Text style={styles.registerText}>{strings.register}</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {pageNumber == 1 ?
                    <View style={styles.inputGroup}>
                        <CustomTextInputMultiline
                            placeholder={strings.createUsername}
                            maxLength={30}
                            onChangeText={username => onChangeUsername(username)}
                            autoCapitalize='none'
                            value={username} />
                        <CustomTextInputMultiline
                            placeholder={strings.enterYourEmail}
                            maxLength={40}
                            onChangeText={email => onChangeEmail(email)}
                            autoCapitalize='none'
                            value={email} />
                    </View>
                    :
                    <View style={styles.inputGroup}>
                        <CustomTextInputPassword
                            placeholder={strings.createPassword}
                            maxLength={30}
                            onChangeText={password => onChangePassword(password)}
                            autoCapitalize='none'
                            value={password} />
                        <CustomTextInputPassword
                            placeholder={strings.enterPasswordAgain}
                            maxLength={40}
                            onChangeText={passwordAgain => onChangePasswordAgain(passwordAgain)}
                            autoCapitalize='none'
                            value={passwordAgain} />
                    </View>}
                {pageNumber == 1 ?
                    <View />
                    :
                    <TouchableOpacity
                        onPress={() => { pageNumber == 2 && setPageNumber(pageNumber - 1) }}
                        activeOpacity={.5}>
                        <Text style={[TYPOGRAPHY.H5Bold, { color: COLORS.mainBlue, marginLeft: 8 }]}>{strings.back}</Text>
                    </TouchableOpacity>}
            </KeyboardAvoidingView >
            <View>
                <View style={styles.circleGroup}>
                    <View style={[styles.circle, { backgroundColor: pageNumber == 1 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                    <View style={[styles.circle, { backgroundColor: pageNumber == 2 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                </View>

                {isLoading ?
                    <Text style={[TYPOGRAPHY.H3Bold, { color: COLORS.mainBlue, alignSelf: 'center' }]}>{strings.accountCreating}</Text>
                    : <CustomButton
                        verticalPadding={20}
                        title={pageNumber == 2 ? strings.complete : strings.continue}
                        onPress={() => {
                            pageNumber != 2 ?
                                setPageNumber(pageNumber + 1) : register()
                        }}
                        disabled={pageNumber == 1 ? !validateEmail(email) || !username : pageNumber == 2 && !password || !passwordAgain || password != passwordAgain}
                        loading={isLoading} />}

                <View style={styles.dontHaveAnAccount}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText }]}>{strings.alreadyHaveAccount}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        activeOpacity={0.5}>
                        <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, marginLeft: 8 }]}>{strings.login}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: 'space-between',
        paddingTop: 72,
        paddingBottom: 36,
        paddingHorizontal: 44,
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