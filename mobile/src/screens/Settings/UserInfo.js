import React, { useState } from 'react';
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

const UserInfo = ({ navigation }) => {
    const [username, onChangeUsername] = useState("thesammet")
    const [email, onChangeEmail] = useState("sameddakgul99@gmail.com")
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title="Profile"
                isNavBack={true}
            />
            <View style={{ marginTop: 20, marginHorizontal: 44, justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.inputHintText, alignSelf: 'center' }]}>Username</Text>
                    <View style={{ height: 8 }} />
                    <CustomTextInputMultiline
                        maxLength={30}
                        onChangeText={username => onChangeUsername(username)}
                        value={username} />
                    <View style={{ height: 32 }} />
                    <Text style={[TYPOGRAPHY.H4Semibold, { color: COLORS.inputHintText, alignSelf: 'center' }]}>Email</Text>
                    <View style={{ height: 8 }} />
                    <CustomTextInputMultiline
                        maxLength={30}
                        onChangeText={email => onChangeUsername(email)}
                        value={email} />
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
                            onPress={
                                console.log("Update")
                            }
                            disabled={false} />
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