import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Platform,
    NativeModules,
    Linking,
    ActivityIndicator
} from 'react-native';
import TYPOGRAPHY from '../../utils/typography'
import { COLORS } from '../../utils/colors'
import HomeBasicHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { ChevronRight } from '../../components/icons';
import { Switch } from 'react-native-switch';
import CustomModal from '../../components/CustomModal';
import PasswordModal from '../../components/PasswordModal';
import { getProfile, wordHistory } from '../../api/user';
import { AuthContext } from '../../context/Auth';
import { customFailMessage } from '../../utils/show_messages';
import { strings } from '../../utils/localization';
import { localizationLanguages } from '../../assets/sources/localization_languages'
import BottomSheet from 'react-native-gesture-bottom-sheet';

const SettingsScreen = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    const [rememberMeSwitchValue, setRememberMeSwitchValue] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const togglePasswordModal = () => {
        setPasswordModalVisible(!isPasswordModalVisible);
    };
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const { token } = useContext(AuthContext)
    const bottomSheet = useRef();
    const [selectedLanguage, setSelectedLanguage] = useState(null)

    //get device language
    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
            : NativeModules.I18nManager.localeIdentifier;

    const getProfileMethod = async () => {
        try {
            let response = await getProfile(token)
            if (response.error) {
                customFailMessage(strings.customFailMessage2)
            } else {
                setEmail(response.user.email)
                setUsername(response.user.username)
                setRememberMeSwitchValue(response.user.history)
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)
        }
    }

    const wordHistoryMethod = async () => {
        try {
            let response = await wordHistory(token)
            if (response.error) {
                customFailMessage(strings.customFailMessage1)
            } else {
                setRememberMeSwitchValue(response.data.history)
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)
        }
    }

    const renderLanguages = ({ item }) => (
        <TouchableOpacity
            onPress={() => console.log(item
                .code)}>
            <View style={styles.renderItem}>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white, margin: 10, flex: 1 }]}>{item.name}</Text>
                <View
                    style={[styles.roundButton, { backgroundColor: item.code == selectedLanguage ? COLORS.mainBlue : 'transparent' }]}>
                </View>
            </View>
        </TouchableOpacity>
    );

    const _openAppSetting = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings();
    }, []);

    useEffect(() => {
        getProfileMethod()
        setSelectedLanguage(deviceLanguage.split("_")[0])
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileMethod()
        });
        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.container}>
            <HomeBasicHeader
                navigation={navigation}
                title={strings.settings}
                isNavBack={false}
            />
            <BottomSheet hasDraggableIcon={false} ref={bottomSheet} height={windowHeight - windowHeight / 4.5} radius={32} sheetBackgroundColor={'#101010'} backgroundColor={'transparent'} draggable={false} >
                <FlatList
                    data={localizationLanguages}
                    renderItem={renderLanguages}
                    keyExtractor={item => item.code}
                />
            </BottomSheet>
            <CustomModal title={strings.modal1} isModalVisible={isModalVisible} toggleModal={toggleModal} />
            <PasswordModal title={strings.modal2} isModalVisible={isPasswordModalVisible} toggleModal={togglePasswordModal} navigateToPage={() => {
                navigation.navigate('Password');
                togglePasswordModal();
            }} />

            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    {!username || !email ?
                        <ActivityIndicator style={styles.userInfoGroup} color={COLORS.paleBlue}></ActivityIndicator>
                        :
                        <View style={styles.userInfoGroup}>
                            <Text style={[TYPOGRAPHY.H2Semibold, { color: COLORS.white, alignSelf: 'center', textAlign: 'center' }]}>{username}</Text>
                            <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.inputHintText, alignSelf: 'center', textAlign: 'center' }]}>{email}</Text>
                        </View>}

                    <View style={{ width: '30%', alignSelf: 'center' }}>
                        <CustomButton
                            verticalPadding={8}
                            title={strings.edit}
                            onPress={() => {
                                navigation.navigate('UserInfo')
                            }}
                            disabled={false} />
                    </View>
                    <View style={[styles.dividerView, { borderBottomColor: COLORS.disabledButton }]}></View>
                    <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('Password')}>
                        <View style={[styles.settingsGroup, { marginBottom: 24 }]}>
                            <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>{strings.password}</Text>
                            <ChevronRight width={28} height={28} color="#101010" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.5} onPress={() => _openAppSetting()}>
                        <View style={{ marginBottom: 24 }}>
                            <View style={styles.settingsGroup}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white }]}>{strings.language}</Text>
                                    <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText }]}> ({deviceLanguage.split("_")[0].toUpperCase()})</Text>
                                </View>
                                <ChevronRight width={28} height={28} color="#101010" />
                            </View>
                            <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.paleText, marginHorizontal: 38 }]}>{strings.languageHint
                            }</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.settingsGroup}>
                        <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white, flex: 1 }]}>{strings.wordHistory}</Text>
                        <Switch
                            value={rememberMeSwitchValue}
                            onValueChange={(val) => {
                                setRememberMeSwitchValue(val);
                                wordHistoryMethod()
                            }}
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
                        title={strings.signOut}
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
    },
    renderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 32,
        marginBottom: 8
    },

    roundButton: {
        alignSelf: 'center',
        width: 24,
        height: 24,
        borderRadius: 100,
        borderColor: COLORS.switchInactiveCircleColor,
        borderWidth: 1
    }
})
export default SettingsScreen