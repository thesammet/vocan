import React, { useState, useContext } from 'react';
import { CustomTextInputMultiline, CustomTextInputPassword } from '../../components/CustomInputText';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    View,
    Text
} from 'react-native';
import { Switch } from 'react-native-switch';
import { COLORS } from '../../utils/colors'
import TYPOGRAPHY from '../../utils/typography'
import CustomButton from '../../components/CustomButton';
import { VocanIconTextGroup } from '../../components/icons';
import { loginUser } from '../../api/user';
import { AuthContext } from '../../context/Auth';
import { customFailMessage } from '../../utils/show_messages';

const Login = ({ navigation }) => {
    const [email, onChangeEmail] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [rememberMeSwitchValue, setRememberMeSwitchValue] = useState(false)
    const { addToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

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
                        placeholder={"Email"}
                        maxLength={30}
                        onChangeText={email => onChangeEmail(email)}
                        value={email} />
                    <CustomTextInputPassword
                        placeholder={"Password"}
                        maxLength={40}
                        onChangeText={password => onChangePassword(password)}
                        value={password}
                        secureTextEntry={false} />
                </View>
                <View style={styles.rememberMeGroup}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText }]}>Remember me!</Text>
                    <Switch
                        value={rememberMeSwitchValue}
                        onValueChange={(val) => setRememberMeSwitchValue(val)}
                        circleSize={30}
                        barHeight={30}
                        circleBorderWidth={3}
                        backgroundActive={COLORS.mainBlue}
                        backgroundInactive={COLORS.inputBorder}
                        circleActiveColor={COLORS.white}
                        circleInActiveColor={COLORS.switchInactiveCircleColor}
                        changeValueImmediately={true}
                        switchRightPx={2}
                        switchWidthMultiplier={2}
                        switchBorderRadius={8}
                        renderActiveText={false}
                        renderInActiveText={false}
                    />
                </View>
            </KeyboardAvoidingView >
            <View style={{ marginHorizontal: 44 }}>
                {isLoading ?
                    <Text style={[TYPOGRAPHY.H3Bold, { color: COLORS.mainBlue, alignSelf: 'center' }]}>Loading...</Text>
                    :
                    <CustomButton
                        verticalPadding={20}
                        title={"Login"}
                        onPress={() => {
                            login()
                        }}
                        disabled={!email || !password} />}
                <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, alignSelf: 'center', marginBottom: 12, marginTop: 32 }]}>Forgot your password?</Text>
                <View style={styles.dontHaveAnAccount}>
                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText }]}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.5}>
                        <Text style={[TYPOGRAPHY.H5Semibold, { color: COLORS.mainBlue, marginLeft: 8 }]}>Register</Text>
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
        justifyContent: 'space-evenly',
        paddingVertical: 24
    },
    inputGroup: {
        paddingVertical: 16,
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
    }
})
export default Login