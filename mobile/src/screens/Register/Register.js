import React, { useState } from 'react';
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

//country
import CountryPicker from 'react-native-country-picker-modal'

const Register = ({ navigation }) => {
    const [username, onChangeUsername] = useState(null)
    const [email, onChangeEmail] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [passwordAgain, onChangePasswordAgain] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    //country
    const [countryCode, setCountryCode] = useState('US')
    const [country, setCountry] = useState(null)

    const [withCountryNameButton, setWithCountryNameButton] = useState(
        false,
    )
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }
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
                        pageNumber == 2 ?
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
                            </View> :
                            <View style={styles.container}>

                                <Text style={[TYPOGRAPHY.H3Bold, { color: 'white', marginTop: 16 }]}>Please select the flag of the country you want to translate</Text>
                                <Text style={[TYPOGRAPHY.H6Regular, { color: 'white', marginTop: 2 }]}>(You can change it later in the settings tab.)</Text>

                                <View style={styles.countryPickerView}>
                                    <CountryPicker
                                        {...{
                                            countryCode,
                                            withFilter,
                                            withFlag,
                                            withCountryNameButton,
                                            withAlphaFilter,
                                            withCallingCode,
                                            withEmoji,
                                            onSelect,
                                        }}
                                    />
                                    {country == null ?
                                        <Text style={[TYPOGRAPHY.H4Semibold, , { color: 'white', marginTop: 4, marginBottom: 16 }]}>{"US / United States"}</Text> :
                                        <Text style={[TYPOGRAPHY.H4Semibold, , { color: 'white', marginTop: 4, marginBottom: 16 }]}>{country.cca2 + " / " + country.name}</Text>
                                    }
                                </View>

                            </View>}
                </KeyboardAvoidingView >
                <View>
                    <View style={styles.circleGroup}>
                        <View style={[styles.circle, { backgroundColor: pageNumber == 1 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                        <View style={[styles.circle, { backgroundColor: pageNumber == 2 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                        <View style={[styles.circle, { backgroundColor: pageNumber == 3 ? COLORS.mainBlue : COLORS.inputBorder }]} />
                    </View>

                    <CustomButton
                        title={pageNumber == 3 ? "Complete" : "Continue"}
                        onPress={() => {
                            pageNumber != 3 &&
                                setPageNumber(pageNumber + 1)
                        }}
                        disabled={pageNumber == 1 ? !username || !email : pageNumber == 2 ? !password || !passwordAgain || password != passwordAgain : false} />
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