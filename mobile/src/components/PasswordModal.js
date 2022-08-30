import React, { useState } from 'react'
import Modal from "react-native-modal";
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import CustomButton from './CustomButton';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'
import { CustomTextInputPassword } from '../components/CustomInputText';
import { strings } from '../utils/localization';

const PasswordModal = (props) => {
    const windowHeight = Dimensions.get('window').height;
    const [password, onChangePassword] = useState(null)
    return (
        <Modal isVisible={props.isModalVisible} >
            <View style={{ backgroundColor: COLORS.modalBg, marginHorizontal: 32, borderRadius: 20 }}>
                <View style={{ marginHorizontal: 32, marginTop: 40, bottom: 16 }}>
                    <Text style={[TYPOGRAPHY.H3Regular, { color: COLORS.white, textAlign: 'center', marginBottom: 20 }]}>{props.title}</Text>
                    <CustomTextInputPassword
                        placeholder={strings.password}
                        maxLength={30}
                        onChangeText={password => onChangePassword(password)}
                        value={password} />
                    <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ width: '50%' }}>
                            <CustomButton
                                verticalPadding={windowHeight / 50}
                                title={strings.cancel}
                                onPress={() => {
                                    props.toggleModal()
                                }}
                                disabled={false} />
                        </View>
                        <View width={16} />
                        <View style={{ width: '50%' }}>
                            <CustomButton
                                verticalPadding={windowHeight / 50}
                                title={strings.edit + " "}
                                onPress={
                                    props.navigateToPage
                                }
                                disabled={false} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    )
}
export default PasswordModal
