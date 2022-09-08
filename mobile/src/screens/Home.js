import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    Text, View, StyleSheet, TouchableOpacity, Keyboard, Dimensions, FlatList
} from 'react-native';
import TYPOGRAPHY from '../utils/typography'
import { COLORS } from '../utils/colors'
import HomeBasicHeader from '../components/CustomHeader';
import { Swap, ChevronDown } from '../components/icons';
import { InputArea } from '../components/CustomInputArea';
import TranslateButton from '../components/TranslateButton'
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { languages } from '../assets/sources/languages'
import { LanguageContext } from '../context/Language';
import { translateWord } from '../api/word';
import { Capitalize } from '../utils/helper_functions'
import { AuthContext } from '../context/Auth';
import { strings } from '../utils/localization';
import { customFailMessage } from '../utils/show_messages';

const Home = ({ navigation }) => {
    const { mainLanguage, addMainLanguage, translatedLanguage, addTranslatedLanguage } = useContext(LanguageContext)
    const [text, setText] = useState("")
    const [mean, setMean] = useState("")
    const [languageSelector, setLanguageSelector] = useState(null)
    const bottomSheet = useRef();
    const windowHeight = Dimensions.get('window').height
    const selectedLanguage = languageSelector === 1 ? mainLanguage.code : translatedLanguage.code
    const [loading, setLoading] = useState(null)
    let translatedLanguages = languages.filter((_, i) => i > 0)
    const { token } = useContext(AuthContext)

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => languageSelector == 1 ? addMainLanguage({ name: item.name, code: item.code }) : addTranslatedLanguage({ name: item.name, code: item.code })}>
            <View style={styles.renderItem}>
                <Text style={[TYPOGRAPHY.H4Regular, { color: COLORS.white, margin: 10, flex: 1 }]}>{item.name}</Text>
                <View
                    style={[styles.roundButton, { backgroundColor: item.code == selectedLanguage ? COLORS.mainBlue : 'transparent' }]}>
                </View>
            </View>
        </TouchableOpacity>
    );

    const translateMethod = async () => {
        setLoading(true)
        try {
            const response = await translateWord(token, text, mainLanguage.code, translatedLanguage.code)
            if (response.error) {
                customFailMessage(strings.customFailMessage1)
            } else {
                setMean(response.data.mean)
            }
        } catch (error) {
            customFailMessage(strings.customFailMessage1)
        }
        setLoading(false)
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.keyboarDismissContainer}>
            <View style={styles.container}>
                <BottomSheet hasDraggableIcon={false} ref={bottomSheet} height={windowHeight - windowHeight / 4.5} radius={32} sheetBackgroundColor={'#101010'} backgroundColor={'transparent'} draggable={false} >
                    <FlatList
                        data={languageSelector == 1 ? languages : translatedLanguages}
                        renderItem={renderItem}
                        keyExtractor={item => item.code}
                    />
                </BottomSheet>
                <HomeBasicHeader
                    navigation={navigation}
                    title={strings.translateArea}
                    isNavBack={false}
                />
                <View style={styles.searchView}>
                    <View style={styles.translatedLanguageGroup}>
                        <TouchableOpacity style={styles.languageSelectView} activeOpacity={0.5} onPress={() => { setLanguageSelector(1); bottomSheet.current.show(); }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}>
                                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, textAlign: 'center', }]}>{mainLanguage.name}</Text>
                                <ChevronDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} activeOpacity={0.5} onPress={() => {
                            if (mainLanguage.code != "auto-detect") {
                                addMainLanguage(translatedLanguage); addTranslatedLanguage(mainLanguage);
                            }
                        }}>
                            <Swap width={24} height={24} fill={mainLanguage.code != "auto-detect" ? COLORS.mainBlue : COLORS.inputHintText} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.languageSelectView} activeOpacity={0.5} onPress={() => { setLanguageSelector(2); bottomSheet.current.show(); }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}>
                                <Text style={[TYPOGRAPHY.H5Regular, { color: COLORS.inputHintText, textAlign: 'center' }]}>{translatedLanguage.name}</Text>
                                <ChevronDown width={24} height={24} fill={COLORS.switchInactiveCircleColor} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <InputArea
                        placeholder={strings.enterText}
                        value={text}
                        onChangeText={(value) => setText(value)}
                        edit={true}
                        clearText={() => { setText(''); setMean('') }}
                        text={text}
                    />
                    <View style={{ marginVertical: 16 }}>
                        <TranslateButton
                            verticalPadding={16}
                            title={loading ? strings.loading : strings.translate}
                            onPress={() => { translateMethod(); Keyboard.dismiss() }}
                            disabled={!text || loading} />
                    </View>
                    <InputArea
                        placeholder={strings.translation}
                        editable={false}
                        edit={false}
                        selectTextOnFocus={false}
                        text={Capitalize(mean)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    keyboarDismissContainer: {
        flex: 1,
    },
    searchView: {
        marginHorizontal: 28
    },
    translatedLanguageGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 18,
        justifyContent: 'space-between',
    },
    disabledTranslateView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red'
    },
    languageSelectView: {
        backgroundColor: COLORS.inputBg,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10
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
export default Home