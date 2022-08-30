import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import TYPOGRAPHY from '../../utils/typography';
import { COLORS } from '../../utils/colors';
import HomeBasicHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { CustomTextInputPassword } from '../../components/CustomInputText';
import { AuthContext } from '../../context/Auth';
import { customFailMessage, customSuccessMessage } from '../../utils/show_messages';
import { updateUser } from '../../api/user';
import { strings } from '../../utils/localization';

const Password = ({ navigation }) => {
    const [oldPassword, onChangeOldPassword] = useState("")
    const [newPassword, onChangeNewPassword] = useState("")
    const [newPasswordAgain, onChangeNewPasswordAgain] = useState("")
    const windowHeight = Dimensions.get('window').height;
    let oldPasswordLength = oldPassword.length
    let newPasswordLength = newPassword.length
    let newPasswordAgainLength = newPasswordAgain.length
    const { token } = useContext(AuthContext)

    const updatePasswordMethod = async () => {
        try {
            let response = await updateUser(token, { password: newPassword })
            if (response.error) {
                customFailMessage(strings.customFailMessage1)
            } else {
                customSuccessMessage(strings.customSuccessMessage1)
                navigation.goBack()
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)
        }
    }
    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title={strings.password}
                isNavBack={true}
            />
            <View style={{ marginTop: 20, marginHorizontal: 44, justifyContent: 'space-between', flex: 1 }}>
                <View>
                    {/* <View style={{ height: 8 }} />
                    <CustomTextInputPassword
                        maxLength={30}
                        onChangeText={oldPassword => onChangeOldPassword(oldPassword)}
                        value={oldPassword}
                        placeholder={"Exist password"} /> */}
                    <View style={{ height: 32 }} />
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.white, alignSelf: 'center', textAlign: 'center' }]}>{strings.passwordDescription}</Text>
                    <View style={{ height: 8 }} />
                    <CustomTextInputPassword
                        maxLength={30}
                        onChangeText={newPassword => onChangeNewPassword(newPassword)}
                        value={newPassword}
                        placeholder={strings.createPassword} />
                    <CustomTextInputPassword
                        maxLength={30}
                        onChangeText={newPasswordAgain => onChangeNewPasswordAgain(newPasswordAgain)}
                        value={newPasswordAgain}
                        placeholder={strings.passwordAgain} />
                    <Text style={[TYPOGRAPHY.H6Regular, { color: COLORS.inputHintText, marginLeft: 20 }]}>{strings.atLeast8}</Text>
                </View>
                <View style={{ marginBottom: 32, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '50%' }}>
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={strings.cancel}
                            onPress={() => navigation.goBack()}
                            disabled={false} />
                    </View>
                    <View width={16} />
                    <View style={{ width: '50%' }}>
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={strings.update}
                            onPress={() => updatePasswordMethod()}
                            disabled={
                                newPasswordLength < 8 ||
                                newPasswordAgainLength < 8 ||
                                (newPassword !== newPasswordAgain)
                            } />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
})
export default Password