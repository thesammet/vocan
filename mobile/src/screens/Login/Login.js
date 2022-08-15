import React, { useState } from 'react';
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

const Login = ({ navigation }) => {
    const [username, onChangeUsername] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [rememberMeSwitchValue, setRememberMeSwitchValue] = useState(false)
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
                        placeholder={"Username"}
                        maxLength={30}
                        onChangeText={username => onChangeUsername(username)}
                        value={username} />
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
                <CustomButton
                    title={"Login"}
                    onPress={() => {
                        console.log(username + " " + password)
                    }}
                    disabled={!username || !password} />
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