import React, { useContext } from 'react'
import Modal from "react-native-modal";
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import CustomButton from './CustomButton';
import { COLORS } from '../utils/colors'
import TYPOGRAPHY from '../utils/typography'
import { AuthContext } from '../context/Auth';
import { strings } from '../utils/localization';

const CustomModal = (props) => {
    const windowHeight = Dimensions.get('window').height;
    const { removeToken } = useContext(AuthContext);
    return (
        <Modal isVisible={props.isModalVisible} >
            <View style={{ backgroundColor: COLORS.modalBg, marginHorizontal: 32, borderRadius: 20 }}>
                <View style={{ marginHorizontal: 32, marginTop: 40, bottom: 16 }}>
                    <Text style={[TYPOGRAPHY.H3Regular, { color: COLORS.white, textAlign: 'center' }]}>{props.title}</Text>
                    <View style={{ marginTop: 48 }}>
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={strings.signOut}
                            onPress={() => {
                                removeToken()
                            }}
                            disabled={false} />
                        <View height={16} />
                        <CustomButton
                            verticalPadding={windowHeight / 50}
                            title={strings.cancel}
                            onPress={() => {
                                props.toggleModal()
                            }}
                            disabled={false} />
                    </View>
                </View>
            </View>
        </Modal >
    )
}
export default CustomModal
