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
import { Switch } from 'react-native-switch';
import { COLORS } from '../../utils/colors'
import TYPOGRAPHY from '../../utils/typography'
import VocanGroup from '../../components/VocanGroup';
import CustomButton from '../../components/CustomButton';

const Login = () => {
    const [username, onChangeUsername] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [rememberMeSwitchValue, setRememberMeSwitchValue] = useState(false)
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={Keyboard.dismiss}
                style={styles.innerContainer}
                activeOpacity={1}>
                <VocanGroup />
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
                    <CustomButton
                        title={"Login"}
                        onPress={() => {
                            console.log(username + " " + password)
                        }}
                        disabled={!username || !password} />
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.mainBlue, alignSelf: 'center', marginBottom: 12, marginTop: 32 }]}>Forgot your password?</Text>
                    <View style={styles.dontHaveAnAccount}>
                        <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.paleText }]}>Don't have an account?</Text>
                        <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.mainBlue, marginLeft: 8 }]}>Register</Text>
                    </View>
                </KeyboardAvoidingView >
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginHorizontal: 44,
        justifyContent: 'space-evenly'
    },
    inputGroup: {
        paddingVertical: 16,
        marginTop: 64
    },
    rememberMeGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 64,
    },
    dontHaveAnAccount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginLeft: 8,
        marginBottom: 72,
    }
})
export default Login