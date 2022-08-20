import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import TYPOGRAPHY from '../../utils/typography'
import { COLORS } from '../../utils/colors'
import HomeBasicHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { CustomTextInputPassword } from '../../components/CustomInputText';

const Password = ({ navigation }) => {
    const [oldPassword, onChangeOldPassword] = useState("")
    const [newPassword, onChangeNewPassword] = useState("")
    const [newPasswordAgain, onChangeNewPasswordAgain] = useState("")
    const windowHeight = Dimensions.get('window').height;
    let oldPasswordLength = oldPassword.length
    let newPasswordLength = newPassword.length
    let newPasswordAgainLength = newPasswordAgain.length
    console.log("\n1: " + oldPasswordLength + "\n2: " + newPasswordLength + "\n3: " + newPasswordAgainLength + "\n4: " + (newPassword !== newPasswordAgain))
    //console.log("1:" + oldPasswordLength >= 8 + "\n2: " + newPassword !== newPasswordAgain + "\n3: " + newPasswordLength >= 8 + "\n4: " + newPasswordAgainLength >= 8)
    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title="Password"
                isNavBack={true}
            />
            <View style={{ marginTop: 20, marginHorizontal: 44, justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <View style={{ height: 8 }} />
                    <CustomTextInputPassword
                        maxLength={30}
                        onChangeText={oldPassword => onChangeOldPassword(oldPassword)}
                        value={oldPassword}
                        placeholder={"Exist password"} />
                    <View style={{ height: 32 }} />
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.white, alignSelf: 'center', textAlign: 'center' }]}>Create a new password for yourself.</Text>
                    <View style={{ height: 8 }} />
                    <CustomTextInputPassword
                        maxLength={30}
                        onChangeText={newPassword => onChangeNewPassword(newPassword)}
                        value={newPassword}
                        placeholder={"Create password"} />
                    <CustomTextInputPassword
                        maxLength={30}
                        onChangeText={newPasswordAgain => onChangeNewPasswordAgain(newPasswordAgain)}
                        value={newPasswordAgain}
                        placeholder={"Password again"} />
                    <Text style={[TYPOGRAPHY.H6Regular, { color: COLORS.inputHintText, marginLeft: 20 }]}>Must be at least 8 characters.</Text>
                </View>
                <View style={{ marginBottom: 32, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '50%' }}>
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={"Cancel"}
                            onPress={() => {
                                console.log("Cancel")
                                navigation.goBack()
                            }}
                            disabled={false} />
                    </View>
                    <View width={16} />
                    <View style={{ width: '50%' }}>
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={"Update"}
                            onPress={() => { console.log("Update") }
                            }
                            disabled={oldPasswordLength < 8 ||
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