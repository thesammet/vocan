import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import TYPOGRAPHY from '../../utils/typography'
import { COLORS } from '../../utils/colors'
import HomeBasicHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { ChevronRight } from '../../components/icons';
import { Switch } from 'react-native-switch';
import CustomModal from '../../components/CustomModal';
import PasswordModal from '../../components/PasswordModal';

const SettingsScreen = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    const [rememberMeSwitchValue, setRememberMeSwitchValue] = useState(true)
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const togglePasswordModal = () => {
        setPasswordModalVisible(!isPasswordModalVisible);
    };
    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title="Settings"
                isNavBack={false}
            />
            <CustomModal title={'Are you sure you want to log out?'} isModalVisible={isModalVisible} toggleModal={toggleModal} />
            <PasswordModal title={'Enter your password to edit the profile.'} isModalVisible={isPasswordModalVisible} toggleModal={togglePasswordModal} navigateToPage={() => {
                navigation.navigate('Password');
                togglePasswordModal();
            }} />

            <View style={{ justifyContent: 'space-between', flex: 1 }}>

                <View>
                    <View style={styles.userInfoGroup}>
                        <Text style={[TYPOGRAPHY.H2Semibold, { color: COLORS.white, alignSelf: 'center' }]}>SAMEDD</Text>
                        <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.inputHintText, alignSelf: 'center' }]}>samed99@gmail.com</Text>
                    </View>

                    <View style={{ width: '30%', alignSelf: 'center' }}>
                        <CustomButton
                            verticalPadding={8}
                            title={"Edit"}
                            onPress={() => {
                                navigation.navigate('UserInfo')
                            }}
                            disabled={false} />
                    </View>
                    <View style={[styles.dividerView, { borderBottomColor: COLORS.disabledButton }]}></View>
                    <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('Password')}>
                        <View style={[styles.settingsGroup, { marginBottom: 24 }]}>
                            <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>Password</Text>
                            <ChevronRight width={28} height={28} color="#101010" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 24 }}>
                        <View style={styles.settingsGroup}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>Language</Text>
                                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText }]}> (English)</Text>
                            </View>
                            <ChevronRight width={28} height={28} color="#101010" />
                        </View>
                        <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText, marginLeft: 38 }]}>Language selected for translation</Text>
                    </View>

                    <View style={styles.settingsGroup}>
                        <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>Show search history</Text>
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
                </View>
                <View style={{ marginBottom: 16, marginHorizontal: 48 }}>
                    <CustomButton
                        verticalPadding={windowHeight / 50}
                        title={"Sign Out"}
                        onPress={() => {
                            toggleModal()
                        }}
                        disabled={false} />
                </View>
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    userInfoGroup: {
        marginBottom: 24,
        marginTop: 32
    },
    dividerView: {
        borderBottomWidth: 3,
        width: '100%',
        marginVertical: 32
    },
    settingsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 38
    }
})
export default SettingsScreen