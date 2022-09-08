import React, { useState, useContext, useEffect } from 'react';
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
import { CustomTextInputMultiline } from '../../components/CustomInputText';
import { AuthContext } from '../../context/Auth';
import { updateUser, getProfile, deleteUser } from '../../api/user';
import { customFailMessage, customInfoMessage, customSuccessMessage } from '../../utils/show_messages';
import { strings } from '../../utils/localization';

const UserInfo = ({ navigation }) => {
    const [username, onChangeUsername] = useState("-")
    const [email, onChangeEmail] = useState("-")
    const [socialLogin, setSocialLogin] = useState(true)
    const windowHeight = Dimensions.get('window').height;
    const { token, removeToken } = useContext(AuthContext)

    const updateUserMethod = async () => {
        try {
            let response = await updateUser(token, { username, email })
            if (response.error) {
                customFailMessage(strings.customFailMessage1)
            } else {
                customSuccessMessage(strings.customSuccessMessage2)
                navigation.goBack()
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)
        }
    }

    const deleteUser = async () => {
        try {
            let response = await deleteUser(token)
            if (response.error) {
                customFailMessage(strings.customFailMessage1)
            } else {
                removeToken()
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)
        }
    }


    const getProfileMethod = async () => {
        try {
            let response = await getProfile(token)
            if (response.error) {
                customFailMessage(strings.customFailMessage2)
            } else {
                onChangeUsername(response.user.username)
                onChangeEmail(response.user.email)
                setSocialLogin(response.user.socialLogin)
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)

        }
    }

    useEffect(() => {
        getProfileMethod()
    }, []);

    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title={strings.profile}
                isNavBack={true}
            />
            <View style={{ marginTop: 20, marginHorizontal: 44, justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.inputHintText, alignSelf: 'center' }]}>{strings.username}</Text>
                    <View style={{ height: 8 }} />
                    <CustomTextInputMultiline
                        maxLength={30}
                        onChangeText={username => onChangeUsername(username)}
                        value={username} />
                    <View style={{ height: 32 }} />
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.inputHintText, alignSelf: 'center' }]}>{strings.email}</Text>
                    <View style={{ height: 8 }} />
                    <CustomTextInputMultiline
                        maxLength={30}
                        onChangeText={email => onChangeEmail(email)}
                        value={email}
                        editable={socialLogin ? false : true} />
                    <Text style={[TYPOGRAPHY.H6Regular, { color: COLORS.paleText, alignSelf: 'flex-start', marginLeft: 8 }]}>-{strings.socialEmailChangeInfo}</Text>

                </View>
                <View>
                    <View style={{ width: '100%', alignSelf: 'center', marginBottom: 24, }}>
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={strings.deleteAccount}
                            onPress={
                                () => { deleteUser() }
                            }
                            disabled={false} />
                    </View>
                    <View style={{ marginBottom: 32, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '50%' }}>
                            <CustomButton
                                verticalPadding={windowHeight / 50}
                                title={strings.cancel}
                                onPress={() => {
                                    navigation.goBack()
                                }}
                                disabled={false} />
                        </View>
                        <View width={16} />
                        <View style={{ width: '50%' }}>
                            <CustomButton
                                verticalPadding={windowHeight / 50}
                                title={strings.update}
                                onPress={
                                    () => updateUserMethod()
                                }
                                disabled={false} />
                        </View>
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
export default UserInfo